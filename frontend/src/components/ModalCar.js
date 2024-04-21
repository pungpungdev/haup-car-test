import React, { useEffect, useState, useContext } from "react";
import { Modal, Input, Select } from "antd";
import { Context } from "../App";
const { TextArea } = Input;
const exampleCarMaster = require("./exampleCarMaster");

const ModalCar = () => {
  const [brandMaster, setBrandMaster] = useState([]);
  const [modelMaster, setModelMaster] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [remark, setRemark] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [selectStatus2, setSelectStatus2] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  const [contextCarObj, contextNotiObj] = useContext(Context);
  const { selectedCar, isModalOpen, setIsModalOpen, isEdit, fetchCars, updateCar, createCar } = contextCarObj;
  const { contextHolder, openNotification } = contextNotiObj;

  const onChangeBrand = (value) => {
    setBrand(value);
    if (value === "Honda") {
      setModelMaster(exampleCarMaster.modelHonda);
      setModel("");
    }
    if (value === "Toyota") {
      setModelMaster(exampleCarMaster.modelToyota);
      setModel("");
    }
  };

  useEffect(() => {
    setBrandMaster(exampleCarMaster.brandMaster);
  }, []);

  useEffect(() => {
    //const {brand, model, registration, remark} = selectedCar;
    setModelMaster([]);
    if (selectedCar.brand === "Honda") {
      setModelMaster(exampleCarMaster.modelHonda);
    }
    if (selectedCar.brand === "Toyota") {
      setModelMaster(exampleCarMaster.modelToyota);
    }
    setBrand(selectedCar.brand);
    setModel(selectedCar.model);
    setRegistration(selectedCar.registration);
    setRemark(selectedCar.remark);

    setSelectStatus("");
    setSelectStatus2("");
    setInputStatus("");
  }, [selectedCar]);

  const onBlurValidate = (e, state, setState2) => {
    if (!state) {
      setState2("error");
    } else {
      setState2("");
    }
  };

  const onClickSubmitCar = async () => {
    console.log("isEdit: ", isEdit);
    if (registration && brand && model) {
      if (isEdit) {
        let res = await updateCar({
            registration: registration,
            brand: brand,
            model: model,
            remark: remark,
        })
        if(res.status === 200){
            openNotification("success", "บันทึกข้อมูลสำเร็จ", "");
            setIsModalOpen(false);
            fetchCars()
        }else{
            openNotification("error", "บันทึกข้อมูลล้มเหลว", "");
        }
      } else {
        let res = await createCar({
            registration: registration,
            brand: brand,
            model: model,
            remark: remark,
        })
        if(res.status === 200){
            openNotification("success", "บันทึกข้อมูลสำเร็จ", "");
            setIsModalOpen(false);
            fetchCars()
        }else{
            openNotification("error", "บันทึกข้อมูลล้มเหลว", "");
        }
      }
      
    } else {
      if (!registration) setInputStatus("error");
      if (!brand) setSelectStatus("error");
      if (!model) setSelectStatus2("error");
      openNotification(
        "error",
        "ไม่สามารถบันทึกได้",
        "กรุณาระบุข้อมูลที่จำเป็นทั้งหมด"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isModalOpen}
        onOk={onClickSubmitCar}
        onCancel={() => setIsModalOpen(false)}
        okText="บันทึกข้อมูล"
        cancelText="ยกเลิก"
      >
        <label htmlFor="registration">
          ทะเบียนรถยนต์ <span style={{ color: "red" }}>*</span>
        </label>

        <Input
          id="registration"
          style={{ margin: "10px 0 30px 0" }}
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
          onBlur={(e) => onBlurValidate(e, registration, setInputStatus)}
          status={inputStatus}
        />

        <label htmlFor="brand">
          ยี่ห้อรถยนต์ <span style={{ color: "red" }}>*</span>
        </label>
        <Select
          id="brand"
          value={brand}
          style={{
            width: "100%",
            margin: "10px 0 30px 0",
          }}
          status={selectStatus}
          onChange={onChangeBrand}
          options={brandMaster}
          onBlur={(e) => onBlurValidate(e, brand, setSelectStatus)}
        />
        <label htmlFor="model">
          รุ่นรถยนต์ <span style={{ color: "red" }}>*</span>
        </label>
        <Select
          id="model"
          value={model}
          style={{
            width: "100%",
            margin: "10px 0 30px 0",
          }}
          status={selectStatus2}
          onChange={(value) => setModel(value)}
          options={modelMaster}
          onBlur={(e) => onBlurValidate(e, model, setSelectStatus2)}
        />
        <label htmlFor="remark">หมายเหตุ</label>
        <TextArea
          id="remark"
          rows={4}
          style={{ margin: "10px 0 30px 0" }}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </Modal>
    </>
  );
};
export default ModalCar;
