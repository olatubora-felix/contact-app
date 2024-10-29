import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContact } from "@/services/contactAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function AddContact() {
  // Access the client
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const toggle = (open: boolean) => {
    setOpen(open);
  };

  const initialValue = {
    surname: "",
    firstName: "",
    phone: "",
    email: "",
  };
  const [values, setValues] = useState(initialValue);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState: Values) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setValues(initialValue);
      toggle(false);
    },
  });

  console.log(error);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      values?.surname.trim() === "" &&
      values?.email.trim() === "" &&
      values?.firstName.trim() === "" &&
      values.phone.trim() === ""
    )
      return;
    mutate(values);
  };

  console.log(open);
  return (
    <div className="bg-white">
      <Dialog open={open} onOpenChange={(open) => toggle(open)}>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Contact</Button>
        </DialogTrigger>
        <DialogContent className=" bg-white">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            {inputLists.map((input) => (
              <div className="">
                <Label htmlFor={input.name} className="text-right">
                  {input.label}
                </Label>
                <Input
                  id={input.name}
                  name={input.name}
                  placeholder={input.placeholder}
                  className="col-span-3"
                  onChange={handleOnChange}
                  value={values[input.name as keyof Values]}
                  type={input.type}
                />
              </div>
            ))}

            <div className="flex justify-end items-center">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const inputLists = [
  {
    name: "surname",
    placeholder: "Enter Surname",
    label: "Surname",
    type: "string",
  },
  {
    name: "firstName",
    placeholder: "Enter First Name",
    label: "First Name",
    type: "string",
  },
  {
    name: "email",
    placeholder: "Enter Email",
    label: "Email",
    type: "email",
  },
  {
    name: "phone",
    placeholder: "Enter Phone",
    label: "Phone",
    type: "number",
  },
];
export interface Values {
  surname: string;
  firstName: string;
  phone: string;
  email: string;
}
