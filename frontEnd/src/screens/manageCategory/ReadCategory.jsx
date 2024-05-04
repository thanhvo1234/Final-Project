/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Table, Typography } from "antd";
import React, { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CategoryName = ({ nameCategory, record }) => {
  const navigate = useNavigate();

  return (
    <Typography.Text
      onClick={() => {
        navigate(`/manageCategories/categoryDetail/${record.id}`);
      }}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {nameCategory}
    </Typography.Text>
  );
};

const columns = [
    {
        title: <Translation>{(t) => t("CATEGORY.IMAGE")}</Translation>,
        dataIndex: "icon",
        key: "icon",
        render: (image) => <img src={image} alt="Product" style={{ width: 40, height: 44 }} />,
      },
  {
    title: <Translation>{(t) => t("CATEGORY.NAME")}</Translation>,
    dataIndex: "nameCategory",
    key: "nameCategory",
    sorter: {
      compare: (a, b) => a.nameCategory.localeCompare(b.nameCategory),
      multiple: 3,
    },
    sortDirections: ["ascend", "descend"],
    render: (nameCategory, record) => <CategoryName record={record} nameCategory={nameCategory} />,
  },
  {
    title: <Translation>{(t) => t("CATEGORY.DESCRIPTION")}</Translation>,
    dataIndex: "description",
    key: "description",
  },
  {
    title: <Translation>{(t) => t("CATEGORY.PRODUCT")}</Translation>,
    dataIndex: "products",
    key: "products",
    render: (products) => products.length,
  },
];

const ReadCategory = ({ data }) => {
    const { t } = useTranslation();
    console.log(data); // Log the entire structure to verify
    
    // Check if data.categories.data is an array before accessing it
    const categories = data && data.categories && Array.isArray(data.categories.data) ? data.categories.data : [];
    
    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={categories} // Use the categories array as the dataSource
            pagination={false}
            bac="custom-table"
        />
    );
};



export default ReadCategory;