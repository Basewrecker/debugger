import React from "react";

const LogItem = (props) => {
  return (
    <tr>
      <td>{props.log.priority}</td>
      <td>{props.log.text}</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
  );
};

export default LogItem;
