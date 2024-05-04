import { Input, Row, Col, Space, Spin, Button } from "antd";
import { useState } from "react";
import Pagination from "../../../components/pagination/Pagination";
import Typography from "antd/es/typography/Typography";
import { Translation, useTranslation } from "react-i18next";
import "./ManageCategory.css";
import { PlusOutlined } from "@ant-design/icons";
import { useGetFullCategory } from "../../../hooks/useCategory";
import ReadCategory from "../ReadCategory";
import CreateCategory from "../CreateCategory";

function ManageCategory() {
  const { t } = useTranslation();
  const [searchNameText, setSearchNameText] = useState("");
  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });

  const paginateOptions = {
    searchByName: searchNameText,
    page: table.page,
    take: table.take,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReload(!reload);
  };

  
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetFullCategory({ ...paginateOptions, reload });

  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col
          span={16}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Space className="employee-search" size="large">
            <Input
              placeholder={t("CATEGORY.NAME")}
              value={searchNameText}
              style={{
                width: 304,
              }}
              onChange={(e) => {
                setSearchNameText(e.target.value);
              }}
            />
          </Space>
        </Col>
        <Col span={7} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{
              borderRadius: "50px",
              height: "35px",
            }}
          >
            <PlusOutlined />{" "}
            <Translation>{(t) => t("CATEGORY.NEW")}</Translation>
          </Button>
          <CreateCategory
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            width="1000px"
            onCancel={handleCloseModal}
          />
        </Col>
      </Row>

      {isLoading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      ) : isError ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Typography.Title level={5}>{isError}</Typography.Title>
        </div>
      ) : (
        <>
        <ReadCategory data={categories} />
        <div className="pagination">
          <Pagination items={categories} table={table} setTable={setTable} />
        </div>
        </>
      )}
    </>
  );
}

export default ManageCategory;