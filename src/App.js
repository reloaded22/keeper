// React Modules
import Header from "./components/header";
import Footer from "./components/footer";
import Note from "./components/note";
import InputArea from "./components/InputArea";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [notes, setNotes] = useState([]);

  function addNote(note) {
    console.log("Call addNote(note)\n");
    setNotes((prevNotes) => [...prevNotes, note]);
  }

  function deleteNote(id) {
    setNotes(notes.filter((prevNotes, index) => index !== id));
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <InputArea onAdd={addNote} />
                {notes.map((note, i) => {
                  return (
                    <Note
                      key={i}
                      title={note.title}
                      content={note.content}
                      onDelete={() => deleteNote(i)}
                    />
                  );
                })}
              <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
