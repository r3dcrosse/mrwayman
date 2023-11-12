import Layout from "@theme/Layout";
import ColorWheelUI from "../components/InteractiveColorWheel/ColorWheelUI";

export default function ColorWheelPage(): JSX.Element {
  return (
    <Layout title="Color Wheel Explorer" description="">
      <main>
        <div className="container" style={{marginTop: "4rem"}}>
            <ColorWheelUI />
        </div>
      </main>
    </Layout>
  );
}
