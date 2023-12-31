const { moviesServices } = require("../services");

async function getMovies(req, res, next) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;
        const result = await moviesServices.getMovies({ page, limit});
        res.json({
            status: "success",
            data: result.rows,
        });
    } catch (err) {
        next(err);
    }
}

async function getMovieById(req, res, next) {
    try {
        const id = req.params.id;
        const result = await moviesServices.getMovieById(id);
        res.json({
            status: "success",
            data: result.rows,
        });
    } catch (err) {
        next(err);
    }
}

async function createMovie(req, res, next) {
    try {
        const id = parseInt(req.body.id)
        const { title, genres, year } = req.body;
        const upload = req.file;
        let photo = '';
        if (!upload) {
             photo = 'Photo not found';
        } else {
             photo = req.file.filename;
        }
        console.log(photo)
        const result = await moviesServices.createMovie({ id, title, genres, year, photo });
        const resResponse = await moviesServices.getMovieById(id);
        res.json({
            status: "success",
            data: resResponse.rows,
        });
    } catch (err) {
        next(err);
    }
}

async function updateMovie(req, res, next) {
    try {
        const id = req.params.id;
        const { title, genres, year } = req.body;
        const upload = req.file;
        let photo = '';
        if (!upload) {
             photo = 'Photo not found';
        } else {
             photo = req.file.filename;
        }
        const result = await moviesServices.updateMovie({ id, title, genres, year, photo });
        const resResponse = await moviesServices.getMovieById(id);
        res.json({
            status: "success",
            data: resResponse.rows,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteMovie(req, res, next) {
    try {
        const id = req.params.id;
        const result = await moviesServices.deleteMovie(id);
        res.json({
            status: "success",
            data: result.rows,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
