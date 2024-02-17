import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import NextAuthProvider from "@/provider/nextAuthProvider";
import ReduxProvider from "@/provider/reduxProvider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Course Wave",
  description: "Learn anything, anywhere, anytime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <NextAuthProvider session={session}>
        <ReduxProvider>
          <body className={montserrat.className}>
            {children}
            <Toaster />
          </body>
        </ReduxProvider>
      </NextAuthProvider>
    </html>
  );
}
