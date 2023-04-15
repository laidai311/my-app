import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/Toast';
import BarLayout from '@/layouts/BarLayout';
import dictionaryApi from '@/api/dictionary';
import Form from '@/components/Form';
import Head from 'next/head';
import { Button, Input } from '@/components';

export default function HomePage() {
  const toast = useToast();

  const insertDictionary = useMutation({
    mutationFn: (data) => dictionaryApi.insertDictionary(data),
  });

  return (
    <>
      <Head>
        <title>DaiLai 9966</title>
      </Head>
      <main>
        <div className="border p-5 rounded-xl max-w-md mt-3">
          <Form
            onSubmit={(e, value) => {
              insertDictionary.mutate(value, {
                onSuccess: (success) => {
                  if (success?.status) {
                    toast.open({
                      content: `${success?.message || 'Thành công'}`,
                      type: 'success',
                    });
                    e.target.reset();
                  } else {
                    toast.open({
                      content: `${success?.message || 'Đã tồn tại'}`,
                      type: 'warning',
                    });
                  }
                },
                onError: (error) => {
                  toast.open({
                    content: `${error?.message || 'Thất bại'}`,
                    type: 'error',
                  });
                },
              });
            }}
          >
            <div className="flex flex-col space-y-5">
              <Input
                type="text"
                name="word"
                placeholder="Word"
                disabled={insertDictionary.isLoading}
              />
              <Input
                type="text"
                name="translate"
                placeholder="Translate"
                disabled={insertDictionary.isLoading}
              />
              <Button type="submit" loading={insertDictionary.isLoading}>
                Add
              </Button>
            </div>
          </Form>
        </div>
      </main>
    </>
  );
}

HomePage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
