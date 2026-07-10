const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const slug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};

const uploadImage = (file, categoryName, brandName) => {
  const folder = `products/${slug(categoryName)}/${slug(brandName)}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  deleteImage,
};