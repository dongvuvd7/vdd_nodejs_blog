const Course = require("../models/Course");
const { multipleMongooseToObject } = require('../../../ulti/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.send("Khóa học của tôi đây");

        // res.json(res.locals._sort);

        let courseQuery = Course.find({});

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
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
        // res.send("Khóa học đã xóa của tôi đây");

        let courseQuery = Course.findDeleted({});

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        //show all the courses that are in the trash
        courseQuery
            .then((courses) =>
                res.render("me/trash-courses", {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
