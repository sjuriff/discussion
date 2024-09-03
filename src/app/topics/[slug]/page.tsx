import PostCreateForm from "@/components/posts/post-create-form"
import { fetchPostsByTopicSlug } from "@/db/queries/posts"
import PostList from "@/components/posts/post-list"
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react"
/*
Page components recive the query string data through the params prop
These prorps are only automatically passed to a page component.
Client components can get query string data trough with the useSearchParams:
import {useSearchParams} from 'next/navigation'
const searchParams = useSearchParams()
client components with useSerachParams need to be wrapped with Suspense or you will get
a strange warning at build time.

Pages that reference searchParams will be marked as dynamic for purpose of build time caching. That
means trhat you will not have a pre-rendered/generated version of your page.
*/
interface TopicShowPageProps { 
    params:{
        slug: string
    }
}


export default function TopicShowPage({params}: TopicShowPageProps) {
    const {slug} = params
    return (
        <div className="grid grid-cols-4 gap-4 p-4 ">
            <div className="col-span-4 md:col-span-3">
                <h1 className="text-2xl text-default m-2 font-sans font-bold">{slug}</h1>
                <PostList fetchData={() => fetchPostsByTopicSlug(slug)}/>
            </div>
            
            <div className="col-span-4 md:col-span-1 mt-4 md:mt-12">
                <Card className="w-full flex flex-col ">
                    <CardHeader className="flex items-center bg-tertiaryContainer justify-center bg-opacity-50">
                        <h1  className="text-xl text-default font-sans font-bold text-onTertiaryContainer ">Create a new Post</h1>
                    </CardHeader>
                    <CardBody className="flex justify-center bg-tertiaryContainer bg-opacity-50">
                        <PostCreateForm slug={slug}/>
                    </CardBody>
                </Card>
                
            </div>
        </div>
    )
}
//Data changes in modal