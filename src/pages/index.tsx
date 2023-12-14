import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

import Ellipse from "../components/Ellipse";
import ProjectGrid from "../components/ProjectGrid";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Software Engineer
        </Heading>
        <p className="hero__subtitle">
          React | TypeScript / JavaScript | Go | Python
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Ellipse variation={9}>
              <div className="ellipse_h--1">6+</div>
              <div className="ellipse_text">years of experience</div>
            </Ellipse>
            <Ellipse variation={6}>
              <div className="ellipse_h--1">4</div>
              <div className="ellipse_text">patents</div>
            </Ellipse>
          </div>
          <img
            alt="David Wayman smiling for the camera"
            loading="lazy"
            src={require("@site/static/img/david.png").default}
            style={{
              width: "187px",
              height: "180px",
              margin: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Ellipse variation={7}>
              <div className="ellipse_h--2">React / TypeScript</div>
              <div className="ellipse_text">specialization</div>
            </Ellipse>
            <Ellipse variation={8}>
              <div className="ellipse_h--2">Go / Python</div>
              <div className="ellipse_text">experience</div>
            </Ellipse>
          </div>
        </div>
        <div>
          <div className="hi">Hi, I'm</div>
          <div className="david">David</div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Hi, I'm David" description="">
      <HomepageHeader />
      <main>
        <Link tabIndex={0} to="/projects" className="projects--heading">
          <h1
            id="projects"
            style={{
              scrollMarginTop: "5rem",
            }}
          >
            Projects
          </h1>
        </Link>
        <ProjectGrid />
      </main>
    </Layout>
  );
}
