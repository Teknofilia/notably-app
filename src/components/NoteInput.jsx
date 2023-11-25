"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const NoteInput = () => {
  const router = useRouter();
  const [note, setNote] = useState("");

  async function createNote() {
    const res = await fetch(
      "https://devscale-mockapi.fly.dev/api/collections/notes/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: note,
          user: "siadnan@mail.com",
          additionalData: "",
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    router.refresh();
  }

  return (
    <div className="flex justify-between px-4 gap-4 w-full m-auto ">
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="lagi mikirin apa kak?"
        className="border-b-2 w-full p-2 m-auto rounded-md focus:border-teal-500 focus:outline-none  shadow-2xl shadow-teal-100/20 focus:shadow-teal-300  bg-slate-300 transition"
      />
      <button
        className="rounded-md border -mr-1 p-2 w-1/5 text-sm bg-emerald-600 hover:bg-emerald-400 text-white transition"
        onClick={createNote}
      >
        Save Note
      </button>
    </div>
  );
};
