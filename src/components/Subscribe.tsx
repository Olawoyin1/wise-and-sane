// // import  { useState } from 'react';
// import "../styles/footer.css";
// import FancyLinkButton from "./Button";
// // import CustomButton from '../../containers/button/CustomButton';

// const Subscribe = () => {
//   //   const [formData, setFormData] = useState({ name: '', email: '' });
//   //   const [loading, setLoading] = useState(false);
//   //   const [error, setError] = useState('');
//   //   const [success, setSuccess] = useState(false);

//   //   const handleChange = (e) => {
//   //     setFormData(prev => ({
//   //       ...prev,
//   //       [e.target.name]: e.target.value,
//   //     }));
//   //   };

//   //   const handleSubmit = async (e) => {
//   //     e.preventDefault();
//   //     setLoading(true);
//   //     setError('');
//   //     setSuccess(false);

//   //     try {
//   //       await new Promise(resolve => setTimeout(resolve, 1500));

//   //       // Dummy validation example
//   //       if (!formData.email.includes('@')) {
//   //         throw new Error('Invalid email address');
//   //       }

//   //       setSuccess(true);
//   //       setFormData({ name: '', email: '' }); // Clear form
//   //     } catch (err) {
//   //       setError(err.message || 'Something went wrong. Try again.');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   return (
//     <div className="sub-container max-w-[500px]">
//       <div className="subscribe-wrapper">
        // <svg
        //   className="epcl-plane"
        //   width="100"
        //   height="106"
        //   viewBox="0 0 112 116"
        //   fill="none"
        //   xmlns="http://www.w3.org/2000/svg"
        // >
        //   <path
        //     d="M112 3L5.75 62.375L43.25 68.625L52.625 115.5L65.125 78L90.125 96.75L112 3Z"
        //     fill="#FEBDD0"
        //   />
        //   <path
        //     d="M58.9007 75.0919L46.996 110.806L37.9903 65.7769L37.9226 65.4385L37.5822 65.3818L1.4882 59.3661L105.506 1.2386L84.0621 93.1404L59.675 74.85L59.12 74.4338L58.9007 75.0919Z"
        //     fill="#FEBDD0"
        //     stroke="black"
        //   />
        //   <path
        //     d="M58.9007 75.0919L46.996 110.806L38.0442 66.0467L103.717 3.35861L58.951 74.985L58.9195 75.0354L58.9007 75.0919Z"
        //     fill="#FF84A8"
        //     stroke="black"
        //   />
        // </svg>
//         <div className="absolute top-[-20px] left-5  bg-[#FFF0D3] shadow-md p-4 rounded-[15px] space-x-4 flex justify-center  flex-wrap   items-center  max-w-[400px] h-[270px] w-full">
//           <h5 className="text-xl text-center font-bold">Subscribe to our Newsletter</h5>
         

        //   <form className="subscribe-form mt-3" data-members-form="subscribe">
        //     <div className="form-group">
        //       <input
        //         type="text"
        //         name="name" 
        //         className="inputbox"
        //         required
        //         placeholder="Enter your name"
        //         // value={formData.name}
        //         // onChange={handleChange}
        //       />
        //       <input
        //         type="email"
        //         name="email"
        //         className="inputbox"
        //         required
        //         placeholder="Enter your email"
        //         // value={formData.email}
        //         // onChange={handleChange}
        //       />

        //       <FancyLinkButton label="Submit" textColor="black" bgColor='#FEBDD0'  block to="/"  />
        //       {/* {loading && <span className="loader"></span>} */}
        //     </div>

        //     {/* {error && (
        //   <p className="error-detail" data-members-error="">
        //     {error}
        //   </p>
        // )} */}
        //     {/* {success && (
        //   <p className="success-message">
        //     Subscription was sent successfully, check your email <i className="fa fa-envelope-o"></i>
        //   </p>
        // )} */}
        //   </form>

//           <div className="clear"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subscribe;





import React from "react";
import FancyLinkButton from "./Button";



const TagCloud: React.FC = () => {
  return (
    <div className="relative ml-9 md:ml-0">
      {/* Rotated Header */}
      <h3 className="absolute left-[-84px] sm:left-[-100px] top-1/2 transform rotate-270 text-sm md:text-xl font-bold text-center writing-vertical text-[#1E1B1B] font-playfair">
        Get Insight


        <span className="text-blue-500 inline-block ml-1">
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
      <div
        className="relative w-full bg-[#FFF0D3] flex items-center justify-center rounded-[15px] shadow-md p-4 md:h-[270px] h-auto"
        id="tag-box"
      >


        <div className="flex flex-wrap space-x-3 items-center w-full">
          

          <form className="subscribe-form mt-3" data-members-form="subscribe">
            <h5 className="text-xl text-center mb-3 font-bold">Join The Movement</h5>
            <div className="form-group">
              <input
                type="text"
                name="name" 
                className="w-full mb-2 px-7 py-3 pf text-gray-700 bg-white border border-gray-300 rounded-3xl text-sm outline-none focus:ring-0 focus:ring-pink-300 transition"
                required
                placeholder="Enter your name"
                // value={formData.name}
                // onChange={handleChange}
              />
              <input
                type="email"
                name="email"className="w-full mb- px-7 py-3 pf text-gray-700 bg-white border border-gray-300 rounded-3xl text-sm outline-none focus:ring-0 focus:ring-pink-300 transition"
                required
                placeholder="Enter your email"
                // value={formData.email}
                // onChange={handleChange}
              />

              <FancyLinkButton label="Submit" textColor="black" bgColor='#FEBDD0'  block to="/"  />
            </div>
          </form>



        </div>
      </div>

      {/* Decorative Span below bottom-right, shifted left */}
      <span
        className="absolute border border-gray-700 rounded-[15px] opacity-50 z-[-1] 
    bottom-[-14px] right-4  
    w-full h-full"
      />
    </div>
  );
};

export default TagCloud;
