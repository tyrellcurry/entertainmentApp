import React from 'react';
import SearchBar from '../../components/SearchBar';
import {useState} from 'react';
import MediaContainer from '../../components/MediaContainer';
import MediaCards from '../../components/MediaCards';

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://entertainment-app-eight.vercel.app/data`)
  const mediaData = await res.json()

  // Pass data to the page via props
  return { props: { mediaData } }
}

const MoviesPage = ({mediaData}) => {
  const [searchVal, setSearchVal] = useState('');
  return (
    <div>
      <SearchBar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        placholderText={'Search for movies'}
      />

      <MediaContainer searchVal={searchVal} title={'Movies'}>
        {mediaData
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
              key={media._id}
              mediaID={media._id}
              bookmarked={media.isBookmarked}
            />
          ))}
      </MediaContainer>
    </div>
  );
};

export default MoviesPage;
