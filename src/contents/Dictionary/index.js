import { Button, Input } from '@/components';
import Form from '@/components/Form';
import { Table } from '@/components/Table';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@stitches/react';
import useSearchDict from './useSearchDict';
import BackPageButton from '@/components/BackPageButton';

const Span = styled('span', {
  background: '#596b7e',
  color: 'white',
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 99999,
});

const DictionaryApp = () => {
  const columns = [
    {
      key: 'id',
      title: 'ID',
      width: 200,
    },
    {
      key: 'word',
      title: 'Word',
      width: 200,
    },
    {
      key: 'translate',
      title: 'Translate',
      width: 200,
      // render: (_, { tags }) => (
      //   <>
      //     {tags.map((tag, tagIndex) => (
      //       <Span key={`tag-${tagIndex}`} style={{ marginLeft: tagIndex * 4 }}>
      //         {tag}
      //       </Span>
      //     ))}
      //   </>
      // ),
    },
  ];

  const d = [
    {
      fullName: 'Francisco Mendes',
      role: 'Full Stack',
      tags: ['dev', 'blogger'],
    },
    {
      fullName: 'Ricardo Malva',
      role: 'Social Media Manager',
      tags: ['designer', 'photographer'],
    },
  ];

  const { data, isLoading, onSearch } = useSearchDict();

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mx-3">
        <BackPageButton />
        <Button color="primary" isLink href="/dictionary/add">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add new</span>
        </Button>
      </div>
      <div className="flex justify-end mx-3">
        <Form
          onSubmit={(_, val) => {
            if (!val.search) return;
            onSearch(val);
          }}
          className="w-full sm:w-auto"
        >
          {/* <Input 
            name="search"
            label="Enter search"
            autoCapitalize="none"
          /> */}
          <input
            name="search"
            placeholder="Enter search"
            autoCapitalize="none"
            className="appearance-none outline-none focus:outline-none bg-gray-100 h-11 rounded-md px-4 w-full"
          />
        </Form>
      </div>
      {isLoading && (
        <div className="my-3 flex justify-center">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin h-10 w-10"
          />
        </div>
      )}
      <div className='mx-0 sm:mx-3 w-full'>
        <Table data={data?.data || []} columns={columns} />
      </div>
    </div>
  );
};
export default DictionaryApp;
