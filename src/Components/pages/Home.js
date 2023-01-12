import React, { useState, useEffect } from "react";
import { CardTrending } from "./CardTrending";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { Tags } from "./Tags";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import BlogSection from "./BlogSection";
import MostPopular from "./MostPopular";

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, [setActive]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full  mt-6">
        <div className="flex justify-center">
          <div className="w-[85%] h-full responsiveD bg-[#00000073] p-5">
            <p className="text-white text-bold text-[30px]">Trending</p>
            <div className="w-full border "></div>

            <div className="mt-4">
              <CardTrending blogs={trendBlogs} />
            </div>
          </div>
        </div>
 
        <div className="flex justify-center mt-10 w-full responsiveD">
          <div className="w-[85%] h-full  responsiveD pad bg-[#00000073] p-5 ">
            <div className="w-full h-full flex responsiveFlex justify-between">
              <div className="w-[70%] responsiveD h-full ">
               <BlogSection user={user} blogs={blogs} handleDelete={handleDelete}/>
              </div>
              <div className="w-[25%] responsiveD1 h-full">
             
              <MostPopular blogs={blogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
