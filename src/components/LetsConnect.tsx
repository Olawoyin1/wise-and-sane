
// import "../styles/footer.css";
// // import CustomButton from "../../containers/button/CustomButton";
// import { FaStar } from "react-icons/fa";

// // Import specific icons
// import {
//   FaFacebookF,
//   FaTwitter,
// //   FaWhatsapp,
//   FaInstagram,
//   FaRss,
// } from "react-icons/fa";
// import FancyLinkButton from "./Button";

// const LetsConnect = () => {
  // const socialLinks = [
  //   {
  //     name: "Facebook",
  //     link: "https://web.facebook.com/ideaiscapital?_rdc=1&_rdr#",
  //     icon: <FaFacebookF />,
  //     color: "#3b5998",
  //   },
  //   {
  //     name: "Twitter",
  //     link: "https://x.com/Ideaiscapital",
  //     icon: <FaTwitter />,
  //     color: "#1DA1F2",
  //   },
  //   // {
  //   //   name: 'WhatsApp',
  //   //   link: 'https://wa.me/5492996155777',
  //   //   icon: <FaWhatsapp />,
  //   //   color: '#25D366',
  //   // },
  //   {
  //     name: "Instagram",
  //     link: "https://www.instagram.com/ideaiscapital/",
  //     icon: <FaInstagram />,
  //     color: "#E1306C",
  //   },
  //   {
  //     name: 'RSS',
  //     link: 'https://ghost.estudiopatagon.com/edger/rss',
  //     icon: <FaRss />,
  //     color: '#FFA500',
  //   },
  // ];

//   return (
//     <div className="connect-widget ">
//       <h3 className="connect-title flex items-center gap-3">
//         <span>Let's connect</span>{" "}
//         <span className="dot">
//           {" "}
//           <FaStar size={14} />
//         </span>
//       </h3>
//       <div className="lets-connect-wrapper  max-w-[500px]">
//         <div className="absolute top-[-20px] left-5  bg-[#FFF0D3] shadow-md p-4 rounded-[15px] space-x-4  flex-wrap flex  items-center  max-w-[400px] h-[270px] w-full">
//           {socialLinks.map((social, index) => (
//             <FancyLinkButton
//               key={index}
//               label={social.name}
//               to={social.link}
//               bgColor={social.color}
//               block
//               textColor="white" 
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LetsConnect;




import React from 'react';
import FancyLinkButton from './Button';

// interface TagItem {
//   label: string;
//   link: string;
//   bgColor: string;
// }

  const socialLinks = [
    {
      name: "Tiktok",
      link: "https://web.facebook.com/ideaiscapital?_rdc=1&_rdr#",
      // icon: <FaFacebookF />,
      color: "#3b5998",
    },
    {
      name: "Instagram",
      link: "https://instagram.com/Ideaiscapital",
      // icon: <FaTwitter />,
      color: "#1DA1F2",
    },
    // {
    //   name: 'WhatsApp',
    //   link: 'https://wa.me/5492996155777',
    //   icon: <FaWhatsapp />,
    //   color: '#25D366',
    // },
    {
      name: "X",
      link: "https://x.com/ideaiscapital/",
      // icon: <FaInstagram />,
      color: "#E1306C",
    },
    {
      name: 'Rednote',
      link: 'https://ghost.estudiopatagon.com/edger/rss',
      // icon: <FaRss />,
      color: '#FFA500',
    },
  ];

const TagCloud: React.FC = () => {
  return (
  

    <div className="relative ml-9 md:ml-0">
  {/* Rotated Header */}
  <h3 className="absolute left-[-89px] md:left-[-100px] top-1/2 transform rotate-270 text-sm md:text-xl font-bold text-center writing-vertical text-[#1E1B1B] font-playfair">
    Let's connect 
<span className="text-brown-500 inline-block ml-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        width="14"
        height="14"
        fill="currentColor"
      >
        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
      </svg>
    </span>
  </h3>

  {/* Main Tag Container */}
  <div className="relative w-full bg-[#FFF0D3]  flex align-center justify-center rounded-[15px] shadow-md p-4 md:h-[270px] h-auto" id="tag-box">
    <div className="flex flex-col justify-center items-center w-full">
      {socialLinks.map((link) => (
        <FancyLinkButton
          key={link.name}
          label={link.name}
          to={link.link}
          bgColor={link.color}
          block
          textColor='white'
        />
      ))}
    </div>
  </div>

  {/* Decorative Span below bottom-right, shifted left */}
  <span className="absolute  border border-gray-700 rounded-[15px] opacity-50 z-[-1] 
    bottom-[-14px] right-4  
    w-full h-full" />
</div>

  );
};

export default TagCloud;
