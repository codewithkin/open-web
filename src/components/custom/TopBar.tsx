import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

function TopBar() {
    return (
        <section className="p-4 border-b dark:border-gray-400 border-r-gray-200 flex items-center justify-between w-full">
            <article className="flex gap-2 items-center">
                <img
                    src="/logo.png"
                    width={24}
                    height={24}
                    alt="OpenConfess logo"
                    className="rounded-full"
                />
                <h1 className="text-lg font-semibold dark:text-white">OpenConfess</h1>
            </article>

            <Button asChild size="icon">
                <Link href="/confessions/new">
                    <Plus size={24} />
                </Link>
            </Button>
        </section>
    )
}

export default TopBar
