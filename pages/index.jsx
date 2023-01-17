import SearchBar from '../components/SearchBar';
import mediaItems from '../public/data.json';
import MediaCards from '../components/MediaCards';
import MediaContainer from '../components/MediaContainer';
import TrendingCards from '../components/TrendingCards';
import TrendingContainer from '../components/TrendingContainer';
import {useState} from 'react';

/**TODO: Need to add keys to the the json file. */

export const getStaticProps = async () => {
  return {
    props: {
      mediastuff: mediaItems,
    },
  };
};

export default function Home({mediastuff}) {
  const [searchVal, setSearchVal] = useState('');

  return (
    <>
      <SearchBar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        placholderText={'Search for movies or TV series'}
      />

      {/** Trending Component */}
      <TrendingContainer searchVal={searchVal} title={'Trending'}>
        {mediastuff
          .filter((item) => item.isTrending)
          .map((media) => (
            <TrendingCards
              year={media.year}
              category={media.category}
              rating={media.rating}
              title={media.title}
              small={media.thumbnail.trending.small}
              large={media.thumbnail.trending.large}
              mediaId={media.id}
              key={media.id}
            />
          ))}
      </TrendingContainer>

      {/** Trending Component */}
      <MediaContainer searchVal={searchVal} title={'Recommended for you'}>
        {mediastuff
          .filter((item) =>
            searchVal
              ? item.title.toLowerCase().includes(searchVal.toLowerCase())
              : item.isTrending === false
          )
          .map((media) => {
            return (
            <MediaCards
              small={media.thumbnail.regular.small}
              medium={media.thumbnail.regular.medium}
              large={media.thumbnail.regular.large}
              year={media.year}
              category={media.category}
              rating={media.rating}
              title={media.title}
              mediaId={media.id}
              key={media.id}
            />
          )})}
      </MediaContainer>
    </>
  );
}
