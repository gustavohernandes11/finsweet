import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <meta name="language" content="Portuguese" />
                    <meta name="revisit-after" content="3 days" />
                    <meta name="robots" content="index, follow" />
                    <meta
                        httpEquiv="Content-Type"
                        content="text/html; charset=utf-8"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&family=Sen:wght@400;700;800&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
