import Link from "next/link"

const notFound = () => {
  return (
    <div className="flex w-full h-full justify-center items-center mx-auto my-auto text-center">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold">Oops&#33;</p>
        <h1 className="text-black md:text-[200px] text-9xl">404</h1>
        <h1 className="text-black/50 text-xl font-bold md:text-2xl">There&apos;s nothing to see here.</h1>
        <a className="text-primary underline underline-offset-2" href="/">Go to Home</a>
      </div>
    </div>
  )
}

export default notFound