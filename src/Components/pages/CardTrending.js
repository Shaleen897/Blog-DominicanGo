import React from 'react';
import { Link } from "react-router-dom";

// import imgGirl from '../../assets/bgweb.jpg'

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export const CardTrending = ({blogs}) => {

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    autoplay:true,
    autoplayTimeout:4000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1100: {
        items: 4,
      },
    },
  };
  
  return (
    <>
    <OwlCarousel className="owl-theme" {...options}>
        {blogs?.map((item) => (
          <div className="trasnsform hover:scale-110 transition-all  px-2" key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div className="relative overflow-hidden z-5">
                <div className="h-[300px]">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-full h-full relative"
                  />
                </div>
                <div className="absolute h-full w-full top-0 right-0 z-7"></div>
                <div className="absolute w-full z-9 p-10 bottom-0 ">
                  <span className="text-white capitalize">{item.title}</span>
                  <div className="trending-meta-info text-white font-[13px] capitalize">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
    </>
  )
}




/*
  

*/