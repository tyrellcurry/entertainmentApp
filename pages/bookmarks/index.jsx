import React from 'react';
import {useState} from 'react';
import SearchBar from '../../components/SearchBar';
import MediaContainer from '../../components/MediaContainer';
import MediaCards from '../../components/MediaCards';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/data`)
  const mediaData = await res.json()

  // Pass data to the page via props
  return { props: { mediaData } }
}

export default function BookmarksPage({mediaData}) {
  const [searchVal, setSearchVal] = useState('');

  return (
    <>
      <SearchBar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        placholderText={'Search bookmarked shows'}
      />

      <MediaContainer
        searchVal={searchVal}
        title={'Bookmarked Movies'}
      >
        {mediaData
          .filter(
            (item) =>
              item.category === 'Movie' &&
              item.isBookmarked === true &&
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
            />
          ))}
      </MediaContainer>

      <MediaContainer searchVal={searchVal} title={'Bookmarked TV Series'}>
        {mediaData
          .filter(
            (item) =>
              item.category === 'TV Series' &&
              item.isBookmarked === true &&
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
            />
          ))}
      </MediaContainer>
    </>
  );
}
