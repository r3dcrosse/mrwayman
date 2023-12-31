import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "David Wayman",
  tagline:
    "Software engineer with 6+ years of experience and 4 patents. Specializing in React/TypeScript and shipping back-end features in Go and Python. Passionate about innovative user experiences and well-documented, maintainable code.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://mrwayman.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "r3dcrosse", // Usually your GitHub org/user name.
  projectName: "mrwayman", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "projects",
          path: "projects",
        },
        /**
         * Disable Blog until you have blog posts ready
         */
        // blog: {
        //   showReadingTime: true,
        // },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    defaultMode: "dark",
    // Replace with your project's social card
    image: "img/og_david.jpg",
    navbar: {
      title: "David Wayman",
      logo: {
        alt: "David Wayman smiling",
        src: "img/logo.png",
      },
      items: [
        {
          label: "Projects",
          to: "/projects",
          position: "right",

        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: "https://github.com/r3dcrosse",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Pages",
          items: [
            {
              label: "Home",
              to: "/",
            },
            {
              label: "Projects",
              to: "/projects",
            }
          ]
        },
        {
          title: "Projects",
          items: [
            {
              label: "Sparkle Motion",
              to: "/projects/sparkle-motion",
            },
            {
              label: "Painting poems from hashes",
              to: "/projects/painting-poems-from-hashes",
            },
            {
              label: "Directions from a rat",
              to: "/projects/directions-from-a-rat",
            },
            {
              label: "Animating paintings of light",
              to: "/projects/animating-paintings-of-light",
            },
            {
              label: "Exploring CSS: mix-blend-mode",
              to: "/projects/exploring-css-mix-blend-mode",
            },
            /**
             * Disable Blog until you have blog posts ready
             */
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
          ],
        },
        {
          title: "Contact Me",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/r3dcrosse",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/mrwayman",
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} David Wayman. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
