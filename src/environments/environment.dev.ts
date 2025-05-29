// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    hmr: true,
    title: "Myserv dev",
    name: "DEV", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "https://myserv-backend-dev-hyb4eqeef3dseggf.a03.azurefd.net",
    REDIRECT_URL: "https://myserv-frontend-dev-bwdzeagbf9dzescy.a03.azurefd.net",
    WEB_SOCKET_URL: "wss://myserv-websocket-dev-hef6bfftfnftacct.a03.azurefd.net",
    WEB_SOCKET_API: "https://myserv-websocket-dev-hef6bfftfnftacct.a03.azurefd.net",
    HTML_PAGES: {
        DE: {
            DataPrivacy: "https://myservfrontenddev.blob.core.windows.net/myservassets/datenschutz.html",
            FAQs: "https://myservfrontenddev.blob.core.windows.net/myservassets/faq_de.html"
        },
        EN: {
            DataPrivacy: "https://myservfrontenddev.blob.core.windows.net/myservassets/data_privacy.html",
            FAQs: "https://myservfrontenddev.blob.core.windows.net/myservassets/faq_en.html"
        }
    }
};
