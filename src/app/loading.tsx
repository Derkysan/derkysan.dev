
"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center">
      <Image src="/assets/svg/san.svg" alt="alt" width={50} height={50} />
    </div>
  );
}