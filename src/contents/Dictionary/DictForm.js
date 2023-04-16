import { Button, Input } from '@/components';
import { motion } from 'framer-motion';
import Form from '@/components/Form';
import useAddDict from './useAddDict';
import useRefreshToken from '@/components/Firebase/useRefreshToken';
import { useToast } from '@/components/Toast';

const DictForm = () => {
  const { data, error, isLoading, onInsert } = useAddDict();
  const { contextHolder } = useRefreshToken(error?.code === 'token-expired');
  const toast = useToast();

  return (
    <div className="p-5">
      <Form
        onSubmit={(_, value) => {
          if (!value.word) {
            toast.open({
              content: 'Please fill in the word!',
              color: 'warning',
            });
            return;
          }
          onInsert(value);
        }}
        className="flex flex-col space-y-5"
      >
        <Input
          type="text"
          name="word"
          placeholder="Word"
          disabled={isLoading}
        />
        <Input
          type="text"
          name="translate"
          placeholder="Translate"
          disabled={isLoading}
        />
        {data?.code === 'exist' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-5 border bg-slate-100 rounded-lg"
          >
            {data?.data?.map((it) => (
              <div key={it?.id}>
                <div>{`Word: ${it?.word || '_'}`}</div>
                <div>{`Translate: ${it?.translate || '_'}`}</div>
                <Button>Edit</Button>
              </div>
            ))}
          </motion.div>
        )}
        <div className="flex justify-end">
          <Button
            color="primary"
            type="submit"
            loading={isLoading}
            className="w-full lg:w-auto"
          >
            Add
          </Button>
        </div>
      </Form>
      {contextHolder}
    </div>
  );
};

export default DictForm;
