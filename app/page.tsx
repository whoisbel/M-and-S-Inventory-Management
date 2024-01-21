import Link from "next/link";
import { Sidepanel } from "@/components";
export default function Dashboard() {
  return (
    <div className="bg-custom-white w-full h-screen flex p-2 ">
      <Sidepanel />
      <h1 className="text-black">Hello</h1>
      <Link href="/test">Test</Link>
    </div>
  );
}
