const firebase = require("../services/firebase");

const getTodos = (req, res, next) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Endpoint para obter todas as tarefas'
  const { uid } = req.params;

  firebase
    .database()
    .ref("todos/" + uid)
    .once("value", (snapshot) => {
      const data = snapshot.val();
      res.status(200).json({
        message: "Tarefas encontradas",
        data: data ? Object.values(data) : [],
      });

      next();
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erro ao obter tarefas",
        error: error,
      });

      console.error(error);
    });
};

const searchTodos = (req, res, next) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Endpoint para buscar tarefas'
  const { uid } = req.params;
  const { search } = req.params;

  firebase
    .database()
    .ref("todos/" + uid)
    .once("value", (snapshot) => {
      const data = snapshot.val();
      const todos = data ? Object.values(data) : [];
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );

      res.status(200).json({
        message: "Tarefas encontradas",
        data: data ? filteredTodos : [],
      });

      next();
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erro ao obter tarefas",
        error: error,
      });

      console.error(error);
    });
};

const getTodo = (req, res, next) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Endpoint para obter uma tarefa'

  const { uid, id } = req.params;

  firebase
    .database()
    .ref("todos/" + uid + "/" + id)
    .once("value", (snapshot) => {
      const data = snapshot.val();
      res.status(200).json({
        message: "Tarefa encontrada",
        data: data || {},
      });

      next();
    });
};

const createTodo = (req, res, next) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Endpoint para criar uma tarefa'
  const { title, description } = req.body; // #swagger.parameters['data'] = { description: 'Dados da tarefa', type: 'object', in: 'body', schema: { $ref: "#/definitions/Todo" } }
  const { uid } = req.params; // #swagger.parameters['uid'] = { description: 'ID do usuário' }

  if (title === "" || description === "") {
    res.status(400).json({
      message: "Título e descrição são obrigatórios",
    });
  } else {
    firebase
      .database()
      .ref("todos/" + uid + "/")
      .push({
        title,
        description,
        done: false,
      })
      .then((snapshot) => {
        firebase
          .database()
          .ref("todos/" + uid + "/" + snapshot.key)
          .update({
            todoId: snapshot.key,
          })
          .then(() => {
            res.status(200).json({
              message: "Tarefa criada com sucesso",
              data: {
                todoId: snapshot.key,
                title,
                description,
                done: false,
              },
            });

            next();
          })
          .catch((error) => {
            res.status(500).json({
              message: "Erro ao criar tarefaa",
            });

            console.error(error);
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Erro ao criar tarefaaa",
          error: error.response,
        });
      });
  }
};

const updateTodo = (req, res, next) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Endpoint para atualizar uma tarefa'
  const { uid, id } = req.params;
  const { title, description, done } = req.body;
  firebase
    .database()
    .ref("todos/" + uid + "/" + id)
    .update({
      todoId: id,
      title,
      description,
      done,
    })
    .then(() => {
      res.status(200).json({
        message: "Tarefa atualizada com sucesso",
        data: {
          todoId: id,
          title,
          description,
          done,
        },
      });

      next();
    })
    .catch((error) => {
      res.send(error.response);
    });
};

const deleteTodo = (req, res, next) => {
  // #swagger.tags = ['Todo']
  // #swagger.description = 'Endpoint para remover uma tarefa'
  const { uid, id } = req.params;
  firebase
    .database()
    .ref("todos/" + uid + "/" + id)
    .remove()
    .then(() => {
      res.status(200).json({
        message: "Tarefa removida com sucesso",
      });

      next();
    })
    .catch((error) => {
      res.send(error.response);
    });
};

module.exports = {
  getTodos,
  searchTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
