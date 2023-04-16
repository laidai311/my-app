import { Button, Input } from '@/components';
import { motion } from 'framer-motion';
import Form from '@/components/Form';
import useAddDict from './useAddDict';
import useRefreshToken from '@/components/Firebase/useRefreshToken';

const DictForm = () => {
  const { data, error, isLoading, onInsert } = useAddDict();
  const [contextHolder] = useRefreshToken(error?.code === 'token-expired');

  return (
    <div className="p-5">
      <Form
        onSubmit={(_, value) => {
          if (!value.word) return;
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
                <div>{`Word: ${it?.word || ''}`}</div>
                <div>{`Translate: ${it?.translate || ''}`}</div>
                <Button>Edit</Button>
              </div>
            ))}
          </motion.div>
        )}
        <Button color="primary" type="submit" loading={isLoading}>
          Add
        </Button>
      </Form>
      {contextHolder}
    </div>
  );
};

export default DictForm;
