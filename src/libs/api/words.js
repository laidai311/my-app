import { client } from '@/configs/axios';

export default {
    insert: async (args = {}) => {
        try {
            const res = await client.post('/api/dictionary/words/insert', {
                ...args,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (args = {}) => {
        try {
            const res = await client.post('/api/dictionary/words/update', {
                ...args,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (args = {}) => {
        try {
            const res = await client.post('/api/dictionary/words/delete', {
                ...args,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    search: async (args = {}) => {
        try {
            const res = await client.post('/api/dictionary/words/search', {
                ...args,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    get: async (args = {}) => {
        try {
            const res = await client.post('/api/dictionary/words/get', {
                ...args,
            });
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
