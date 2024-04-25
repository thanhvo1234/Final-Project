import { Input, Row, Col, Space, Spin } from "antd";
import { useState } from "react";
import Pagination from "../../../components/pagination/Pagination";
import Typography from "antd/es/typography/Typography";
import { useTranslation } from "react-i18next";
import "./ManageProduct.css";
import ReadProduct from "../ReadProduct";
import { useGetProduct } from "../../../hooks/useProduct";

function ManageProduct() {
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

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProduct(paginateOptions);

  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col
          span={16}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Space className="employee-search" size="large">
            <Input
              placeholder={t("PRODUCT.NAME")}
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
        <ReadProduct data={products} />
        <div className="pagination">
          <Pagination items={products} table={table} setTable={setTable} />
        </div>
        </>
      )}
    </>
  );
}

export default ManageProduct;