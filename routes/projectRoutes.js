const router = require("express").Router();
const Projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Projects.get()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error gathering resources", err: err });
    });
});

router.post("/", verifyProject, (req, res) => {
  Projects.insert(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a project", err: err });
    });
});

function verifyProject(req, res, next) {
  const { name, description } = req.body;
  if (name && description) {
    next();
  } else {
    res.status(400).json({ error: "Name and description is required" });
  }
}

module.exports = router;
