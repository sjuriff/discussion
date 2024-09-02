'use server'
import * as auth from '@/auth'
//Wrapper signOut funksjonen fra next-auth  i en server action
export async function signOut(){
    return auth.signOut()
}