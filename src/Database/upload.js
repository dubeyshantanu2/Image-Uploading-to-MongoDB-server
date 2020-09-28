const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: "mongodb://localhost:27017/Saved_FILES_DB",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${file.originalname}`,
    };
  },
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesDB = util.promisify(uploadFile);
module.exports = uploadFilesDB;
