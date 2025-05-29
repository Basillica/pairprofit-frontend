export const environment = {
    production: true,
    hmr: false,
    title: "JENOPTIK Myserv",
    name: "PROD", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "https://myserv-backend-prod-d5ezc3ayg8cehedg.a02.azurefd.net",
    REDIRECT_URL: "https://www.myserv.jenoptik.com",
    WEB_SOCKET_URL: "wss://myserv-websocket-prod-anfjbacqgeeqa2am.a02.azurefd.net",
    WEB_SOCKET_API: "https://myserv-websocket-prod-anfjbacqgeeqa2am.a02.azurefd.net",
    HTML_PAGES: {
        DE: {
            DataPrivacy: "https://myservassetprd.blob.core.windows.net/myservassets/datenschutz.html",
            FAQs: "https://myservassetprd.blob.core.windows.net/myservassets/faq_de.html"
        },
        EN: {
            DataPrivacy: "https://myservassetprd.blob.core.windows.net/myservassets/data_privacy.html",
            FAQs: "https://myservassetprd.blob.core.windows.net/myservassets/faq_en.html"
        }
    }
};
