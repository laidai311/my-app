import { useToast } from '@/components/Toast';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import dictionaryApi from '@/libs/api/dictionary';

const useSearchDict = () => {
  const toast = useToast();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (data) => dictionaryApi.search(data),
  });

  const onSearch = useCallback((val) => {
    mutate(val, {
      onSuccess: (suc) => {
        toast.open({
          content: `${suc?.message || 'Thành công'}`,
          color: 'success',
        });
      },
      onError: (err) => {
        toast.open({
          content: `${err?.message || 'Thất bại'}`,
          color: 'error',
        });
      },
    });
  }, []);

  return { data, error, isLoading, onSearch };
};

export default useSearchDict;
