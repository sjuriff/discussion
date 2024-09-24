import  type {Post} from '@prisma/client'
import { db } from '@/db'

export type PostWithDetails= (Post & {
    topic: {slug: string},
    user: {name: string | null},
    _count: {comments: number}
    }
) 
/*
    This looks at the type of fetchPostsByTopicSlug() function. 
    It looks at what gets returned from this function
    it is then going to unwrap that, since we are returning a promise,
    and so its gonna take a look at what the promise gets resolved to.
    Since we are resolving the promise with an array of post objetcs,
    the square brackets with number are saying take one of the objects inside of the array.
    This type/object will be the same as the type/object that is written by hand above.

    export type PostWithDetails = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number]
*/

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithDetails[]> {
    return db.post.findMany({
        where: {topic: {slug: slug}},
        include: {
            topic: {select: {slug: true}}, 
            user: {select: {name: true}}, 
            _count: {select: {comments: true}}}
    })
}

export function fetchTopPosts(): Promise<PostWithDetails[]> {
    return db.post.findMany({
        take: 5,
        //may use square brackest orderBy [{comments: { _count: "desc" }}] if we want more order by conditions
        orderBy: {comments: { _count: "desc" }},
        include: {
            topic: {select: {slug: true}}, 
            user: {select: {name: true}}, 
            _count: {select: {comments: true}}
        }
    })
}

export function fetchPostsBySearchTerm(searchTerm: string): Promise<PostWithDetails[]> {
    //we use OR here to search for both title and content
    //one or more conditions must return true
    return db.post.findMany({
        where: {
            OR: [
                {title: {contains: searchTerm}},
                {content: {contains: searchTerm}}
            ]
        },
        include: {
            topic: {select: {slug: true}}, 
            user: {select: {name: true, image: true}}, 
            _count: {select: {comments: true}}
        }
    })
}