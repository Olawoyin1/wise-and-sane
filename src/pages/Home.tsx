import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import { PageWrapper } from "../components/PageWrapper";
import BlogList from "./BlogList";

const Home = () => {
  return (
    <PageWrapper disableEntryAnimation>

      {/* Content section */}
      <section className="bg z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="mb-20">
            <ImageSlider />
          </div>
        </div>
        <div className="">
          <BlogList />
        </div>
        <Footer />
      </section>

    </PageWrapper>
  );
};

export default Home;
