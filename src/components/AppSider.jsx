import { Layout, Card, Statistic, List, Spin, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "./api";
import { cryptoData } from "../data";
import { capitalize, percentDifference } from "../utils/utils";
import { CryptoContext } from "../contexts/CryptoContext";
import { useTheme } from "../contexts/ThemeContext";

export default function AppSider() {
  const { loading, assets } = useContext(CryptoContext);
  const { dark } = useTheme();

  const siderStyle = {
    padding: "1rem",
    backgroundColor: dark ? " #1C1C1C" : "#FFFAFA",
  };
  if (loading) {
    return <Spin size="large" fullscreen />;
  }

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => {
        return (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                {
                  title: "Asset Amount",
                  value: asset.amount,
                  isPlain: true,
                },
                // {
                //   title: "Difference",
                //   value: asset.growPercent,
                // },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2) + "$"}
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        );
      })}
    </Layout.Sider>
  );
}
