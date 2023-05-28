import { client } from '@/configs/axios';

export default {
    insert: async (args = {}) => {
        try {
            const res = await client.post(
                '/api/dictionary/parts_of_speech/insert',
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
                '/api/dictionary/parts_of_speech/update',
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
                '/api/dictionary/parts_of_speech/delete',
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
                '/api/dictionary/parts_of_speech/search',
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
