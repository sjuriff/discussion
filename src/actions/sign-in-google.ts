'use server'
import * as auth from '@/auth'

//Wrapping the signIn function from next-auth in a server action
//The signIn function takes a string that defines which provider we will use to log in
export async function signInWithGoogle(){
    return auth.signIn('google')
}

