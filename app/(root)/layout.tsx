import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head"; // Import the Head component from next/head
import { Inter } from "next/font/google";

import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSide";
import RightSidebar from "@/components/shared/RightSide";
import Bottombar from "@/components/shared/Bottom";

export const metadata = {
  title: "Threads",
  description: "Threads next14 v1.00 application",
};

const inter = Inter({ subsets: ["latin"] });

function Header() {
  return (
    <header
      style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
    >
      <h1>Threads</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {/* Set HTML lang attribute and include metadata */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
        <body className={`${inter.className} `}>
          <Topbar />
          <Header />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
