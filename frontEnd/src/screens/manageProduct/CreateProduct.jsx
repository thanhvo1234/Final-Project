/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Row, Col, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { getBrandAPI, getCategoryAPI } from "../../api/apiUrl";
import axios from "axios";
import { useCreateProduct } from "../../hooks/useProduct";

const { Option } = Select;

const CreateProduct = ({ isModalOpen, setIsModalOpen }) => {
  const [formCreate] = Form.useForm();
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [onSale, setOnSale] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState({});
  const [brand, setBrand] = useState({});

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [coupon, setCoupon] = useState("");
  const [confirmLoading] = useState(false);
  const { mutate: createProduct } = useCreateProduct();
  const [imagePreview, setImagePreview] = useState(); // State for storing image preview URL

  const { t } = useTranslation();
  const uploadImageToCloudinary = async (imageFile, folder) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "akubaShop");
    formData.append("folder", folder);
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dshdorhq9/image/upload", formData);
      return response.data.secure_url; // Return the secure URL from Cloudinary
    } catch (error) {
      console.error('Failed to upload image:', error);
      return null; // Handle errors or return null if the upload fails
    }
  };

  const handleCreateOk = async () => {
    const formData = await formCreate.validateFields();
    console.log(formData, "formData");
    const imageUrl = await uploadImageToCloudinary(image, "products");
    if (imageUrl) {
      createProduct({
        ...formData,
        image: imageUrl,
      });
      formCreate.resetFields();
      setIsModalOpen(false);
    } else {
      alert('Failed to upload image. Please try again.');
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file); // Set the file to state
      };
      reader.readAsDataURL(file);
      console.log(file,"Selected image file");
    }
  };


  const handleCreateCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      formCreate.resetFields(); // Reset form fields when modal is closed
    }
  }, [isModalOpen]);

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

  useEffect(() => {
    if (!isModalOpen) {
      formCreate.resetFields();
      setNameProduct('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory({});
      setBrand({});
      setQuantity('');
      setCoupon('');
      setImagePreview(null);
      // Đặt lại các trạng thái bổ sung ở đây nếu có
    }
  }, [isModalOpen, formCreate]);

  return (
    <Modal
      title={t("PRODUCT.NEW")}
      visible={isModalOpen}
      onOk={handleCreateOk}
      onCancel={handleCreateCancel}
      okButtonProps={{
        style: {
          borderRadius: "50px",
          height: "35px",
        },
      }}
      cancelButtonProps={{
        style: {
          borderRadius: "50px",
          height: "35px",
        },
      }}
      confirmLoading={confirmLoading}
      width="1200px"
    >
      <Form
        form={formCreate}
        name="createProduct"
        layout="vertical"
        autoComplete="off"
        onFinish={handleCreateOk}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="nameProduct"
              label={t("PRODUCT.NAME")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <Input
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
                placeholder={t("PRODUCT.NAME")}
              />
            </Form.Item>
            <Form.Item
              name="price"
              label={t("PRODUCT.PRICE")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={t("PRODUCT.PRICE")}
              />
            </Form.Item>
            <Form.Item
              name="quantity"
              label={t("PRODUCT.QUANTITY")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={t("PRODUCT.QUANTITY")}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={t("PRODUCT.DESCRIPTION")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
            <Input.TextArea
            rows={6} // Số hàng để hiển thị, bạn có thể điều chỉnh theo ý của mình
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("PRODUCT.DESCRIPTION")}
            style={{ resize: "none" }} // Ngăn chặn việc thay đổi kích thước của ô input
          />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="categoryId"
              label={t("PRODUCT.CATEGORY")}
              rules={[
                { required: true, message: t("VALIDATE.DATAINPUTMANAGER") },
              ]}
            >
              <Select
                value={category.id}
                onChange={(value, option) =>
                  setCategory({ id: value, name: option.children })
                }
                placeholder={t("PRODUCT.CATEGORY")}
              >
                {(categories || []).map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.nameCategory}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="brandId"
              label={t("PRODUCT.BRAND")}
              rules={[
                { required: true, message: t("VALIDATE.DATAINPUTMANAGER") },
              ]}
            >
              <Select
                value={brand.id}
                onChange={(value, option) =>
                  setBrand({ id: value, name: option.children })
                }
                placeholder={t("PRODUCT.BRAND")}
              >
                {(brands || []).map((brand) => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.nameBrand}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="onSale"
              label={t("PRODUCT.ONSALE")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <Radio.Group
                onChange={(e) => setOnSale(e.target.value)}
                value={onSale}
              >
                <Radio value={true}>{t("PRODUCT.YES")}</Radio>
                <Radio value={false}>{t("PRODUCT.NO")}</Radio>
              </Radio.Group>
            </Form.Item>
            {onSale && (
              <Form.Item
                name="coupon"
                label={t("PRODUCT.COUPOUN")}
                rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
              >
                <Input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder={t("PRODUCT.COUPOUN")}
                />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} sm={24} md={8}>
          <Form.Item
              name="image"
              label={t("PRODUCT.IMAGE")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: "100%", marginTop: 10 }} />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateProduct;