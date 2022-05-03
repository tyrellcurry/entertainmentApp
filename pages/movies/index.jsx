import React from 'react';
import SearchBar from '../../components/SearchBar';
import {useState} from 'react';
import MediaContainer from '../../components/MediaContainer';
import MediaCards from '../../components/MediaCards';
import mediaItems from '../../public/data.json';

export const getStaticProps = async () => {
  return {
    props: {
      mediastuff: mediaItems,
    },
  };
};

const MoviesPage = ({mediastuff}) => {
  const [searchVal, setSearchVal] = useState('');
  return (
    <div>
      <SearchBar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        placholderText={'Search for movies'}
      />

      <MediaContainer searchVal={searchVal} title={'Movies'}>
        {mediastuff
          .filter(
            (item) =>
              item.category === 'Movie' &&
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
    </div>
  );
};

export default MoviesPage;
