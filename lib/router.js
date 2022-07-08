'use strict';
const postsHandler = require('./posts-handler');
const util = require('./handler-util');
const Cookies = require('cookies');
const nowThemeKey = 'now_theme';

function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/posts/delete':
      postsHandler.handleDelete(req, res);
      break;
    case '/logout':
      util.handleLogout(req, res);
      break;
    case '/favicon.ico':
      util.handleFavicon(req, res);
      break;
    case '/changeTheme':
      const cookies = new Cookies(req, res);
      if (!cookies.get(nowThemeKey) ||
        cookies.get(nowThemeKey) === 'dark') {
        cookies.set(nowThemeKey, 'light');
      } else {
        cookies.set(nowThemeKey, 'dark');
      } 
      postsHandler.handle(req, res);
      break;
    default:
      util.handleNotFound(req, res);
      break;
  }
}

module.exports = {
  route
};
