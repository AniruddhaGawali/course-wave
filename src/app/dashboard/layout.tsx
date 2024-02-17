import Navbar from "@/components/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Dashboard({ children }: Props) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Dashboard;
