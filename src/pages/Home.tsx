import { Pencil } from "lucide-react";
import avater from "@/assets/avater.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchAllContacts } from "@/services/contactAPI";
import { ContactAPIResponse } from "@/types/contactType";
import { Link } from "react-router-dom";
import { AddContact } from "@/components/AddContact";

const Home = () => {
  // Queries
  const { data: contacts, status } = useQuery<ContactAPIResponse>({
    queryKey: ["contacts"],
    queryFn: fetchAllContacts,
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Something went wrong</p>;
  }
  return (
    <>
      <div className="p-4 flex justify-end items-center ">
        <AddContact />
      </div>
      {contacts?.data.length > 0 &&
        status === "success" &&
        contacts?.data?.map((contact) => (
          <Link
            to={`/${contact.documentId}`}
            className="flex justify-between items-center p-3"
            key={contact.documentId}
          >
            <div className="flex items-center gap-2">
              <img src={avater} alt="avater" />
              <div>
                <p>{`${contact.firstName} ${contact.surname}`}</p>
                <p>{contact.phone}</p>
              </div>
            </div>
            <div>
              <Pencil />
            </div>
          </Link>
        ))}
    </>
  );
};

export default Home;
