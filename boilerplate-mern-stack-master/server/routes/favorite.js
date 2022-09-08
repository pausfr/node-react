const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  req.body.movieId;

  // mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // 프론트에 숫자 정보 리스폰스 전달
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  req.body.movieId;

  // 내가 이 영화를 디비에 넣엇는지 db에서 확인
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {});

router.post("/addToFavorite", (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) return res.status(400).
    })
});

module.exports = router;
