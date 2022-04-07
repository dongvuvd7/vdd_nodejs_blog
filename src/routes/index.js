const newsRouter = require('./news.js');
const siteRouter = require('./site.js');
const coursesRouter = require('./courses.js');
const meRouter = require('./me.js');

function route(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });


  app.use('/news', newsRouter);

  app.use('/site', siteRouter);
  // app.use('/', siteRouter);

  app.use('/courses', coursesRouter);

  app.use('/me', meRouter);

}

module.exports = route;
