import { Skeleton } from "@nextui-org/react";

export default function CommentListLoading() {
    return (
        <div className="m-4">   
            <div className="my-2">
                <Skeleton className="h-8 w-48"/>    
            </div>
            <div className="flex flex-col gap-4">
                <div className="p-4 border rounded">
                    <Skeleton className="h-10 w-32 rounded"/>
                </div>
                <div className="p-4 border rounded ">
                    <Skeleton className="h-10 w-32 rounded"/>
                </div>
                <div className="p-4 border rounded">
                    <Skeleton className="h-10 w-32 rounded"/>
                </div>
            </div>
        </div>
    )
}