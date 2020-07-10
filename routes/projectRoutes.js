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

router.get("/:id", verifyId, (req, res) => {
  Projects.get(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error gathering resource", err: err });
    });
});

router.put("/:id", verifyId, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error updating resource", err: err });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Projects.remove(req.params.id)
    .then((data) => {
      if (data > 0) {
        res
          .status(202)
          .json({ message: "Resource Deleted", deleted: req.previousResource });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error deleting resource", err: err });
    });
});

router.get("/:id/actions", verifyId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error gathering resource", err: err });
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

function verifyId(req, res, next) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "An id is required" });
  }

  Projects.get(id)
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          error: `Could not find project with an id of ${id}`,
        });
      }
      req.previousResource = data;
      next();
    })
    .catch((err) => {
      res.status(404).json({
        error: `Could not find project with an id of ${id}`,
        err: err,
      });
    });
}

module.exports = router;
