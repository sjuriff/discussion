import { redirect } from 'next/navigation'
import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import { Icons }  from '@/icons';
import Link from 'next/link';
import paths from '@/paths';
interface SearchPageProps {
    searchParams: {
        term: string
    }
}
export default async function SearchPage({searchParams}: SearchPageProps) {
    const {term} = searchParams;

    if (!term){
        redirect('/')
    }
    return (
        <div className='mx-4 md:mx-0 '>
            <div className='flex items-center'>
                <Link href={paths.home()}>
                    <Icons.back className="hover:scale-105 transition-all text-secondary ease-in-out duration-500"/>
                </Link>
                <h1 className='text-xl text-default m-2'>All posts containing '{term}'</h1>
            </div>
            <PostList fetchData={() => fetchPostsBySearchTerm(term)}/>
        </div>
    )
}