'use client'
import { Input } from "@nextui-org/react";
import {Icons} from '@/icons'
import { useSearchParams } from "next/navigation";
import * as actions from '@/actions'

export default function SearchInput() {
    const searchParams = useSearchParams();
    //if we use a server action, the search will work even if the user dont have javascript enabled

    return ( 
    <form action={actions.search}>
        <Input  
        radius="lg"
        name="term" 
        type="search"
        color="secondary"
        variant="bordered"
        defaultValue={searchParams.get('term') || ''}
        startContent={
        <Icons.search size={20}  className="transition-all ease-in-out duration-1000 text-gray-400 group-data-[focus=true]:text-secondary" />}
        placeholder="Search posts..."
        
        classNames={{
            input:[
            
            ],
            innerWrapper:[
              
            ],
             inputWrapper:[
                'h-1/2',
                'w-full',
                'border',
               /*  'group-data-[focus=true]:border-primary ',
                'group-data-[focus=true]:border-1',
                'group-data-[focus=true]:shadow-[0_0_0_1px]',
                'group-data-[focus=true]:ring-0' */
            ]
 
        }}/>
    </form>
    )
}