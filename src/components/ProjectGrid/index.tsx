import clsx from "clsx";
import Link from "@docusaurus/Link";

interface Project {
  title: string;
  imageURL: string;
  projectURL: string;
  subtitle1: string;
  subtitle2: string;
}

const projects: Array<Project> = [
  {
    title: "Sparkle Motion",
    imageURL: "/img/sparkle_motion_square.gif",
    projectURL: "/projects/sparkle-motion",
    subtitle1: "LEDs | Kotlin | React.js | Burning Man",
    subtitle2: "Web UI for interacting with LEDs on the BAAAHS Burning Man art car.",
  },
  {
    title: "Painting poems from hashes",
    imageURL: "/img/painting-poems-from-hashes.gif",
    projectURL: "/projects/painting-poems-from-hashes",
    subtitle1: "React.js | SHA-256 | Hex Colors",
    subtitle2: "A tool for converting poems and text into colorful visuals, all through the magic of hashes.",
  },
  {
    title: "Directions from a rat",
    imageURL: "/img/rat_compass_small.gif",
    projectURL: "/projects/sparkle-motion",
    subtitle1: "Arduino | Compass Sensor | LEDs",
    subtitle2:
      "Let's make it possible to interact with Earth's magnetic field as a colorful, synesthetic experience.",
  },
  {
    title: "Animating light painting",
    imageURL: "/img/projection_mapping_home.gif",
    projectURL: "/projects/sparkle-motion",
    subtitle1: "Ultra short-throw projectors | MadMapper",
    subtitle2:
      "Playing around with ultra short-throw projectors and MadMapper. Provided visuals at Something Queer 2022.",
  },
  // {
  //   title: "Sparkle Motion",
  //   imageURL: "/img/sparkle_motion_square.gif",
  //   projectURL: "/stuff/projects/color-wheels",
  //   subtitle1: "React.js | HSL Color | CSS Blend Modes",
  //   subtitle2: "A playful exploration of Color and CSS Blend Modes",
  // },
];

export default function ProjectGrid() {
  return (
    <div className="container">
      <div className="project--grid">
        {projects.map((project, i) => {
          return (
            <div className="project--wrapper" key={project.projectURL}>
              <Link to={project.projectURL}>
                <div
                  className={clsx("project__item", {
                    "project__item--reverse": i % 2 === 0,
                  })}
                >
                  <div className="project_img--wrapper">
                    <img
                      src={require(`@site/static${project.imageURL}`).default}
                      className="project_img"
                      loading="lazy"
                    />
                  </div>
                  <div className="project_desc--wrapper">
                    <h2>{project.title}</h2>
                    <p className="project_subtitle--2">{project.subtitle2}</p>
                    <p className="project_subtitle--1">{project.subtitle1}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
