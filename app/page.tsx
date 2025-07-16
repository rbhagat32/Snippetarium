"use client";

import { useAuth } from "@clerk/nextjs";
import CodeIcon from "@mui/icons-material/Code";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
      <CTASection />
      <div className="mt-14 flex w-full items-center justify-center">
        <Image
          src={"/landing.png"}
          alt="dashboard"
          width={1200}
          height={900}
          priority
          className="aspect-auto w-[400px] max-w-full rounded-lg shadow-xl sm:w-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="m-5 mx-8 flex items-center justify-between max-sm:mt-9 max-sm:flex-col">
      <Logo />
      <Buttons />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-md bg-rose-600 p-[6px]`}>
        <CodeIcon sx={{ fontSize: 27, color: "white" }} />
      </div>
      <div className="flex gap-0 text-[19px]">
        <span className={`font-bold text-rose-600`}>Snippet</span>
        <span className="text-slate-600">arium</span>
      </div>
    </div>
  );
}

function Buttons() {
  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ? (
        <div className="flex gap-2 max-sm:mt-8 max-sm:w-full max-sm:flex-col">
          <Link href="/my-notes">
            <button
              className={`rounded-md bg-rose-600 p-[8px] px-6 text-sm text-white max-sm:w-full`}
            >
              Dashboard
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 max-sm:mt-8 max-sm:w-full max-sm:flex-col">
          <Link href="/sign-in">
            <button
              className={`rounded-md border border-transparent bg-rose-600 p-[8px] px-6 text-sm text-white max-sm:w-full`}
            >
              Sign In
            </button>
          </Link>

          <Link href="/sign-up">
            <button
              className={`rounded-md border border-rose-600 p-[8px] px-6 text-sm text-rose-600 duration-300 hover:bg-rose-600 hover:text-white max-sm:w-full`}
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

function CTASection() {
  return (
    <div className="mx-16 mt-[100px] flex flex-col items-center gap-6">
      <h2 className="text-center text-3xl font-bold">
        Organize Your Code Snippets
        <span className={`text-rose-600`}> Efficiently!</span>
      </h2>
      <p className="w-[450px] text-center text-sm text-slate-500 max-sm:w-full">
        With our advanced tagging and search features, you can quickly find the
        snippet you need, right when you need it. Spend less time searching for
        code and more time writing it.
      </p>
    </div>
  );
}
