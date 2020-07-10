/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it
Go code!
*/

const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());

const projectRoutes = require("./routes/projectRoutes");
server.use("/api/projects", projectRoutes);
const actionRoutes = require("./routes/actionRoutes");
server.use("/api/actions", actionRoutes);

server.get("/", (req, res) => {
  res.json("Welcome to Node API Sprint Challenge - 1");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
});
