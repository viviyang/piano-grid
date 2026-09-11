# Evidence / source notes

[已核实] 当前 PianoChord 公开 IA 使用 Major Chords / Minor Chords / More Chords / Explore，并公开列出 Seventh, Extended, Sus, Dim, Aug, Add, Altered 类别。这里只作为 IA 参考，不复制其视觉和正文。

参考：
- https://www.pianochord.org/
- https://www.pianochord.org/major.html
- https://www.pianochord.org/minor.html
- https://www.pianochord.org/seventh.html
- https://www.pianochord.org/sus.html
- https://www.pianochord.org/dim.html
- https://www.pianochord.org/aug.html
- https://www.pianochord.org/add.html

音乐规则沿用项目已有来源 ID：
- PG-TRIADS
- PG-OMT
- PG-ASPN

本包 10 个 `current_hub` 对象的 root-position 数据来自已上线 Hub 已存在对象；6 个 `new_derived` 对象按 major 0/4/7、minor 0/3/7 规则与规范拼写派生，并由 `08_validation/validate_next_details.py` 做独立 MIDI/音级一致性检查。

关键词：
- 只给页面任务级 target terms。
- 未重新调用第三方关键词量 API，所以 volume 留空，不冒充最新数值。
