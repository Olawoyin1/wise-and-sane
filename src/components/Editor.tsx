import React from "react";

interface EditorProps {
  authorName: string;
  about: string;
  imageUrl: string;
}

const Editor: React.FC<EditorProps> = ({ authorName, about, imageUrl }) => {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white p-6 rounded-xl shadow-md border border-gray-200">
      {/* Left: Author Image */}
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={authorName}
          className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow"
        />
      </div>

      {/* Right: Author Info (spanning 2 columns on larger screens) */}
      <div className="md:col-span-2 space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">{authorName}</h2>
        <p className="text-gray-700 text-sm">{about}</p>
      </div>
    </div>
  );
};

export default Editor;
