// DashboardPostList.tsx (Integrated into DashboardPage)
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { CardItem } from "../data/Types";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { PageWrapper } from "../components/PageWrapper";
import { toast } from "sonner";

const fetchPosts = async () => {
  const res = await axios.get("https://sosoiloji.onrender.com/api/posts/");
  return res.data;
};

const deletePost = async (slug: string) => {
  await axios.delete(`https://sosoiloji.onrender.com/api/posts/${slug}/`);
};

const DashboardPostList = () => {
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts = [] } = useQuery<CardItem[]>({
    queryKey: ["all-posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 90,
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesPlatform = platformFilter
        ? post.platforms?.includes(platformFilter)
        : true;
      const matchesSearch = searchTerm
        ? post.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesAuthor = authorFilter
        ? post.author.toLowerCase() === authorFilter.toLowerCase()
        : true;
      const matchesCategory = categoryFilter
        ? post.category.toLowerCase() === categoryFilter.toLowerCase()
        : true;
      return (
        matchesPlatform && matchesSearch && matchesAuthor && matchesCategory
      );
    });
  }, [posts, platformFilter, searchTerm, authorFilter, categoryFilter]);

  const handleDelete = async () => {
    if (!selectedSlug) return;
    setDeleting(selectedSlug);
    try {
      await deletePost(selectedSlug);
      toast.success("Post deleted successfully");

      // instantly remove from cache
      queryClient.setQueryData<CardItem[]>(["all-posts"], (old) =>
        old ? old.filter((post) => post.slug !== selectedSlug) : []
      );
    } catch (err) {
      toast.error("Failed to delete post");
      console.error(err);
    } finally {
      setDeleting(null);
      setSelectedSlug(null);
      setShowModal(false);
    }
  };

  const handleClearFilters = () => {
    setPlatformFilter("");
    setAuthorFilter("");
    setCategoryFilter("");
    setSearchTerm("");
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const videoPosts = posts.filter((post) => post.category === "Video");
  const quotePosts = posts.filter((post) => post.category === "Quotes");
  const uniqueAuthors = Array.from(new Set(posts.map((post) => post.author)));
  const uniqueCategories = Array.from(
    new Set(posts.map((post) => post.category))
  );

  const summary = [
    { label: "Total Posts", value: posts.length },
    { label: "Video Posts", value: videoPosts.length },
    { label: "Quote Posts", value: quotePosts.length },
    { label: "Authors", value: uniqueAuthors.length },
  ];

  return (
    <PageWrapper>
      <section className="bg">
        <div className="p-8  max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summary.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
              >
                <p className="text-gray-600 text-sm mb-1">{item.label}</p>
                <p className="text-3xl font-bold text-black">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <Link
              to="/create"
              className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
            >
              ➕ Create New Post
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 max-w-[400px] rounded"
            />

            <select
              className="border px-4 py-2 rounded"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="">All Platforms</option>
              <option value="sosioloji">Sosioloji</option>
              <option value="wiseandsane">WiseAndSane</option>
            </select>

            <select
              className="border px-4 py-2 rounded"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
            >
              <option value="">All Authors</option>
              {uniqueAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>

            <select
              className="border px-4 py-2 rounded"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Tags</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* ✅ Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-black text-white hover:bg-gray-300 rounded text-sm"
            >
              Clear All Filters
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">All Blog Posts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border-b">Title</th>
                  <th className="text-left p-2 border-b hidden sm:table-cell">
                    Author
                  </th>
                  <th className="text-left p-2 border-b hidden md:table-cell">
                    Tag
                  </th>
                  <th className="text-left p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No posts found matching your filters or search.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 max-w-xs truncate">{post.title}</td>
                      <td className="p-2 hidden sm:table-cell">
                        {post.author}
                      </td>
                      <td className="p-2 hidden md:table-cell">
                        {post.category}
                      </td>
                      <td className="p-2 flex gap-4 items-center text-sm">
                        <Link
                          to={`/edit/${post.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedSlug(post.slug);
                            setShowModal(true);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <IoTrashOutline size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting !== null}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default DashboardPostList;
