/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mnxzakfvwzqueoejbsjs.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "mnxzakfvwzqueoejbsjs.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/avatars/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
