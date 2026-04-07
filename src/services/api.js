export const changeNowApi = {
    _callProxy: async (action, payload) => {
        try {
            const res = await fetch('/api/changenow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, payload })
            });

            const data = await res.json();

            if (res.status === 429) {
                return { error: 'Rate limit exceeded. Please wait a moment.', isError: true };
            }
            if (!res.ok) {
                return { error: data.error || 'API request failed' };
            }

            return data;
        } catch (error) {
            console.error(`Error in proxy call [${action}]:`, error);
            throw error;
        }
    },

    getMinAmount: async (from, to) => {
        return await changeNowApi._callProxy('min-amount', { from, to });
    },
    
    getEstimatedAmount: async (amount, from, to) => {
        return await changeNowApi._callProxy('exchange-amount', { amount, from, to });
    },
    
    createTransaction: async (data) => {
        return await changeNowApi._callProxy('create-transaction', { data });
    },
    
    getTransactionStatus: async (id) => {
        return await changeNowApi._callProxy('transaction-status', { id });
    }
};
