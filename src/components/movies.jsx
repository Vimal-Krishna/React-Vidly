import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./genres";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import NavBar from "./navbar";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: 0,
        sortColumn: { path: "title", order: "asc" },
    };

    componentDidMount() {
        const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = this.state.movies.indexOf(movie);
        movie.liked = !movie.liked;
        movies[index] = movie;
        this.setState({ movies });
    };

    handleDelete = (movieId) => {
        const updatedMovies = this.state.movies.filter((movie) => {
            return movie._id !== movieId;
        });
        this.setState({
            movies: updatedMovies,
        });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        console.log("Genre Clicked", genre);
        this.setState({ selectedGenre: genre._id, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            movies: allMovies,
            selectedGenre,
            sortColumn,
            currentPage,
            pageSize,
        } = this.state;

        let filtered = allMovies;
        if (selectedGenre !== 0) {
            filtered = filtered.filter(
                (movie) => movie.genre._id === selectedGenre
            );
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies };
    };

    render() {
        console.log(this.props.match.params);
        const { length: count } = this.state.movies;
        const { sortColumn } = this.state;
        if (count === 0) return <p>There are no movies in the database.</p>;

        var { totalCount, data: movies } = this.getPagedData();

        let movieString = "";
        if (totalCount === 1) {
            movieString = "Showing 1 movie from the database";
        } else {
            movieString = "Showing " + totalCount + " movies from the database";
        }
        return (
            <div className="row">
                <div className="col-3">
                    <Genres
                        genres={this.state.genres}
                        selectedGenre={this.state.selectedGenre}
                        onGenreSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col-9">
                    <h6>{movieString}</h6>
                    <MoviesTable
                        data={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={this.state.pageSize}
                        currentPage={this.state.currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
