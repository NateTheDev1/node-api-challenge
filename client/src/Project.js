import React, { useState } from "react";
import { PageHeader, Descriptions, Button } from "antd";
import Axios from "axios";

const BASE = "http://localhost:8000/api";

const Project = ({ project }) => {
  const [actions, setActions] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleActions = () => {
    if (actions.length < 1) {
      Axios.get(`${BASE}/projects/${project.id}/actions`)
        .then((res) => {
          console.log(res.data);
          setActions(res.data);
          setFetched(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFetched(false);
      setActions([]);
    }
  };

  const handleDelete = () => {
    Axios.delete(`${BASE}/projects/${project.id}`)
      .then((data) => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!deleted && (
        <>
          <Descriptions title="Project Info" key={project.id}>
            <Descriptions.Item label="Name">{project.name}</Descriptions.Item>
            <Descriptions.Item label="id">{project.id}</Descriptions.Item>
            <Descriptions.Item label="description">
              {project.description}
            </Descriptions.Item>
          </Descriptions>
          {actions.map((a) => (
            <ul key={a.id}>
              <li>Description: {a.description}</li>
              <li>Completed: {a.completed}</li>
              <li>id: {a.id}</li>
              <li>project_id: {a.project_id}</li>
              <li>notes: {a.notes}</li>
            </ul>
          ))}
          {fetched && actions.length < 1 ? (
            <p style={{ fontSize: "2rem" }}>No Actions Were Found</p>
          ) : null}
          <Button size="large" type="primary" onClick={handleActions}>
            {actions.length === 0 ? "Get Actions" : "Clear Actions"}
          </Button>
          <Button size="large" type="danger" onClick={handleDelete}>
            Delete Project
          </Button>
        </>
      )}
    </>
  );
};

export default Project;
