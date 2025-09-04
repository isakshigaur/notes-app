import { useState } from "react";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="border p-2 rounded w-64"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-6">
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
