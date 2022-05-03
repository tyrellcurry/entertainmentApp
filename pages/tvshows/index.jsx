import React from 'react';
import {useState} from 'react';
import SearchBar from '../../components/SearchBar';
import mediaItems from '../../public/data.json';
import MediaContainer from '../../components/MediaContainer';
import MediaCards from '../../components/MediaCards';

export const getStaticProps = async () => {
  return {
    props: {
      mediastuff: mediaItems,
    },
  };
};

export default function TvShowsPage({mediastuff}) {
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
        {mediastuff
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
              key={media.id}
            />
          ))}
      </MediaContainer>
    </>
  );
}
