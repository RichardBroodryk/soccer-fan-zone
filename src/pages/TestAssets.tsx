import Flag from "../components/images/Flag";
import SolidLogo from "../components/images/SolidLogo";
import FeatherLogo from "../components/images/FeatherLogo";

export default function AssetTestPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Asset Pipeline Test</h1>

      <h2>Flag Test</h2>
      <Flag country="argentina" size="large" />
      <Flag country="south-africa" size="large" />
      <Flag country="new-zealand" size="large" />

      <h2>Solid Logo Test</h2>
      <SolidLogo team="argentina" size="large" />
      <SolidLogo team="south-africa" size="large" />
      <SolidLogo team="new-zealand" size="large" />

      <h2>Feather Logo Test</h2>
      <FeatherLogo team="argentina" size="large" />
      <FeatherLogo team="south-africa" size="large" />
      <FeatherLogo team="new-zealand" size="large" />
    </div>
  );
}
