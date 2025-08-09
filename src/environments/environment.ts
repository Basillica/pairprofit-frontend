// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    hmr: true,
    title: "PairProfit Local",
    name: "local", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "http://127.0.0.1:8080",
    WEBSOCKET_URL: "ws://127.0.0.1:8080",
    EncryptionKey: import.meta.env.VITE_STORE_ENCRYPTION_KEY || 'my_super_secret_key_123!',
};