// Stateless module AND uncontrolled inputs

function InputArea(props) {

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
}

export default InputArea;