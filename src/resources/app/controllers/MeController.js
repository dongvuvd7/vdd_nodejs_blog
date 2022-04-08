const Course = require("../models/Course");
const { multipleMongooseToObject } = require('../../../ulti/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.send("Khóa học của tôi đây");

        Promise.all([Course.find({}), Course.countDocumentsDeleted({})])
            .then(([courses, deletedCount]) => 
                res.render("me/stored-courses", {
                    courses: multipleMongooseToObject(courses),
                    deletedCount,
                })
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        // .then((deletedCount) => {
        //     console.log(deletedCount);
        // })
        // .catch(() => {});

        // Course.find()
        //     .then((courses) =>
        //         res.render("me/stored-courses", {
        //             courses: multipleMongooseToObject(courses),
        //         })
        //     )
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        // res.send("Khóa học của tôi đây");

        //show all the courses that are in the trash
        Course.findDeleted({})
            .then((courses) =>
                res.render("me/trash-courses", {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
