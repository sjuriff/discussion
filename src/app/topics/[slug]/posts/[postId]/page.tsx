import Link from "next/link"
import paths from "@/paths"
import { Suspense } from "react"
import { Icons } from "@/icons"
import PostShow from "@/components/posts/post-show"
import PostShowLoading from "@/components/posts/post-show-loading"
import CommentCreateForm from "@/components/comments/comment-create-form"
import CommentList from "@/components/comments/comment-list"
import CommentListLoading from '@/components/comments/comment-list-loading'



/*
SUSPENSE:
By adding these suspense components around server components, its going to dramatically change the application
is loaded up. Now, because suspense is included, when the user makes a request to our server, we are going to
load the PostShow component/page. We can kind of imagine theres almost going to be like som empty spaces here
for the PostShow and the CommentList components. We're going to send that back to the user, and that means that
the user is going to see some content instantly on the screen, without us having to reach out to the db
to get some data. Then when PostShow and CommentList reaches out to the db to get the data and
produces some jsx and are rendered in to HTML. The HTML is going to be taken and streamed over to the browser.
The user is then going to se that HTML show up inside of the empty spaces. This is refered to as content streaming.
Its a big upside to using react server components. And it also makie it easy to show incremental
loading spinners all over the place inside of our application. Whit the suspense approach you can
control wich area of the screen are going to show some loading spinner. 
*/

interface PostShowPageProps {
    params: {
        slug: string
        postId: string
    }
}

export default function PostShowPage({params}: PostShowPageProps) {
    const {slug, postId} = params
    return (
        <div>
            <Link className="flex gap-2 mx-4 md:mx-0 text-secondary" href={paths.topicShow(slug)}><Icons.back className="hover:scale-105 transition-all text-secondary ease-in-out duration-500"/>{slug}</Link>
            <Suspense fallback={<PostShowLoading/>}>
                <PostShow postId={postId}/>
            </Suspense>
            <CommentCreateForm  postId={postId} startOpen/>
            <Suspense fallback={<CommentListLoading/>}>
                <CommentList postId={postId}/>
            </Suspense>
        </div>
    )
}
//Data changes when comment is created