const newsRouter = require('./news.js');
const siteRouter = require('./site');

function route(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });


  app.use('/news', newsRouter);

  app.use('/', siteRouter);


}

module.exports = route;
