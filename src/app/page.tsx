"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BrushCleaning } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Confession from "@/components/custom/Confession";
import { Confession as ConfessionType } from "@/types";

function Feed() {
  const { data: confessions, isLoading: fetchingConfessions } = useQuery({
    queryKey: ["getConfessions"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confessions`);
      return res.data;
    },
  });

  console.log("Confessions: ", confessions);

  return (
    <section className="w-full min-h-screen p-4">
      {fetchingConfessions ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="w-full p-4 space-y-3">
              <Skeleton className="h-6 w-1/3 rounded bg-slate-300" />
              <Skeleton className="h-4 w-full rounded bg-slate-300" />
              <Skeleton className="h-4 w-5/6 rounded bg-slate-300" />
            </Card>
          ))}
        </div>
      ) : confessions && confessions.length > 0 ? (
        <article>
          {/* Map confessions here */}
          {
            confessions.map((confession: ConfessionType, index: number) => {
              return (
                <Confession key={index} confession={confession} />
              )
            })
          }
        </article>
      ) : (
        <Card className="w-full h-full flex flex-col justify-center items-center text-center md:my-20 my-12">
          <CardContent className="w-full h-full flex flex-col justify-center items-center text-center">
            <BrushCleaning className="text-gray-400 dark:text-gray-200" size={96} strokeWidth={1.2} />
            <h2 className="text-3xl md:text-2xl font-bold">Ooops</h2>
            <p className="text-center text-gray-400 dark:text-gray-200 md:text-md">
              No confessions for today, please check again tomorrow or{" "}
              <Link className="underline text-green-500 dark:text-green-300" href="/confessions/new">
                post one
              </Link>
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

export default Feed;
