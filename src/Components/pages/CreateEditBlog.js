import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { db, storage } from "../../firebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Rio agua verde",
  "Playas",
  "Restaurantes",
  "Rio aguas azules",
  "Atraciones",
  "Parques",
];

const CreateEditBlog = ({ user, setActive }) => {
 const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
            toast.info("Image upload to firebase successfully");
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    navigate("/");
  };
  return (
    <>
    <div className="w-full h-full flex justify-center mt-10">
      <div className="w-full h-full flex-col bg-[#00000073]">
        <div className="">
          <div className="text-center text-white mt-5 text-[25px] font-bold heading py-2">
            {id ? "Actualizar Blog" : "Crear Blog"}
          </div>
        </div>
        <div className="flex h-full justify-center mt-5 p-10">
          <div className="w-[80%] ">
            <form className="w-full flex flex-col justify-center" onSubmit={handleSubmit}>
              <div className=" py-3 flex justify-center">
                <input
                  type="text"
                  className=" w-full lg:w-[50%] p-2 rounded border-[3px] hover:border-[blue] outline-none"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="py-3  hidden">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                />
              </div>
              <div className=" py-3 text-white flex justify-center">
                <p className="trending">Is it trending blog ?</p>
                <div className="flex justify-between mx-4">
                  <input
                    type="radio"
                    className="cursor-pointer w-full lg:w-[50%] p-2 rounded border-[3px] hover:border-[blue] outline-none"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="mr-4">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="w-full cursor-pointer lg:w-[50%] p-2 rounded border-[3px] hover:border-[blue] outline-none"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="py-3 flex justify-center">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="w-full lg:w-[50%] p-2 rounded border-[3px] hover:border-[blue] outline-none"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="py-3 flex justify-center">
                <textarea
                  className="w-full h-[150px] lg:w-[50%] p-2 rounded border-[3px] hover:border-[blue] outline-none"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 flex justify-center items-center">
                <input
                  type="file"
                  className="mt-5 mb-5 text-sm text-slate-300
                  file:mr-4 file:py-2 file:px-4 file:text-[16px]
                  file:rounded-full file:border-0
                  file:text-md file:font-bold
                  file:bg-violet-50 file:text-indigo-600
                  hover:file:bg-violet-100 file:cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="mb-3 text-white flex justify-center">
                 {progress} %
              </div>
              <div className="py-3 text-center flex justify-center">
                <button
                  className="text-white font-bold bg-indigo-600 hover:bg-indigo-500 py-3 px-6 rounded"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Actualizar" : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CreateEditBlog