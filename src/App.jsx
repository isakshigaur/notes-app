import { useState } from "react";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addNote = () => {
    if (!note.trim()) return;
    if (editingIndex !== null) {
      const updated = [...notes];
      updated[editingIndex] = note;
      setNotes(updated);
      setEditingIndex(null);
    } else {
      setNotes([...notes, note]);
    }
    setNote("");
  };

  const deleteNote = (i) => {
    setNotes(notes.filter((_, idx) => idx !== i));
  };

  const editNote = (i) => {
    setNote(notes[i]);
    setEditingIndex(i);
  };

  const shareNote = (n) => {
    const url = `${window.location.origin}/share/${encodeURIComponent(n)}`;
    navigator.clipboard.writeText(url);
    alert("Share link copied: " + url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📝 Notes App</h1>

      <div className="flex gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="flex-grow border p-2 rounded"
        />
        <button
          onClick={addNote}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {notes.map((n, i) => (
          <li
            key={i}
            className="bg-white shadow p-3 flex justify-between items-center rounded"
          >
            <span>{n}</span>
            <div className="flex gap-2">
              <button
                onClick={() => editNote(i)}
                className="bg-yellow-400 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(i)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => shareNote(n)}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Share
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
