// its not likely that we are going to reuse this component anywhere in the project. 
//We dont need to focus on making it reusable, even tho in most cases that would be best practice.
//This child can in this case fetch its own data, and no need tok take the steps of deciding what data to fetch
//in the parent and passing and fetching them in the child. Keep it somple .
import { notFound } from "next/navigation";
import { db } from "@/db";

interface PostShowProps {
  postId: string
}

export default async function  PostShow({postId}: PostShowProps) {
  //timeout to test the loading-skelleton
  await new Promise(resolve => setTimeout(resolve, 1500))
  // whenever we do findFirst we might get null, and not the object we are looking for
  const post = await db.post.findFirst({
    where: {id: postId}
  })

  if (!post) {  
    notFound()
}

  return (
    <div className="m-4">
      <h1 className="text-2xl text-secondary font-sans font-bold m-2">{post.title}</h1>
      <p className="p-4 shadow bg-tertiaryContainer text-onTertiaryContainer bg-opacity-60 rounded-lg">{post.content}</p>
    </div>
  );
}
