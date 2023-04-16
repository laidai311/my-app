import BackPageButton from '@/components/BackPageButton';
import DictionaryApp from '@/contents/Dictionary';
import BarLayout from '@/layouts/BarLayout';
import Head from 'next/head';

const DictionaryPage = () => {
  return (
    <>
      <Head>
        <title>Dictionary | DaiLai 9966</title>
      </Head>
      <div className="my-5">
        <BackPageButton />
        <DictionaryApp />
      </div>
    </>
  );
};

DictionaryPage.getLayout = (page) => <BarLayout>{page}</BarLayout>;
export default DictionaryPage;
