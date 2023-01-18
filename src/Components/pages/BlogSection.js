import React, { useState } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";


const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;

  const [visible, setVisible] = useState(3);
  const [totalPage, setTotalPage] = useState(blogs.length);
  const [search, setSearch] = useState("");

  const excerpt = (str, count) => {
    if (str.length > count) {
      str = str.substring(0, count) + " ... ";
    }
    return str;
  };

  
  blogs.filter(items => items.title.toLowerCase().includes(`${search}`));
  return (
    <>
      <div className="w-[95%] responsiveD padd">
        <p className="text-white text-bold text-[30px] mt-5">Daily Blogs</p>
        <div className="w-full border "></div>

        
        <div className="mt-5">
               <form>
        <input type="text" name="search" 
        onChange={(e) => setSearch(e.target.value)}
         placeholder='Search'
         className='p-2 rounded w-full outline-none text-[20px]'
         />
    </form>
            </div>
        {blogs?.filter(items => items.title.toLowerCase().includes(`${search}`)).slice(0, visible).map((item) => (
          <div className="w-full h-full mt-10" key={item.id}>
            <div className="flex responsiveFlex">
              <div className="fixer">
              <div className="w-[600px] resp h-[250px] mr-5  rounded-[8px] hover:animate-pulse">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-[400px] bg-cover overflow-hidden h-full rounded-[8px]"
                />
              </div>
              <div className="pl-4 text-white flex flex-col justify-between pad">
                <button
                  type="button"
                  className="cursor-default w-[200px] px-3 py-2 bg-indigo-600 rounded mgt"
                >
                  {item.category}
                </button>
                <p className="text-bold text-lg w-full mgt">{item.title}</p>
                <p className="text-[16px] w-full">
                  <strong>{item.author}</strong> -&nbsp;
                  {item.timestamp.toDate().toDateString()}
                </p>
                <p className="w-[99%]">{excerpt(item.description, 120)} </p>
                <div className="mr-2">
                  <Link to={`/detail/${item.id}`}>
                    <button className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded">
                      Read More
                    </button>
                  </Link>
                  {userId && item.userId === userId && (
                    <div style={{ float: "right" }}>
                      <FontAwesome
                        name="trash"
                        style={{ margin: "15px", cursor: "pointer" }}
                        size="2x"
                        onClick={() => handleDelete(item.id)}
                        className="hover:text-red-600"
                      />
                      <Link to={`/update/${item.id}`}>
                        <FontAwesome
                          name="edit"
                          style={{ cursor: "pointer" }}
                          size="2x"
                          className="hover:text-indigo-600"
                        />
                      </Link>
                    </div>
                  )}
                </div>
               </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center"> 
      {visible < totalPage && (
       <button type="button" onClick={() => setVisible(visible + 3)} className="p-4 rounded outline-none bg-indigo-600 text-white">See More...</button>
      )}
      </div>
      
    </>
  );
};

export default BlogSection;
