const Course = require("../models/Course");
const { multipleMongooseToObject } = require('../../../ulti/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.send("Khóa học của tôi đây");

        Course.find({})
            .then((courses) =>
                res.render("me/stored-courses", {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
