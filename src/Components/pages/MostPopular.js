import React from "react";
import { useNavigate } from "react-router-dom";

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[full] padd">
        <p className="text-white text-bold text-[30px] mt-5">Most Popular</p>
        <div className="w-full border "></div>
        {blogs.map((item) => {
          return (
            <div className="flex" key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/detail/${item.id}`)}>
              <div className="w-[60%] bg-white h-full object-fill  rounded mt-5">
                <img src={item.imgUrl} alt={item.title} className="rounded w-full h-full"/>
              </div>

              <div className="p-5 text-white capitalize ">
                <p>{item.title}</p>
                <p className="text-gray-400 text-[13px]">
                  {item.timestamp.toDate().toDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MostPopular;
