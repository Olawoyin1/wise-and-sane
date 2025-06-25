import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../api/Blog";
import { PageWrapper } from "../components/PageWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CardItem } from "../data/Types";
import BlogContentViewer from "./BlogContentViewer";

const Blog = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery<CardItem[]>({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    // staleTime: 1000 * 60 * 5,
    staleTime: 1.5 * 60 * 60 * 1000, // 1 hour 30 minutes in milliseconds

  });

  const blog = posts.find((post) => post.slug.toString() === slug);

  console.log(blog)

  if (isLoading) {
    return (
      <PageWrapper>
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          {/* <h1 className="text-3xl font-bold text-gray-600">Loading...</h1> */}
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  if (isError || !blog) {
    return (
      <PageWrapper>
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-red-500">Blog not found</h1>
          <p className="mt-4 text-gray-600">SLUG: <strong>{slug}</strong></p>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  // const transformedBody = parse(blog.body, {
  //   replace: (node) => {
  //     if (node instanceof Element && node.name === "img") {
  //       const src = node.attribs.src;
  //       const alt = node.attribs.alt || "blog image";
  //       return <InlineImageViewer src={src} alt={alt} />;
  //     }
  //   },
  // });

  return (
    <PageWrapper>
      <Navbar />
      <section className="relative z-10">
        

        <BlogContentViewer {...blog} />
      </section>
      <Footer />
    </PageWrapper>
  );
};

export default Blog;
