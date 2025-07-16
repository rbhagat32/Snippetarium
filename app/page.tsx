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
      <div className="w-full flex justify-center items-center mt-14">
        <Image
          src={"/landing.png"}
          alt="dashboard"
          width={1200}
          height={900}
          priority
          className="shadow-xl aspect-auto sm:w-auto w-[400px] rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col  ">
      <Logo />
      <Buttons />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className={`bg-rose-600 p-[6px] rounded-md`}>
        <CodeIcon sx={{ fontSize: 27, color: "white" }} />
      </div>
      <div className="flex gap-0 text-[19px] ">
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
        <Link href="/my-notes">
          <button
            className={`max-sm:w-full  bg-rose-600 p-[8px] px-6 text-sm text-white rounded-md`}
          >
            Dashboard
          </button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
          <Link href="/sign-in">
            <button
              className={`max-sm:w-full bg-rose-600 p-[8px] px-6 text-sm text-white rounded-md border border-transparent`}
            >
              Sign In
            </button>
          </Link>

          <Link href="/sign-up">
            <button
              className={`max-sm:w-full text-sm border border-rose-600 text-rose-600 
      hover:bg-rose-600 hover:text-white p-[8px] px-6 rounded-md duration-300`}
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
    <div className="flex flex-col mx-16 items-center mt-[100px] gap-6 ">
      <h2 className="font-bold text-3xl text-center">
        Organize Your Code Snippets
        <span className={`text-rose-600`}> Efficiently !</span>
      </h2>
      <p className="text-center text-sm w-[450px] max-sm:w-full text-slate-500 ">
        With our advanced tagging and search features, you can quickly find the
        snippet you need, right when you need it. Spend less time searching for
        code and more time writing it.
      </p>
    </div>
  );
}
