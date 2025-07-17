import { ConfessionComment, ConfessionLike, Confession as ConfessionType } from "@/types"
import { Card, CardContent } from "../ui/card"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import { Heart, MessageCircle, MessageCircleOff, SendHorizontal, Share2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { queryClient } from "@/providers/QueryClientProviderWrapper";

function Confession({ confession }: { confession: ConfessionType }) {
    const router = useRouter();

    const [likes, setLikes] = useState(confession.likes.length);

    const name = localStorage.getItem("name");
    const [comment, setComment] = useState("");

    // Check if the user has liked the confession
    const [liked, setLiked] = useState(confession.likes.some((like: ConfessionLike) => like.creatorName === name));

    console.log("Liked: ", liked)

    const { mutate: likeConfession, isPending: likingMutation } = useMutation({
        mutationKey: ["likeParams"],
        mutationFn: async () => {
            setLikes(likes + 1);
            setLiked(true);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions/like`, {
                confessionId: confession.id,
                creatorName: name
            });

            return res.data;
        },
        onError: () => {
            toast.error("Couldn't like confession");
        }
    });

    const { mutate: unLikeConfession, isPending: unlikingMutation } = useMutation({
        mutationKey: ["unlikeMutation"],
        mutationFn: async () => {
            setLikes(likes - 1);
            setLiked(false);

            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions/like?creatorName=${name}&confessionId=${confession.id}`);

            return res.data;
        },
        onError: () => {
            toast.error("Couldn't unlike confession");
        },
    })

    const { mutate: createComment, isPending: creatingComment } = useMutation({
        mutationKey: ["createComment"],
        mutationFn: async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions/comments`, {
                confessionId: confession.id,
                creatorName: name,
                text: comment
            })

            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getConfessions"]
            })
        }
    })

    return (
        <article className="flex flex-col gap-4 items-center w-full">
            <Card onClick={() => {
                router.push(`/confessions/${confession.id}`);
            }} className="w-full bg-gradient-to-tr from-cyan-500 pt-4 md:pb-8 to-pink-400">
                <article className="flex items-center gap-2 px-4">
                    <Avatar>
                        <AvatarFallback className="capitalize bg-white text-black w-8 h-8">
                            {confession.creatorName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    
                                                    <article className="flex flex-col items-start">
                                                        {/* User data */}
                                                        <article className="flex items-center gap-8">
                                                            <h2 className="text-sm font-semibold capitalize">{confession.creatorName}</h2>
                                                        </article>
                                                        <p className="text-gray-100 text-xs whitespace-pre">{formatDistanceToNow(new Date(confession.postedAt))} ago</p>
                                                    </article>
                </article>
                <article className="min-h-[50px] md:min-h-[100px]"></article>
                <CardContent>
                    <p className="text-xl md:text-2xl font-bold text-white">
                        {confession.title && (
                            confession.title.length > 4
                                ? confession.title.slice(0, 4) + "..."
                                : confession.title
                        )}

                    </p>
                </CardContent>
            </Card>

            {/* Actions */}
            <article className="flex items-center justify-between w-full">
                <Button onClick={() => {
                    if (liked) {
                        unLikeConfession()
                    } else {
                        likeConfession();
                    }
                }} className="bg-red-100 flex gap-2 items-center hover:bg-red-200 transition duration-200" variant="default">
                    <Heart className={`${liked ? "fill-red-500 stroke-0" : "fill-none stroke-red-500"} `} />
                    <p className="text-red-500 font-semibold">
                        {likes || "0"}
                    </p>
                </Button>
                <Drawer>
                    <DrawerTrigger className="flex items-center gap-2">
                        <MessageCircle size={18} className="text-green-500" />
                        <p className="text-green-500 font-semibold">
                            {confession.comments.length}
                        </p>
                    </DrawerTrigger>
                    <DrawerContent className="p-4 md:py-10 md:px-40">
                        <DrawerTitle className="hidden">Create a new comment</DrawerTitle>

                        {/* Map comments */}
                        <article className="flex flex-col gap-4 items-center justify-center text-center">
                            {
                                confession.comments && confession.comments.length > 0 ? (
                                    <article className="flex flex-col gap-4 w-full max-h-[300px] overflow-y-auto">
                                        {
                                            confession.comments.map((comment: ConfessionComment) => (
                                                <article className="flex gap-2 items-center w-full">
                                                    <Avatar>
                                                        <AvatarFallback className="capitalize bg-gray-400">
                                                            {comment.creatorName.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <article className="flex flex-col items-start">
                                                        {/* User data */}
                                                        <article className="flex items-center gap-8">
                                                            <h2 className="text-sm font-semibold capitalize">{comment.creatorName}</h2>
                                                            <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(comment.createdAt))}</p>
                                                        </article>
                                                        <p className="text-gray-400 whitespace-pre">{comment.text}</p>
                                                    </article>
                                                </article>
                                            ))
                                        }
                                    </article>
                                ) : (
                                    <article className="flex flex-col items-center justify-center gap-2">
                                        <MessageCircleOff className="text-gray-400" size={72} />
                                        <h2 className="text-xl font-semibold">No comments</h2>
                                        <p className="text-gray-400 text-center">This Confession has no comments for now...</p>
                                    </article>
                                )
                            }
                        </article>

                        <DrawerFooter>
                            <article className="flex gap-2 items-center">
                                <Input
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value)
                                    }}
                                    placeholder="Say something..." />
                                <Button disabled={comment.length < 1} onClick={() => {
                                    createComment();
                                }} size="icon">
                                    <SendHorizontal />
                                </Button>
                            </article>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                <Button
                    className="flex gap-2 items-center"
                    variant="outline"
                    onClick={async (e) => {
                        e.stopPropagation(); // Prevent card click routing
                        const url = `${window.location.origin}/confessions/${confession.id}`;

                        if (navigator.share) {
                            try {
                                await navigator.share({
                                    title: "Confession",
                                    text: "Read this confession!",
                                    url,
                                });
                            } catch (error) {
                                console.error("Sharing failed:", error);
                            }
                        } else {
                            await navigator.clipboard.writeText(url);
                            alert("Link copied to clipboard!");
                        }
                    }}
                >
                    <Share2 />
                </Button>
            </article>
        </article >
    )
}

export default Confession
