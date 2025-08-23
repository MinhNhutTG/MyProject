// uploadStream.js
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

// Hàm upload stream lên Cloudinary
const uploadStream = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads" }, // đổi folder nếu muốn
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Export hàm
module.exports = uploadStream;
