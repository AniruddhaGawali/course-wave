'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

import { FcGoogle } from 'react-icons/fc';
import * as actions from '@/actions';

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <form className="flex h-2/3 w-1/3 flex-col items-center justify-center gap-6 rounded-md bg-gray-50">
        <h2 className="text-center text-xl font-semibold">Login With Google</h2>

        <Button
          className="mt-3 flex w-full max-w-sm items-center gap-5 "
          onClick={() => {
            actions.loginFromGoogle();
          }}>
          <FcGoogle className="text-lg" />
          <span>Login with Google</span>
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
