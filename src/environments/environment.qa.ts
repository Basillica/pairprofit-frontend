export const environment = {
    production: false,
    hmr: false,
    title: "PairProfit test",
    name: "TEST", // defines which configuration under /assets/config/ should be loaded during startup
    BASE_URL: "https://pairprofitv2-backend.onrender.com",
    EncryptionKey: import.meta.env.VITE_STORE_ENCRYPTION_KEY || 'my_super_secret_key_123!',
};
