/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Typography, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Translation, useTranslation } from "react-i18next";
import { useDeleteBrand } from "../../../hooks/useBrand";

const DeleteBrand = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Assuming `id` is the product ID.
  const { t } = useTranslation();
  const deleteBrandMutation = useDeleteBrand();

  const handleDeleteFinalOk = async () => {
    try {
      await deleteBrandMutation.mutateAsync(id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);  // Close the modal on successful deletion.
          console.log("Brand deleted successfully.");
          navigate("/manageBrands"); 
        }
      });
    } catch (error) {
      console.error("Error deleting brand:", error);
      Modal.error({
        title: 'Error',
        content: 'Could not delete the brand. Please try again later.',
      });
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Modal
        title={t("BRAND.DELETE")}
        visible={isDeleteModalOpen}
        onOk={handleDeleteFinalOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("BRAND.CANCEL")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleDeleteFinalOk}>
            {t("BRAND.CONFIRM")}
          </Button>
        ]}
      >
        <Typography.Title level={4}>{t("BRAND.DELETECONTENT")}</Typography.Title>
      </Modal>
    </>
  );
};

export default DeleteBrand;