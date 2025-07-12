import React from "react";

const callouts = [
  {
    emoji: "💡",
    text: "Sometimes you might want to put your site behind closed doors If you've got a publication that you don't want the world to see yet because it's not ready to launch, you can hide your Ghost site behind a simple shared pass-phrase",
    bg: "bg-[#E4F5FC]",
  },
  {
    emoji: "💪",
    text: "We've crammed the most important information to help you get started with Ghost into this one post.",
    bg: "bg-[#FDF3E0]",
  },
  {
    emoji: "✔️",
    text: "To continue reading this article, upgrade your account to get full access.",
    bg: "bg-[#E6F6E8]",
  },
  {
    emoji: "👍",
    text: "We've crammed the most important information to help you get started with Ghost into this one post.",
    bg: "bg-[#FCEBF6]",
  },
];

const Callout: React.FC = () => {
  return (
    <div className="grid  gap-4 mt-6">
      {callouts.map((item, index) => (
        <div
          key={index}
          className={`${item.bg} bf  p-4 rounded-lg border border-gray-300 flex items-start gap-3`}
        >
          <span className="text-xl">{item.emoji}</span>
          <p className="text-gray-700 text-xs leading-5 md:text-sm md:leading-7 ">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Callout;
