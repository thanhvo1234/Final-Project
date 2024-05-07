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
import "./EditProduct.css";
import { edit } from "@cloudinary/url-gen/actions/animated";
import { getBrandAPI, getCategoryAPI } from "../../../api/apiUrl";
import {
  useEditProductData,
  useGetOneProduct,
} from "../../../hooks/useProduct";
import DeleteProduct from "./DeleteProduct";

const { TextArea } = Input;

const EditProduct = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: product } = useGetOneProduct(id);
  console.log(product);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    // Gọi API để lấy dữ liệu category
    getCategoryAPI()
      .then((response) => {
        if (response && response.data && response.data.categories) {
          setCategories(response.data.categories.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Gọi API để lấy dữ liệu brand
    getBrandAPI()
      .then((response) => {
        if (response && response.data && response.data.brands) {
          setBrands(response.data.brands.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  const [imageUrl, setImageUrl] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const fileInputRef = useRef();
  const initialValues = {
    image: product?.data.image ?? "",
    sku: product?.data.sku ?? "",
    description: product?.data.description ?? "",
    price: product?.data.price ?? "",
    quantity: product?.data.quantity ?? "",
    nameProduct: product?.data.nameProduct ?? "",
    onSale: product?.data.onSale ?? "",
    categoryId: product?.data.categoryId ?? "",
    brandId: product?.data.brandId ?? "",
    coupon: product?.data.coupon ?? "",
  };

  const ProductUpdateMutation = useEditProductData(id);

  const onFinish = async (values) => {
    if (imageUrl) {
      values.image = imageUrl;
    }
    console.log(values, "aaaa");
    try {
      await ProductUpdateMutation.mutateAsync(values);
    } catch (error) {
      console.error("Error updating product data:", error);
      message.error("Failed to update product details.");
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
          <Translation>{(t) => t("PRODUCT.DETAIL")}</Translation>
        </Typography.Title>
        <div>
          <Button
            style={{
              marginRight: "10px",
              borderRadius: "50px",
              height: "35px",
            }}
            onClick={() => navigate("/manageProducts")}
          >
            <Translation>{(t) => t("BACK")}</Translation>
          </Button>
        </div>
      </div>
      {product && (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={32}>
            <Col align="middle" md={{ span: 24 }} lg={{ span: 12 }}>
              <Row gutter={32} layout="vertical">
                <Col span={24}>
                  <img
                    name="image"
                    style={{
                      width: "200px",
                      height: "250px",
                    }}
                    src={
                      imageUrl ||
                      (newImage
                        ? URL.createObjectURL(newImage)
                        : product.data.image)
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
                    <Translation>{(t) => t("PRODUCT.CHANGEIMAGE")}</Translation>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={{ span: 24, align: "middle" }} lg={{ span: 12 }}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="sku"
                    label={<Translation>{(t) => t("PRODUCT.SKU")}</Translation>}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="categoryId"
                    label={
                      <Translation>{(t) => t("PRODUCT.CATEGORY")}</Translation>
                    }
                  >
                    <Select>
                      {(categories || []).map((category) => (
                        <Select.Option key={category.id} value={category.id}>
                          {category.nameCategory}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="nameProduct"
                    label={
                      <Translation>{(t) => t("PRODUCT.NAME")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="brandId"
                    label={
                      <Translation>{(t) => t("PRODUCT.BRAND")}</Translation>
                    }
                  >
                    <Select>
                      {(brands || []).map((brand) => (
                        <Select.Option key={brand.id} value={brand.id}>
                          {brand.nameBrand}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label={
                      <Translation>{(t) => t("PRODUCT.PRICE")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="quantity"
                    label={
                      <Translation>{(t) => t("PRODUCT.QUANTITY")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="onSale"
                    label={
                      <Translation>{(t) => t("PRODUCT.ONSALE")}</Translation>
                    }
                  >
                    <Radio.Group>
                      <Radio value={true}>{t("PRODUCT.YES")}</Radio>
                      <Radio value={false}>{t("PRODUCT.NO")}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="coupon"
                    label={
                      <Translation>{(t) => t("PRODUCT.COUPOUN")}</Translation>
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
                        {(t) => t("PRODUCT.DESCRIPTION")}
                      </Translation>
                    }
                  >
                    <TextArea rows={6} placeholder={t("PRODUCT.DESCRIPTION")} />
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
              <DeleteProduct
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                width="500px"
                onCancel={handleCloseDeleteModal}
              />
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
};

export default EditProduct;
