// React Modules
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import InputArea from "./components/InputArea";
import TestPage from "./components/TestPage";
// Axios
const axios = require("axios").default;

function App() {
  // Manage notes in the Front-End
  const [notes, setNotes] = useState([]);

  // Manage notes in the Back-End
  useEffect(()=>{ // ===> IF I NOT USED THE AXIOS CALL REPEATS IN EVERY RENDER INFINITELY. useEffect ALLOWS TO MAKE THE CALL ONLY WHEN [] CHANGES:
    console.log("===> Inside useEffect <===")
    axios
      .get("/api/notes")
      .then((res) => {
        // Set notes equal to the notes received from the API (the nodejs server that communicates with the mongo database)
        setNotes(res.data); 
        console.log("Notes in the Mongo database:");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  },[])


  function addNote(note) {

    console.log(`Note to add: ${JSON.stringify(note)}`);

    // Add note in the Back-End
    axios
      .post("/api/notes", note)
      .then(function (res) {
        console.log(res);
        // If I don't setNotes here it won't update the new added note on the front-end
        setNotes((prevNotes) => [...prevNotes, note]);
      })
      .catch(function (err) {
        console.log(err);
      });
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
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
