/* eslint-disable no-unused-vars */
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import {
  Image as AntdImage,
  Button,
  Col,
  Form,
  Input,
  Spin,
  Row,
  Select,
  Typography,
  Radio,
  message,
  message as AntdMessage,
  Table,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import { Translation, useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { useEditCategoryData, useGetOneCategory } from "../../hooks/useCategory";
import { useEditProfile, useGetDetailUser } from "../../hooks/userUser";


const { TextArea } = Input;

const Profile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const orderColumns = [
    {
      title: t('ORDER.ID'),
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Link to={`/order/${record.id}`}>{text}</Link>,
    },
    {
      title: t('ORDER.TOTAL_PRICE'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: t('ORDER.IS_PAID'),
      dataIndex: 'isPaid',
      key: 'isPaid',
    },
    {
      title: t('ORDER.ISDELIVERY'),
      dataIndex: 'isDelivery',
      key: 'isDelivery',
    },
    {
      title: t('ORDER.CREATEDAT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    }
  ];

  const itemColumns = [
    {
      title: t('PRODUCT.NAME'),
      dataIndex: ['product', 'nameProduct'],
      key: 'nameProduct',
    },
    {
      title: t('PRODUCT.QUANTITY'),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: t('PRODUCT.PRICE'),
      dataIndex: 'priceForEach',
      key: 'priceForEach',
    }
  ];

  const expandable = {
    expandedRowRender: record => (
      <Table
        columns={itemColumns}
        dataSource={record.items}
        pagination={false}
        rowKey="id"
      />
    )
  };


  const { data: userData, refetch } = useGetDetailUser(id);

  const initialValues = {
    role: userData?.user.role ?? "",
    fullName: userData?.user.fullName ?? "",
    phoneNumber: userData?.user.phoneNumber ?? "",
    email: userData?.user.email ?? "",
    address: userData?.user.address ?? "",
  };
  const UserUpdateMutation = useEditProfile(id);

  const onFinish = async (values) => {
    try {
      await UserUpdateMutation.mutateAsync(values);
    } catch (error) {
      console.error("Error updating userData data:", error);
      message.error("Failed to update userData details.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ lineHeight: "30px" }}>
          <Translation>{(t) => t("USER.PROFILE")}</Translation>
        </Typography.Title>
        <div>
          <Button
            style={{
              marginRight: "10px",
              borderRadius: "50px",
              height: "35px",
            }}
            onClick={() => navigate("/")}
          >
            <Translation>{(t) => t("BACK")}</Translation>
          </Button>
        </div>
      </div>
      {userData && (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={32}>
            <Col md={{ span: 24, align: "middle" }} lg={{ span: 12 }}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label={
                      <Translation>{(t) => t("USER.ROLE")}</Translation>
                    }
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label={
                      <Translation>{(t) => t("USER.NAME")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label={
                      <Translation>{(t) => t("USER.PHONE")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={
                      <Translation>{(t) => t("USER.EMAIL")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    label={
                      <Translation>
                        {(t) => t("USER.ADDRESS")}
                      </Translation>
                    }
                  >
                    <TextArea
                      rows={6}
                      placeholder={t("USER.ADDRESS")}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "flex-end" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginTop: "5px",
                  borderRadius: "50px",
                  height: "35px",
                }}
              >
                <Translation>{(t) => t("EDIT")}</Translation>
              </Button>
            </Form.Item>
          </Row>
          <Typography.Title level={3}>
            <Translation>{(t) => t("USER.ORDERHISTORY")}</Translation>
          </Typography.Title>
          {userData && (
            <Table
              columns={orderColumns}
              expandable={expandable}
              dataSource={userData.user.orders}
              rowKey="id"
            />
          )}
        </Form>
      )}
    </>
  );
};

export default Profile;
