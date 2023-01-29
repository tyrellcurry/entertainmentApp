import SearchBar from '../components/SearchBar';
import MediaCards from '../components/MediaCards';
import MediaContainer from '../components/MediaContainer';
import TrendingCards from '../components/TrendingCards';
import TrendingContainer from '../components/TrendingContainer';
import {useState} from 'react';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`/data`)
  const mediaData = await res.json()

  // Pass data to the page via props
  return { props: { mediaData } }
}

export default function Home({mediaData}) {
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
        {mediaData
          .filter((item) => item.isTrending)
          .map((media) => (
            <TrendingCards
              year={media.year}
              category={media.category}
              rating={media.rating}
              title={media.title}
              small={media.thumbnail.trending.small}
              large={media.thumbnail.trending.large}
              key={media._id}
              mediaID={media._id}
              bookmarked={media.isBookmarked}
            />
          ))}
      </TrendingContainer>

      {/** Trending Component */}
      <MediaContainer searchVal={searchVal} title={'Recommended for you'}>
        {mediaData
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
              key={media._id}
              mediaID={media._id}
              bookmarked={media.isBookmarked}
            />
          )})}
      </MediaContainer>
    </>
  );
}
