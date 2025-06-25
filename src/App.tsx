// src/App.tsx
import { Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetails";
import './App.css'
import TagPage from "./pages/TagPage";
import AuthorPage from "./pages/AuthorPage";
import Home from "./pages/Home";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NotFound from "./utils/NotFound";
// import CreateBlogPostForm from "./pages/CreateBlog";
// import Testingg from "./pages/CreateBlogForm";
import Dashboard from "./admin/Dashboard";
import CreateEditPostPage from "./pages/CreateEditPostPage";
// import BlogDetail from "./pages/BlogDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:slug" element={<BlogDetail />} />
      <Route path="/tag/:tag" element={<TagPage />} />
      <Route path="/author/:author" element={<AuthorPage />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="create" element={<Testingg />} /> */}


      {/* Dashboard List */}
      <Route path="dashboard" element={<Dashboard />} />

        {/* Create Post */}
        <Route path="/create" element={<CreateEditPostPage />} />

        {/* Edit Post (by ID) */}
        <Route path="/edit/:slug" element={<CreateEditPostPage />} />

        

    </Routes>
  );
};

export default App;
