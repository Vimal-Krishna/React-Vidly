import React, { Component } from "react";
import { toast } from "react-toastify";
//import { deleteMovie, getMovies } from "../services/fakeMovieService";
//import { getGenres } from "../services/fakeGenreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

import Genres from "./genres";
import SearchBox from "./searchbox";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Link from "react-router-dom/Link";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: 0,
        searchString: "",
        sortColumn: { path: "title", order: "asc" },
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ name: "All Genres", _id: 0 }, ...data];
        const { data: movies } = await getMovies();
        this.setState({ movies: movies, genres });
    }

    handleSearch = ({ currentTarget: input }) => {
        this.setState({
            searchString: input.value,
            selectedGenre: 0,
            currentPage: 1,
        });
    };

    handleNewMovie = () => {
        console.log("New movie");
        this.props.history.push("/movies/new");
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = this.state.movies.indexOf(movie);
        movie.liked = !movie.liked;
        movies[index] = movie;
        this.setState({ movies });
    };

    handleDelete = async (movieId) => {
        const originalMovies = this.state.movies;

        const movies = originalMovies.filter((movie) => {
            return movie._id !== movieId;
        });
        this.setState({ movies });
        try {
            await deleteMovie(movieId);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("Movies has already been deleted");
                this.setState({ movies: originalMovies });
            }
        }
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        console.log("Genre Clicked", genre);
        this.setState({
            selectedGenre: genre._id,
            searchString: "",
            currentPage: 1,
        });
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
            searchString,
            pageSize,
        } = this.state;

        let filtered = allMovies;

        if (searchString) {
            console.log(searchString);
            filtered = filtered.filter((m) =>
                m.title.toLowerCase().startsWith(searchString.toLowerCase())
            );
        } else if (selectedGenre !== 0) {
            filtered = filtered.filter(
                (movie) => movie.genre._id === selectedGenre
            );
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies };
    };

    render() {
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
                    <Link
                        to="/movies/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Movie
                    </Link>
                    <h6>{movieString}</h6>
                    <SearchBox
                        searchString={this.state.searchString}
                        onChange={this.handleSearch}
                    />
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
