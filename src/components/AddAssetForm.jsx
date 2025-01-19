import {
  Divider,
  Flex,
  Select,
  Space,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../contexts/CryptoContext";

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submited, setSubmited] = useState(false);
  const assetRef = useRef();

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset Added!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button onClick={() => onClose(false)} type="primary" key="console">
            Close
          </Button>,
        ]}
      />
    );
  }
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Select coin"
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
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
    );
  }

  function onFinish(values) {
    setSubmited(true);
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: +values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset);
  }
  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: Number(value * price),
    });
  }
  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: Number(amount * value),
    });
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: coin.price.toFixed(4),
      }}
      onFinish={onFinish}
    >
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title style={{ margin: 0 }} level={2}>
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
            message: "Enter quantity!",
          },
        ]}
      >
        <InputNumber onChange={handleAmountChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
