// src/api/blog.ts
import { CardItem } from "../data/Types";

export const fetchBlogPosts = async (): Promise<CardItem[]> => {
  // const res = await fetch("http://localhost:8000/api/posts/");
  const res = await fetch("https://sosoiloji.onrender.com/api/posts/?platform=wiseandsane");
  const data = await res.json();

  const cleanText = (html: string): string => {
    const tempEl = document.createElement("div");
    tempEl.innerHTML = html;
    return tempEl.textContent?.replace(/\s+/g, " ").trim() || "";
  };

  const CATEGORY_COLORS: Record<string, string> = {
    Inspiration: "#D5AAFF",
    Wisdom: "#f9f9f0",
    Survey: "#FFD682",
    Article: "#BFDDF2",
    Video: "#B8F2E6",
  };

  return data.map((post: any) => {
    const color = CATEGORY_COLORS[post.category] || "#FFE6B4";
    const plainText = cleanText(post.body).slice(0, 180) + "...";

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      author: post.author,
      body: post.body,
      description: plainText,
      category: post.category,
      tag: post.tag,
      subtag: post.subtag,
      subTagC: post.subtag,
      image: post.image || "",
      video: post.video,
      contentImages: post.content_images || [],
      buttonLabel: "Read More",
      buttonLink: `/post/${post.slug}`,
      buttonBgColor: color,
      created_at: post.created_at,
      quote: post.quote,
      callout: post.callout,
      product_card: post.product_card,
      // content_images : post.content_images
    };
  });
};
