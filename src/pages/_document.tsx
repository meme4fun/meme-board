import { ETAG, IS_TESTNET } from '@/constants';
import { getFEOAGlobalConfig } from '@/services/server/feoaServer';
import { ServerStyles, createStylesServer } from '@asuikit/next';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
const stylesServer = createStylesServer();
const getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  const globalConfig = await getFEOAGlobalConfig();

  // let collectionsVerification: any[] = [];
  // try {
  //   collectionsVerification = (await getCollectionsVerification()) || [];
  // } catch (err) {}

  // Add your app specific logic here

  return {
    ...initialProps,
    // collectionsVerification,
    globalConfig,
    styles: [
      initialProps.styles,
      <ServerStyles
        html={initialProps.html}
        server={stylesServer}
        key="styles"
      />,
    ],
  };
};

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    const globalConfig = (this.props as any).globalConfig;

    return (
      <Html translate="no">
        <Head>
          <meta name="etag" content={ETAG} />
          <script
            dangerouslySetInnerHTML={{
              __html: `var collectionsVerification = ${JSON.stringify(
                (this.props as any).collectionsVerification,
              )};var globalConfig = ${JSON.stringify(globalConfig)}`,
            }}
          />

          <link
            rel="shortcut icon"
            type="image/x-icon"
            href={
              IS_TESTNET
                ? 'https://static.alienxchain.io/alienxchain/brand-kit/hal/hal-icon.png'
                : 'https://static.alienswap.xyz/web/assets/_/eb09cfe954d3610e95a63cecb9a58ccd.svg'
            }
          />
          <link
            rel="icon"
            type="image/x-icon"
            href={
              IS_TESTNET
                ? 'https://static.alienxchain.io/alienxchain/brand-kit/hal/hal-icon.png'
                : 'https://static.alienswap.xyz/web/assets/_/eb09cfe954d3610e95a63cecb9a58ccd.svg'
            }
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://www.unpkg.com/remixicon@latest/fonts/remixicon.css"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body onTouchStart={() => null}>
          <svg
            id="__svg"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              overflow: 'hidden',
            }}
            aria-hidden="true"
          ></svg>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
