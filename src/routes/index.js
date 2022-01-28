const newsRouter = require('./news.js');
const siteRouter = require('./site.js');

function route(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });


  app.use('/news', newsRouter);

  app.use('/site', siteRouter);


}

module.exports = route;
