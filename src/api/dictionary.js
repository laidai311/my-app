import { client } from '@/configs/axios';

export default {
  insertDictionary: async (args = {}) => {
    try {
      const res = await client.post('/api/dictionary/insert', {
        ...args,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
