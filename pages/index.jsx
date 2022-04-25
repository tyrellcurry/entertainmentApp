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
          .filter((media) => media.isTrending === true)
          .map((media) => (
            <TrendingCards
              year={media.year}
              category={media.category}
              rating={media.rating}
              title={media.title}
              small={media.thumbnail.trending.small}
              large={media.thumbnail.trending.large}
              key={media.id}
            />
          ))}
      </TrendingContainer>

      {/** Trending Component */}
      <MediaContainer searchVal={searchVal} title={'Recommended for you'}>
        {mediastuff
          .filter((media) => media.isTrending === false)
          .map((media) => (
            <MediaCards
              small={media.thumbnail.regular.small}
              medium={media.thumbnail.regular.medium}
              large={media.thumbnail.regular.large}
              year={media.year}
              category={media.category}
              rating={media.rating}
              title={media.title}
              key={media.id}
            />
          ))}
      </MediaContainer>
    </>
  );
}
