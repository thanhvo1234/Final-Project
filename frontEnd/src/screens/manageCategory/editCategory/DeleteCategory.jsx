/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Translation, useTranslation } from "react-i18next";
import { useDeleteCategory } from "../../../hooks/useCategory";

const DeleteCategory = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Assuming `id` is the product ID.
  const { t } = useTranslation();
  const deleteCategoryMutation = useDeleteCategory();

  const handleDeleteFinalOk = async () => {
    try {
      await deleteCategoryMutation.mutateAsync(id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);  // Close the modal on successful deletion.
          console.log("Product deleted successfully.");
          navigate("/manageCategories"); 
        }
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      Modal.error({
        title: 'Error',
        content: 'Could not delete the category. Please try again later.',
      });
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Modal
        title={t("CATEGORY.DELETE")}
        visible={isDeleteModalOpen}
        onOk={handleDeleteFinalOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("CATEGORY.CANCEL")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleDeleteFinalOk}>
            {t("CATEGORY.CONFIRM")}
          </Button>
        ]}
      >
        <Typography.Title level={4}>{t("CATEGORY.DELETECONTENT")}</Typography.Title>
      </Modal>
    </>
  );
};

export default DeleteCategory;