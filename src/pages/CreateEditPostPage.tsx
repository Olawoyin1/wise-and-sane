// CreateEditPostPage.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileDropInputWithPreview from "../components/FileDropInputWithPreview";
import { toast } from "sonner";
import TiptapEditor from "../components/TiptapEditor";

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

const platformOptions = ["sosioloji", "wiseandsane"];

interface FormValues {
  title: string;
  author: string;
  category: string;
  subtag: string;
  body: string;
  quote: string;
  platforms: string[];
}

const CreateEditPostPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const isEditMode = Boolean(slug);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [blogContentVideoFile, setBlogContentVideoFile] = useState<File | null>(
    null
  );
  // Product Card state
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productTitle, setProductTitle] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productLink, setProductLink] = useState("");

  // Callout state
  const [calloutSolution, setCalloutSolution] = useState("");
  const [calloutChange, setCalloutChange] = useState("");
  const [calloutAction, setCalloutAction] = useState("");
  const [calloutPurpose, setCalloutPurpose] = useState("");

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [showQuote, setShowQuote] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showSubTag, setSubTag] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showBlogContentVideo, setShowBlogContentVideo] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [showProductCard, setShowProductCard] = useState(false);

  const uploadToCloudinary = async (
    file: File,
    resourceType: "image" | "video"
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      author: "",
      category: "",
      subtag: "",
      body: "",
      quote: "",
      platforms: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      category: Yup.string().required("Tag is required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting form...", values); 
      setIsSubmitting(true);
      try {
        // 1. Upload only new media files
        let imageUrl = null;
        let videoUrl = null;
        let blogContentVideoUrl = null;
        let galleryUrls: string[] = [];

        if (mainImage) {
          imageUrl = await uploadToCloudinary(mainImage, "image");
        }
        if (videoFile) {
          videoUrl = await uploadToCloudinary(videoFile, "video");
        }
        if (blogContentVideoFile) {
          blogContentVideoUrl = await uploadToCloudinary(
            blogContentVideoFile,
            "video"
          );
        }
        if (galleryFiles.length > 0) {
          galleryUrls = await Promise.all(
            galleryFiles.map((file) => uploadToCloudinary(file, "image"))
          );
        }

        // 2. Construct payload
        const payload: any = {
          ...values,
          body: content,
        };

        if (showProductCard && productImage) {
          const uploadedProductImage = await uploadToCloudinary(
            productImage,
            "image"
          );
          payload.product_card = {
            image: uploadedProductImage,
            title: productTitle,
            details: productDetails,
            link: productLink,
          };
        }

        if (showCallout) {
          payload.callout = {
            solution: calloutSolution,
            change: calloutChange,
            action: calloutAction,
            purpose: calloutPurpose,
          };
        }

        if (imageUrl) payload.image = imageUrl;
        if (videoUrl) payload.video = videoUrl;
        if (blogContentVideoUrl) payload.blogcontentvideo = blogContentVideoUrl;
        if (galleryUrls.length > 0) payload.content_images = galleryUrls;

        // 3. Send request
        if (isEditMode) {
          await axios.patch(
            `https://sosoiloji.onrender.com/api/posts/${slug}/`,
            payload
          );
        } else {
          await axios.post(
            "https://sosoiloji.onrender.com/api/posts/",
            payload
          );
        }

        toast.success(
          `Post ${isEditMode ? "updated" : "created"} successfully!`
        );
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        console.error(error);
        toast.error(`Submission failed. Please try again!`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = formik.values.platforms || [];
    if (currentPlatforms.includes(platform)) {
      formik.setFieldValue(
        "platforms",
        currentPlatforms.filter((p) => p !== platform)
      );
    } else {
      formik.setFieldValue("platforms", [...currentPlatforms, platform]);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!isEditMode) return;
      try {
        const res = await axios.get(
          `https://sosoiloji.onrender.com/api/posts/${slug}/`
          // `http://localhost:8000/api/posts/${slug}/`
        );
        const post = res.data;
        // For callout (optional chaining is safe here)
        if (post.callout) {
          setShowCallout(true);
          setCalloutSolution(post.callout.solution || "");
          setCalloutChange(post.callout.change || "");
          setCalloutAction(post.callout.action || "");
          setCalloutPurpose(post.callout.purpose || "");
        }

        // For product_card
        if (post.product_card) {
          setShowProductCard(true);
          setProductTitle(post.product_card.title || "");
          setProductDetails(post.product_card.details || "");
          setProductLink(post.product_card.link || "");
          // Product image is URL, not File, so we don’t set productImage directly.
          // Just use it when rendering the edit preview if needed
        }

        formik.setValues({
          title: post.title || "",
          author: post.author || "",
          category: post.category || "",
          subtag: post.subtag || "",
          body: post.body || "",
          quote: post.quote || "",
          platforms: post.platforms || [],
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

  return (
    <section className="bg">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit" : "Create"} Blog Post
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
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

            <div>
              <p className="font-medium mb-2">Platforms</p>
              {platformOptions.map((platform) => (
                <label key={platform} className="flex gap-2 items-center mb-2">
                  <input
                    type="checkbox"
                    value={platform}
                    checked={formik.values.platforms.includes(platform)}
                    onChange={() => handlePlatformToggle(platform)}
                  />
                  {platform}
                </label>
              ))}
            </div>

            <div>
              <p className="font-medium mb-2">Main Image</p>
              <FileDropInputWithPreview
                label="Upload Main Image"
                accept="image/*"
                multiple={false}
                onFilesChange={(files) => setMainImage(files[0] || null)}
              />
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
                      setSubTag(e.target.value === "Article");
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>

            {showVideo && (
              <div>
                <p className="font-medium mb-2">Upload Video</p>
                <FileDropInputWithPreview
                  label="Upload Video"
                  accept="video/*"
                  multiple={false}
                  onFilesChange={(files) => setVideoFile(files[0] || null)}
                />
              </div>
            )}

            {showSubTag && (
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
            )}

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
                  <FileDropInputWithPreview
                    label="Upload Image Gallery"
                    accept="image/*"
                    multiple={true}
                    onFilesChange={(files) => setGalleryFiles(files)}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showBlogContentVideo}
                  onChange={() =>
                    setShowBlogContentVideo(!showBlogContentVideo)
                  }
                />
                Add Blog Content Video
              </label>
              {showBlogContentVideo && (
                <div className="mt-2">
                  <FileDropInputWithPreview
                    label="Upload Video"
                    accept="video/*"
                    multiple={false}
                    onFilesChange={(files) =>
                      setBlogContentVideoFile(files[0] || null)
                    }
                  />
                </div>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showCallout}
                  onChange={() => setShowCallout(!showCallout)}
                />
                Add Callouts
              </label>
              {showCallout && (
                <div className="space-y-4 mt-4">
                  <input
                    type="text"
                    placeholder="💡 Solution"
                    value={calloutSolution}
                    onChange={(e) => setCalloutSolution(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="💪 Change"
                    value={calloutChange}
                    onChange={(e) => setCalloutChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="📍 Action"
                    value={calloutAction}
                    onChange={(e) => setCalloutAction(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="👍 Purpose"
                    value={calloutPurpose}
                    onChange={(e) => setCalloutPurpose(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showProductCard}
                  onChange={() => setShowProductCard(!showProductCard)}
                />
                Add Product Card
              </label>
              {showProductCard && (
                <div className="space-y-4 mt-4">
                  <FileDropInputWithPreview
                    label="Upload Product Image"
                    accept="image/*"
                    multiple={false}
                    onFilesChange={(files) => setProductImage(files[0] || null)}
                  />
                  <input
                    type="text"
                    placeholder="Product Title"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Product Details"
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  <input
                    type="url"
                    placeholder="Product Link"
                    value={productLink}
                    onChange={(e) => setProductLink(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="">
            <p className="font-medium mb-2">Post Body</p>
            <div className="border border-gray-700 rounded-md">
              {/* <JoditEditorComponent value={content} onChange={setContent} /> */}
              <TiptapEditor value={content} onChange={setContent} />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer mt-9 block py-2 px-6 rounded text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Submitting..."
                : isEditMode
                ? "Update Post"
                : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateEditPostPage;
