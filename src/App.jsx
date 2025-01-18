import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppSider from "./components/AppSider";
import AppContent from "./components/AppContent";

// const layoutStyle = {
//   borderRadius: 8,
//   overflow: "hidden",
// };

export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
