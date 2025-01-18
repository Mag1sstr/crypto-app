import { Layout } from "antd";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 90px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
  padding: "1rem",
};

export default function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}
