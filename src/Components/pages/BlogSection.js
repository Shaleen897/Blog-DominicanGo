import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";


const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;

  const excerpt = (str, count) => {
    if (str.length > count) {
      str = str.substring(0, count) + " ... ";
    }
    return str;
  };

  return (
    <>
      <div className="w-[95%] responsiveD padd">
        <p className="text-white text-bold text-[30px] mt-5">Daily Blogs</p>
        <div className="w-full border "></div>
        {blogs?.map((item) => (
          <div className="w-full h-full mt-10" key={item.id}>
            <div className="flex responsiveFlex">
              <div className="w-[400px] h-[250px] bg-white rounded-[10px] hover:animate-pulse">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-full rounded-[8px]"
                />
              </div>
              <div className="pl-4 text-white flex-col justify-between flex pad">
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
                <p className="w-full ">{excerpt(item.description, 120)} </p>
                <div className="">
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
        ))}
      </div>
    </>
  );
};

export default BlogSection;
