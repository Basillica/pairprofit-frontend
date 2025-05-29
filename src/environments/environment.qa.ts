export const environment = {
    production: false,
    hmr: false,
    title: "Myserv test",
    name: "TEST", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "https://myserv-backend-test-eub3g3d2hggjamfj.a03.azurefd.net",
    REDIRECT_URL: "https://myserv-frontend-test-crczgxa2dmbaeegq.a03.azurefd.net",
    WEB_SOCKET_URL: "wss://myserv-websocket-test-bma9hyf4fgcwchgm.a03.azurefd.net",
    WEB_SOCKET_API: "https://myserv-websocket-test-bma9hyf4fgcwchgm.a03.azurefd.net",
    HTML_PAGES: {
        DE: {
            DataPrivacy: "https://myservassettest2.blob.core.windows.net/myservassets/datenschutz.html",
            FAQs: "https://myservassettest2.blob.core.windows.net/myservassets/faq_de.html"
        },
        EN: {
            DataPrivacy: "https://myservassettest2.blob.core.windows.net/myservassets/data_privacy.html",
            FAQs: "https://myservassettest2.blob.core.windows.net/myservassets/faq_en.html"
        }
    }
};
