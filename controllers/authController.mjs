import User from '../models/User.mjs';

const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'ChangeMe123!';

export const ensureAdminAccount = async () => {
  const existingAdmin = await User.findOne({ role: 'admin' }).lean();

  if (existingAdmin) {
    return;
  }

  const username = process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    existingUser.role = 'admin';

    if (process.env.ADMIN_PASSWORD) {
      existingUser.password = password;
    }

    await existingUser.save();
    return;
  }

  await User.create({
    username,
    password,
    role: 'admin'
  });
};

export const loginPage = (req, res) => {
  if (req.session?.user?.role === 'admin') {
    return res.redirect('/leaderboard');
  }

  res.render('login', {
    title: 'Admin Login',
    user: req.session?.user || null,
    error: null
  });
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).render('login', {
        title: 'Admin Login',
        user: req.session?.user || null,
        error: 'Username and password are required.'
      });
    }

    const user = await User.findOne({ username: username.trim() });

    if (!user || user.role !== 'admin') {
      return res.status(401).render('login', {
        title: 'Admin Login',
        user: req.session?.user || null,
        error: 'Invalid admin credentials.'
      });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).render('login', {
        title: 'Admin Login',
        user: req.session?.user || null,
        error: 'Invalid admin credentials.'
      });
    }

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      role: user.role
    };

    res.redirect('/leaderboard');
  } catch (err) {
    console.error('Admin login failed:', err.message);
    res.status(500).render('login', {
      title: 'Admin Login',
      user: req.session?.user || null,
      error: 'Login failed. Please try again.'
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};
