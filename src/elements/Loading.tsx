import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
    return (
        <div className="flex-column items-center space-x-4">
            <Skeleton className="bg-gray-200 h-12 w-62 mb-2" />
            <Skeleton className="bg-gray-200 h-12 w-62" />
        </div>
    )
}

export default Loading