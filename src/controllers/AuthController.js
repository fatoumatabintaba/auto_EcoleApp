const AuthService    = require('../services/AuthService');
const { sendSuccess } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      return sendSuccess(res, user, 201, 'Compte créé avec succès.');
    } catch (err) { next(err); }
  }

  async login(req, res, next) {
    try {
      const { token, user } = await AuthService.login(req.body.email, req.body.password);
      return sendSuccess(res, { token, user }, 200, 'Connexion réussie.');
    } catch (err) { next(err); }
  }
}

module.exports = new AuthController();