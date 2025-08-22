"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";

const FeaturedProducts = () => {
    const { result, loading} = useGetFeaturedProducts();
    return ( 
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
        </div>
     );
}
 
export default FeaturedProducts;