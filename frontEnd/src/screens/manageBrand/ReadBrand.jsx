/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BrandName = ({ nameBrand, record }) => {
  const navigate = useNavigate();

  return (
    <Typography.Text
      onClick={() => {
        navigate(`/manageBrands/brandDetail/${record.id}`);
      }}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {nameBrand}
    </Typography.Text>
  );
};

const columns = [
    {
        title: <Translation>{(t) => t("BRAND.IMAGE")}</Translation>,
        dataIndex: "icon",
        key: "icon",
        render: (image) => <img src={image} alt="Product" style={{ width: 40, height: 44 }} />,
      },
  {
    title: <Translation>{(t) => t("BRAND.NAME")}</Translation>,
    dataIndex: "nameBrand",
    key: "nameBrand",
    sorter: {
      compare: (a, b) => a.nameBrand.localeCompare(b.nameBrand),
      multiple: 3,
    },
    sortDirections: ["ascend", "descend"],
    render: (nameBrand, record) => <BrandName record={record} nameBrand={nameBrand} />,
  },
  {
    title: <Translation>{(t) => t("BRAND.DESCRIPTION")}</Translation>,
    dataIndex: "description",
    key: "description",
  },
  {
    title: <Translation>{(t) => t("BRAND.PRODUCT")}</Translation>,
    dataIndex: "products",
    key: "products",
    render: (products) => products.length,
  },
];

const ReadBrand = ({ data }) => {
    const { t } = useTranslation();
    console.log(data); // Log the entire structure to verify
    
    // Check if data.brands.data is an array before accessing it
    const brands = data && data.brands && Array.isArray(data.brands.data) ? data.brands.data : [];
    
    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={brands} // Use the brands array as the dataSource
            pagination={false}
            bac="custom-table"
        />
    );
};



export default ReadBrand;