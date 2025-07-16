import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: "Add a confession",
    description: "Upload a new confession"
}

function NewConfessionLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}

export default NewConfessionLayout
