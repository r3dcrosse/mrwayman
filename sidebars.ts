import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  projectSidebar: [
    {
      type: "category",
      label: "Projects",
      link: {
        type: "doc",
        id: "index",
      },
      items: [
        "sparkle-motion/index",
        "painting-poems-with-hashes/index",
        "directions-from-a-rat/index",
        "animated-light-painting/index",
        "exploring-css-mix-blend-mode/index",
      ],
    },
  ],
};

export default sidebars;
