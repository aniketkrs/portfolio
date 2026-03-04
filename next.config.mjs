/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.unsplash.com", "picsum.photos"],
        formats: ["image/avif", "image/webp"],
    },
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
    },
};

export default nextConfig;
