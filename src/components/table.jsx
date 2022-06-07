import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = (props) => {
    const { data, columns, sortColumn, onSort } = props;
    return (
        <table className="table">
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
            <TableBody columns={columns} data={data} />
        </table>
    );
};

export default Table;
