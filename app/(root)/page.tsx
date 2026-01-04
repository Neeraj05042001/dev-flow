import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import React from "react";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <div className="text-red-400 pt-20 px-12">
       

        {/* <form
          className="px-10 pt-25"
          action={async () => {
            "use server";
            await signOut({ redirectTo: ROUTES.SIGN_IN });
          }}
        >
          <Button type="submit" className="cursor-pointer">Log Out</Button>
        </form> */}
      </div>
    </>
  );
};

export default Home;
