const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Anggota } = require("../models");

router.post("/", (req, res) => {
  const name = req.body.name;
  const picture = req.body.image;

  if (!isBase64(picture, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "invalid base64" });
  }

  base64Img.img(
    picture,
    "./public/images",
    Date.now(),
    async (err, filepath) => {
      if (err) {
        return res.status(400).json({ status: "error", message: err.message });
      }

      const namafile = filepath.split("\\").pop();
      const anggota = await Anggota.create({
        name: name,
        picture: `${namafile}`,
      });

      return res.json({
        status: "success",
        data: {
          id: anggota.id,
          name: anggota.name,
          image: `${req.get("host")}/images/${namafile}`,
        },
      });
    }
  );
});

module.exports = router;
