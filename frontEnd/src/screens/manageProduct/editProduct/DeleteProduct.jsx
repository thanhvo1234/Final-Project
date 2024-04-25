/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Translation, useTranslation } from "react-i18next";
import { useDeleteProduct } from "../../../hooks/useProduct";

const DeleteProduct = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Assuming `id` is the product ID.
  const { t } = useTranslation();
  const deleteProductMutation = useDeleteProduct();

  const handleDeleteFinalOk = async () => {
    try {
      await deleteProductMutation.mutateAsync(id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);  // Close the modal on successful deletion.
          console.log("Product deleted successfully.");
          navigate("/manageProducts"); 
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Modal.error({
        title: 'Error',
        content: 'Could not delete the product. Please try again later.',
      });
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Modal
        title={t("PRODUCT.DELETE")}
        visible={isDeleteModalOpen}
        onOk={handleDeleteFinalOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("PRODUCT.CANCEL")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleDeleteFinalOk}>
            {t("PRODUCT.CONFIRM")}
          </Button>
        ]}
      >
        <Typography.Title level={4}>{t("PRODUCT.DELETECONTENT")}</Typography.Title>
      </Modal>
    </>
  );
};

export default DeleteProduct;