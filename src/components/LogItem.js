import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import moment from "react-moment";
import Moment from "react-moment";

const LogItem = ({
  log: { _id, priority, user, text, created },
  deleteItem,
}) => {
  const setVariant = () => {
    if (priority.toLowerCase() === "high") {
      return "danger";
    } else if (priority.toLowerCase() === "moderate") {
      return "warning";
    } else {
      return "success";
    }
  };
  return (
    <tr>
      <td>
        <Badge bg={setVariant()} className="p-2">
          {priority}
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format="MMMM Do YYYY">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="md" onClick={() => deleteItem(_id)}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
