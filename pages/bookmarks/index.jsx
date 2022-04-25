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

export default function BookmarksPage({mediastuff}) {
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
        key={mediastuff}
      >
        {mediastuff
          .filter(
            (media) => media.category === 'Movie' && media.isBookmarked === true
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

      <MediaContainer searchVal={searchVal} title={'Bookmarked TV Series'}>
        {mediastuff
          .filter(
            (media) =>
              media.category === 'TV Series' && media.isBookmarked === true
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
