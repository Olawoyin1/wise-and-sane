// import { useParams } from "react-router-dom";
// import { dataCard } from "../data/cardData"; // wherever your data lives
// import SingleCard from "../components/SingleCard";
// import Navbar from "../components/Navbar";
// import CategoryHeader from "./CategoryHeader";
// import Footer from "../components/Footer";

// const CategoryList = () => {
//   const { categoryName } = useParams<{ categoryName: string }>();
//   const filteredCards = dataCard.filter(
//     (item) => item.category === categoryName
//   );

//   return (
//     <div className="">
//       <Navbar />
//       {/* <h2 className="text-2xl font-bold mb-4">Category: {categoryName}</h2> */}

//       <div className="max-w-3xl mx-auto px-8 ">
//         <CategoryHeader
//           category={categoryName || "Unknown"}
//           count={filteredCards.length}
//           description={`Here you'll find articles focused on ${categoryName?.toLowerCase()}. 
//             These entries explore different ideas and real-world experiences surrounding this topic.`}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-8 md:px-12">
//         {filteredCards.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-20 md:space-y-0 place-items-center ">
//             {filteredCards.map((card) => (
//               <SingleCard key={card.id} item={card} />
//             ))}
//           </div>
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CategoryList;
