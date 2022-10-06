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

  function addNote(note) {
    console.log(`Note to add: ${JSON.stringify(note)}`);

    // Add note in the Back-End
    axios
      .post("/api/notes", note)
      .then((res) => {
        console.log(res);
        // If I don't setNotes here it won't update the new added note on the front-end
        setNotes((prevNotes) => [...prevNotes, note]);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function deleteNote(del_id) {
    axios
      .delete(`api/notes/${del_id}`)
      .then((res)=>{
        console.log("\nEntro al then de la llamada delete de Axios:\n");
        console.log(res);
        // Update the front-end as well
        setNotes(notes.filter((note) => note._id !== del_id));
      })
      .catch((err) => {console.log("\nEntro al catch error de la llamada delete de Axios:\n"); console.log(err)});
  }

  // Manage notes in the Back-End
  useEffect(() => {
    // ===> IF I NOT USED THE AXIOS CALL REPEATS IN EVERY RENDER INFINITELY. useEffect ALLOWS TO MAKE THE CALL ONLY WHEN [] CHANGES:

    axios
      .get("/api/notes")
      .then((res) => {
        console.log("Notes in the Mongo database:");
        console.log(res.data);
        // Set notes equal to the notes received from the API (the nodejs server that communicates with the mongo database)
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
                  const note_id = notes[i]._id;
                  return (
                    <Note
                      key={i}
                      title={note.title}
                      content={note.content}
                      obj_id={note_id}
                      onDelete={() => deleteNote(note_id)}
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
