import { api } from '@/configs/axios';

export default {
  insertDictionary: async (args = {}) => {
    try {
      const res = await api.post('/api/dictionary/insert', {
        ...args,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
