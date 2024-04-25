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
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBrand.css";
import { edit } from "@cloudinary/url-gen/actions/animated";
import { useEditBrandData, useGetOneBrand } from "../../../hooks/useBrand";
import DeleteBrand from "./DeleteBrand";

const { TextArea } = Input;

const EditBrand = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: brand } = useGetOneBrand(id);
  console.log(brand);
  const [imageUrl, setImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const fileInputRef = useRef();
  const initialValues = {
    skuBrand: brand?.brand.skuBrand ?? "",
    description: brand?.brand.description ?? "",
    nameBrand: brand?.brand.nameBrand ?? "",
    icon: brand?.brand.icon ?? "",
    products: brand?.brand.products ?? "",
  };
  console.log(initialValues, "bbb");
  const BrandUpdateMutation = useEditBrandData(id);
  const goToProductDetail = (productId) => {
    navigate(`/manageProducts/productDetail/${productId}`);
  };
  const onFinish = async (values) => {
    if (imageUrl) {
      values.icon = imageUrl;
    }
    console.log(values, "aaaa");
    try {
      await BrandUpdateMutation.mutateAsync(values);
    } catch (error) {
      console.error("Error updating brand data:", error);
      message.error("Failed to update brand details.");
    }
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleFileChange = async (file) => {
    setLoadingAvatar(true);
    const formData = new FormData();
    if (file instanceof FileList) {
      for (const individualFile of file) {
        formData.append("file", individualFile);
        formData.append("upload_preset", "akubaShop");

        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dshdorhq9/image/upload",
            formData
          );
          setImageUrl(res.data.secure_url);
          AntdMessage.success(
            "Avatar uploaded successfully, Click change to apply "
          );
        } finally {
          setLoadingAvatar(false);
        }

        formData.delete("file");
      }
    } else {
      formData.append("file", file);
      formData.append("upload_preset", "ackgbz0m");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvm8fnczy/image/upload",
          formData
        );
        setImageUrl(res.data.secure_url);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ lineHeight: "30px" }}>
          <Translation>{(t) => t("BRAND.DETAIL")}</Translation>
        </Typography.Title>
        <div>
          <Button
            style={{
              marginRight: "10px",
              borderRadius: "50px",
              height: "35px",
            }}
            onClick={() => navigate("/manageCategories")}
          >
            <Translation>{(t) => t("BACK")}</Translation>
          </Button>
        </div>
      </div>
      {brand && (
        <div>
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={24}>
              <Col align="middle" md={{ span: 24 }} lg={{ span: 12 }}>
                <Row gutter={32} layout="vertical">
                  <Col span={24}>
                    <img
                      icon
                      style={{
                        width: "200px",
                        height: "240px",
                      }}
                      src={
                        imageUrl ||
                        (newImage
                          ? URL.createObjectURL(newImage)
                          : brand.brand.icon)
                      }
                      alt="Product Image"
                    />
                    {loadingAvatar && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(255, 255, 255, 0.8)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                        }}
                      >
                        <Spin size="large" />
                      </div>
                    )}
                  </Col>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files)}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <Col span={24}>
                    <Button
                      style={{
                        margin: "10px",
                        borderRadius: "50px",
                        height: "35px",
                      }}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Translation>
                        {(t) => t("PRODUCT.CHANGEIMAGE")}
                      </Translation>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md={{ span: 24, align: "middle" }} lg={{ span: 12 }}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      name="skuBrand"
                      label={<Translation>{(t) => t("BRAND.SKU")}</Translation>}
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="nameBrand"
                      label={
                        <Translation>{(t) => t("BRAND.NAME")}</Translation>
                      }
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="description"
                      label={
                        <Translation>
                          {(t) => t("BRAND.DESCRIPTION")}
                        </Translation>
                      }
                    >
                      <TextArea rows={6} placeholder={t("BRAND.DESCRIPTION")} />
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
                <Button
                  type="primary"
                  danger
                  style={{
                    marginTop: "5px",
                    borderRadius: "50px",
                    height: "35px",
                  }}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Translation>{(t) => t("DELETE")}</Translation>
                </Button>
                <DeleteBrand
                  isDeleteModalOpen={isDeleteModalOpen}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  width="500px"
                  onCancel={handleCloseDeleteModal}
                />
              </Form.Item>
            </Row>
            <Typography.Title level={3}>
              <Translation>{(t) => t("BRAND.PRODUCT")}</Translation>
            </Typography.Title>
            <Row gutter={16}>
              <ul style={{ listStyleType: "none", width:"100%", padding: 0 }}>
                {brand?.brand.products?.map((product) => (
                  <li
                    key={product.id}
                    style={{
                      marginBottom: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{ marginRight: "40px" }}
                      onClick={() => goToProductDetail(product.id)}
                    >
                      <AntdImage
                        width={180}
                        height={120}
                        src={product.image || "https://via.placeholder.com/200"}
                      />
                    </div>
                    <div style={{ marginRight: "20px", flex: 1 }}>
                      <Typography.Text
                        block
                        ellipsis
                        style={{ marginBottom: "10px" }}
                      >
                        {product.nameProduct}
                      </Typography.Text>
                    </div>
                    <div style={{ marginRight: "20px", flex: 1 }}>
                      <Typography.Text
                        block
                        ellipsis
                        style={{ marginBottom: "10px" }}
                      >
                        {product.price}
                      </Typography.Text>
                    </div>
                    <Button
                      type="primary"
                      style={{ marginRight: "20px" }}
                      onClick={() => goToProductDetail(product.id)}
                    >
                      View
                    </Button>
                  </li>
                ))}
              </ul>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditBrand;