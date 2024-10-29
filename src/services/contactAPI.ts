import { Values } from "@/components/AddContact";
import { axiosInstance } from "./axiosIntsance";

const fetchAllContacts = async () => {
  const res = await axiosInstance.get("/contacts");
  return res.data;
};
const fetchContact = async (id: string) => {
  const res = await axiosInstance.get(`/contacts/${id}`);
  return res.data;
};

const createContact = async (values: Values) => {
  const res = await axiosInstance.post("/contacts", {
    data: values,
  });
  return res.data;
};

export { fetchAllContacts, fetchContact, createContact };
