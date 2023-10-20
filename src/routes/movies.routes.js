const { Router } = require("express");
const { moviesControllers } = require("../controllers");
const { validator } = require("../middlewares");
const Auth = require("../middlewares/auth");
const ROLE = require("../constants")
const diskStorage = require("../middlewares/multer");
const multer = require("multer");

const router = Router();
const { validate, requirements } = validator;
const upload = multer({ storage: diskStorage });

router
    .route("/")
    .get(
        Auth.authenticate,
        validate(requirements.getMovies),
        Auth.checkUser(ROLE.MEMBER, ROLE.ADMIN),
        moviesControllers.getMovies
    )
    .post(
        Auth.authenticate,
        upload.single('photo'),
        validate(requirements.createMovie),
        Auth.checkAdmin(ROLE.ADMIN),
        moviesControllers.createMovie,
    )

router
    .route("/:id")
    .get(
        Auth.authenticate,
        validate(requirements.getMovieById),
        Auth.checkUser(ROLE.MEMBER, ROLE.ADMIN),
        moviesControllers.getMovieById
    )
    .put(
        Auth.authenticate,
        upload.single('photo'),
        validate(requirements.updateMovie),
        Auth.checkAdmin(ROLE.ADMIN),
        moviesControllers.updateMovie,
    )
    .delete(
        Auth.authenticate,
        validate(requirements.deleteMovie),
        Auth.checkAdmin(ROLE.ADMIN),
        moviesControllers.deleteMovie,
    )
 
    
module.exports = router;