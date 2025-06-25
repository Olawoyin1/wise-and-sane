import { useRef, useState } from "react";
// import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { IoCloudUploadOutline } from "react-icons/io5";
import NormalButton from "../components/NormalButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface BlogPostForm {
  title: string;
  author: string;
  body: string;
  category: string;
  tag: string;
  subtag: string;
  image: string;
  video: string;
}

const CreateBlogPostForm = () => {
  const editor = useRef(null);
  const [content, setContent] = useState<string>("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

//   const uploadToCloudinary = async (
//     file: File,
//     resourceType: "image" | "video"
//   ) => {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "your_upload_preset"); // Replace
//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/your_cloud_name/${resourceType}/upload`, // Replace
//       data
//     );
//     return res.data.secure_url;
//   };

  const formik = useFormik<BlogPostForm>({
    initialValues: {
      title: "",
      author: "",
      body: "",
      category: "",
      tag: "",
      subtag: "",
      image: "",
      video: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      category: Yup.string().required("Category is required"),
      tag: Yup.string().required("Tag is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        // let imageUrl = values.image;
        // let videoUrl = values.video;

        // if (imageFile) imageUrl = await uploadToCloudinary(imageFile, "image");
        // if (videoFile) videoUrl = await uploadToCloudinary(videoFile, "video");

        const payload = {
          ...values,
        //   image: imageUrl,
        //   video: videoUrl,
          body: content,
        };


        console.log(payload)

        // await axios.post("http://localhost:8000/api/posts/", payload);
        alert("Post created successfully!");
        resetForm();
        setContent("");
        // setImageFile(null);
        // setVideoFile(null);
        setImageName(null);
        setVideoName(null);
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>

    <Navbar />
    <div className="max-w-4xl mx-auto">


    <form
      onSubmit={formik.handleSubmit}
      className="pt-0 p-8 blog-form  space-y-6  border-gray-200"
      >
      <h2 className="text-3xl sf text-center font-bold text-gray-800">Create Blog Post</h2>

      <div>
        {/* Title */}
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Title"
          className="w-full p-3 border-b border-gray-700 "
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}
      </div>

      <div>
        {/* Author */}
        <input
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Author"
          className="w-full p-3 border-b border-gray-700"
        />
        {formik.touched.author && formik.errors.author && (
          <p className="text-red-500 text-sm">{formik.errors.author}</p>
        )}
      </div>

      {/* JoditEditor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body
        </label>
        <div className="border border-gray-700 rounded-md">
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      {/* Category (full width) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="gap-8 space-y-2">
          {["Article", "Survey", "Video", "Quotes", "Inspiration"].map(
            (option) => (
              <label key={option} className="flex items-center text-sm sm:text-[16px] gap-2">
                <input
                  type="radio"
                  name="category"
                  value={option}
                  checked={formik.values.category === option}
                  onChange={formik.handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            )
          )}
        </div>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
        )}
      </div>

      {/* Tag and Subtag (side-by-side) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            name="tag"
            value={formik.values.tag}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Tag"
            className="w-full p-3 border-b border-gray-700"
          />
          {formik.touched.tag && formik.errors.tag && (
            <p className="text-red-500 text-sm">{formik.errors.tag}</p>
          )}
        </div>
        <div>
          <input
            name="subtag"
            value={formik.values.subtag}
            onChange={formik.handleChange}
            placeholder="Subtag (optional)"
            className="w-full p-3 border-b border-gray-700"
          />
        </div>
      </div>

      {/* Image and Video Upload */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Image</label>
          <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#ee774f] transition">
            <IoCloudUploadOutline size={20} />
            {imageName ? (
              <p className="text-sm text-gray-700">{imageName}</p>
            ) : (
              <p className="text-sm text-gray-500">Click to upload image</p>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                //   setImageFile(e.target.files[0]);
                  setImageName(e.target.files[0].name);
                }
              }}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Video</label>
          <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#ee774f] transition">
            <IoCloudUploadOutline size={20} />
            {videoName ? (
              <p className="text-sm text-gray-700">{videoName}</p>
            ) : (
              <p className="text-sm text-gray-500">Click to upload video</p>
            )}
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                //   setVideoFile(e.target.files[0]);
                  setVideoName(e.target.files[0].name);
                }
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full  py-3"
      >

        <NormalButton 
            label={loading ? "Submitting..." : "Create Post"}
            block
            />
        
      </button>
    </form>
            </div>

            <Footer />
    </>
  );
};

export default CreateBlogPostForm;
