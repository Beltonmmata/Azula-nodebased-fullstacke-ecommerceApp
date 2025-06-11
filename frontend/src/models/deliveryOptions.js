import axios from "axios";
import backendUrl from "./backendUrl";

export const getAllDeliveryOptions = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/deliveryOption`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching delivery options:", error);
    return [];
  }
};
export const getADeliveryOption = async (id) => {
  try {
    const { data } = await axios.get(`${backendUrl}/deliveryOption/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching delivery option:", error);

    return [];
  }
};

// const deliveryOptions = [
//   {
//     id: "1",
//     name: "FREE",
//     durationInDays: 7,
//     price: 0,
//   },
//   {
//     id: "2",
//     name: "Common",
//     durationInDays: 3,
//     price: 200,
//   },
//   {
//     id: "3",
//     name: "Express",
//     durationInDays: 1,
//     price: 500,
//   },
// ];
// export default deliveryOptions;
