"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const NoteCard = ({ id, content }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  async function handleDelete() {
    await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  }

  async function handleUpdate() {
    const res = await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: currentContent }),
      }
    );
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  return (
    <div className="noteCard flex gap-2 p-4 rounded-lg items-center border border-slate-300 hover:border-slate-500 hover:shadow-md shadow-sky-300 bg-stone-200 transition">
      {onEdit ? (
        <input
          className="flex w-full rounded-sm outline-none resize-none border-b-4"
          rows="3"
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
        />
      ) : (
        <div className="flex flex-col w-full">{currentContent}</div>
      )}
      {onEdit ? (
        <button
          className="text-xs bg-lime-300 p-2 rounded-lg hover:text-white hover:bg-lime-500 text-slate-900"
          onClick={handleUpdate}
        >
          Update
        </button>
      ) : (
        <button
          className="text-xs bg-amber-300 p-2 rounded-lg hover:text-white hover:bg-amber-500 text-slate-900"
          onClick={() => setOnEdit(true)}
        >
          Edit
        </button>
      )}
      <button
        className="text-xs bg-rose-300 p-2 rounded-lg hover:text-white hover:bg-rose-500 text-slate-900"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
