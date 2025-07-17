import ConfessionDetailsPage from "@/components/pages/ConfessionDetailsPage"

async function ConfessionDetails({params}: {params: Promise<{id: string}>}) {
    // Get the confession id
    const {id} = await params

  return (
    <ConfessionDetailsPage id={id} />
  )
}

export default ConfessionDetails