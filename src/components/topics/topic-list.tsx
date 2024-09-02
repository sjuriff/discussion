import Link from "next/link"
import  paths  from '@/paths'
import { Chip } from "@nextui-org/react"
import {db} from '@/db'

export default async function TopicList() {
    const topics = await db.topic.findMany()

    const rederedTopics = topics.map(topic => (
        <div key={topic.id}>
            <Link className="text-center" href={paths.topicShow(topic.slug)}>
                <Chip classNames={{content: ''}}  className="hover:scale-105 transition-all duration-500 ease-in-out"
                    color='secondary'
                    variant="dot"
                >
                    {topic.slug}
                </Chip>
            </Link>
        </div>
    ))

    return (
        <div className=" flex flex-row flex-wrap gap-2">
            {rederedTopics}
        </div>
    )
}