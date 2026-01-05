import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-11.5 py-2 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTIONS}>Ask a Question</Link>
        </Button>
      </section>
      <section className="">LocalSearch</section>

      <div className="mt-10 flex w-full flex-col gap-6">
        <p>Question Card</p>
        <p>Question Card</p>
        <p>Question Card</p>
        <p>Question Card</p>
        <p>Question Card</p>
      </div>
    </>
  );
};

export default Home;
