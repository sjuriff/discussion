'use server'
import * as auth from '@/auth'
//Wrapping the signOut function from next-auth  in a server action
export async function signOut(){
    return auth.signOut()
}