import http from "./httpService";
import config from "../config.json";

function movieUrl(id) {
    if (!id) {
        id = "";
    }
    return `${config.apiEndpoint}/movies/${id}`;
}

export function getMovies() {
    return http.get(config.apiEndpoint + "/movies");
}

export function getMovie(id) {
    return http.get(movieUrl(id));
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }
    return http.post(movieUrl(), movie);
}

export function deleteMovie(id) {
    return http.delete(movieUrl(id));
}
