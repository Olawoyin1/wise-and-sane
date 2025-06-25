
import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Twitter 'X' icon
import NormalButton from "../components/NormalButton";

const Share = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const icons = [
    {
      icon: FaFacebookF,
      url: "#",
      bg: "#1877F2", // Facebook Blue
    },
    {
      icon: FaXTwitter,
      url: "#",
      bg: "#000000", // X/Twitter Black
    },
    {
      icon: FaLinkedinIn,
      url: "#",
      bg: "#0077B5", // LinkedIn Blue
    },
    {
      icon: FaTiktok,
      url: "#",
      bg: "#010101", // TikTok Black
    },
  ];

  return (
    <div className="max-w-full md:max-w-xl mx-auto mt-12 ">
      {/* Share header and icons */}
      <div className="flex items-center justify-center mb-4 gap-4">
        <h2 className="text-lg font-semibold">Share Article:</h2>
        <div className="flex pf items-center gap-2">
          {icons.map(({ icon: Icon, url, bg }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full shadow-sm hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: bg, color: "#fff" }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Copy Link Box */}
      {/* <div className="bg-white rounded-full pl-3 sm:pl-7  sm:p-2 pr-3 flex items-center justify-between shadow-sm">
        <span className="text-xs sm:text-sm text-gray-700 pf truncate">{shareUrl}</span>
        <button
          onClick={handleCopy}
          className="ml-4  font-semibold rounded-md transition"
        >
          <NormalButton
            bgColor="#F7C6D0"
            color="#000"
            label={copied ? "Copied!" : "Copy Link"}
          />
        </button>
      </div> */}

      <div className="bg-white rounded-full px-3 sm:px-5 py-2 flex items-center gap-4 shadow-sm flex-wrap sm:flex-nowrap">
  <span className="text-xs sm:text-sm text-gray-700 flex-1 min-w-0 truncate">{shareUrl}</span>
  <div className="shrink-0" onClick={handleCopy}>
    <NormalButton
      bgColor="#F7C6D0"
      color="#000"
      label={copied ? "Copied!" : "Copy Link"}
    />
  </div>
</div>
    </div>
  );
};

export default Share;
