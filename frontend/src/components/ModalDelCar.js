import React, { useContext } from "react";
import { Context } from "../App";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const ModalDelCar = () => {
  const [contextCarObj, contextNotiObj] = useContext(Context);
  const {
    selectedCar,
    isModalDelOpen,
    setIsModalDelOpen,
    fetchCars,
    delCar
  } = contextCarObj;
  const { contextHolder, openNotification } = contextNotiObj;

  const handleDelOk = async () => {
    let res = await delCar()
    console.log('res from delete', res)
    if(res.status === 200){
        openNotification("success", "ลบข้อมูลสำเร็จ", "");
        setIsModalDelOpen(false);
        fetchCars()
    }else{
        openNotification("error", "ลบข้อมูลล้มเหลว", "");
    }
  };
  const handleDelCancel = () => {
    setIsModalDelOpen(false);
  };
  return (
    <>
    {contextHolder}
      <Modal
        title={
          <>
            <ExclamationCircleFilled style={{ color: "rgb(250, 173, 20)" }} />{" "}
            ยืนยันการลบ
          </>
        }
        open={isModalDelOpen}
        onOk={handleDelOk}
        onCancel={handleDelCancel}
        okText="ลบ"
        cancelText="ยกเลิก"
        okType="danger"
        okButtonProps={{type: 'primary'}}
      >
        <p>ต้องการลบรถยนต์ทะเบียน: {selectedCar.registration} ใช่หรือไม่?</p>
      </Modal>
    </>
  );
};
export default ModalDelCar;
