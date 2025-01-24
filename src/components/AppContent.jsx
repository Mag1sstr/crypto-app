import { Layout, Typography } from "antd";
import { useCrypto } from "../contexts/CryptoContext";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";
import { useTheme } from "../contexts/ThemeContext";

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  const { dark } = useTheme();

  const contentStyle = {
    // textAlign: "center",
    minHeight: "calc(100vh - 90px)",
    lineHeight: "120px",
    // color: dark ? "#fff" : "#000",
    backgroundColor: dark ? " #1C1C1C" : "#FFFAFA",
    padding: "1rem",
  };
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title style={{ color: dark ? "#fff" : "#000" }} level={2}>
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
