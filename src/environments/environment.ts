// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    hmr: true,
    title: "Myserv local",
    name: "local", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "http://localhost:80",
    REDIRECT_URL: "http://localhost:3000",
    WEB_SOCKET_URL: "ws://localhost:8082",
    WEB_SOCKET_API: "http://localhost:8082",
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
