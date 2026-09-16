import Script from 'next/script';
import { ANALYTICS_CONSENT_KEY, GA_MEASUREMENT_ID, analyticsEnabled } from '@/lib/analytics';
import { GoogleAnalyticsClient } from './google-analytics-client';

export function GoogleAnalytics() {
  if (!analyticsEnabled()) return null;

  return (
    <>
      <Script id="pianogrid-ga-consent-default" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{if(localStorage.getItem('${ANALYTICS_CONSENT_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="pianogrid-ga-config" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true,send_page_view:false});`}
      </Script>
      <GoogleAnalyticsClient />
    </>
  );
}
