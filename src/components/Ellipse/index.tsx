import Ellipse6 from "./ellipse6.svg";
import Ellipse7 from "./ellipse7.svg";
import Ellipse8 from "./ellipse8.svg";
import Ellipse9 from "./ellipse9.svg";

function Wrapper({ children }): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

interface Props extends React.PropsWithChildren {
  variation?: number;
}

export default function Ellipse({
  variation = 9,
  children,
}: Props): JSX.Element {
  let ellipse = null;

  switch (variation) {
    case 6:
      ellipse = <Ellipse6 aria-hidden="true" className="ellipse__blob" />;
      break;
    case 7:
      ellipse = <Ellipse7 aria-hidden="true" className="ellipse__blob" />;
      break;
    case 8:
      ellipse = <Ellipse8 aria-hidden="true" className="ellipse__blob" />;
      break;
    case 9:
      ellipse = <Ellipse9 aria-hidden="true" className="ellipse__blob" />;
      break;
    default:
      break;
  }

  return (
    <Wrapper>
      {children && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      )}
      {ellipse}
    </Wrapper>
  );
}
