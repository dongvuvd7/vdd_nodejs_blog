const Course = require("../models/Course");
const { multipleMongooseToObject, mongooseToObject } = require("../../../ulti/mongoose");

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // res.send("COURSE DETAIL - " + req.params.slug);
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.json(course);
                res.render("courses/show", {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body);

        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        //Nếu không dùng thư viện auto increment id thì muốn tự động tăng _id thì phải chọc vào database để gọi ra id lớn nhất rồi +1

        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/site"))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => res.render("courses/edit", { course: mongooseToObject(course) }))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        // res.json(req.body);

        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case "delete":
                // res.json(req.body.courseIds);
                //delete array of courses id
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;

            case "force-delete":
                // res.json(req.body.courseIds);
                // delete array of courses id
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;

            case "restore":
                // res.json(req.body.courseIds);
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;

            default:
                res.json({ message: "Action is invalid" });
        }
    }
}

module.exports = new CourseController();
