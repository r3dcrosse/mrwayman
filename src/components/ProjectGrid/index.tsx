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
    title: "Browser Color Wheels",
    imageURL: "/img/browser_color_wheels.gif",
    projectURL: "/stuff/projects/color-wheels",
    subtitle1: "React.js | HSL Color | CSS Blend Modes",
    subtitle2: "A playful exploration of Color and CSS Blend Modes",
  },
  {
    title: "Hash Painting",
    imageURL: "/img/hash_painting.gif",
    projectURL: "/stuff/projects/painting-with-hashes/",
    subtitle1: "React.js | SHA-256 | CSS Color",
    subtitle2: "A tool to convert text to colorful visuals.",
  },
  {
    title: "Rat Compass",
    imageURL: "/img/rat_compass_small.gif",
    projectURL: "/stuff/projects/rat-compass/",
    subtitle1: "Arduino | Compass Sensor | LEDs",
    subtitle2:
      "Let's make it possible to interact with Earth's magnetic field as a colorful, synesthetic experience.",
  },
  {
    title: "Projection Mapping",
    imageURL: "/img/projection_mapping_home.gif",
    projectURL: "/stuff/projects/projection-mapping/",
    subtitle1: "Ultra short-throw projectors | MadMapper",
    subtitle2:
      "Playing around with ultra short-throw projectors and MadMapper. Provided visuals at Something Queer 2022.",
  },
  {
    title: "BAAAHS LED Light Show (2015)",
    imageURL: "/img/baaahs_2015.gif",
    projectURL: "/stuff/projects/baaahs-2015/",
    subtitle1: "Python | Processing | LEDs",
    subtitle2: "An LED Light show for the BAAAHS Art Car",
  },
];

export default function ProjectGrid() {
  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <Link tabIndex={0} to="/stuff/projects" className="projects--heading">
        <h1>Projects</h1>
      </Link>
      <div className="project--grid">
        {projects.map((project) => {
          return (
            <div className="project--wrapper" key={project.projectURL}>
              <Link to={project.projectURL}>
                <div className="project_img--wrapper">
                  <img
                    src={require(`@site/static${project.imageURL}`).default}
                    className="project_img"
                    loading="lazy"
                  />
                </div>
                <h2>{project.title}</h2>
                <p className="project_subtitle--1">{project.subtitle1}</p>
                <p className="project_subtitle--2">{project.subtitle2}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
