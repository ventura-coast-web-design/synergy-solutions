const sass = require("sass");

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("caseStudies", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => {
        if (!item.inputPath.endsWith(".md")) return false;
        if (!item.inputPath.includes("case-studies/studies/")) return false;
        const base = item.inputPath.split("/").pop() || "";
        return base.length > 0 && !base.startsWith("_");
      })
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  [
    "favicon.ico",
    "favicon.svg",
    "favicon-96x96.png",
    "apple-touch-icon.png",
    "site.webmanifest",
    "web-app-manifest-192x192.png",
    "web-app-manifest-512x512.png",
  ].forEach(function (f) {
    eleventyConfig.addPassthroughCopy("src/" + f);
  });

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("./src/css/main.css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}; 