const { firebase } = require("../services/firebase");

const getTodos = (req, res, next) => {
  firebase
    .database()
    .ref("todos")
    .once("value", (snapshot) => {
      const data = snapshot.val();
      res.status(200).json({
        message: "Todos fetched successfully",
        data: Object.values(data),
      });

      next();
    });
};

const getTodo = (req, res, next) => {
  const id = req.params.id;
  firebase
    .database()
    .ref("todos/" + id)
    .once("value", (snapshot) => {
      const data = snapshot.val();
      res.status(200).json({
        message: "Todo fetched successfully",
        data: data,
      });

      next();
    });
};

const createTodo = (req, res, next) => {
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

          next();
        })
        .catch((error) => {
          res.status(500).json({
            message: "Todo creation failed",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Todo creation failed",
        error: error,
      });
    });
};

const updateTodo = (req, res, next) => {
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

      next();
    })
    .catch((error) => {
      res.send(error.response);
    });
};

const deleteTodo = (req, res, next) => {
  const id = req.params.id;
  firebase
    .database()
    .ref("todos/" + id)
    .remove()
    .then(() => {
      res.status(200).json({
        message: "Todo deleted successfully",
      });

      next();
    })
    .catch((error) => {
      res.send(error.response);
    });
};

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
