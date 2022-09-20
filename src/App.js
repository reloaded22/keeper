// React Modules
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import InputArea from "./components/InputArea";
import TestPage from "./components/TestPage";
// UUID
//import { v4 as uuidv4 } from "uuid";
// Axios
const axios = require("axios").default;

function App() {

  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes((prevNotes) => [...prevNotes, note]);
    console.log(`note= ${note}`);
    console.log(`note= ${JSON.stringify(note)}`);
    axios
      /*       .post("/", {title:"THIS IS THE TITLE",content:"THIS IS THE CONTENT"}, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }) */
      .post("/",note)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
