/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Typography } from "antd";
import React from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmployeeName = ({ fullName, record }) => {
  const navigate = useNavigate();

  return (
    <Typography.Text
      onClick={() => {
        navigate(`/manageUsers/employeeDetail/${record.id}`);
      }}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {fullName}
    </Typography.Text>
  );
};

const columns = [
  {
    title: <Translation>{(t) => t("USER.ROLE")}</Translation>,
    dataIndex: "role",
    key: "role",
  },
  {
    title: <Translation>{(t) => t("USER.NAME")}</Translation>,
    dataIndex: "fullName",
    key: "fullName",
    sorter: {
      compare: (a, b) => a.fullName.localeCompare(b.fullName),
      multiple: 3,
    },
    sortDirections: ["ascend", "descend"],
    render: (fullName, record) => <EmployeeName record={record} fullName={fullName} />,
  },
  {
    title: <Translation>{(t) => t("USER.EMAIL")}</Translation>,
    dataIndex: "email",
    key: "email",
    sorter: {
      compare: (a, b) => a.email.localeCompare(b.email),
      multiple: 1,
    },
  },
  {
    title: <Translation>{(t) => t("USER.PHONE")}</Translation>,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    responsive: ["lg"],
  },
  {
    title: <Translation>{(t) => t("USER.CREATAT")}</Translation>,
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const ReadUser = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data?.data}
      pagination={false}
      bac="custom-table"
    />
  );
};

export default ReadUser;