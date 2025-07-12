// import { FaFacebookF } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import CircularCard from "../components/CircularCard";

// const Contributors = () => {
//   const contributors = [
//     {
//       name: "Olawoyin Gbolahan",
//       imageUrl:
//         "https://res.cloudinary.com/dunid4t4g/image/upload/v1751881220/ghcr8a6eesmyacnqnrkn.webp",
//       subTags: ["Sosioloji", "Contributor"],
//       socials: [
//         {
//           icon: <FaXTwitter size={22} className="text-blu-500" />,
//           onClick: () => console.log("Twitter - Gbolahan"),
//         },
//         {
//           icon: <FaFacebookF size={22} className="text-pik-500" />,
//           onClick: () => console.log("Instagram - Gbolahan"),
//         },
//       ],
//     },
//     {
//       name: "Jonathan Doe",
//       imageUrl:
//         "https://res.cloudinary.com/dunid4t4g/image/upload/v1751875303/uastl3o4bafvs7izkuwy.webp",
//       subTags: ["Editor"],
//       socials: [
//         {
//           icon: <FaXTwitter size={22} className="text-bue-500" />,
//           onClick: () => console.log("Twitter - Gbolahan"),
//         },
//         {
//           icon: <FaFacebookF size={22} className="textpink-500" />,
//           onClick: () => console.log("Instagram - Gbolahan"),
//         },
//       ],
//     },
//     {
//       name: "Sosioloji",
//       imageUrl:
//         "https://res.cloudinary.com/dunid4t4g/image/upload/v1751583678/ilaqalb7z6ngg2a6diwh.webp",
//       subTags: ["Movement", "Activist"],
//       socials: [
//         {
//           icon: <FaXTwitter size={22} className="text-lue-500" />,
//           onClick: () => console.log("Twitter - Gbolahan"),
//         },
//         {
//           icon: <FaFacebookF size={22} className="text-ink-500" />,
//           onClick: () => console.log("Instagram - Gbolahan"),
//         },
//       ],
//     },
//     {
//       name: "WiseAndSane",
//       imageUrl:
//         "https://res.cloudinary.com/dunid4t4g/image/upload/v1751583500/n9o8a0h4wpca7mjtqmjk.webp",
//       subTags: ["Wise & Sane", "Member"],
//       socials: [
//         {
//           icon: <FaXTwitter size={22} className="text-bue-500" />,
//           onClick: () => console.log("Twitter - Gbolahan"),
//         },
//         {
//           icon: <FaFacebookF size={22} className="text-pik-500" />,
//           onClick: () => console.log("Instagram - Gbolahan"),
//         },
//       ],
//     },
//   ];

//   return (
//     <section className="">
//       <div className=" py-10 min-h-screen  flex items-start justify-center flex-col px-8 md:px-12">

//        <div className=" py-8">
//   <h1 className="text-3xl font-bold text-gray-800 mb-4">Heading</h1>
//   <p className="text-gray-600 leading-relaxed mb-4">
//     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, ea doloremque! Earum facere et fugit illo natus a facilis tenetur!
//   </p>
//   <p className="text-gray-600 leading-relaxed">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint obcaecati quibusdam in quisquam ipsa quasi at, officia quidem expedita placeat voluptatum nemo, eaque dignissimos temporibus dolor a sed nostrum explicabo.
//   </p>
// </div>


//         <div>
//           <h1 className="text-2xl md:text-3xl font-extrabold mb-10">
//             Contributing Authors
//           </h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 md:gap-20 place-items-center">
//             {contributors.map((person, index) => (
//               <CircularCard
//                 key={index}
//                 imageUrl={person.imageUrl}
//                 name={person.name}
//                 socials={person.socials}
//               />
//             ))}
//           </div>
//         </div>






//       </div>
//     </section>
//   );
// };

// export default Contributors;

import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CircularCard from "../components/CircularCard";
import ContributorModal from "./ContributorModal";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

import FancyLinkButton from "../components/Button";

interface Social {
  icon: ReactNode;
  onClick: () => void;
}

export interface Contributor {
  name: string;
  imageUrl: string;
  socials?: Social[];
  about: string;
}

