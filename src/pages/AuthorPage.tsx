// import { useParams } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import SingleCard from "../components/SingleCard";
// import SkeletonCard from "../components/SkeletonCard";
// import { CardItem } from "../data/Types";
// import PageHeader from "../components/PageHeader";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const fetchPosts = async (): Promise<CardItem[]> => {
//   const res = await axios.get("https://sosoiloji.onrender.com/api/posts/");
//   return res.data;
// };

// const AuthorPage = () => {
//   const { author } = useParams<{ author: string }>();
//   const queryClient = useQueryClient();

//   // Try to get posts from cache
//   const cachedPosts = queryClient.getQueryData<CardItem[]>(["all-posts"]);

//   // Fallback to fetch if no cache
//   const {
//     data: fetchedPosts,
//     isLoading,
//     isFetching,
//   } = useQuery<CardItem[]>({
//     queryKey: ["all-posts"],
//     queryFn: fetchPosts,
//     enabled: !cachedPosts,
//     //   staleTime: 5 * 60 * 1000,
//     staleTime: 1.5 * 60 * 60 * 1000, // 1 hour 30 minutes in milliseconds
//   });

//   const getPlainText = (html: string): string => {
//     const div = document.createElement("div");
//     div.innerHTML = html;
//     return div.textContent || div.innerText || "";
//   };

//   const posts: CardItem[] | undefined = cachedPosts ?? fetchedPosts;

//   const filteredPosts =
//     posts?.filter(
//       (post) => post.author?.toLowerCase() === author?.toLowerCase()
//     ) ?? [];

//   if (isLoading || isFetching) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 md:px-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!posts || filteredPosts.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No posts found by {author}.
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <Navbar />

//       {/* <h2 className="text-2xl m-4 font-bold mb-6">Posts by {author}</h2> */}

//       <div className="max-w-7xl mx-auto px-8 md:px-12">
//         <PageHeader
//           title={author || "Author"}
//           count={filteredPosts.length}
//           type="author"
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
//           {filteredPosts.map((post) => (
//             <SingleCard
//               key={post.id}
//               item={{
//                 ...post,
//                 //   description: post.body.slice(0, 150) + "...",
//                 description: getPlainText(post.body).slice(0, 150) + "...",

//                 buttonLabel: "Read More",
//                 buttonLink: `/post/${post.id}`,
//                 buttonBgColor: "#E8D4C3",
//                 subTag: post.tag, // ✅ make sure this matches your backend field
//                 subTagC: post.subTag,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AuthorPage;




import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SingleCard from "../components/SingleCard";
import SkeletonCard from "../components/SkeletonCard";
import { CardItem } from "../data/Types";
import PageHeader from "../components/PageHeader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fetchBlogPosts = async (): Promise<CardItem[]> => {
  const res = await axios.get("https://sosoiloji.onrender.com/api/posts/");
  return res.data;
};

const AuthorPage = () => {
  const { author } = useParams<{ author: string }>();

  const {
    data: posts = [],
    isLoading,
    isFetching,
  } = useQuery<CardItem[]>({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    staleTime: 1.5 * 60 * 60 * 1000, // 1h 30min
  });

  const getPlainText = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const filteredPosts = posts?.filter(
    (post) => post.author?.toLowerCase() === author?.toLowerCase()
  );

  if (isLoading || isFetching) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No posts found by {author}.
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <PageHeader
          title={author || "Author"}
          count={filteredPosts.length}
          type="author"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 place-items-center">
          {filteredPosts.map((post) => (
            <SingleCard
              key={post.id}
              item={{
                ...post,
                description: getPlainText(post.body).slice(0, 150) + "...",
                buttonLabel: "Read More",
                buttonLink: `/post/${post.id}`,
                buttonBgColor: "#E8D4C3",
                subTag: post.tag,
                subTagC: post.subTag,
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthorPage;
