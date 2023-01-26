import React, {useState} from 'react';

export default function MediaCards({
  small,
  medium,
  large,
  year,
  category,
  rating,
  title,
  mediaID,
  bookmarked
}) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  //Hover states, these will be passed as class variables or as booleans (to display elements):
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
    <div className="card">
      <div className="img">
        <div
          className="bookmark relative flex justify-end cursor-pointer"
          //Setting mouse events here because this is the card container, this is to darken the img and add a play button
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
            <div className="hidden md:flex div play-icon absolute bg-x-white bg-opacity-25 px-4 py-2 rounded-full justify-center items-center z-10">
              <img src="/assets/icon-play.svg" alt="" className="w-7 mr-2" />
              <p className="text-lg font-light ml-1">Play</p>
            </div>
          )}
          {/* end of playHover */}
          <div
            className={`bg-x-mirage z-10 absolute w-6 h-6 flex justify-center items-center rounded-full mt-1 mr-1 opacity-70 md:w-10 md:h-10 md:mt-3 md:mr-3 ${bookmarkHover}`}
            onClick={(e) => 
              {
                setIsBookmarked(!isBookmarked)
                bookmarked ?
                updateIsBookmarked(mediaID, false)
                  :
                updateIsBookmarked(mediaID, true)
              }}
            // On mouse enter, if screen is bigger than md, add these classes to the BookmarkIconHover state
            onMouseEnter={() => {
              window.innerWidth > 768
                ? // Bookmark BG
                  setBookmarkHover('bg-x-white-bk opacity-100 z-2')
                : '';
              window.innerWidth > 768
                ? // Bookmark Icon
                  setBookmarkIconHover('hover-bookmark z-2')
                : '';
            }}
            //remove classes on mouse leave
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
          <img src={small} alt="" className={`block md:hidden rounded-lg`} />
          <img
            src={medium}
            alt=""
            className={`hidden md:block lg:hidden rounded-lg ${imgHover}`}
          />
          <img
            src={large}
            alt=""
            className={`hidden lg:block rounded-lg ${imgHover}`}
          />
        </div>
      </div>
      <div className="txt flex flex-wrap text-xs font-thin text-x-white opacity-75 pt-1 md:text-sm">
        <div className="date">
          <p>{year}</p>
        </div>
        <div className="bullet px-1 md:px-2">•</div>
        <div className="title flex">
          <img
            src="/assets/icon-category-movie.svg"
            alt=""
            className="w-3 mr-1 md:mr-2"
          />
          <p>{category}</p>
        </div>
        <div className="bullet px-1 md:px-2">•</div>
        <div className="rating">
          <p>{rating}</p>
        </div>
      </div>
      <div className="title">
        <h2 className="md:text-lg lg:text-2xl">{title}</h2>
      </div>
    </div>
  );
}
