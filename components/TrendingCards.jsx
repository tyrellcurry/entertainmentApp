import React from 'react';

/*TODO: Figure out how use  large background image on md screen sizes. 

 -using the tailwind "bg-[url('/img/hero-pattern.svg')]" class doesnt work because the paths from the json call cant be called inside of the 
  global.css file which is where tailwind gets the file from

 -using the style attribute works but the element in which it is called has all of the other elements nested in it. adding a 'hidden' class to the 
  className would hide everything.
 
 */
const TrendingCards = ({year, category, rating, title, small, large}) => {
    return (
      <div className='relative ml-5 rounded-lg'>
        <img className='absolute rounded-lg md:hidden' src={small} alt="" />
        <img className=' hidden md:block md:absolute rounded-lg' src={large} alt="" />
        <div className='grid grid-cols-3 bg-cover shrink-0 w-60 h-36 md:w-96 md:h-56 rounded-lg md:ml-2'>
               <div className="  col-span-2 self-end">
                 <div className='text-left ml-4 mb-2 md:mb-12'>
                  <div className='movie-info opacity-70 align-middle  text-xs md:text-sm font-light space-x-1 flex text-x-white'>
                    <p>{year}</p>
                    <span>&bull;</span> 	 
                    <div className='flex align-middle'>
                      <img
                      src="/assets/icon-category-movie.svg"
                      alt=""
                      className="w-3 mr-1"
                      />
                      <span >{category}</span>
                    </div>
                    <span>&bull;</span> 	 
                    <p>{rating}</p>
                  </div>
                  <h1 className='text-base md:text-2xl relative'>{title}</h1>
                 </div>
               </div>
               <div className="bg-x-mirage w-6 h-6 flex justify-center items-center rounded-full mr-4 my-2 mx-auto opacity-70 md:w-10 md:h-10 md:mt-3 md:mr-3">
                <img
                  src="/assets/icon-bookmark-empty-new.svg"
                  alt=""
                  className="w-2 m-auto  md:w-3"
                />
              </div>
             </div>
             </div>
            
    );
};

export default TrendingCards;