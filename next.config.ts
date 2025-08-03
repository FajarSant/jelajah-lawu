import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ["/dashboard/:path*"],
  images: { domains: ["localhost:3000", "lh3.googleusercontent.com"] },
};

export default nextConfig;
