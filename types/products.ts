export type ProductType = {
  id: number;
  attributes: {
    productName: string;
    price: number;
    description: string;
    isFeatured: boolean;
    active: boolean;
    slug: string;
    images: {
      data: {
        id: number,
        attributes: {
            url: string;

         }
    };
      
    }[];

  };

category: {
    data: { 
        attributes: {
            categoryName: string;
            slug: string;

        }   