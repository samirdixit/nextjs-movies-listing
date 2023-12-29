/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables that will be available on the client side
  env: {
    LOCAL_BASE_URL: "http://localhost:3000",
  },
  // Configuration for handling images in the application
  images: {
    // Define remote patterns for images hosted on different domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "think360-dev.s3.amazonaws.com",
        port: "",
        pathname: "/movie-images/**",
      },
      {
        protocol: "https",
        hostname: "think360-dev.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/movie-images/**",
      },
    ],
  },
};

module.exports = nextConfig;
