// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    hmr: true,
    title: "PairProfit dev",
    name: "DEV", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "https://pairprofitv2-backend.onrender.com",
    WEBSOCKET_URL: "wss://pairprofitv2-backend.onrender.com",
    EncryptionKey: import.meta.env.VITE_STORE_ENCRYPTION_KEY || 'my_super_secret_key_123!',
};
