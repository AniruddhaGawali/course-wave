import Navbar from '@/components/Navbar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function LoginLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default LoginLayout;
