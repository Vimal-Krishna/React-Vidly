import React, { Component } from "react";
class Like extends Component {
    render() {
        const heartClass =
            this.props.movie.liked === true
                ? "clickable fa fa-heart"
                : "clickable fa fa-heart-o";
        return (
            <i
                onClick={() => this.props.onLike(this.props.movie)}
                className={heartClass}
                aria-hidden="true"
            ></i>
        );
    }
}

export default Like;
