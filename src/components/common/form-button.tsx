'use client'
import { useFormStatus } from "react-dom";
//useFormstatus looks at the form in the parent component
//looks at the closest parent form element and figure out the formStatus
import { Button } from "@nextui-org/react";

interface FormButtonProps { 
    children: React.ReactNode
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
}   
//Children props so we can use it as a normal button whit text inside:
//<FromButton>Submit</FromButton>
export default function FormButton({children, variant, color}: FormButtonProps) {
    const {pending} = useFormStatus();
    return <Button className={color === 'success' ? 'text-white' : ''} color={color} variant={variant} type="submit" isLoading={pending}>
        {children}
    </Button>
}