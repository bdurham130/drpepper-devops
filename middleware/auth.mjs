// Middleware: Check if user is logged in
export const isAuthenticated = (req, res, next) => {
  // TODO: Phase 2 — enforce login check
  // For now, allow all requests through
  next();
};

// Middleware: Check if user is admin
export const isAdmin = (req, res, next) => {
  // TODO: Phase 2 — enforce admin role check
  // For now, allow all requests through
  next();
};
