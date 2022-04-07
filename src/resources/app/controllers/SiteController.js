const Course = require("../models/Course");
const { multipleMongooseToObject } = require('../../../ulti/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // Course.find({}, function (err, courses) {
        //   if(!err) res.json(courses);
        //   else {
        //     next(err);
        //   }
        // });

        Course.find({})
            .then((courses) => {
                res.render("home", {
                    title: "TEST TITLE",
                    courses: multipleMongooseToObject(courses), // tuowng tu viet course: courses
                });
            })
            .catch(next);

        // res.render("home");
    }

    // [GET] /search
    search(req, res) {
        res.render("search");
    }

    // app.post("/search", (req, res) => {
    //     console.log(req.body);

    //     res.send(req.body);
    //   });
}

module.exports = new SiteController();
