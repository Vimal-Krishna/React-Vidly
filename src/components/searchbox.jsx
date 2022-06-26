import React from "react";
const SearchBox = ({ searchString, onChange }) => {
    return (
        <input
            className="form-control my-3"
            placeholder="Search..."
            value={searchString}
            onChange={onChange}
        />
    );
};

export default SearchBox;