const Contributors = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

 const contributors: Contributor[] = [
  {
    name: "Olawoyin Gbolahan",
    imageUrl:
      "https://res.cloudinary.com/dunid4t4g/image/upload/v1751881220/ghcr8a6eesmyacnqnrkn.webp",
    about:
      "Olawoyin is a sociology enthusiast and dedicated writer with a passion for exploring social structures, inequalities, and collective behavior. With a strong academic background and practical engagement in community research, he brings both insight and clarity to complex social topics. Through his work with Sosioloji, he advocates for education, youth empowerment, and transformative dialogue across generations.",
    socials: [
      {
        icon: <FaXTwitter size={22} className="text-blue-500" />,
        onClick: () => console.log("Twitter - Gbolahan"),
      },
      {
        icon: <FaFacebookF size={22} className="text-pink-500" />,
        onClick: () => console.log("Facebook - Gbolahan"),
      },
    ],
  },
  {
    name: "Jonathan Doe",
    imageUrl:
      "https://res.cloudinary.com/dunid4t4g/image/upload/v1751875303/uastl3o4bafvs7izkuwy.webp",
    about:
      "Jonathan is a seasoned editor with over a decade of experience in publishing, academic editing, and digital media. Known for his meticulous attention to detail and narrative shaping, he collaborates closely with contributors to refine ideas and elevate the clarity of every piece. His work ensures that each voice on the platform resonates with authenticity and purpose.",
    socials: [
      {
        icon: <FaXTwitter size={22} className="text-blue-500" />,
        onClick: () => console.log("Twitter - Jonathan"),
      },
      {
        icon: <FaFacebookF size={22} className="text-pink-500" />,
        onClick: () => console.log("Facebook - Jonathan"),
      },
    ],
  },
  {
    name: "Sosioloji",
    imageUrl:
      "https://res.cloudinary.com/dunid4t4g/image/upload/v1751583678/ilaqalb7z6ngg2a6diwh.webp",
    about:
      "Sosioloji is not just a movement but a platform that uplifts grassroots voices and challenges social norms through critical discourse. It brings together young thinkers, activists, and scholars to question existing power structures and envision new ways of being. With roots in activism and public sociology, Sosioloji drives conversations around justice, equity, and liberation.",
    socials: [
      {
        icon: <FaXTwitter size={22} className="text-blue-500" />,
        onClick: () => console.log("Twitter - Sosioloji"),
      },
      {
        icon: <FaFacebookF size={22} className="text-pink-500" />,
        onClick: () => console.log("Facebook - Sosioloji"),
      },
    ],
  },
  {
    name: "WiseAndSane",
    imageUrl:
      "https://res.cloudinary.com/dunid4t4g/image/upload/v1751583500/n9o8a0h4wpca7mjtqmjk.webp",
    about:
      "WiseAndSane is a multidisciplinary thinker focused on blending ancient wisdom with modern insight. Through writing and mentorship, WiseAndSane delves into themes of self-mastery, mental clarity, and collective well-being. Their contributions offer a thoughtful lens on how we can build more conscious, resilient, and harmonious societies—one conversation at a time.",
    socials: [
      {
        icon: <FaXTwitter size={22} className="text-blue-500" />,
        onClick: () => console.log("Twitter - WiseAndSane"),
      },
      {
        icon: <FaFacebookF size={22} className="text-pink-500" />,
        onClick: () => console.log("Facebook - WiseAndSane"),
      },
    ],
  },
];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ firstName, lastName, email });
    // Add your API submission logic here
  };

  return (
    <section className="py-10 px-6 md:px-12">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-extrabold mb-4 text-gray-800">Meet Our Contributors</h1>
        <p className="text-gray-600 leading-relaxed mb-1">
          Our contributors are passionate individuals committed to knowledge sharing, research, and community empowerment.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Learn more about each contributor below or fill the form to join our growing community of writers and thought leaders.
        </p>
      </div>

      {/* Contributors Grid */}
      <div className="mt-8 mb-16">
        <h2 className="text-2xl font-extrabold mb-8 text-gray-800">Contributing Authors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 md:gap-20 place-items-center">
          {contributors.map((person, index) => (
            <div key={index} onClick={() => setSelectedContributor(person)} className="cursor-pointer">
              <CircularCard imageUrl={person.imageUrl} name={person.name} socials={person.socials} />
            </div>
          ))}
        </div>
      </div>

      {/* Join Form */}
      <div className="w-full ">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Want to be a Contributor?</h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end w-full">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                className="mt-1 w-full px-[7px] py-3 border border-gray-400 rounded-md focus:outline-none text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter Your Firstname"

              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="mt-1 w-full px-[7px] py-3 border border-gray-400 rounded-md focus:outline-none text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter Your Lastname"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-[7px] py-3 border border-gray-400 rounded-md focus:outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your Email Address"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full"
              >
                <FancyLinkButton
                block
                  to="#"
                  label="I want to be a contributor"
                  />
                
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal */}
      <AnimatePresence>
  {selectedContributor && (
    <ContributorModal
      contributor={selectedContributor}
      onClose={() => setSelectedContributor(null)}
    />
  )}
</AnimatePresence>
    </section>
  );
};

export default Contributors;
