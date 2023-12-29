// utils/s3.js

// Import AWS SDK and Buffer module
const AWS = require("aws-sdk");
const { Buffer } = require("buffer");

// Initialize AWS S3 service with access credentials
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Function to upload an image to S3
const uploadImageToS3 = async (file, folder, userId) => {
  try {
    // Convert Blob to Buffer
    const buffer = await blobToBuffer(file);

    // Set S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_USER,
      Key: `${folder}/${userId}/${file.name}`,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read", // Set the appropriate ACL based on your requirements
    };

    // Perform S3 upload and get the image URL
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw new Error("Failed to upload image to S3");
  }
};

// Function to delete an image from S3
const deleteImageFromS3 = async (key) => {
  try {
    // Set S3 delete parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_USER,
      Key: key,
    };

    // Perform S3 delete
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    throw new Error("Failed to delete image from S3");
  }
};

// Convert Blob to Buffer
const blobToBuffer = async (blob) => {
  // Convert Blob to Buffer and return
  const buffer = Buffer.from(await blob.arrayBuffer());
  return buffer;
};

// Export the functions for external use
module.exports = { uploadImageToS3, deleteImageFromS3 };
