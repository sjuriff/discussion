'use client'
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

//NOT IN USE
export default function BackButton() {
    const router = useRouter()

    const handleBackClick = () => {
        router.back()
    }
    return (
        <div>
            <Button onClick={handleBackClick} color="secondary">Back</Button>
        </div>
    )
}