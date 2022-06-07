import React, { Component } from "react";
const Genres = (props) => {
    const {
        genres,
        selectedGenre,
        textProperty,
        valueProperty,
        onGenreSelect,
    } = props;
    return (
        <ul className="list-group">
            {genres.map((genre) => (
                <li
                    key={genre[valueProperty]}
                    className={
                        genre[valueProperty] === selectedGenre
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    onClick={() => onGenreSelect(genre)}
                >
                    {genre[textProperty]}
                </li>
            ))}
        </ul>
    );
};

Genres.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
};

export default Genres;
