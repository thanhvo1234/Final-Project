/* eslint-disable no-unused-vars */
import { Row, Col, Spin } from "antd";
import { useState } from "react";
import Typography from "antd/es/typography/Typography";
import { useTranslation } from "react-i18next";
import ReadOrder from "./ReadOrder";
import { useGetFullOrder } from "../../hooks/useOrder";
import Pagination from "../../components/pagination/Pagination";

function ManageOrder() {
  const { t } = useTranslation();
  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });
  const paginateOptions = {
    page: table.page,
    take: table.take,
  };
  const [reload, setReload] = useState(false);

  
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetFullOrder({ ...paginateOptions, reload });
  console.log(orders);
  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Col
          span={16}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
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
        <ReadOrder data={orders} />
        <div className="pagination">
          <Pagination items={orders.data} table={table} setTable={setTable} />
        </div>
        </>
      )}
    </>
  );
}

export default ManageOrder;