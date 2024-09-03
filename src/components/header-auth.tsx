'use client'
import Link from "next/link"
import { Icons } from "@/icons"
import{
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react'

import {signOut as nextAuthSignOut} from 'next-auth/react'
import * as actions from '@/actions'
import { useSession } from 'next-auth/react'

export default function HeaderAuth() {
    //useSession doesnt direclty acces cookies, it makes a request to the backend to figure out if the user is logged in
    //so we can have logg in in our header without all our pages being dynamic with making this component a klient component
    //and let it handle the user authentication

    //we are doing the user authenification in the browser, so we dont try to access cookies from the server

    const session = useSession()

    let authContent: React.ReactNode;
    // if session is loading, show nothing(null), show we dont show the sign in/sign up button while checking if the user is logged in
    //while it is!
    if(session.status === 'loading'){

        authContent = null

    } else if (session.data?.user) { 
        authContent = <Popover placement="left">
            <PopoverTrigger>
                <Avatar className="hover:scale-110 transition-all duration-500 ease-in-out" src={session.data.user.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <form action={async ()=>{ 
                        await actions.signOut();
                        await nextAuthSignOut({redirect: false})}}>
                        <Button type="submit" color="danger">Sign out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    }else{
        authContent = <div className="flex flex-col gap-1 md:flex-row md:gap-2">
            <NavbarItem >
                <Popover classNames={{content: ' invisible ', base: ''}}  backdrop='opaque' placement="bottom">
                    <PopoverTrigger>
                    <Button className=" h-9 md:h-10"  variant="bordered" color="primary">
                        Sign in
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent  className="flex-col md:flex-row gap-2"  >
                        <div className="bg-base bg-opacity-75 visible border p-2  rounded-xl ">
                            <form  action={actions.signInWithGoogle}>
                                <Button type="submit"  variant="solid" color="secondary" startContent={<Icons.Google/>}>
                                    Sign in with Google
                                </Button>
                            </form>
                            </div>
                            <div className="bg-base bg-opacity-75 visible border p-2 rounded-xl">
                            <form action={actions.signInWithGithub}>
                                <Button type="submit"  variant="solid" color="primary" startContent={<Icons.Github/>}>
                                    Sign in with Github
                                </Button>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </NavbarItem>
            <NavbarItem className="hidden md:block">
                <form >
                    {/** TODO: CREATE SIGN UP */}
                    <Button className=" h-7 md:h-10 "  variant="flat" color="primary">
                        Sign up
                    </Button>
                </form>
            </NavbarItem>
        </div>
    }
    

    return authContent
}