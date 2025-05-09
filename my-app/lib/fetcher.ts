import axios from "axios";
import { ListingType, LoginType, RegisterType } from "@/@types/api.type";

export const registerMutationfn = async (data: RegisterType) =>
  await axios.post("/api/register", data);

export const loginMutationfn = async (data: LoginType) =>
  await axios.post("/api/login", data);

export const logoutMutationfn = async () => await axios.post("/api/logout");

export const getCurrentUserQueryFn = async () => {
  const response = await axios.get("/api/current-user");
  return response.data;
};

export const addListingMutationFn = async (data: ListingType) =>
  await axios.post("/api/add-listing", data);
