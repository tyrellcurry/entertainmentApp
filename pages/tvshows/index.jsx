import React from 'react';
import {useState} from 'react';
import SearchBar from '../../components/SearchBar';
import MediaContainer from '../../components/MediaContainer';
import MediaCards from '../../components/MediaCards';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`/data`)
  const mediaData = await res.json()

  // Pass data to the page via props
  return { props: { mediaData } }
}

export default function TvShowsPage({mediaData}) {
  const [searchVal, setSearchVal] = useState('');

  return (
    <>
      <SearchBar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        placholderText={'Search for TV series'}
      />

      {/** Trending Component */}
      <MediaContainer searchVal={searchVal} title={'TV Series'}>
        {mediaData
          .filter(
            (item) =>
              item.category === 'TV Series' &&
              item.title.toLowerCase().includes(searchVal.toLowerCase())
          )
          .map((media) => (
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
          ))}
      </MediaContainer>
    </>
  );
}
