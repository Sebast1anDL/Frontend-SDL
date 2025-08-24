import { CategoryType } from "./category";
import { ProductType } from "./products";
import { BrandType} from "./brand";

export type CategoryWithProducts = CategoryType & {
  products: ProductType[];
  totalProducts: number;
  brands: Array<{
    id: number;
    brandName: string;
    slug: string;
  }>;
};