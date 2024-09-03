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



export default function TopicCreateForm() {
    //second argument to useFormState({errors:{}}) must match the first type in the actions.createTopic functions params
    const [formState, action] = useFormState(actions.createTopic, {errors:{}})
    return (
        <Popover classNames={{content: 'border bg-base border-primary border-1'}} backdrop='blur' placement='top'> 

            <PopoverTrigger>
                <Button color='secondary' variant='shadow' className=''>Create Topic</Button>
            </PopoverTrigger>

            <PopoverContent>
                <form action={action} className='p-2' >
                    <div className='flex flex-col gap-4 w-60 md:w-80'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-lg text-center text-default font-sans font-bold'>Create a Topic</h3>
                            <Divider className='bg-primary'/>
                        </div>
                        <Input
                            label="Name"
                            labelPlacement='outside'
                            placeholder='Name'
                            variant='bordered'
                            color='success'
                            name="name"
                            type="text"
                            //!! to turn it in to a boolean
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(', ')}
                        />
                        {/*
                        if we were not using nextui we could do this:
                        <div className='bg-red-400'>
                            {formState.errors.name?.join(', ')}
                        </div> */}
                        <Textarea
                            label="Description"
                            labelPlacement='outside'
                            placeholder='Describe your topic'
                            name="description"
                            type="text"
                            color='success'
                            variant='bordered'
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')}
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
                        <FormButton  color='success'  >Create</FormButton>
                    </div>
                </form>
                
            </PopoverContent>

        </Popover>
    )
}