import React, { Component } from "react";
import Like from "./common/like";
import Table from "./table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
    columns = [
        {
            name: "Title",
            path: "title",
            content: (movie) => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        { name: "Genre", path: "genre.name" },
        { name: "Stock", path: "numberInStock" },
        { name: "Rate", path: "dailyRentalRate" },
        {
            key: "like",
            content: (movie) => (
                <Like movie={movie} onLike={this.props.onLike} />
            ),
        },
        {
            key: "delete",
            content: (movie) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.onDelete(movie._id)}
                >
                    Delete
                </button>
            ),
        },
    ];

    render() {
        const { data, sortColumn, onSort } = this.props;

        return (
            <Table
                columns={this.columns}
                data={data}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default MoviesTable;
