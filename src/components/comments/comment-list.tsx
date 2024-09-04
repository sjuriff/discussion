import CommentShow from "@/components/comments/comment-show";
import { CommentWithAuthor } from "@/db/queries/comments";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
  postId: string;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({postId}: CommentListProps) {
  //timeout to test the loading-skelleton
  await new Promise(resolve => setTimeout(resolve, 1500))
  //I  would fetch this data in the parent component. But are doing it here and in the child component
  //ShowComment to test the memoization caching system
  const comments = await fetchCommentsByPostId(postId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3 mt-4 mx-2 md:mx-0">
      <h1 className="text-lg text-default font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
