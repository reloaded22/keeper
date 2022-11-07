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
    <div className="d-flex justify-content-center">
      <div className="card text-bg-warning bg-opacity-75 w-50">
        <h4 className="card-header text-uppercase">Compose your note</h4>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <label htmlFor="inputTitle" className="form-label fs-4">
                Title
              </label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  onChange={handleChange}
                  name="title"
                  value={inputVals.title}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputContent" className="form-label fs-4">
                Content
              </label>
              <div className="">
                <textarea
                  type="text"
                  className="form-control"
                  id="inputContent"
                  onChange={handleChange}
                  name="content"
                  value={inputVals.content}
                />
              </div>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-lg btn-outline-dark w-25"
                onClick={submitNote}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputArea;

