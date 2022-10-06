
function Note(props) {
    return (
      <div className="note">
        <h2>{props.title}</h2>
        <h3>{props.content}</h3>
        {/* <h4>{props.obj_id}</h4> */}
        <button onClick={props.onDelete}>Delete</button>
      </div>
    );
}

export default Note;
