import { Confession as ConfessionType } from "@/types"
import { Card, CardContent } from "../ui/card"

function Confession({ confession }: { confession: ConfessionType }) {
    return (
        <article className="flex flex-col gap-4 items-center w-full">
            <Card className="w-full">
                <CardContent>
                    {confession.text}
                </CardContent>
            </Card>

            {/* Actions */}
            <article className="flex items-center justify-between"></article>
        </article>
    )
}

export default Confession
