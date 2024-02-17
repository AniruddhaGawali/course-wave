"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import * as actions from "@/actions";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="grainy-gradient flex h-screen w-full items-center justify-center">
      <form className="flex h-2/4 w-full flex-col items-center justify-center gap-6 rounded-lg bg-[rgba(255,255,255,0.45)] px-10 backdrop-blur-sm  sm:w-2/3 lg:w-1/3">
        <h2 className="text-center text-xl font-semibold">Login With Google</h2>

        <Button
          className="mt-3 flex w-full max-w-sm items-center gap-5 "
          onClick={(e) => {
            e.preventDefault();
            actions.loginFromGoogle();
          }}
        >
          <FcGoogle className="text-lg" />
          <span>Login with Google</span>
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
