'use client'
import { useFormState } from 'react-dom'
import{
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react'
import * as actions from '@/actions'
import FormButton from '@/components/common/form-button'
import { Divider } from '@nextui-org/react'
interface PostCreateFormProps {
    slug: string
}

export default function PostCreateForm({slug}: PostCreateFormProps) {
    //second argument to useFormState({errors:{}}) must match the first type in the actions.createTopic functions params
    //the data in the bind function must be the first if it exist, then the second argument comes
    const [formState, action] = useFormState(actions.createPost.bind(null, slug), {errors:{}})
    return (
        <Popover classNames={{content: 'border bg-base border-primary border-1'}} backdrop='blur' placement='left'>
            <PopoverTrigger>
                <Button  color="secondary">Create Post</Button>
            </PopoverTrigger> 
            <PopoverContent >
                <form action={action} className='p-2'>
                    <div className='flex  flex-col gap-4 w-80 '>
                        <div className='flex flex-col gap-2'>
                        <h3 className='text-lg font-bold text-center font-sans text-default'>Create a Post</h3>
                        <Divider className='bg-primary'/>
                        </div>
                        <Input
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Title"
                            name="title"
                            variant='bordered'
                            color='success'
                            //!! to turn it in to a boolean
                            isInvalid = {!!formState.errors.title}
                            errorMessage = {formState.errors.title?.join(', ')}
                        />
                        <Textarea
                            label="Content"
                            labelPlacement="outside"
                            placeholder="Content"
                            name="content"
                            variant='bordered'
                            color='success'
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
                        />
                        {  //will also work, but be carefull if your value could be anything else the false, like 0
                            // logical and operator. If value is true, then the thing after && will apear.
                            //else it will ignore it
                            /*  formState.errors._form &&
                            <div className='bg-red-400'>
                                {formState.errors._form?.join(', ')}
                            </div>  */
                            formState.errors._form ?
                            <div className='p-2 rounded bg-red-200 border border-red-400 '>
                                {formState.errors._form?.join(', ')}
                            </div> : null
                        }
                        <FormButton color='success'>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}