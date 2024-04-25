/* eslint-disable react/prop-types */
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Pagination as PaginationAntd } from "antd";

const Pagination = ({ items, table, setTable }) => {
  return (
    <PaginationAntd
      style={{
        right: "30px",
      }}
      showSizeChanger={false}
      current={table.page}
      total={items?.meta?.itemCount}
      pageSize={table.take}
      itemRender={(_, type, originalElement) => {
        switch (type) {
          case "prev":
            return <ArrowLeftOutlined />;
          case "next":
            return <ArrowRightOutlined />;
          default:
            return originalElement;
        }
      }}
      onChange={(page) => {
        setTable({
          ...table,
          page: page,
        });
      }}
    />
  );
};

export default Pagination;