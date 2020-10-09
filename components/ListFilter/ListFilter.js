import React from "react";
import { DataFilter } from "../../variables/DataFilter/DataFilter";
const ListFilter = ({ data, option }) => {
  return (
    <>
      {data
        .filter((item) => DataFilter(item, option))
        .map((subitem, index) => (
          <tr key={`subitem${index.toString()}`}>
            <td>{subitem._type==="1" ? "upload" : "download"}</td>
            <td>{subitem.filetype}</td>
            <td>{subitem.user}</td>
            <td>{subitem.size}</td>
            <td>{new Date(parseInt(subitem.time)*1000).toLocaleTimeString()}</td>
          </tr>
        ))}
    </>
  );
};
export default ListFilter;
