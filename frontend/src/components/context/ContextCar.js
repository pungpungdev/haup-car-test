import { useState } from "react";
import axios from "../../config/axios";

export default function ContextCar() {
  const [selectedCar, setSelectedCar] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [allCars, setAllCars] = useState([]);
  const [searchCar, setSearchCar] = useState('');
  const fetchCars = async () => {
    const res = await axios.get("/car?searchText="+searchCar);
    console.log(res);
    if (res.data.length > 0) {
      let arrCars = [...res.data];
      arrCars.forEach((item) => {
        item.key = item.id;
      });
      setAllCars(arrCars);
    }
  };
  const delCar = async () => {
    const res = await axios.delete("/car/" + selectedCar.id);
    if (res) {
      return res;
    }
  };
  const updateCar = async (obj) => {
    const res = await axios.put("/car/" + selectedCar.id,obj);
    if (res) {
      return res;
    }
  };
  const createCar = async (obj) => {
    const res = await axios.post("/car/",obj);
    if (res) {
      return res;
    }
  };

  return {
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
    searchCar,
    setSearchCar,
    fetchCars,
    delCar,
    updateCar,
    createCar,
  };
}
