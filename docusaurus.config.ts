import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'David Wayman',
  tagline: 'Full-stack software engineer with 6+ years of experience and 4 patents. Specialized in React/TypeScript and shipped back-end features in Go. Passionate about innovative user experiences and well-documented, maintainable code.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mrwayman.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'r3dcrosse', // Usually your GitHub org/user name.
  projectName: 'mrwayman', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: "stuff",
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'About Me',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/r3dcrosse',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'About Me',
              to: '/stuff/intro',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Contact Me',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/r3dcrosse',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/mrwayman',
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
