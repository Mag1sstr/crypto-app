import { Layout, Typography } from "antd";
import { useCrypto } from "../contexts/CryptoContext";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  // textAlign: "center",
  minHeight: "calc(100vh - 90px)",
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#FFFAFA",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3}>
        Portfolio:{" "}
        {assets
          .map((asset) => {
            const coin = crypto.find((c) => c.id === asset.id);
            return asset.amount * coin.price;
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(4)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
