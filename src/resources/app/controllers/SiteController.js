const res = require("express/lib/response");

class SiteController {

    // [GET] /
    index(req, res){
        res.render('home');
    }

    // [GET] /search
    search(req, res){
        res.render("search");
    }

    // app.post("/search", (req, res) => {
    //     console.log(req.body);
    
    //     res.send(req.body);
    //   });

}

module.exports = new SiteController;