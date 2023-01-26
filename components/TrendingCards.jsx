import React, {useState} from 'react';
const TrendingCards = ({year, category, rating, title, small, large, mediaID, bookmarked}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [bookmarkHover, setBookmarkHover] = useState();
  const [bookmarkIconHover, setBookmarkIconHover] = useState();
  const [playHover, setPlayHover] = useState(false);
  const [imgHover, setImgHover] = useState('');

  async function updateIsBookmarked(id, isBookmarked) {
    try {
      const response = await fetch(`http://localhost:8000/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBookmarked })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="relative ml-5 rounded-lg cursor-pointer"
      onMouseEnter={() => {
        setPlayHover(true);
        //'hover-img' is declared in global
        setImgHover('hover-img');
      }}
      onMouseLeave={() => {
        setPlayHover(false);
        setImgHover('');
      }}
    >
      {/* If playHover is true, display these elements, boolean set in element above */}
      {playHover && (
        <div className="hidden md:flex div play-icon-trending absolute bg-x-white bg-opacity-25 px-4 py-2 rounded-full justify-center items-center z-10">
          <img src="/assets/icon-play.svg" alt="" className="w-7 mr-2" />
          <p className="text-lg font-light ml-1">Play</p>
        </div>
      )}
      {/* end of playHover */}
      <img className="absolute rounded-lg md:hidden" src={small} alt="" />
      <img
        className={`hidden md:block md:absolute rounded-lg ${imgHover}`}
        src={large}
        alt=""
      />
      <div className="grid grid-cols-3 bg-cover shrink-0 w-60 h-36 md:w-96 md:h-56 rounded-lg md:ml-2">
        <div className="  col-span-2 self-end">
          <div className="text-left ml-4 mb-2 md:mb-12">
            <div className="movie-info opacity-70 align-middle  text-xs md:text-sm font-light space-x-1 flex text-x-white">
              <p>{year}</p>
              <span>&bull;</span>
              <div className="flex align-middle">
                <img
                  src="/assets/icon-category-movie.svg"
                  alt=""
                  className="w-3 mr-1"
                />
                <span>{category}</span>
              </div>
              <span>&bull;</span>
              <p>{rating}</p>
            </div>
            <h1 className="text-base md:text-2xl relative">{title}</h1>
          </div>
        </div>
        <div
          className={`bg-x-mirage w-6 h-6 flex justify-self-end rounded-full mr-4 my-2 mx-auto opacity-70 md:w-10 md:h-10 md:mt-3 md:mr-3 absolute ${bookmarkHover}`}
          onClick={(e) => 
            {
              setIsBookmarked(!isBookmarked)
              bookmarked ?
              updateIsBookmarked(mediaID, false)
                :
              updateIsBookmarked(mediaID, true)
            }}
          onMouseEnter={() => {
            window.innerWidth > 768
              ? setBookmarkHover('bg-x-white-bk opacity-100')
              : '';
            window.innerWidth > 768
              ? setBookmarkIconHover('hover-bookmark')
              : '';
          }}
          onMouseLeave={() => {
            setBookmarkHover('');
            setBookmarkIconHover('');
          }}
        >
          <img
            src={
              isBookmarked
                ? '/assets/icon-bookmark-full.svg'
                : '/assets/icon-bookmark-empty-new.svg'
            }
            alt=""
            className={`w-2 m-auto md:w-3 ${bookmarkIconHover}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TrendingCards;
