export const environment = {
    production: true,
    hmr: false,
    title: "JENOPTIK PairProfit",
    name: "https://pairprofitv2-backend.onrender.com",
    BASE_URL: "https://pairprofitv2-backend.onrender.com",
    EncryptionKey: import.meta.env.VITE_STORE_ENCRYPTION_KEY || 'my_super_secret_key_123!',
};
