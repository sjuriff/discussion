import Link from 'next/link';
import paths from '@/paths';
import {PostWithDetails} from '@/db/queries/posts'

/*
TopicShowPage or PostList needs ro reach in to the DB to find all posts and coohering data.
Is it best practice to fecth data in the page.tsx og the child.  
Option one is to fetch data in the page.tsx. and pass it down to the child as a prop
Option two is that the child component fetches its own data. 

Option one pros and cons
Pros:
1: Easy to see what data a route need to be displayed
2: Easier to make the child compoonent reusable
3: Easier to avoid 'n + 1' query issues:
n + 1 query issues can happen if you send a post object down to the postlist component, and futher 
down to a post item component. You then realize than u need more info coohering to the post that lays in a different
table in the db. In the postItem component you then make a very simple query to get that info. 
The problem is that for each PostItem component you have to make a query to get that info. You can then
do a query to the db a loooot of times just to get som simple data. You can handle this easy with option one
by making a super descriptive props interface including all data the child component need. You will then get a type
error if you only send the post object to the child component.

Cons:
1: Can lead to overfetching of data:
If we reuse the post list component TopicShowPage and HomePage we are goin to overfetch data
If we fetch data in the HomePage to display inside of the PoslList component, we need to fetch additional data
from the db to find out what the topic for the post is. 
In the TopicShowPage things are a lil bit different. We only need to fetch the post data, because the topic
is already recived in the compnent by the Params prop. We really want PostList to be reusable and as simple
as possible. To do that, and make shure we have the same code between the two components, we want the
TopicShowPage to fetch the slug from the DB even tho we alredy got it from the props. Then we are just slightly 
overfetching data. This is the smalles possible performance penealty in this case. 

2: Can lead to duplicate code in other pages using the child component:
Two parent compnents my have the same query to the DB.

3: Sometimes anoying to write the interface for complex query data:
Prisma automatically creates interfaces/types for us that describes the structure of the data we pull out of 
of the db. We have to write an interface for complex query data that looks like this

4: Slower page load speed.

interface PostListProps {
posts: (Post & 
    {
      topic: {slug: string},
      _count: {comments: number}
  
    }
  )[]
}
This is kind of confusing, and if we ever change our db Query we have to manually change the interface as well.

Option two pros and cons:
Pros:
1: Easier to build 'skeleton' loading pages:
It is stil possible when fetching is done in the parent component with the loading.tsx file.
But it is way more easier when fetching is done in the child component.
Cons:
1: Child component implementation is locked in.
2: Faster page load speed

We are going to do a hybrid aproach.

We are going to make a new file called post query file. This is a seperate file that list all the queries
that can provide data to the PostList component. We then gonna find our PostList component and create
a props interface the function that will execute the queries and return the data we need to show. 
Then the parent component can decide what data to fetch, and the children can fetch it. The child component will
be reusable and sicne we fetch data in the child component, we will get a big boost in performance. 
*/

interface PostListProps {
  fetchData: () => Promise<PostWithDetails[]>
}
export default async function PostList({fetchData}: PostListProps) {
  const posts = await fetchData();

  if (posts.length === 0) {
    return (
      <div className='flex justify-center items-center mt-10'>
          <p>No posts yet</p>
      </div>
  );
  }
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className=" group border rounded p-2 text-default hover:border-primaryContainer hover:bg-primaryContainer hover:shadow-lg transition-all duration-500 ease-in-out">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg text-secondary group-hover:text-onPrimaryContainer font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400 group-hover:text-gray-600">By {post.user.name}</p>
            <p className="text-xs text-gray-400 group-hover:text-gray-600">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
