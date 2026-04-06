const API_KEY = import.meta.env.VITE_CHANGENOW_API_KEY;
const BASE_URL = 'https://api.changenow.io/v1';

export const changeNowApi = {
    getMinAmount: async (from, to) => {
        try {
            const res = await fetch(`${BASE_URL}/min-amount/${from}_${to}?api_key=${API_KEY}`);
            return await res.json();
        } catch (error) {
            console.error("Error fetching min amount:", error);
            throw error;
        }
    },
    getEstimatedAmount: async (amount, from, to) => {
        try {
            const res = await fetch(`${BASE_URL}/exchange-amount/${amount}/${from}_${to}?api_key=${API_KEY}`);
            return await res.json();
        } catch (error) {
            console.error("Error fetching estimated amount:", error);
            throw error;
        }
    },
    createTransaction: async (data) => {
        try {
            const res = await fetch(`${BASE_URL}/transactions/${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error;
        }
    },
    getTransactionStatus: async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/transactions/${id}/${API_KEY}`);
            return await res.json();
        } catch (error) {
            console.error("Error fetching transaction status:", error);
            throw error;
        }
    }
};
