import { useToast } from '@/components/Toast';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import dictionaryApi from '@/libs/api/dictionary';

const useAddDict = () => {
  const toast = useToast();
  const { data, isLoading, error, mutateAsync } = useMutation({
    mutationFn: (data) => dictionaryApi.insert(data),
  });

  const onInsert = useCallback(async (val) => {
    let result = false;
    await mutateAsync(val, {
      onSuccess: (suc) => {
        if (suc?.status) {
          toast.open({
            content: `${suc?.message || 'Thành công'}`,
            color: 'success',
          });
          result = true;
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
    return result;
  }, []);

  return { data, error, isLoading, onInsert };
};

export default useAddDict;
