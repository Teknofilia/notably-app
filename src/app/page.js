import { NoteCard } from "@/components/NoteCard";
import { NoteInput } from "@/components/NoteInput";

async function getNotes() {
  const res = await fetch(
    "https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='siadnan@mail.com')",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  const { items } = await getNotes();
  return (
    <div>
      <div className="flex mx-auto items-center justify-center p-2 border rounded-lg w-80 mt-4 border-slate-300 hover:border-slate-500 hover:shadow-md">
        <h1>Notably : insert your notes</h1>
      </div>
      <div className="flex flex-col w-full mb-20 ">
        <div className="p-3 space-y-3">
          <div className="space-y-3 w-full">
            {items.map(({ id, content }) => {
              return <NoteCard key={id} id={id} content={content} />;
            })}
          </div>
        </div>
        <NoteInput />
      </div>
    </div>
  );
}
