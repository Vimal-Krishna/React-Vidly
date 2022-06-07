import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";
import NavBar from "./components/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MovieForm from "./components/movieForm";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route
                            path="/movies/:id"
                            render={(props) => <MovieForm {...props} />}
                        />
                        <Route path="/movies" component={Movies} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect path="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
