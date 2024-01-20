import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-custom-white w-full h-screen flex p-2">
      <div className="sticky top-0 left-0 h-full bg-primary-green rounded-lg">
        <ul className="text-[30px] flex justify-center">
          <li className="hover:bg-green-600 px-5 py-2 border-custom-white mt-3 border-y-[1px] cursor-pointer">
            # Dashboard
          </li>
        </ul>
      </div>
      <h1 className="text-black">Hello</h1>
      <Link href="/test">Test</Link>
    </div>
  );
}
