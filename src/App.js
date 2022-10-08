// React Modules
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import InputArea from "./components/InputArea";
// Axios
const axios = require("axios").default;

function App() {
  // MONGO ////////////////////////////////////////////////
  // Manage notes in the Front-End
  const [notes, setNotes] = useState([]);
  const [click, setClick] = useState("");

  // Read notes in mongo
  useEffect(() => {
    axios
      .get("/api/mongo")
      .then((res) => {
        console.log("Notes in the Mongo database:");
        console.log(res.data);
        // Set notes equal to the notes received
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, [click]);

  function addNote(note) {
    console.log(`Note to add: ${JSON.stringify(note)}`);
    // Add note to the database
    axios
      .post("/api/mongo", note)
      .then((res) => {
        console.log(res);
        // Re-render to make the axios call inside useEffect
        // and update the front-end
        setClick((state) => (state === "click" ? "" : "click"));
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function deleteNote(id) {
    console.log(`Id to delete: ${id}`);
    // Delete note from the database
    axios
      .delete(`/api/mongo/${id}`)
      .then((res) => {
        console.log("\nSuccessful Axios delete call:\n");
        console.log(res);
        // Re-render to make the axios call inside useEffect
        // and update the front-end
        setClick((state) => (state === "click" ? "" : "click"));
      })
      .catch((err) => {
        console.log("\nAxios Error:\n");
        console.log(err);
      });
  }
  /////////////////////////////////////////////////////////

  // DYNAMO ////////////////////////////////////////////////
  // Manage notes in the Front-End
  const [dynamoNotes, setDynamoNotes] = useState([]);
  const [dynamoClick, setDynamoClick] = useState("");

  // Read notes in Dyanmo
  useEffect(() => {
    axios
      .get("/api/dynamo")
      .then((res) => {
        console.log("Notes in the Dynamo database:");
        console.log(res.data.Items);
        // Set notes equal to the notes received
        setDynamoNotes(res.data.Items);
      })
      .catch((err) => {
        console.log("\nAxios error:")
        console.log(err);
      });
  }, [dynamoClick]);

  function addDynamoNote(note) {
    console.log(`Note to add: ${JSON.stringify(note)}`);
    // Add note to the database
    axios
      .post("/api/dynamo", note)
      .then((res) => {
        console.log("\nSuccessful Axios call");
        // Re-render to make the axios call inside useEffect
        // and update the front-end
        setDynamoClick((state) => (state === "click" ? "" : "click"));
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function deleteDynamoNote(id) {
    console.log(`Id to delete: ${id}`);
    // Delete note from the database
    axios
      .delete(`/api/dynamo/${id}`)
      .then((res) => {
        console.log("\nSuccessful Axios delete call:\n");
        console.log(res);
        // Re-render to make the axios call inside useEffect
        // and update the front-end
        setDynamoClick((state) => (state === "click" ? "" : "click"));
      })
      .catch((err) => {
        console.log("\nAxios Error:\n");
        console.log(err);
      });
  }
  /////////////////////////////////////////////////////////

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* MongoDB Route */}
          <Route
            path="/mongo"
            element={
              <div>
                <Header />
                <div className="container">
                  <InputArea onAdd={addNote} />
                  <div className="row">
                    {notes.map((note, i) => {
                      const note_id = notes[i]._id;
                      return (
                        <Note
                          key={i}
                          title={note.title}
                          content={note.content}
                          id={note_id}
                          onDelete={() => deleteNote(note_id)}
                        />
                      );
                    })}
                  </div>
                  <Footer />
                </div>
              </div>
            }
          />
          {/* DynamoDB Route */}
          <Route
            path="/dynamo"
            element={
              <div>
                <Header />
                <div className="container">
                  <InputArea onAdd={addDynamoNote} />
                  <div className="row">
                    {dynamoNotes.map((note, i) => {
                      return (
                        <Note
                          key={i}
                          title={note.title}
                          content={note.content}
                          id={note.id}
                          onDelete={() => deleteDynamoNote(note.id)}
                        />
                      );
                    })}
                  </div>
                  <Footer />
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
