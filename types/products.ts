// types/products.ts
import { BrandType } from "./brand";
import { CategoryType } from "./category";

export type ProductType = {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  asusBanner: boolean;
  samsungBanner: boolean;
  iphoneBanner: boolean;
  lenovoBanner: boolean;
  nextRelease: boolean;
  featuredXiaomi: boolean;
  
  images: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }[];
  brand?: BrandType | null;      // One-to-One relationship
  category?: CategoryType | null; // One-to-One relationship
};