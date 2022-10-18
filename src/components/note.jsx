
function Note(props) {
    return (
      <div className="col-md-4 note">
        <div className="card text-bg-warning bg-opacity-25">
          <h4 className="card-header text-capitalize">{props.title}</h4>
          <div className="card-body">
            <h5 className="card-title">{props.content}</h5>
            <p className="card-text">ID: {props.id}</p>
            <div className="text-end">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={props.onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Note;
