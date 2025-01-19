import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../contexts/CryptoContext";
import { useState } from "react";
import CoinInfoModal from "./CoinInfoModal";
import AddAssetForm from "./AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: "90px",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [open, setOpen] = useState(false);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }
  const showDrawer = () => {
    setOpen(!open);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        value={"press / to open"}
        onSelect={handleSelect}
        options={crypto.map((coin) => {
          return {
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          };
        })}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "30px" }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button onClick={showDrawer} type="primary">
        Add Asset
      </Button>
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setOpen(false)}
        open={open}
        destroyOnClose
      >
        <AddAssetForm />
      </Drawer>

      <Modal
        title="Basic Modal"
        footer={null}
        open={modal}
        onCancel={() => setModal(false)}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout.Header>
  );
}
