
// src/data/Types.ts

export interface CardItem {
  id: number;
  title: string;
  slug: string;
  author: string;
  body: string;
  description: string;
  category: string;
  tag?: string;            // Article, Wisdom, Video
  subTag?: string;         // Solution, Asia, Arabia, etc.
  subTagC?: string;        // Optional translated subtag or variation
  image: string;           // Main image
  video?: string;          // Optional primary video
  quote?: string;          // Optional quote if user added one
  blogContentVideo?: string; // Optional extra video at bottom of blog
  contentImages?: string[]; // Optional multiple image gallery
  buttonLabel: string;
  buttonLink: string;
  buttonBgColor: string;
  created_at: string;
  platforms? : string


    callout?: {
    solution?: string;
    change?: string;
    action?: string;
    purpose?: string;
  };

  product_card?: {
    image: string;
    title: string;
    details: string;
    link: string;
  };
}
  