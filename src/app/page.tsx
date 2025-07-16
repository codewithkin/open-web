import { Card, CardContent } from "@/components/ui/card";
import { BrushCleaning } from "lucide-react";
import Link from "next/link";

function Feed() {
  const confessions = [];

  return (
    <section className="w-full min-h-screen p-4">
      {
        confessions.length > 0 ? (
          <article></article>
        ) : (
          <Card className="w-full h-full flex flex-col justify-center items-center text-center md:my-20 my-12">
            <CardContent className="w-full h-full flex flex-col justify-center items-center text-center">
              <BrushCleaning className="text-gray-400 dark:text-gray-200" size={96} strokeWidth={1.2} />
              <h2 className="text-3xl md:text-2xl font-bold">Ooops</h2>
              <p className="text-center text-gray-400 dark:text-gray-200 md:text-md">No confessions for today, please check again tomorrow or <Link className="underline text-green-500 dark:text-green-300" href="/confessions/new">post one</Link></p>
            </CardContent>
          </Card>
        )
      }
    </section>
  )
}

export default Feed
