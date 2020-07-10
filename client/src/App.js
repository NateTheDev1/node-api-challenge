import React, { useEffect, useState } from "react";
import { PageHeader, Descriptions, Button } from "antd";
import axios from "axios";
import Project from "./Project";

const BASE = "http://localhost:8000/api";

const App = () => {
  const [actions, setActions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    axios.get(`${BASE}/projects`).then((res) => {
      setProjects(res.data);
    });
  }, [projects]);

  const newProject = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE}/projects`, formValues)
      .then((res) => {
        setProjects([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={null}
        title="NODE API SPRINT"
        subTitle="7/10/2020"
      />
      <form
        onSubmit={newProject}
        style={{ margin: "0 auto", textAlign: "center" }}
      >
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div
        style={{
          margin: "0 auto",
          marginTop: "5%",
          width: "75%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {projects.map((p) => (
          <Project project={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
