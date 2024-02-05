"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type providerProps = {
  children: React.ReactNode;
  session?: Session;
};
const Provider = ({ children, session }: providerProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
