import clsx from "clsx";
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
          Software engineer
        </Heading>
        <p className="hero__subtitle">
          React | TypeScript/JavaScript | Go | Python
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Ellipse variation={9}>
            <div className="ellipse_h--1">6+</div>
            <div className="ellipse_text">years experience</div>
          </Ellipse>
          <Ellipse variation={6}>
            <div className="ellipse_h--1">4</div>
            <div className="ellipse_text">patents</div>
          </Ellipse>
          <img
            alt="David Wayman posing for the camera, eating from a tub of ice cream"
            src={require("@site/static/img/david.png").default}
          />
          <Ellipse variation={7}>
            <div className="ellipse_h--2">React / TypeScript</div>
            <div className="ellipse_text">specialization</div>
          </Ellipse>
          <Ellipse variation={8}>
            <div className="ellipse_h--2">Go / Python</div>
            <div className="ellipse_text">experience</div>
          </Ellipse>
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
    <Layout
      title="Hi, I'm David"
      description=""
    >
      <HomepageHeader />
      <main>
        <ProjectGrid />
      </main>
    </Layout>
  );
}
