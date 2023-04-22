import InfiniteScroll from 'react-infinite-scroll-component';

import { Loading } from './Loading';
import { Card } from './Card';

import { useCharacter } from './useCharacter';

const InfiniteScrollApp = () => {
  const { characters, error, fetchNextPage, hasNextPage, status, refetch } =
    useCharacter();

  if (status === 'loading') return <Loading />;

  if (status === 'error') return <h4>Ups!, {`${error}`}</h4>;

  return (
    <div>
      <h1 className="title">React Infinite Scroll</h1>
      {/* <button onClick={() => {
                refetch({ refetchPage: (page, index) => index === 0 })
            }}>click</button> */}
      <InfiniteScroll
        dataLength={characters ? characters.results.length : 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Loading />}
      >
        <div className="grid-container">
          {characters &&
            characters.results.map((character) => (
              <Card key={character.id} character={character} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default InfiniteScrollApp;
