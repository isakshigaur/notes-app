import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes, Route, Link, useParams } from 'react-router-dom'

const api = import.meta.env.VITE_API_URL

function NotesList() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')

  const fetchNotes = async () => {
    const res = await axios.get(`${api}/notes`)
    setNotes(res.data)
  }

  const createNote = async () => {
    if (!text) return
    await axios.post(`${api}/notes`, { text })
    setText('')
    fetchNotes()
  }

  const deleteNote = async (id) => {
    await axios.delete(`${api}/notes/${id}`)
    fetchNotes()
  }

  const shareNote = async (id) => {
    const res = await axios.post(`${api}/notes/${id}/share`)
    alert(`Share link: ${window.location.origin}/p/${res.data.slug}`)
  }

  useEffect(() => { fetchNotes() }, [])

  return (
    <div>
      <h1>Notes</h1>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="New note" />
      <button onClick={createNote}>Add</button>
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            {n.text}
            <button onClick={() => deleteNote(n.id)}>Delete</button>
            <button onClick={() => shareNote(n.id)}>Share</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PublicNote() {
  const { slug } = useParams()
  const [note, setNote] = useState(null)

  useEffect(() => {
    axios.get(`${api}/public/${slug}`).then(res => setNote(res.data))
  }, [slug])

  if (!note) return <p>Loading...</p>
  return <div><h2>Shared Note</h2><p>{note.text}</p></div>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path="/p/:slug" element={<PublicNote />} />
    </Routes>
  )
}
