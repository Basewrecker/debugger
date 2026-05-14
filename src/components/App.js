import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LogItem from "./LogItem";

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
  return (
    <Container>
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
            <LogItem log={log} key={log._id} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
