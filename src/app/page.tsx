import PostList from "@/components/posts/post-list"
import TopicCreateForm from "@/components/topics/topic-create-form"
import TopicList from "@/components/topics/topic-list"
import {Divider, Card, CardHeader, CardBody, CardFooter} from '@nextui-org/react'
import { fetchTopPosts } from "@/db/queries/posts"


//Intallingnextui we need to install the a specific version to avoid errors
//npm install --save-exact @nextui-org/react@2.2.9 framer motion
//Vi må så gjøre endringer i tailwindconfig.ts filen.
//Se filen for å se fremgangen


export default  function Home() {
//Header compnenten i layout.tsx filen kaller på en dynamisk funksjon som etter eller oppdaterer cookiene våre.
//Derfor vil alle sidene våre bli dynamiske ved build 
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-base">

      <div className="col-span-4 md:col-span-3">
        <h1 className="text-2xl text-default m-2 font-sans font-bold border-primary">Top Posts</h1>
        <PostList fetchData={fetchTopPosts}/>
      </div>
      <Card classNames={{body: 'border border-secondaryContainer', header: 'border border-secondaryContainer', footer: 'border border-secondaryContainer'}} className="col-span-4 md:col-span-1 ">
        <CardHeader className="flex bg-secondaryContainer bg-opacity-50 visible w-full justify-center ">
          <h3 className="text-lg mt-2 font-bold font-sans text-onSecondaryContainer">Topics</h3>
        </CardHeader>
        <CardBody className="bg-secondaryContainer bg-opacity-50 ">
          <TopicList/>
        </CardBody>
        <CardFooter className="flex shadow items-center justify-center bg-secondaryContainer bg-opacity-50 ">
          <TopicCreateForm />
        </CardFooter>
      </Card>
    </div>
  )
}
