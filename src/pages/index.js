import { Button } from '@/components';
import { useToggle } from 'ahooks';
import BarLayout from '@/layouts/BarLayout';
import Head from 'next/head';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import InfiniteScrollApp from '@/contents/InfiniteScroll';
export default function HomePage() {
  const [open, { toggle }] = useToggle(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>DaiLai 9966</title>
      </Head>
      <div className="my-5">
        <div className="mx-3 space-x-3">
          <Button onClick={toggle}>Open</Button>
          <Modal open={open} onClose={toggle}>
            <div className="w-20 h-20 bg-white rounded-md">abc</div>
          </Modal>
          <Button isLink href="/dictionary" color="error">
            Dictionary
          </Button>
        </div>
        <InfiniteScrollApp />
      </div>
    </>
  );
}

HomePage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
