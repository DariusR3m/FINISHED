import { useState, useEffect } from "react";
import "./notes.scss";

type Note = {
  text: string;
  date: string;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
  const savedNotes = localStorage.getItem("userNotes");
  if (savedNotes) {
    try {
      const parsed = JSON.parse(savedNotes);
      // Check if it's old format (string[])
      if (Array.isArray(parsed) && typeof parsed[0] === "string") {
        const upgraded = parsed.map((text: string) => ({
          text,
          date: new Date().toISOString(),
        }));
        setNotes(upgraded);
      } else if (
        Array.isArray(parsed) &&
        parsed[0] &&
        typeof parsed[0].text === "string"
      ) {
        setNotes(parsed);
      }
    } catch (e) {
      console.error("Failed to parse saved notes:", e);
    }
  }
}, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      const newEntry: Note = {
        text: newNote,
        date: new Date().toISOString(),
      };
      setNotes([...notes, newEntry]);
      setNewNote("");
      setIsExpanded(false);
    }
  };

  const deleteNote = (index: number) => {
  const confirmed = window.confirm("Are you sure you want to delete this note?");
  if (confirmed) {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    }
  };


  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>Personal Notes</h1>
        <p className="subtitle">Your private thoughts and reminders</p>
      </div>

      <div className={`notes-editor ${isExpanded ? "expanded" : ""}`}>
        <div className="editor-header" onClick={() => setIsExpanded(!isExpanded)}>
          <span>Write your note here...</span>
          <span>{isExpanded ? "−" : "+"}</span>
        </div>
        {isExpanded && (
          <>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Start typing your note..."
              autoFocus
            />
            <div className="editor-actions">
              <button className="cancel-btn" onClick={() => setIsExpanded(false)}>
                Cancel
              </button>
              <button className="add-btn" onClick={addNote}>
                Add Note
              </button>
            </div>
          </>
        )}
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Add your first note!</p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-card">
              <div className="note-content">
                <p>{note.text}</p>
              </div>
              <div className="note-actions">
                <span className="note-date">
                  {new Date(note.date).toLocaleDateString()}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => deleteNote(index)}
                  aria-label="Delete note"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="currentColor"
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
