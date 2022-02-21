import React from "react";
import { faker } from "@faker-js/faker";

export default function Story({ seen }) {
  return (
    <div className="flex flex-col text-center">
      <div
        className={`w-16 h-16 min-w-[4rem] p-1 mb-1 rounded-full border ${
          !seen && "border-red-400"
        }`}
      >
        <img
          src={faker.internet.avatar()}
          className="w-full h-full bg-slate-300 rounded-full" alt="user avatar"
        ></img>
      </div>
      <div
        className={`max-w-[10ch] text-xs overflow-hidden lowercase truncate  ${
          seen && "text-neutral-500"
        }`}
      >
        {faker.internet.userName()}
      </div>
    </div>
  );
}
