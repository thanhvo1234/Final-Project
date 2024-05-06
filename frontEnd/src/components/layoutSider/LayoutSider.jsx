/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Layout, Menu, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  SkinOutlined,
  TableOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import "./LayoutSider.css";
import LogoIcon from "../../assets/logo.png";
import { Translation } from "react-i18next";

const { Sider } = Layout;

export const LayoutSider = ({ collapsed = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const showConfirmationModal = (onOkCallback) => {
    Modal.confirm({
      title: <Translation>{(t) => t("SIDEBAR.LOGOUT")}</Translation>,
      content: <Translation>{(t) => t("SIDEBAR.LOGOUTCONTENT")}</Translation>,
      onOk: onOkCallback,
      onCancel: () => {},
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    navigate("/login", { replace: true });
  };

  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  const menu = [
    {
      key: "manageProducts",
      icon: <SkinOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.PRODUCT")}</Translation>,
    },
    {
      key: "manageUsers",
      icon: <UserOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.USER")}</Translation>,
    },
    
    {
      key: "manageOrders",
      icon: <SkinOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.ORDER")}</Translation>,
    },
    {
      key: "manageCategories",
      icon: <TableOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.CATEGORY")}</Translation>,
    },
    {
      key: "manageBrands",
      icon: <LikeOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.BRAND")}</Translation>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.LOGOUT")}</Translation>,
      onClick: () => showConfirmationModal(handleLogout),
    },
  ];

  const { pathname } = location;

  return (
    <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical">
        <img
          src={LogoIcon}
          alt=""
          style={{
            width: 65,
            height: 65,
            margin: 10,
            borderRadius: 10,
          }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={menu}
        selectedKeys={[pathname.substring(1)]}
        onClick={({ key }) => {
          if (key !== "logout") {
            navigate(key);
          }
        }}
      />
    </Sider>
  );
};