const isApiRequest = (req) => req.originalUrl.startsWith('/api/');

const reject = (req, res, status, message) => {
  if (isApiRequest(req)) {
    return res.status(status).json({ error: message });
  }

  return res.redirect('/auth/login');
};

export const isAuthenticated = (req, res, next) => {
  if (!req.session?.user) {
    return reject(req, res, 401, 'Login required');
  }

  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.session?.user) {
    return reject(req, res, 401, 'Login required');
  }

  if (req.session.user.role !== 'admin') {
    return reject(req, res, 403, 'Admin access required');
  }

  next();
};
