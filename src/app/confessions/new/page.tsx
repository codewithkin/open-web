"use client";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

function NewConfession() {
    // Track the content of the confession
    const [confession, setConfession] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("text");

    const router = useRouter();

    // Create new confession mutation
    const { mutate: createConfession, isPending: creatingConfession } = useMutation({
        mutationKey: ['createConfession'],
        mutationFn: async () => {
            // Get the creator's name
            const name = localStorage.getItem("name");

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions`, { text: confession, type, title, creatorName: name });

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
        <section className="flex flex-col justify-center items-center gap-4 px-4 py-20 sm:px-20 md:px-60 lg:px-100">
            <h2 className="text-xl font-semibold text-green-500">Post a new confession</h2>
            <article className="flex flex-col gap-2 w-full">
                <Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Last summer I..."
                />
                <Textarea
                    onChange={(e) => setConfession(e.target.value)}
                    value={confession}
                    placeholder="Go into great detail..."
                />
                <Button disabled={creatingConfession} type="button" onClick={() => {
                    createConfession()
                }}>
                    {
                        creatingConfession && (
                            <Loader className="animate-spin" />
                        )
                    }
                    {
                        creatingConfession ?
                            "Posting..." :
                            "Post"
                    }
                </Button>
            </article>
            <p className="text-muted-foreground text-center text-sm">Don't worry, you're 100% anonymous, be open !</p>
        </section>
    )
}

export default NewConfession
