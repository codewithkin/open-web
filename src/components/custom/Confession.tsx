import { Confession as ConfessionType } from "@/types"
import { Card, CardContent } from "../ui/card"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

function Confession({ confession }: { confession: ConfessionType }) {
    const router = useRouter();

    return (
        <article className="flex flex-col gap-4 items-center w-full">
            <Card onClick={() => {
                router.push(`/confessions/${confession.id}`);
            }} className="w-full bg-gradient-to-tr from-cyan-500 pt-4 md:pb-8 to-pink-400">
                <article className="min-h-[50px] md:min-h-[100px]"></article>
                <CardContent>
                    <p className="text-xl md:text-2xl font-bold text-white">
                        {confession.text && (
                            confession.text.length > 4
                                ? confession.text.slice(0, 4) + "..."
                                : confession.text
                        )}

                    </p>
                </CardContent>
            </Card>

            {/* Actions */}
            <article className="flex items-center justify-between w-full">
                <Button className="bg-red-100 flex gap-2 items-center hover:bg-red-200 transition duration-200" variant="default">
                    <Heart className="fill-red-500 stroke-0" />
                    <p className="text-red-500 font-semibold">
                        {confession.likes.length}
                    </p>
                </Button>
                <Button className="flex gap-2 items-center" variant="ghost">
                    <MessageCircle className="text-green-500" />
                    <p className="text-green-500 font-semibold">
                        {confession.comments.length}
                    </p>
                </Button>
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
