import { useState, useEffect } from "react";
import "./notes.scss";

const Notes = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("userNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
      setIsExpanded(false);
    }
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
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
                <p>{note}</p>
              </div>
              <div className="note-actions">
                <span className="note-date">
                  {new Date().toLocaleDateString()}
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