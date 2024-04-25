/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Row, Col, Radio } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useCreateBrand } from "../../hooks/useBrand";

const { Option } = Select;

const CreateBrand = ({ isModalOpen, setIsModalOpen }) => {
  const [formCreate] = Form.useForm();
  const [nameBrand, setNameBrand] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [confirmLoading] = useState(false);
  const { mutate: createBrand } = useCreateBrand();
  const [imagePreview, setImagePreview] = useState(); // State for storing image preview URL

  const { t } = useTranslation();
  const uploadImageToCloudinary = async (imageFile, folder) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "akubaShop");
    formData.append("folder", folder);
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dshdorhq9/image/upload", formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return null;
    }
  };

  const handleCreateOk = async () => {
    const formData = await formCreate.validateFields();
    const imageUrl = await uploadImageToCloudinary(icon, "brands");
    if (imageUrl) {
      createBrand({
        ...formData,
        icon: imageUrl,
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
        setIcon(file);
      };
      reader.readAsDataURL(file);
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
    if (!isModalOpen) {
      formCreate.resetFields();
      setNameBrand('');
      setDescription('');
      setIcon('');
      setImagePreview(null);
    }
  }, [isModalOpen, formCreate]);

  return (
    <Modal
      title={t("BRAND.NEW")}
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
      width="800px"
    >
      <Form
        form={formCreate}
        name="createBrand"
        layout="vertical"
        autoComplete="off"
        onFinish={handleCreateOk}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="nameBrand"
              label={t("BRAND.NAME")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <Input
                value={nameBrand}
                onChange={(e) => setNameBrand(e.target.value)}
                placeholder={t("BRAND.NAME")}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label={t("BRAND.DESCRIPTION")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
            <Input.TextArea
            rows={10} // Số hàng để hiển thị, bạn có thể điều chỉnh theo ý của mình
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("BRAND.DESCRIPTION")}
            style={{ resize: "none" }} // Ngăn chặn việc thay đổi kích thước của ô input
          />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
          <Form.Item
              name="icon"
              label={t("BRAND.IMAGE")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: "100%", marginTop: 1 }} />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateBrand;