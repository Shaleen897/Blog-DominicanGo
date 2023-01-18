import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import MostPopular from "./MostPopular";
//import Tags from "./Tags";
import { db } from "../../firebase/Firebase";

const Detail = ({ setActive }) => {

    const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
 // const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
   //   let uniqueTags = [...new Set(tags)];
 //     setTags(uniqueTags);
    };

    getBlogsData();
  }, []);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };

  return (
    <>
      <div className="w-full h-[700px] bgblack relative text-white bg-[#00000063]">
        <div className="">

          <img src={blog?.imgUrl} alt="Detail Img" className="w-full h-[700px] height object-center bg-no-repeat object-fill"/>
          
          <div className="bg-[#00000036] detail absolute z-10 top-0 left-0 right-0 bottom-0"></div>
          <div className="w-full absolute z-12 p-[30px] bottom-0 text-center responsive-text translate-x-[1%] capitalize">
          <h2 className="text-[72px] font-light">{blog?.title}</h2>
            <span className="spanD">{blog?.timestamp.toDate().toDateString()}</span>
          </div>
        </div>
        <div className="p-5 bg-[#00000073]">
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className="">
                <span className="flex text-[18px] justify-center spanD">
                  By &nbsp; <p className="author">{blog?.author}</p> &nbsp; -&nbsp;
                  {blog?.timestamp.toDate().toDateString()}
                </span>
              </div>
              

              <div className="w-full h-full flex responsiveFlex justify-between ">
              <div className="w-[70%] responsiveD h-full text-white">
                <p className="text-white text-bold text-[30px] mt-5">Descripcion del Blog</p>
                <div className="w-full border mb-4"></div>
              <p className=" text-justify">{blog?.description}</p>
              </div>
              <div className="w-[25%] h-full responsiveD">
              <MostPopular blogs={blogs} />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
