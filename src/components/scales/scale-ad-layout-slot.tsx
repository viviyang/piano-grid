export function ScaleAdLayoutSlot({ id }: { id: string }) {
  if (process.env.NEXT_PUBLIC_PIANOGRID_ADS_LAYOUT_PREVIEW !== 'true') return null;
  return <aside className="sc-ad-layout-preview sc-screen" aria-label="Advertisement layout preview" data-ad-layout-slot={id}>
    <span>Advertisements</span>
    <p>Layout preview only. No advertising request is sent.</p>
  </aside>;
}
