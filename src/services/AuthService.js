const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const prisma   = require('../config/prisma');
const AppError = require('../utils/AppError');

class AuthService {
  async register(data) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new AppError('Email déjà utilisé.', 409);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const { password, ...userSansPassword } = user;
    return userSansPassword;
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('Email ou mot de passe incorrect.', 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AppError('Email ou mot de passe incorrect.', 401);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const { password: _, ...userSansPassword } = user;
    return { token, user: userSansPassword };
  }
}

module.exports = new AuthService();