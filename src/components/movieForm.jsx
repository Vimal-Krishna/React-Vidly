import React from "react";
const handleClick = (props) => {
    console.log(props.history.replace("/movies"));
};

const MovieForm = ({ match, history }) => {
    return (
        <div>
            <h1>Movie Form {match.params.id}</h1>
            <button
                className="btn btn-primary"
                onClick={() => history.push("/movies")}
            >
                Save
            </button>
        </div>
    );
};

export default MovieForm;