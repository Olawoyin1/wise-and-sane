// import {  useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// // import JoditEditor from "jodit-react";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import NormalButton from "../components/NormalButton";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import axios from "axios";
// import JoditEditorComponent from "./Test";

// interface BlogPostForm {
//   title: string;
//   author: string;
//   body: string;
//   category: string;
//   tag: string;
//   subtag: string;
//   image: string;
//   video: string;
// }

// const CLOUD_NAME = "dunid4t4g";
// const UPLOAD_PRESET = "sosioloji";

// const CreateBlogPostForm = () => {
//   // const editor = useRef<JoditEditor>(null);
//   // const editor = useRef<any>(null); // or more safely:
//   // const editor = useRef<JoditEditor | null>(null);
//   // const editor = useRef<IJodit | null>(null);
//   // const editor = useRef<null | InstanceType<typeof JoditEditor>>(null); // ✅ correct

//   const [content, setContent] = useState<string>("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [imageName, setImageName] = useState<string | null>(null);
//   const [videoName, setVideoName] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const uploadToCloudinary = async (
//     file: File,
//     resourceType: "image" | "video"
//   ): Promise<string> => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", UPLOAD_PRESET);
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
//       formData
//     );
//     return response.data.secure_url;
//   };

//   const extractImageUrls = (html: string): string[] => {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     const imgTags = doc.querySelectorAll("img");
//     return Array.from(imgTags).map((img) => img.src);
//   };

//   // const handleImageUpload = async () => {
//   //   const input = document.createElement("input");
//   //   input.type = "file";
//   //   input.accept = "image/*";

//   //   input.onchange = async () => {
//   //     const file = input.files?.[0];
//   //     if (!file) return;

//   //     const formData = new FormData();
//   //     formData.append("file", file);
//   //     formData.append("upload_preset", "sosioloji");

//   //     try {
//   //       const res = await fetch(
//   //         "https://api.cloudinary.com/v1_1/dunid4t4g/image/upload",
//   //         { method: "POST", body: formData }
//   //       );
//   //       const data = await res.json();

//   //       if (data.secure_url && editor.current) {
//   //         const imageHtml = `<img src="${data.secure_url}" alt="uploaded image" style="max-width: 100%; height: auto;" />`;
//   //         editor.current.editor.selection.insertHTML(imageHtml);
//   //       }
//   //     } catch (err) {
//   //       console.error("Upload failed:", err);
//   //     }
//   //   };

//   //   input.click();
//   // };

//   // const config = {
//   //   readonly: false,
//   //   height: 400,
//   //   buttons: [
//   //     "bold", "italic", "underline", "|",
//   //     "ul", "ol", "|",
//   //     {
//   //       name: "uploadImage",
//   //       iconURL: "https://img.icons8.com/ios/24/image.png",
//   //       tooltip: "Upload Image",
//   //       exec: () => handleImageUpload(),
//   //     },
//   //     "link", "|", "undo", "redo"
//   //   ]
//   // };

//   const formik = useFormik<BlogPostForm>({
//     initialValues: {
//       title: "",
//       author: "",
//       body: "",
//       category: "",
//       tag: "",
//       subtag: "",
//       image: "",
//       video: "",
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required("Title is required"),
//       author: Yup.string().required("Author is required"),
//       category: Yup.string().required("Category is required"),
//       tag: Yup.string().required("Tag is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       try {
//         let imageUrl = "";
//         let videoUrl = "";

//         if (imageFile) imageUrl = await uploadToCloudinary(imageFile, "image");
//         if (videoFile) videoUrl = await uploadToCloudinary(videoFile, "video");

//         const contentImages = extractImageUrls(content);

//         const payload = {
//           ...values,
//           body: content,
//           image: imageUrl,
//           video: videoUrl,
//           contentImages,
//         };

