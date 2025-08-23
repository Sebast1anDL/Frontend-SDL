import { Skeleton } from "../ui/skeleton";

type SkeletonSchemaProps = {
    grid: number;
}

const SkeletonSchema = ({ grid }: SkeletonSchemaProps) => {
    return (
        <>
            {Array.from({ length: grid }).map((_, index) => (
                <div key={index} className="pl-2 md:pl-4">
                    <div className="skeleton-item bg-white rounded-lg shadow-md overflow-hidden">
                        <Skeleton className="h-48 w-full mb-4" />
                        <div className="p-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SkeletonSchema;