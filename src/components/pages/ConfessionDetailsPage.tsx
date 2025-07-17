"use client";

import { dayTimeUrl } from "@/data/backgroundUrls";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MessageCircleOff,
  SendHorizontal,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ConfessionComment, ConfessionLike } from "@/types";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/providers/QueryClientProviderWrapper";

function ConfessionDetailsPage({ id }: { id: string }) {
  const router = useRouter();
  const hour = new Date().getHours();
  const isDayTime = hour > 0 && hour < 18;

  const [name, setName] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  // Set name on mount (avoid SSR issues with localStorage)
  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  // Get confession details
  const {
    data: confession,
    isLoading: fetchingConfessionDetails,
  } = useQuery({
    queryKey: ["confession"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/confession?id=${id}`
      );
      return res.data;
    },
  });

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Update likes and liked state when confession is fetched
  useEffect(() => {
    if (confession && name) {
      setLikes(confession.likes.length);
      setLiked(
        confession.likes.some((like: ConfessionLike) => like.creatorName === name)
      );
    }
  }, [confession, name]);

  const { mutate: likeConfession } = useMutation({
    mutationKey: ["likeParams"],
    mutationFn: async () => {
      setLikes(likes + 1);
      setLiked(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions/like`,
        {
          confessionId: confession.id,
          creatorName: name,
        }
      );
      return res.data;
    },
    onError: () => {
      toast.error("Couldn't like confession");
    },
  });

  const { mutate: unLikeConfession } = useMutation({
    mutationKey: ["unlikeMutation"],
    mutationFn: async () => {
      setLikes(likes - 1);
      setLiked(false);

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions/like?creatorName=${name}&confessionId=${confession.id}`
      );
      return res.data;
    },
    onError: () => {
      toast.error("Couldn't unlike confession");
    },
  });

  const { mutate: createComment, isPending: creatingComment } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions/comments`,
        {
          confessionId: confession.id,
          creatorName: name,
          text: comment,
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["confession"],
      });
      setComment("");
    },
  });

  return (
    <section className="flex flex-col gap-4 p-4 md:p-20">
      {/* Confession Text Card */}
      <article
        style={{
          backgroundImage: `url(${dayTimeUrl})`,
        }}
        className="rounded-2xl relative min-h-[120px]"
      >
        <article className="bg-black/40 rounded-2xl w-full h-full absolute z-2" />
        {fetchingConfessionDetails ? (
          <>
            <Skeleton className="h-[10px] w-[200px] rounded-xl m-4" />
            <Skeleton className="h-[10px] w-[80px] rounded-xl m-4" />
            <Skeleton className="h-[10px] w-[200px] rounded-xl m-4" />
          </>
        ) : (
          <p className="z-10 p-4 text-white capitalize text-xl font-semibold relative">
            {confession?.text}
          </p>
        )}
      </article>

      {/* Actions */}
      <article className="flex items-center justify-between w-full">
        {fetchingConfessionDetails ? (
          <Skeleton className="h-10 w-24 rounded-md" />
        ) : (
          <Button
            onClick={() => {
              if (liked) {
                unLikeConfession();
              } else {
                likeConfession();
              }
            }}
            className="bg-red-100 flex gap-2 items-center hover:bg-red-200 transition duration-200"
            variant="default"
          >
            <Heart
              className={`${
                liked ? "fill-red-500 stroke-0" : "fill-none stroke-red-500"
              }`}
            />
            <p className="text-red-500 font-semibold">{likes || "0"}</p>
          </Button>
        )}

        {fetchingConfessionDetails ? (
          <Skeleton className="h-10 w-24 rounded-md" />
        ) : (
          <p className="text-green-500 font-semibold flex items-center gap-2">
            <MessageCircle size={20} />
            <p className="text-green-500 font-semibold">{confession.comments.length || "0"}</p>
          </p>
        )}

        {fetchingConfessionDetails ? (
          <Skeleton className="h-10 w-24 rounded-md" />
        ) : (
          <Button
            className="flex gap-2 items-center"
            variant="outline"
            onClick={async (e) => {
              e.stopPropagation();
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
        )}
      </article>

      {/* Comments Section */}
      <section className="flex flex-col gap-4 mt-4">
        <h2 className="text-lg font-semibold">Comments</h2>

        {fetchingConfessionDetails ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-16 w-full rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        ) : confession.comments.length > 0 ? (
          confession.comments.map((comment: ConfessionComment) => (
            <article
              key={comment.id}
              className="flex gap-2 items-start w-full"
            >
              <Avatar>
                <AvatarFallback className="capitalize bg-gray-400">
                  {comment.creatorName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <article className="flex flex-col items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-sm font-semibold capitalize">
                    {comment.creatorName}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt))}
                  </p>
                </div>
                <p className="text-gray-500 whitespace-pre">{comment.text}</p>
              </article>
            </article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <MessageCircleOff className="text-gray-400" size={64} />
            <h2 className="text-lg font-semibold">No comments</h2>
            <p className="text-gray-500">Be the first to comment.</p>
          </div>
        )}
      </section>

      {/* Create Comment Input */}
      {!fetchingConfessionDetails && (
        <article className="flex gap-2 items-center mt-2">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Say something..."
          />
          <Button
            disabled={comment.length < 1 || creatingComment}
            onClick={() => createComment()}
            size="icon"
          >
            <SendHorizontal />
          </Button>
        </article>
      )}
    </section>
  );
}

export default ConfessionDetailsPage;
