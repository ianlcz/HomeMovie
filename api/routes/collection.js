const express = require("express");
const router = express.Router();
const logging = require("py-logging");
const Collection = require("../models/Collection");
const { decodeSlug, encodeSlug } = require("../utils");

/* Post a new movie in collection */
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ref, title, genre, year } = req.body;
    const today = new Date();
    const newMovie = {
      ref,
      title: title.toLowerCase(),
      genre,
      code: 4,
      purchaseYear: `${today.getUTCFullYear()} ${
        today.getUTCMonth() + 1 < 10
          ? "0" + (today.getUTCMonth() + 1)
          : today.getUTCMonth() + 1
      }`,
      year,
    };

    const { movies } = await Collection.findById(id);

    if (
      movies.filter((m) =>
        m.title
          ? m.title.toLowerCase() === newMovie.title.toLowerCase() &&
            m.ref === newMovie.ref
          : undefined,
      ).length === 0
    ) {
      movies.push(newMovie);

      await Collection.updateOne(
        { _id: id },
        {
          $set: {
            movies: movies.sort((a, b) => Number(a.ref) - Number(b.ref)),
          },
        },
      );

      logging.info(`Add movie (${title} - ${year}) in collection !`);

      res.status(200).json({
        success: true,
        message: `Le film (${title} - ${year}) a été ajouté à votre collection`,
      });
    }
  } catch (err) {
    logging.error(err.message);
  }
});

/* Get a collection by owner.movies */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Collection.findById(id, (err, data) => {
    if (!err) {
      logging.info(JSON.stringify(data, null, 2));
      res.status(200).send(data);
    }
  });
});

/* Edit a movie from a collection */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { movie, newMovie } = req.body;

    // Delete movie from movies
    await Collection.updateOne(
      { _id: id },
      {
        $pull: {
          movies: {
            ref: { $in: [movie.ref] },
            title: { $in: [movie.title.toLowerCase()] },
          },
        },
      },
    );

    // Edit movie in movies
    const { movies } = await Collection.findById(id);
    movies.push(newMovie);
    await Collection.updateOne(
      { _id: id },
      {
        $set: {
          movies: movies.sort((a, b) => Number(a.ref) - Number(b.ref)),
        },
      },
    );

    logging.info(`Edit movie in collection !`);

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (err) {
    logging.error(err.message);
  }
});

/* Delete a movie from a collection */
router.delete("/:id/:ref/:title", async (req, res) => {
  try {
    const { id, ref, title } = req.params;

    const movies = await Collection.updateOne(
      { _id: id },
      {
        $pull: {
          movies: {
            ref: { $in: [ref] },
            title: { $in: [decodeSlug(encodeSlug(title))] },
          },
        },
      },
    );

    logging.info(`Delete movie in collection !`);

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (err) {
    logging.error(err.message);
  }
});

module.exports = router;
