import { useToast } from '@/components/Toast';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import dictionaryApi from '@/libs/api/dictionary';

const useAddDict = () => {
  const toast = useToast();
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: (data) => dictionaryApi.insert(data),
  });

  const onInsert = useCallback((val) => {
    mutate(val, {
      onSuccess: (suc) => {
        if (suc?.status) {
          toast.open({
            content: `${suc?.message || 'Thành công'}`,
            color: 'success',
          });
          e.target.reset();
        } else {
          toast.open({
            content: `${suc?.message || 'Đã tồn tại'}`,
            color: 'warning',
          });
        }
      },
      onError: (err) => {
        toast.open({
          content: `${err?.message || 'Thất bại'}`,
          color: 'error',
        });
      },
    });
  }, []);

  return { data, error, isLoading, onInsert };
};

export default useAddDict;
