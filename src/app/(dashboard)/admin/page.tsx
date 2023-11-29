import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user) {
    return (
      <div>
        <h2 className="text-2xl">Admin page - welcome back {session?.user.username}</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>Please login to see admin page</h2>
    </div>
  );
};

export default page;
