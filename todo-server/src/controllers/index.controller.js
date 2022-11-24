const { firebase } = require("../services/firebase");

const getTodos = (req, res) => {
  firebase
    .database()
    .ref("todos")
    .on("value", (snapshot) => {
      const data = snapshot.val();
      res.status(200).json({
        message: "Todos fetched successfully",
        data: Object.values(data),
      });
    });
};

const getTodo = (req, res) => {
  const id = req.params.id;
  firebase
    .database()
    .ref("todos/" + id)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      res.status(200).json({
        message: "Todo fetched successfully",
        data: data,
      });
    });
};

const createTodo = (req, res) => {
  const data = req.body;
  firebase
    .database()
    .ref("todos")
    .push(data)
    .then((snapshot) => {
      firebase
        .database()
        .ref("todos/" + snapshot.key)
        .update({
          id: snapshot.key,
        })
        .then(() => {
          res.status(200).json({
            message: "Todo created successfully",
            data: data,
          });
        });
    })
    .catch((error) => {
      res.send(error.response);
    });
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  firebase
    .database()
    .ref("todos/" + id)
    .update(data)
    .then(() => {
      res.status(200).json({
        message: "Todo updated successfully",
        data: data,
      });
    })
    .catch((error) => {
      res.send(error.response);
    });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  firebase
    .database()
    .ref("todos/" + id)
    .remove()
    .then(() => {
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    })
    .catch((error) => {
      res.send(error.response);
    });
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
