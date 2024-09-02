//Hold opt når du drag and dropper filer for å slå sammen, i vanlig mappe ikke i vscode.
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
       
      },
    ],
  },
};

module.exports = nextConfig;
