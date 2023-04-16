import { client } from '@/configs/axios';

export default {
  insert: async (args = {}) => {
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
