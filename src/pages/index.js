import { Button, Input } from '@/components';
import { useEventListener, useToggle } from 'ahooks';
import BarLayout from '@/layouts/BarLayout';
import Head from 'next/head';
import Modal from '@/components/Modal';
import { useRouter } from 'next/router';
import InfiniteScrollApp from '@/contents/InfiniteScroll';
// import MyModal from '@/components/Modal';
import {
  useLockBodyScroll,
  useDetectKeyboardOpen,
  useToggleWithHistory,
} from '@/libs/hooks';
import { useEffect, useRef, useState } from 'react';
import Example from '@/contents/Ex';
let lastKnownScrollPosition;
let lastKnownScrollPosition2;
export default function HomePage() {
  const router = useRouter();
  const [val, setVal] = useState();
  const isKeyboardOpen = useDetectKeyboardOpen();
  const [open, { push, back }] = useToggleWithHistory();
  useLockBodyScroll(open);

  return (
    <>
      <Head>
        <title>DaiLai 9966</title>
      </Head>
      <div className="my-5 bg-slate-300">
        <div className="mx-3 space-x-3">
          <div className="h-32"></div>
          <Button
            onClick={() => {
              push('post/1');
            }}
          >
            Open
          </Button>
          <Modal open={open} onClose={back}>
            <div className=" h-[var(--window-height)] bg-white rounded-md overflow-y-auto">
              abc {val?.x + '-' + val?.y}
              <input />
              <div style={{height: 1000}} className=" bg-slate-400">
                {isKeyboardOpen ? 'show' : 'hide'}
              </div>
              <button onClick={back}>back</button>
              <Input />
            </div>
          </Modal>
          <Button isLink href="/dictionary" color="error">
            Dictionary
          </Button>
        </div>
        <Example />
        <div className="h-96" style={{ height: 2000 }}></div>
        {/* <MyModal /> */}
        {/* <InfiniteScrollApp /> */}
      </div>
    </>
  );
}

HomePage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
