// CreateEditPostPage.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditorComponent from "./Test";

const CLOUD_NAME = "dunid4t4g";
const UPLOAD_PRESET = "sosioloji";

const tagOptions = ["Article", "Wisdom", "Video"];
const subtagOptions = [
  "Solution",
  "Asia",
  "Arabia",
  "Society",
  "Europe",
  "Action",
  "Americas",
  "Behaviour",
  "Inspiration",
];

const CreateEditPostPage = () => {
  const { slug } = useParams();
const isEditMode = Boolean(slug);
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [blogContentVideoFile, setBlogContentVideoFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [showQuote, setShowQuote] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showBlogContentVideo, setShowBlogContentVideo] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isEditMode) return;
      try {
        const res = await axios.get(`https://sosoiloji.onrender.com/api/posts/${slug}/`);
        const post = res.data;
        formik.setValues({
          title: post.title || "",
          author: post.author || "",
          category: post.category || "",
          subtag: post.subtag || "",
          body: post.body || "",
          quote: post.quote || "",
        });
        setContent(post.body || "");
        if (post.category === "Video") setShowVideo(true);
        if (post.quote) setShowQuote(true);
        if (post.contentImages?.length > 0) setShowGallery(true);
      } catch (error) {
        console.error("Failed to load post", error);
      }
    };
    fetchPost();
  }, [slug, isEditMode]);

  const uploadToCloudinary = async (file: File, resourceType: "image" | "video") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      category: "",
      subtag: "",
      body: "",
      quote: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      category: Yup.string().required("Tag is required"),
      // subtag: Yup.string().required("Subtag is required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting form...", values); 
      try {
        const imageUrl = mainImage ? await uploadToCloudinary(mainImage, "image") : "";
        const videoUrl = videoFile ? await uploadToCloudinary(videoFile, "video") : "";
        const blogContentVideoUrl = blogContentVideoFile ? await uploadToCloudinary(blogContentVideoFile, "video") : "";
        const galleryUrls = await Promise.all(
          galleryFiles.map((file) => uploadToCloudinary(file, "image"))
        );

        const payload = {
          ...values,
          image: imageUrl,
          video: videoUrl,
          blogcontentvideo: blogContentVideoUrl,
          content_images: galleryUrls,
          body: content,
        };


        console.log(payload)

        if (isEditMode) {
          await axios.put(`https://sosoiloji.onrender.com/api/posts/${slug}/`, payload);
        } else {
          await axios.post("https://sosoiloji.onrender.com/api/posts/", payload);
        }

        alert("Post submitted successfully!");
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Submission failed.");
      }
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">{isEditMode ? "Edit" : "Create"} Blog Post</h2>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <input
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="w-full p-3 border-b border-gray-700"
          />

          <input
            name="author"
            placeholder="Author"
            value={formik.values.author}
            onChange={formik.handleChange}
            className="w-full p-3 border-b border-gray-700"
          />

          {/* Main Image */}
          <div>
            <p className="font-medium mb-2">Main Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            />
            {mainImage && (
              <img
                src={URL.createObjectURL(mainImage)}
                alt="preview"
                className="h-32 w-32 object-cover rounded mt-2"
              />
            )}
          </div>

          <div>
            <p className="font-medium mb-2">Tag</p>
            {tagOptions.map((tag) => (
              <label key={tag} className="flex gap-2 items-center mb-2">
                <input
                  type="radio"
                  name="category"
                  value={tag}
                  checked={formik.values.category === tag}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setShowVideo(e.target.value === "Video");
                  }}
                />
                {tag}
              </label>
            ))}
          </div>

          {showVideo && (
            <div>
              <p className="font-medium mb-2">Upload Video</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
            </div>
          )}

          <div>
            <p className="font-medium mb-2">Subtag</p>
            {subtagOptions.map((sub) => (
              <label key={sub} className="flex gap-2 items-center mb-2">
                <input
                  type="radio"
                  name="subtag"
                  value={sub}
                  checked={formik.values.subtag === sub}
                  onChange={formik.handleChange}
                />
                {sub}
              </label>
            ))}
          </div>

          {/* Quote Toggle */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showQuote}
                onChange={() => setShowQuote(!showQuote)}
              />
              Add Quote
            </label>
            {showQuote && (
              <textarea
                name="quote"
                placeholder="Write your quote here"
                className="w-full p-3 border rounded border-gray-400 mt-2"
                value={formik.values.quote}
                onChange={formik.handleChange}
              />
            )}
          </div>

          {/* Gallery Toggle */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showGallery}
                onChange={() => setShowGallery(!showGallery)}
              />
              Add Image Gallery
            </label>
            {showGallery && (
              <div className="space-y-2 mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setGalleryFiles(e.target.files ? Array.from(e.target.files) : [])}
                />
                <div className="flex flex-wrap gap-2">
                  {galleryFiles.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt="gallery"
                      className="h-16 w-16 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog Content Video */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showBlogContentVideo}
                onChange={() => setShowBlogContentVideo(!showBlogContentVideo)}
              />
              Add Blog Content Video
            </label>
            {showBlogContentVideo && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setBlogContentVideoFile(e.target.files?.[0] || null)}
                />
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="">
          <p className="font-medium mb-2">Post Body</p>
          <div className="border border-gray-700 rounded-md">
            <JoditEditorComponent value={content} onChange={setContent} />
          </div>
          <button
            type="submit"
            className="bg-black w-full mt-9 block text-white py-2 px-6 rounded hover:bg-gray-800"
          >
            {isEditMode ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPostPage;
