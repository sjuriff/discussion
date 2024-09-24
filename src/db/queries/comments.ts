import type { Comment } from "prisma/prisma-client";
import { cache } from "react";
import { db } from "@/db";


export type CommentWithAuthor = Comment & {
    user: {name: string | null, image: string | null}
}

//CACHE MEMOIZATION
/*
    Its going to look at the function(fetchCommentsByPostId) we are calling from different compnents.
    Lets say we are calling fetcghCommentsByPostId(1) in two components and fecthCommentsByPostId(2) in
    one component. The cahing system is going to take  a look at these function, and remove the duplicates
    that it sees. In this case it would be one of the fetcghCommentsByPostId(1), since the same
    function with the same arguments is called twice. Its then gonna do the query from fecthCommentsByPostId(1)
    and fetchCommentsByPostId(2) one time each, and send the data back to the components that needs them. The 
    query in fetchCommentsByPostId(1) will runned once, but the data will be passed to the two components 
    who needs them.

    The cache memoization system is cleared out between incoming requets. So if you have to users making
    a request to your application at the same time, you will be doing some memoization, but it will not be
    shared between the two different users, and as soon as the requests are completed, all the memoization
    gets dumped.

    The cahce memoization system is automatically used with the built in fetch function. So if you call fetch
    with identical arguments, only one request will be sent off, and all the different calls to fetch who 
    has these identical arguments will eventually recieve the return value from the first call.

    This functionality can be used with other function than the built in fetch function 
    (like db queries/fetchCommentsByPostId) as well, by using the 'cache' function.
*/

export const fetchCommentsByPostId = cache( (postId: string): Promise<CommentWithAuthor[]> =>{
    console.log('making a query')
    return db.comment.findMany({
        where: {postId: postId},
        //Relatonal data. We want to include all related user, and just their name and image 
        //with the name: true and image: true
        include: {
            user: {select: {name: true, image: true}}
        }
    })
}
)
