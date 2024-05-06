/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const OrderName = ({ id, record }) => {
  const navigate = useNavigate();
  return (
    <Typography.Text
      onClick={() => {
        navigate(`/order/${record.id}`);
      }}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {id}
    </Typography.Text>
  );
};

const columns = [
  {
    title: <Translation>{(t) => t("ORDER.ID")}</Translation>,
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 3,
    },
    sortDirections: ["ascend", "descend"],
    render: (id, record) => <OrderName record={record} id={id} />,
  },
  {
    title: <Translation>{(t) => t("ORDER.TOTAL_PRICE")}</Translation>,
    dataIndex: "totalPrice",
    key: "totalPrice",
    sorter: {
      compare: (a, b) => a.totalPrice - b.totalPrice,
  },
    sortDirections: ["ascend", "descend"],
    render: (text) => `${text.toLocaleString()} VND`,
  },
  {
    title: <Translation>{(t) => t("ORDER.ORDERBY")}</Translation>,
    dataIndex: ["user", "fullName"],
    key: "user.fullName",
    render: text => text || "Unknown",
  },
  {
    title: <Translation>{(t) => t("ORDER.CREATEDAT")}</Translation>,
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: <Translation>{(t) => t("ORDER.IS_PAID")}</Translation>,
    dataIndex: "isPaid",
    key: "isPaid",
    render: (text) => text === "pending" ? <span style={{ color: "red" }}>{text}</span> : text,
  },

  {
    title: <Translation>{(t) => t("ORDER.ISDELIVERY")}</Translation>,
    dataIndex: "isDelivery",
    key: "isDelivery",
    render: (text) => text === "pending" ? <span style={{ color: "red" }}>{text}</span> : text,
  },
];


const ReadOrder = ({ data }) => {
  const { t } = useTranslation();
  const orders = data && data.data && Array.isArray(data.data.data) ? data.data.data : [];
  
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={orders} // Use the orders array as the dataSource
      pagination={false}
      bac="custom-table"
    />
  );
};



export default ReadOrder;