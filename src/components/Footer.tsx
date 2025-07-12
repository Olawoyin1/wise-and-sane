import '../styles/footer.css'
import LetsConnect from './LetsConnect';
import Tags from './Tag2';
import Subscribe from './Subscribe';
// import { section } from 'framer-motion/client';

const Footer = () => {
  return (
    <section className='py-20'>
      <div className="max-w-7xl mx-auto px-8 md:px-12">


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-14  sm:space-y-20 md:space-y-0 md:gap-20 ">
    {/* ===========widget one========== */}
      <div className=" ">
       <Tags/>
      </div>

      {/* widget two---- */}
      <div className="">
        <LetsConnect/>
      </div>

  
    {/* =============widget three============ */}
      <div className="">
        <Subscribe/>
      </div>
    </div>
      </div>
    </section>
  );
};

export default Footer;
