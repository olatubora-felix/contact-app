import { fetchContact } from "@/services/contactAPI";
import { SingleContactAPIResponse } from "@/types/contactType";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import avater from "@/assets/avater.svg";
const ContactDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: contact, status } = useQuery<SingleContactAPIResponse>({
    queryKey: ["contacts", id],
    queryFn: () => fetchContact(id),
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Something went wrong</p>;
  }
  return (
    <div className="py-5 p-3">
      <div>
        <Link to="/" className="bg-[#00b2ff] text-white py-2 px-4 rounded-md">
          Back
        </Link>
      </div>
      <section className="flex justify-center items-center flex-col  gap-3">
        <div>
          <img src={avater} alt="avater" />
        </div>
        <h2>{`${contact?.data?.firstName} ${contact?.data?.surname}`}</h2>
        <p>{contact?.data?.phone}</p>
        <p>{contact?.data?.email}</p>
      </section>
    </div>
  );
};

export default ContactDetail;
