import Link from "next/link"
import { Suspense } from "react"
import{
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input
} from '@nextui-org/react'
import paths  from '@/paths'
import HeaderAuth from '@/components/header-auth';
import SearchInput from "./search-input";
import { Icons } from "@/icons";

//If a client component that are taking use of useSearchParams, the hook is not going
//to be runned on the server. So if next sees a client component that takes useSearchParams,
//and tries to render it on the server, next wil say, i dont want to do this. Instead, it will
//take all the javascript on the /search route and run it in the browser(client side).
//If we wrap the search input with suspense, it allows next to render everthing up to the
//searchInput on the sever, and everthing inside of the suspense will be rendered on the client.

export default function Header() { 

    return (
        <Navbar className="shadow mb-6 bg-base" >
            <NavbarBrand >
            <Link className="hover:scale-105 transition-all duration-500 ease-in-out" href={paths.home()} >
                <div className="flex font-sans font-bold text-sm md:text-xl  gap-2 text-primary items-center">
                    Discuss<Icons.Code className="text-lg md:text-2xl"/> 
                </div>
            </Link>
            </NavbarBrand>
            <NavbarContent  justify="center">
                <NavbarItem className="text-center">
                    <Suspense> 
                        <SearchInput/>
                    </Suspense> 
                </NavbarItem>
            </NavbarContent>
            
            <NavbarContent  justify="end">
                <HeaderAuth/>
            </NavbarContent>        
        </Navbar>
    )
}