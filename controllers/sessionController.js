const passport = require('passport');
const userModel = require('../dao/model/user-model');
const { createHash, isValidPassword } = require('../utils/passwordHash');

async function githubAuth(req, res) {
    console.log('GitHub authentication initiated');
}

async function githubAuthCallback(req, res) {
    console.log('GitHub authentication callback received');
    req.session.user = req.user;
    console.log('User in session:', req.session.user);

    console.log('User data:', req.user);

    return res.render('profile', { user: req.user, showHeader: true });
}

async function register(req, res) {
    const body = req.body;
    body.password = createHash(body.password);
    console.log('Solicitud de registro recibida');
    console.log({ body });

    if (req.query.client === 'view') {
        return res.redirect('/sessions/login');
    }
    return res.redirect('/sessions/login');
}

function failRegister(req, res) {
    return res.json({
        error: 'Error al registrarse',
    });
}

async function login(req, res) {
    try {
      let user = await userModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({
          error: 'El usuario no existe en el sistema'
        });
      }
  
      if (!isValidPassword(req.body.password, user.password)) {
        return res.status(401).json({
          error: 'Contraseña incorrecta'
        });
      }
  
      user = user.toObject();
      delete user.password;
  
      req.session.user = user;
  
      await sessionService.updateUserLastConnection(user._id);
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Error al iniciar sesión'
      });
    }
  }
  
  function logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al cerrar sesión", err);
        return res.status(500).json({ error: 'Error al cerrar sesión' });
      }
      return res.redirect('/sessions/login');
    });
  }

function failLogin(req, res) {
    return res.json({
        error: 'Error al iniciar sesión',
    });
}



async function recoveryPassword (req, res) {
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json({
            error: 'El usuario no existe en el sistema',
        });
    }

    const newPassword = createHash(req.body.password)
    await userModel.updateOne({email: req.body.email}, {password: newPassword})

    return res.redirect('/login')
}

function current (req, res) {
    if (req.isAuthenticated()) {
        return res.json({user : req.user})
    } else {
        return res.json({user: 'Usuario no autenticado'})
    }
}

module.exports = {
    githubAuth,
    githubAuthCallback,
    register,
    failRegister,
    login,
    failLogin,
    logout,
    recoveryPassword,
    current
}