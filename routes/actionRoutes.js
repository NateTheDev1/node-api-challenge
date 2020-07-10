const router = require("express").Router();
const Actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Actions.get()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error gathering resources", err: err });
    });
});

router.post("/", verifyAction, (req, res) => {
  Actions.insert(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a project", err: err });
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          error: `Could not find action with an id of ${id}`,
        });
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(404).json({
        error: `Could not find action with an id of ${id}`,
        err: err,
      });
    });
});

router.put("/:id", verifyAction, verifyId, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error updating resource", err: err });
    });
});

router.delete("/:id", verifyId, (req, res) => {
  Actions.remove(req.params.id)
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

function verifyAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  const project = projects.get(project_id);
  if (!project) {
    res
      .status(404)
      .json({ error: `Could not find project with the id of ${project_id}` });
  }

  if (description && notes) {
    if (description.length > 128) {
      res
        .status(400)
        .json({ err: "Description must be less than 128 characters" });
    }
    next();
  } else {
    res.status(400).json({ error: "Required: Description and Notes" });
  }
}

function verifyId(req, res, next) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "An id is required" });
  }
  Actions.get(id)
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          error: `Could not find action with an id of ${id}`,
        });
      }
      req.previousResource = data;
      next();
    })
    .catch((err) => {
      res.status(404).json({
        error: `Could not find action with an id of ${id}`,
        err: err,
      });
    });
}

module.exports = router;
