'use server'
//Creating a single file for one server action since the server action
//function is going to be long and big, so the code will be easier to
//manage and read in this structure.
import {Topic} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
//npm install zod
import { z } from "zod"
import { auth} from '@/auth'
import { db } from '@/db'
import paths  from '@/paths'

//TODO: Make custom error messages
const createTopicSchema = z.object({
    name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
        message: 'Must be lowercase letters or dashes without spaces'}),
    description: z.string().min(10)
})

interface Errors {
    name?: string[],
    description?: string[];
    //naming the field _form so it does not colide with any other field name.
    //this error field is for handling general errors like user not logged in
    //or problems saving a topic to the database.
    _form?: string[]
}

//errors could also be difined as type/interface Errors ^
interface CreateTopicFormState  {
    errors: {
        name?: string[],
        description?: string[]
        //naming the field _form so it does not colide with any other field name.
        //this error field is for handling general errors like user not logged in
        //or problems saving a topic to the database.
        _form?: string[]
    }
}
export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    //simulating a delay 2,5 seconds
    //await new Promise(resolve => setTimeout(resolve, 2500))
     // as string, so we dont get the whole formdata entry object
    const result = createTopicSchema.safeParse({
        name: formData.get('name') as string,
        description: formData.get('description') as string
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
                _form: ['You must be logged in to create a topic']
            }
        }
    }
    //declaring the variabel above the try/catch with the let keyword
    //so we can use it in redirect outside the try/catch scope
    //sicne redirect throws an error, we can have it inside the try scope
    let topic: Topic
    try{
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        }) 
    } catch (err:unknown){
        if (err instanceof Error) {
            return {
                errors:{
                    _form: [ err.message ]
                }
            }
        } else {
            return {
                errors:{
                    _form: ['Something went wrong']
                }
            }
        }
    }
    //revalidate before redirecting, cause it throws an error
    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))
}