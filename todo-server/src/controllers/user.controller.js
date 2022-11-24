const firebase = require("../services/firebase");

const createUser = (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para criar um usuário'

  if (!req.body.name || req.body.name == "") {
    res.status(400).json({
      message: "Nome não informado",
    });
  } else {
    console.log("Nome okay");
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((userCredential) => {
        firebase
          .database()
          .ref("users/" + userCredential.user.uid)
          .set({
            name: req.body.name,
            email: req.body.email,
          })
          .then(() => {
            res.status(200).json({
              message: "Usuário criado com sucesso",
            });

            next();
          })
          .catch((error) => {
            res.status(400).json({
              message: "Erro ao criar usuário",
              error: error,
            });
          });
      })
      .catch((error) => {
        var errorCode = error.code;

        switch (errorCode) {
          case "auth/email-already-in-use":
            res.status(500).json({
              message: "Email está em uso",
            });
            break;
          case "auth/invalid-email":
            res.status(500).json({
              message: "Email inválido",
            });
            break;
          case "auth/weak-password":
            res.status(500).json({
              message: "Senha fraca",
            });
            break;
          default:
            res.status(500).json({
              message: "Erro ao criar usuário",
            });
            break;
        }
      });
  }
};

const loginUser = (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para logar um usuário'
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      var user = userCredential.user;
      res.status(200).json({
        message: "Usuário logado com sucesso",
        uid: user.uid,
      });
      next();
    })
    .catch((error) => {
      var errorCode = error.code;

      switch (errorCode) {
        case "auth/invalid-email":
          res.status(500).json({
            message: "Email inválido",
          });
          break;
        case "auth/user-disabled":
          res.status(500).json({
            message: "Usuário desabilitado",
          });
          break;
        case "auth/user-not-found":
          res.status(500).json({
            message: "Usuário não encontrado",
          });
          break;
        case "auth/wrong-password":
          res.status(500).json({
            message: "Senha incorreta",
          });
          break;
        default:
          res.status(500).json({
            message: "Erro ao logar usuário",
          });
          break;
      }
    });
};

const logoutUser = (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para deslogar um usuário'

  firebase
    .auth()
    .signOut()
    .then(() => {
      res.status(200).json({
        message: "Usuário deslogado com sucesso",
      });

      next();
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erro ao deslogar usuário",
      });
    });
};

const getUser = (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para buscar um usuário'

  firebase
    .database()
    .ref("users/" + firebase.auth().currentUser.uid)
    .once("value")
    .then((snapshot) => {
      res.status(200).json({
        message: "Usuário encontrado",
        user: snapshot.val(),
      });

      next();
    })
    .catch((error) => {
      res.status(400).json({
        message: "Erro ao buscar usuário",
        error: error,
      });
    });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUser,
};
