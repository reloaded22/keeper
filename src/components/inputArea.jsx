// Statefull module AND controlled inputs
import { useState } from "react";

function InputArea(props) {

  const [inputVals, setInputVal] = useState({
    title: "",
    content: ""
  })

  function handleChange(event) {
    const {name, value} = event.target;
    setInputVal((prevVals)=>({...prevVals, [name]:value}));
  }

  function submitNote() {
    // Add the current note (the current value of both input and text area)
    // to the array of notes
    props.onAdd(inputVals);

    // Reset the input fields to ""
    setInputVal({title: "", content: ""});
  }

  return (
    <div className="input-area">
      <input onChange={handleChange} name="title" value={inputVals.title}></input>
      <textarea onChange={handleChange} name="content" value={inputVals.content}></textarea>
      <button onClick={submitNote}>Add</button>
    </div>
  );
}

export default InputArea;

// Stateless module AND uncontrolled inputs

/* function InputArea(props) {
  const note = {};

  function submitNote() {
    // Set values of title and content
    note.title = document.querySelector("[name='title']").value;
    note.content = document.querySelector("[name='content']").value;
    // Add the note to the array of notes
    props.onAdd(note);
    // Reset the input fields to ""
    document.querySelector("[name='title']").value = "";
    document.querySelector("[name='content']").value = "";
  }

  return (
    <div className="input-area">
      <input name="title"></input>
      <textarea name="content"></textarea>
      <button onClick={submitNote}>Add</button>
    </div>
  );
} */
