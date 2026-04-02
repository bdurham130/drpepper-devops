// GET / — Home page
export const homePage = (req, res) => {
  res.render('home', {
    title: 'Emoji Match — Home',
    user: req.session?.user || null
  });
};

// GET /game — Game page
export const gamePage = (req, res) => {
  res.render('game', {
    title: 'Emoji Match — Play',
    user: req.session?.user || null
  });
};

// GET /leaderboard — Leaderboard page
export const leaderboardPage = (req, res) => {
  res.render('leaderboard', {
    title: 'Emoji Match — Leaderboard',
    user: req.session?.user || null
  });
};
