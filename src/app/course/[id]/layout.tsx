import Navbar from "@/components/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function CourseLayout({ children }: Props) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default CourseLayout;
