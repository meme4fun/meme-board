import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GA_TRACKING_ID = 'G-7ZE5XDVL6Z';

const GoogleAnalytics = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     // @ts-ignore
  //     window.gtag('config', GA_TRACKING_ID, { page_path: url });
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <>
      {/* <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','G-1LTXD28CCS');`}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-1LTXD28CCS"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      /> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-FDMBPM1Z7T"
      ></Script>
      <Script
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FDMBPM1Z7T');`,
        }}
      ></Script>
    </>
  );
};
export default GoogleAnalytics;
