import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/ads.txt",
        destination: "https://srv.adstxtmanager.com/19390/handwritingtool.com",
        permanent: true,
      },
      {
        source: "/blog/can-teachers-detect-handwriting-generator",
        destination: "/responsible-use",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/blog/text-to-handwriting-converter-for-notes",
        destination: "/blog/handwritten-notes-generator",
        permanent: true,
      },
      {
        source: "/blog/handwriting-generator-for-assignments",
        destination: "/blog/handwritten-notes-generator",
        permanent: true,
      },
      {
        source: "/blog/handwriting-text",
        destination: "/blog/how-to-convert-text-to-handwriting",
        statusCode: 301,
      },
      {
        source: "/blog/handwritten-text-generator",
        destination: "/blog/how-to-convert-text-to-handwriting",
        statusCode: 301,
      },
      {
        source: "/blog/handwriting-tool-vs-handwriting-generator",
        destination: "/blog/how-to-convert-text-to-handwriting",
        statusCode: 301,
      },
      {
        source: "/blog/how-to-make-typed-notes-look-handwritten-online",
        destination: "/blog/handwritten-notes-generator",
        statusCode: 301,
      },
      {
        source: "/blog/free-handwriting-generator-online-without-sign-up",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
