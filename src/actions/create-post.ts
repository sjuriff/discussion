'use server'
//Creating a single file for one server action since the server action
//function is going to be long and big, so the code will be easier to
//manage and read in this structure.
import {Post} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
//npm install zod
import { z } from "zod"
import { auth} from '@/auth'
import { db } from '@/db'
import paths  from '@/paths'
//TODO: Make custom error messages
const createPostSchema = z.object({
    title: z
    .string()
    .min(3, {message: 'Tilte must be at least 3 characters long'}),
    content: z
    .string()
    .min(10, {message: 'Content must be at least 10 characters long'})
})

interface Errors{
    title?: string[],
    content?: string[],
    _form?: string[]
}

interface CreatePostFormState  {
    errors: {
        title?: string[],
        content?: string[]
        //naming the field _form so it does not colide with any other field name.
        //this error field is for handling general errors like user not logged in
        //or problems saving a topic to the database.
        _form?: string[]
    }
}
//Slug will be the first argument since we are using bind(null, slug) on the server action in post-create-form.tsx
export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData, ) : Promise<CreatePostFormState> {

    const result = createPostSchema.safeParse({
        title: formData.get('title') as string ,
        content: formData.get('content') as string 
    })

    if (!result.success){
        //flatten().fieldErrors to return only messages for each field in an array of strings
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be logged in to create a post']
            }
        }
    }

    const topic = await db.topic.findFirst({
        where: {
            slug: slug
        }
    })

    if(!topic){
        return {
            errors: {
                _form: ['Topic not found']
            }
        }
    }

    //declaring the variabel above the try/catch with the let keyword
    //so we can use it in redirect outside the try/catch scope
    //sicne redirect throws an error, we can have it inside the try scope
    let post: Post
    try{
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        }) 
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors:{
                    _form: ['Something went wrong, failed to create post']
                }
            }
        }
    }
    //Revalidate topic show page when new post is created
    revalidatePath(paths.topicShow(slug))
    //Redirect to topic show page
    redirect(paths.postShow(slug, post.id))
}