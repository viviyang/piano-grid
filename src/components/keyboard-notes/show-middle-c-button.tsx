'use client';

export function ShowMiddleCButton() {
  return (
    <a
      className="am-button am-secondary kn-hub-middle-c"
      href="/keyboard-notes?note=C4#explore"
      onClick={event => {
        if (window.location.pathname !== '/keyboard-notes') return;
        event.preventDefault();
        window.dispatchEvent(new CustomEvent('pianogrid:show-middle-c'));
      }}
    >
      Show middle C
    </a>
  );
}
