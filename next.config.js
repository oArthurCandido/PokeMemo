/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/pokememo",
  images: {
    domains: ["raw.githubusercontent.com", "rickandmortyapi.com"],
  },
};

module.exports = nextConfig;
