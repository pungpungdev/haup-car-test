import React, { useEffect, useState, useContext } from "react";
import { Button, Col, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TableCar from "../TableCar";
import ModalCar from "../ModalCar";
import { Context } from "../../App";
import ModalDelCar from "../ModalDelCar";

export default function ManageCar() {
  const [contextCarObj] = useContext(Context);
  const {
    selectedCar,
    setSelectedCar,
    isModalOpen,
    setIsModalOpen,
    isEdit,
    setIsEdit,
  } = contextCarObj;

  const addCarFunc = () => {
    setIsEdit(false);
    setSelectedCar({
      id: "",
      registration: "",
      brand: "",
      model: "",
      remark: "",
    });
    setIsModalOpen(true);
  };

  return (
    <Row justify="center">
      <Col style={{ width: "100%" }}>
        <Row justify="start" style={{ margin: "20px 0 20px 0" }}>
          ระบบบันทึกรถยนต์ภายในบริษัท
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Row justify="start" className="flex-flow">
              <Input style={{ margin: "0 10px 10px 0" }} />
              <Button
                icon={<SearchOutlined />}
                style={{ margin: "0 10px 10px 0" }}
              >
                ค้นหา
              </Button>
              <Button type="primary" onClick={addCarFunc}>
                + เพิ่มรถยนต์
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <TableCar />
        </Row>
        <ModalCar />
        <ModalDelCar />
      </Col>
    </Row>
  );
}
