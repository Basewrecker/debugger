import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Alert } from "react-bootstrap";
import LogItem from "./LogItem";
import AddLogItem from "./AddLogItem";
import { ipcRenderer } from "electron";

const App = () => {
  const [logs, setLogs] = useState([
    {
      _id: 1,
      priority: "High",
      text: "App crashed on login",
      user: "rubair",
      created: "2026-05-14",
    },
    {
      _id: 2,
      priority: "Low",
      text: "Button misaligned",
      user: "rubair",
      created: "2026-05-15",
    },
  ]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    ipcRenderer.send("logs:load");
  }, []);

  function addItem(item) {
    if (item.text === "" || item.user === "" || item.priority === "") {
      showAlert("Please enter all fields", "danger");
      return false;
    }

    item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString();
    setLogs([...logs, item]);
    showAlert("Log added");
  }

  function deleteItem(_id) {
    setLogs(logs.filter((item) => item._id !== _id));
    showAlert("Log removed");
  }

  function showAlert(message, variant = "success", seconds = 3000) {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  }
  return (
    <Container>
      <AddLogItem addItem={addItem} />
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem log={log} key={log._id} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
