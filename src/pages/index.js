import { Button, Input } from '@/components';
import { useEventListener, useToggle } from 'ahooks';
import BarLayout from '@/layouts/BarLayout';
import Head from 'next/head';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import InfiniteScrollApp from '@/contents/InfiniteScroll';
// import MyModal from '@/components/Modal';
import { useLockBodyScroll, useDetectKeyboardOpen } from '@/libs/hooks';
import { useEffect, useRef, useState } from 'react';
let lastKnownScrollPosition;
let lastKnownScrollPosition2;
export default function HomePage() {
  const [open, { toggle }] = useToggle(false);
  const router = useRouter();
  const [val, setVal] = useState();
  const isKeyboardOpen = useDetectKeyboardOpen();
  useLockBodyScroll(open);

  // useEffect(() => {
  //   document.addEventListener('touchmove', preventDefault, { passive: false });
  //   return () => {
  //     document.removeEventListener('touchmove', preventDefault, {
  //       passive: false,
  //     });
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>DaiLai 9966</title>
      </Head>
      <div className="my-5">
        <div className="mx-3 space-x-3">
          <div className="h-32"></div>
          <Button onClick={toggle}>Open</Button>
          <Modal open={open} onClose={toggle}>
            <div className="w-56 bg-white rounded-md ">
              abc {val?.x + '-' + val?.y}
              <input />
              <div style={{ height: 2000 }} className=" bg-slate-400">
                {isKeyboardOpen ? 'show' : 'hide'}
              </div>
              <Input />
            </div>
          </Modal>
          <Button isLink href="/dictionary" color="error">
            Dictionary
          </Button>
        </div>
        <div className="h-96" style={{ height: 2000 }}></div>
        {/* <MyModal /> */}
        {/* <InfiniteScrollApp /> */}
      </div>
    </>
  );
}

HomePage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
