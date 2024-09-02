'use server'
import * as auth from '@/auth'

//Wrapper signIn funksjonen fra next-auth  i en server action
//signIn funskjonen tar en string som definerer hvilken provider vi vil bruke for å logge inn
export async function signInWithGoogle(){
    return auth.signIn('google')
}

