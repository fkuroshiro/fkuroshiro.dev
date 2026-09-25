import Link from "next/link";
import "@/globals.css";
import { Wrapper } from "@/ui/Wrapper";

export default function NotFound() {
  return (
    <div className="h-screen bg-background flex justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/2 lg:top-1/2 w-100 h-100 lg:w-150 lg:h-150 -translate-x-72 -translate-y-1/2 rounded-full bg-accent/80 blur-xl lg:blur-3xl" />
        <div className="absolute right-0 top-1/2 lg:top-1/2 w-100 h-100 lg:w-150 lg:h-150 translate-x-72 -translate-y-1/2 rounded-full bg-accent/80 blur-xl lg:blur-3xl" />
      </div>
      <Wrapper className="flex flex-col items-center justify-center gap-12">
        <h1 className="font-black text-9xl">404</h1>
        <p>~/Page not found</p>
        <Link
          className="w-fit border-2 border-border py-2 px-3 rounded-xl font-black duration-300 delay-75 hover:backdrop-blur-lg drop-shadow-black drop-shadow-lg hover:bg-accent/50 hover:drop-shadow-accent hover:drop-shadow-lg hover:border-accent/80"
          href="/"
        >
          <span>RETURN</span>
        </Link>
      </Wrapper>
    </div>
  );
}
