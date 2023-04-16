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
  search: async (args = {}) => {
    try {
      const res = await client.post('/api/dictionary/search', {
        ...args,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  update: async (args = {}) => {
    try {
      const res = await client.post('/api/dictionary/update', {
        ...args,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
