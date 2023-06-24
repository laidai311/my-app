// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
import { client } from '@/configs/axios';

export default {
    search: async (word) => {
        try {
            const res = await client.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            return res.data;
        } catch (error) {
            throw error;
        }
    },
};
