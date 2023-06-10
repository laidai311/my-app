import { client } from '@/configs/axios';

export default {
    insert: async (args = {}) => {
        try {
            const res = await client.post(
                '/api/dictionary/parts-of-speech/insert',
                {
                    ...args,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (args = {}) => {
        try {
            const res = await client.post(
                '/api/dictionary/parts-of-speech/update',
                {
                    ...args,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (args = {}) => {
        try {
            const res = await client.post(
                '/api/dictionary/parts-of-speech/delete',
                {
                    ...args,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },
    search: async (args = {}) => {
        try {
            const res = await client.post(
                '/api/dictionary/parts-of-speech/search',
                {
                    ...args,
                }
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
