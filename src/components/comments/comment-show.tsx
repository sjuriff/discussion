import type { CommentWithAuthor } from "@/db/queries/comments";
import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";



interface CommentShowProps {
  commentId: string;
  postId: string;
}
//recursice component, a component that calls/shows itself
//In the DB int is representen like this:
//[{id: 1}, {id: 2, parentId: 1}, {id: 3, parantId: 1}, {id: 4}]
//comment with id 1 is the parent of comment with id 2 and 3
//We can use the parent id to resemble a kind of tree structure.

//This is how it works:
//1. We go triugh the list of comments, and find all the comments with parantId == null (1 and 4)
//2. CommentList will render all the top level comments, passing down the comment id as a prop
//3. We show to CommentShow with the props of 1 and 4
//4. The two CommentShow compnents then show infromation about comment 1 and comment 4
//5: Internaly, CommentShow have some functionality thats gonna find all the comments that
//   has a parentId == commentId. CommentShow is then going to renders ist own internal copies
//   of CommentShow, passing down the comments that has a parantId == commentId ont the top level comment.
//   These CommentShow is then going to look at cooments with a parentId of  the two child compnents 
//   and and repeat the process.


export default async function CommentShow({ commentId, postId }: CommentShowProps) {
   //I  would fetch this data in the parent -> parent component. But are doing it here and in the parent component
  //CommentsList to test the memoization caching system
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} postId={postId} />
    );
  });

  return (
    <div className="p-4 rounded-lg border  mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
