"use client";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner";
import { useRouter } from "next/navigation"

function NewConfession() {
    // Track the content of the confession
    const [confession, setConfession] = useState("");

    const router = useRouter();

    // Create new confession mutation
    const { mutate: createConfession, isPending: creatingConfession } = useMutation({
        mutationKey: ['createConfession'],
        mutationFn: async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions`, { confession });

            return res.data
        },
        onSuccess: () => {
            toast.success("Confession added !");

            router.push("/");
        },
        onError: () => {
            toast.error("An error occured while creating confession... !");
        }
    })

    return (
        <section className="flex flex-col justify-center items-center gap-4 px-4 py-20">
            <h2 className="text-xl font-semibold text-green-500">Post a new confession</h2>
            <article className="flex flex-col gap-2 w-full">
                <Textarea
                    placeholder="Last summer I..."
                />
                <Button disabled={creatingConfession} type="button" onClick={() => {
                    createConfession()
                }}>
                    Post
                </Button>
            </article>
            <p className="text-muted-foreground text-center text-sm">Don't worry, you're 100% anonymous, be open !</p>
        </section>
    )
}

export default NewConfession
