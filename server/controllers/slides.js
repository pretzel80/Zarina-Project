const Slider = require("../models/Slider");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addSlide = (req, res, next) => {
  Slider.findOne({ _id: req.body.id }).then((slide) => {
    if (slide) {
      res.status(400).json({
        message: `Slide with id '${slide.id}' is already exists. id must be unique.`,
      });
    } else {
      const slideData = _.cloneDeep(req.body);
      slideData.customId = rand();
      const newSlide = new Slider(queryCreator(slideData));

      newSlide
        .save()
        .then((slide) => res.json(slide))
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.updateSlide = (req, res, next) => {
  Slider.findOne({ _id: req.params.id })
    .then((slide) => {
      if (!slide) {
        return res.status(400).json({
          message: `Slide with id "${req.params.id}" is not found.`,
        });
      } else {
        const slideData = _.cloneDeep(req.body);
        const updatedSlide = queryCreator(slideData);

        Slider.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedSlide },
          { new: true }
        )

          .then((slide) => res.json(slide))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteSlide = (req, res, next) => {
  Slider.findOne({ _id: req.params.id }).then(async (slide) => {
    if (!slide) {
      return res.status(400).json({
        message: `Slide with customId "${req.params.customId}" is not found.`,
      });
    } else {
      const slideToDelete = await Slider.findOne({
        _id: req.params.id,
      });

      Slider.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Slide witn customId "${slideToDelete.id}" is successfully deletes from DB.`,
            deletedSlideInfo: slideToDelete,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.getSlides = (req, res, next) => {
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;

  Slider.find()
    .skip(startPage * perPage - perPage)
    .limit(perPage)
    .sort(sort)
    .then((slides) => res.send(slides))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getSlideById = (req, res, next) => {
  Slider.findOne({ _id: req.params.id })
    .then(slider => {
      if (!slider) {
        res.status(400).json({
          message: `Slider with id ${req.params.id} is not found`
        });
      } else {
        res.json(slider);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};