//         await axios.post("https://sosoiloji.onrender.com/api/posts/", payload, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         alert("Post created successfully!");
//         resetForm();
//         setContent("");
//         setImageFile(null);
//         setVideoFile(null);
//         setImageName(null);
//         setVideoName(null);
//       } catch (err) {
//         console.error(err);
//         alert("Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-8">
//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           <h2 className="text-3xl text-center font-bold text-gray-800">
//             Create Blog Post
//           </h2>

//           <div>
//             {/* Title and Author */}
//             <input
//               name="title"
//               value={formik.values.title}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Title"
//               className="w-full p-3 border-b border-gray-700"
//             />
//             {formik.touched.title && formik.errors.title && (
//               <p className="text-red-500 text-sm">{formik.errors.title}</p>
//             )}
//           </div>

//           <div>
//             <input
//               name="author"
//               value={formik.values.author}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="Author"
//               className="w-full p-3 border-b border-gray-700"
//             />
//             {formik.touched.author && formik.errors.author && (
//               <p className="text-red-500 text-sm">{formik.errors.author}</p>
//             )}
//           </div>

//           {/* Jodit Editor */}
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Body
//           </label>
//           <div className="border border-gray-700 rounded-md">
//             {/* <JoditEditor
//   ref={editor}
//   value={content}
//   config={config}
//   onBlur={(newContent) => setContent(newContent)}
//   onChange={() => {}}
// /> */}

//             <JoditEditorComponent
//               value={content}
//               onChange={(newContent) => setContent(newContent)}
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <div className="gap-8 space-y-2">
//               {["Article", "Survey", "Video", "Quotes", "Inspiration"].map(
//                 (option) => (
//                   <label
//                     key={option}
//                     className="flex items-center text-sm gap-2"
//                   >
//                     <input
//                       type="radio"
//                       name="category"
//                       value={option}
//                       checked={formik.values.category === option}
//                       onChange={formik.handleChange}
//                       className="form-radio h-4 w-4 text-blue-600"
//                     />
//                     {option}
//                   </label>
//                 )
//               )}
//             </div>
//             {formik.touched.category && formik.errors.category && (
//               <p className="text-red-500 text-sm">{formik.errors.category}</p>
//             )}
//           </div>

//           {/* Tag/Subtag */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <input
//                 name="tag"
//                 value={formik.values.tag}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 placeholder="Tag"
//                 className="w-full p-3 border-b border-gray-700"
//                 />
//                 {formik.touched.tag && formik.errors.tag && (
//                   <p className="text-red-500 text-sm">{formik.errors.tag}</p>
//                 )}
//             </div>
//             <div>
//               <input
//                 name="subtag"
//                 value={formik.values.subtag}
//                 onChange={formik.handleChange}
//                 placeholder="Subtag (optional)"
//                 className="w-full p-3 border-b border-gray-700"
//               />
//             </div>
//           </div>

//           {/* File Uploads */}
//           <div className="grid md:grid-cols-2 gap-4">
//             {[
//               {
//                 label: "Image",
//                 file: imageFile,
//                 name: imageName,
//                 setFile: setImageFile,
//                 setName: setImageName,
//                 accept: "image/*",
//               },
//               {
//                 label: "Video",
//                 file: videoFile,
//                 name: videoName,
//                 setFile: setVideoFile,
//                 setName: setVideoName,
//                 accept: "video/*",
//               },
//             ].map(({ label, name, setFile, setName, accept }) => (
//               <div key={label}>
//                 <label className="block mb-2 text-sm font-medium">
//                   {label}
//                 </label>
//                 <div className="relative flex flex-col justify-center items-center border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
//                   <IoCloudUploadOutline size={20} />
//                   <p>{name || `Click to upload ${label.toLowerCase()}`}</p>
//                   <input
//                     type="file"
//                     accept={accept}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setFile(file);
//                         setName(file.name);
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button type="submit" disabled={loading} className="w-full py-3">
//             <NormalButton
//               label={loading ? "Submitting..." : "Create Post"}
//               block
//             />
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CreateBlogPostForm;




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
