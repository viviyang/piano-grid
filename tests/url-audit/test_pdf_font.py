"""Synthetic fonts are built in temporary directories, never shipped as assets."""
from contextlib import contextmanager
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

sys.path.insert(0, str(Path(__file__).parents[2] / 'scripts'))
import chord_pdf_font as helper


def make_font(path, missing='', restricted=False, licensed=True, variable=False):
    chars = [char for char in helper.REQUIRED_CHARACTERS if char not in missing]
    builder = FontBuilder(1000, isTTF=True)
    names = ['.notdef'] + [f'uni{ord(char):04X}' for char in chars]
    builder.setupGlyphOrder(names)
    builder.setupCharacterMap({ord(char): name for char, name in zip(chars, names[1:])})
    glyphs = {}
    for name in names:
        pen = TTGlyphPen(None)
        if name != 'uni0020':
            pen.moveTo((50, 0)); pen.lineTo((450, 0)); pen.lineTo((450, 700)); pen.lineTo((50, 700)); pen.closePath()
        glyphs[name] = pen.glyph()
    builder.setupGlyf(glyphs)
    builder.setupHorizontalMetrics({name: (500, 0) for name in names})
    builder.setupHorizontalHeader(ascent=800, descent=-200)
    builder.setupNameTable({'familyName': 'Temporary audit fixture', 'styleName': 'Regular', 'uniqueFontIdentifier': path.stem,
                           'fullName': 'Temporary audit fixture', 'psName': 'AuditFixture',
                           'licenseDescription': 'SIL Open Font License (synthetic test fixture)' if licensed else 'unverified'})
    builder.setupOS2(sTypoAscender=800, sTypoDescender=-200, usWinAscent=800, usWinDescent=200, fsType=2 if restricted else 0)
    builder.setupPost()
    if variable:
        builder.setupFvar([('wght', 100, 400, 900, 'Weight')], [])
    builder.save(path)


class FontTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.env = patch.dict('os.environ', {}, clear=True)
        self.env.start()
    def tearDown(self):
        self.env.stop(); self.temp.cleanup()
    def test_static_font_supported(self):
        path = self.root / 'static.ttf'; make_font(path)
        with patch.object(helper.pdfmetrics, 'registerFont') as register:
            helper.register_chord_pdf_font(path, 'TestStatic')
            self.assertEqual(register.call_count, 1)
    def test_variable_font_and_cache_identity(self):
        paths = [self.root / 'first.ttf', self.root / 'second.ttf']
        for path in paths: make_font(path, variable=True)
        with patch.object(helper.tempfile, 'gettempdir', return_value=str(self.root)), patch.object(helper.pdfmetrics, 'registerFont'):
            for path in paths: helper.register_chord_pdf_font(path, 'TestVariable')
            files = list((self.root / 'pianogrid-pdf-fonts').glob('*.ttf'))
            self.assertEqual(len(files), 2)
            helper.register_chord_pdf_font(paths[0], 'TestAgain')
            self.assertEqual(len(list((self.root / 'pianogrid-pdf-fonts').glob('*.ttf'))), 2)
    def test_missing_music_glyph_fails_before_output(self):
        path = self.root / 'missing.ttf'; make_font(path, missing='♭')
        with self.assertRaisesRegex(SystemExit, 'U\\+266D'):
            helper.register_chord_pdf_font(path, 'MissingGlyph')
    def test_embedding_restriction_rejected(self):
        path = self.root / 'restricted.ttf'; make_font(path, restricted=True)
        with self.assertRaisesRegex(SystemExit, 'embedding'):
            helper.register_chord_pdf_font(path, 'Restricted')
    def test_license_not_inferred_from_font_name(self):
        path = self.root / 'Noto.ttf'; make_font(path, licensed=False)
        with self.assertRaisesRegex(SystemExit, 'license'):
            helper.register_chord_pdf_font(path, 'Unverified')
    def test_explicit_environment_font_wins(self):
        path = self.root / 'chosen.ttf'; make_font(path)
        with patch.dict('os.environ', {'PIANOGRID_PDF_FONT': str(path)}):
            self.assertEqual(helper.resolve_font(self.root / 'missing.ttf'), path)
    def test_missing_explicit_font_does_not_silently_fallback(self):
        path = self.root / 'exists.ttf'; make_font(path)
        with patch.dict('os.environ', {'PIANOGRID_PDF_FONT': str(self.root / 'missing.ttf')}):
            with self.assertRaisesRegex(SystemExit, 'PIANOGRID_PDF_FONT'):
                helper.resolve_font(path)
    def test_corrupt_variable_cache_is_rebuilt(self):
        path = self.root / 'variable.ttf'; make_font(path, variable=True)
        with patch.object(helper.tempfile, 'gettempdir', return_value=str(self.root)), patch.object(helper.pdfmetrics, 'registerFont'):
            helper.register_chord_pdf_font(path, 'First')
            cached = next((self.root / 'pianogrid-pdf-fonts').glob('*.ttf'))
            cached.write_bytes(b'broken')
            helper.register_chord_pdf_font(path, 'Second')
            self.assertNotEqual(cached.read_bytes(), b'broken')

if __name__ == '__main__':
    unittest.main()
