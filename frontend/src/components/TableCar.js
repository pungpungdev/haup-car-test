import React, { useEffect, useState, useContext } from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "../config/axios";
import { Context } from "../App";

export default function TableCar(props) {
    const [contextCarObj] = useContext(Context);
  const {
    selectedCar,
    setSelectedCar,
    isModalOpen,
    setIsModalOpen,
    isEdit,
    setIsEdit,
    isModalDelOpen,
    setIsModalDelOpen,
    allCars,
    setAllCars,
    fetchCars
   } = contextCarObj;


  const onClickEditCar = (targetId) => {
    console.log(targetId);
    const targetCar = allCars.find((item) => item.id === targetId);
    setSelectedCar({
      id: targetCar.id,
      registration: targetCar.registration,
      brand: targetCar.brand,
      model: targetCar.model,
      remark: targetCar.remark,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const onClickDelCar = (targetId) => {
    console.log(targetId);
    const targetCar = allCars.find((item) => item.id === targetId);
    setSelectedCar({
      id: targetCar.id,
      registration: targetCar.registration,
      brand: targetCar.brand,
      model: targetCar.model,
      remark: targetCar.remark,
    });
    setIsModalDelOpen(true);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const columns = [
    {
      title: "ทะเบียนรถยนต์",
      dataIndex: "registration",
      sorter: {
        compare: (a, b) => {
          if (a.registration < b.registration) return -1;
          if (a.registration > b.registration) return 1;
          return 0;
        },
      },
    },
    {
      title: "ยี่ห้อรถยนต์",
      dataIndex: "brand",
      sorter: {
        compare: (a, b) => {
          if (a.brand < b.brand) return -1;
          if (a.brand > b.brand) return 1;
          return 0;
        },
      },
    },
    {
      title: "รุ่นรถยนต์",
      dataIndex: "model",
      sorter: {
        compare: (a, b) => {
          if (a.model < b.model) return -1;
          if (a.model > b.model) return 1;
          return 0;
        },
      },
    },
    {
      title: "หมายเหตุ",
      dataIndex: "remark",
      sorter: {
        compare: (a, b) => {
          if (a.remark < b.remark) return -1;
          if (a.remark > b.remark) return 1;
          return 0;
        },
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (car) => {
        return (
          <>
            <EditOutlined
              style={{ cursor: "pointer" }}
              id={car.id}
              onClick={() => onClickEditCar(car.id)}
            />
            <DeleteOutlined
              style={{ cursor: "pointer", marginLeft: "10px" }}
              id={car.id}
              onClick={() => onClickDelCar(car.id)}
            />
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={allCars}
      onChange={onChange}
      style={{ width: "100%", overflow: "auto" }}
    />
  );
}
