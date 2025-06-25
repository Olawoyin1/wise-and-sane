import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NormalButton from "../components/NormalButton";
import JoditEditorComponent from "../pages/Test";
import { Link } from "react-router-dom";

const CLOUD_NAME = "dunid4t4g";
const UPLOAD_PRESET = "sosioloji";

interface BlogPostForm {
  title: string;
  author: string;
  body: string;
  category: string;
  tag: string;
  quote?: string;
  image: string;
  video: string;
}

const Testingg = () => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showQuoteInput, setShowQuoteInput] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showGalleryUpload, setShowGalleryUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const tagOptions = [
    "Solution", "Asia", "Society", "Action",
    "Inspiration", "Behaviour", "Europe", "Arabia"
  ];

  const uploadToCloudinary = async (file: File, resourceType: "image" | "video"): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const formik = useFormik<BlogPostForm>({
    initialValues: {
      title: "",
      author: "",
      body: "",
      category: "",
      tag: "",
      image: "",
      video: "",
      quote: "",
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
        const imageUrl = imageFile ? await uploadToCloudinary(imageFile, "image") : "";
        const videoUrl = videoFile ? await uploadToCloudinary(videoFile, "video") : "";

        const galleryUrls = await Promise.all(
          galleryFiles.map((file) => uploadToCloudinary(file, "image"))
        );

        const payload = {
          ...values,
          body: content,
          image: imageUrl,
          video: videoUrl,
          contentImages: galleryUrls,
        };

        await axios.post("https://sosoiloji.onrender.com/api/posts/", payload);
        alert("Post created!");
        resetForm();
        setContent("");
        setImageFile(null);
        setVideoFile(null);
        setGalleryFiles([]);
        setShowQuoteInput(false);
        setShowVideoUpload(false);
        setShowGalleryUpload(false);
      } catch (err) {
        console.error(err);
        alert("Error creating post");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* <Navbar /> */}
      
        <Link to='/' className=" mt-10 ml-19 inline-block w-fit text-xl">Go to homepage</Link>
      <div className="px-19 py-10">
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT SIDE */}
          <div className="space-y-10 col-span-1">

            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Title"
              className="w-full p-3 border-b border-gray-700"
            />

            <input
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              placeholder="Author"
              className="w-full p-3 border-b border-gray-700"
            />

            {/* Category */}
            <div>
              <p className="font-medium mb-3">Category</p>
              {["Article", "Survey", "Video", "Quotes", "Inspiration"].map((cat) => (
                <label key={cat} className="block mb-2 space-y-2">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={formik.values.category === cat}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setShowVideoUpload(false);
                      setShowQuoteInput(false);
                      if (e.target.value === "Video") setShowVideoUpload(true);
                      if (e.target.value === "Quotes") setShowQuoteInput(true);
                    }}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Tags */}
            <div>
              <p className="font-medium mb-2">Tags</p>
              <div className="grid grid-cols-2 gap-2">
                {tagOptions.map((tag) => (
                  <label key={tag} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tag"
                      value={tag}
                      checked={formik.values.tag === tag}
                      onChange={formik.handleChange}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>

            {/* Quote Toggle */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showQuoteInput}
                onChange={() => setShowQuoteInput(!showQuoteInput)}
              />
              Add Quote
            </label>
            {showQuoteInput && (
              <textarea
                name="quote"
                placeholder="Write the quote here"
                className="w-full p-3 border rounded border-gray-400"
                value={formik.values.quote}
                onChange={formik.handleChange}
              />
            )}

            {/* Video Toggle */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showVideoUpload}
                onChange={() => setShowVideoUpload(!showVideoUpload)}
              />
              Add Video
            </label>
            {showVideoUpload && (
              <div className="space-y-1">
                <p>Upload Video</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && setVideoFile(e.target.files[0])}
                />
              </div>
            )}

            {/* Image Upload */}
            <div className="space-y-1">
              <p>Main Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])}
              />
            </div>

            {/* Gallery Toggle */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showGalleryUpload}
                onChange={() => setShowGalleryUpload(!showGalleryUpload)}
              />
              Add Image Gallery
            </label>
            {showGalleryUpload && (
              <div className="space-y-1">
                <p>Image Gallery (multiple)</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setGalleryFiles(e.target.files ? Array.from(e.target.files) : [])
                  }
                />
              </div>
            )}

            {/* Submit */}
            <NormalButton
              block
              label={loading ? "Submitting..." : "Create Post"}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="">
            <p className="font-medium mb-2">Post Body</p>
            <div className="border border-gray-700 rounded-md">
              <JoditEditorComponent
                value={content}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
      
  );
};

export default Testingg;
