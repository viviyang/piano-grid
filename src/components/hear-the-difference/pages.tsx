import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { HearTheDifferenceExperience } from './experience';
import { getHearPageModel } from '@/lib/hear-the-difference';
import '@/app/chords/a-minor/a-minor.css';
import './hear-the-difference.css';

export function HearTheDifferencePage() {
  const model = getHearPageModel('a');
  return (
    <div className="am-page hd-shell">
      <a className="am-skip" href="#main">Skip to content</a>
      <SiteHeader search={null} current="Tools" />
      <main id="main" className="pr-container" tabIndex={-1}>
        <header className="am-page-heading hd-breadcrumb">
          <PageBreadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Hear the Difference' }]} />
        </header>
        <HearTheDifferenceExperience
          pairs={model.pairs}
          keyboards={model.keyboards}
          initialPair={model.initialPair}
        />
      </main>
      <SiteFooter url="/tools/hear-the-difference" />
    </div>
  );
}
