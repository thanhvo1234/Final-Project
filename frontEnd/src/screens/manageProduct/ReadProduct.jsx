/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Typography } from "antd";
import React from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ProductName = ({ nameProduct, record }) => {
  const navigate = useNavigate();

  return (
    <Typography.Text
      onClick={() => {
        navigate(`/manageProducts/employeeDetail/${record.id}`);
      }}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {nameProduct}
    </Typography.Text>
  );
};

const columns = [
  {
    title: <Translation>{(t) => t("PRODUCT.IMAGE")}</Translation>,
    dataIndex: "image",
    key: "image",
    render: (image) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />,
  },
  {
    title: <Translation>{(t) => t("PRODUCT.NAME")}</Translation>,
    dataIndex: "nameProduct",
    key: "nameProduct",
    sorter: {
      compare: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
      multiple: 3,
    },
    sortDirections: ["ascend", "descend"],
    render: (nameProduct, record) => <ProductName record={record} nameProduct={nameProduct} />,
  },
  {
    title: <Translation>{(t) => t("PRODUCT.PRICE")}</Translation>,
    dataIndex: "price",
    key: "price",
    sorter: {
        compare: (a, b) => a.price - b.price,
    }
  },
  {
    title: <Translation>{(t) => t("PRODUCT.ONSALE")}</Translation>,
    dataIndex: "onSale",
    key: "onSale",
    render: (onSale) => <span>{onSale ? "True" : "False"}</span>,
  },
  {
    title: <Translation>{(t) => t("PRODUCT.COUPOUN")}</Translation>,
    dataIndex: "coupon",
    key: "coupon",
  },
  {
    title: <Translation>{(t) => t("PRODUCT.CATEGORY")}</Translation>,
    dataIndex: "category",
    key: "category",
    render: (category) => category ? category.nameCategory : 'No Category'
  },
  {
    title: <Translation>{(t) => t("PRODUCT.BRAND")}</Translation>,
    dataIndex: "brand",
    key: "brand",
    render: (brand) => brand ? brand.nameBrand : 'No Brand'
  }
];

const ReadProduct = ({ data }) => {
    const { t } = useTranslation();
    console.log(data); // Log the entire structure to verify
    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={data && data.data && Array.isArray(data.data.data) ? data.data.data : []}
            pagination={false}
            bac="custom-table"
        />
    );
};



export default ReadProduct;