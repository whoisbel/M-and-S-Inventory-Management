import Link from "next/link";
import { Sidepanel } from "@/components";
export default function Dashboard() {
  return (
    <div className="bg-main-background w-full h-screen flex p-2 ">
      <Sidepanel />
      <h1 className="text-black">Hello</h1>
    </div>
  );
}
