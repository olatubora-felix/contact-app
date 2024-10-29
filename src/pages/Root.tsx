import { EllipsisVertical, Search } from "lucide-react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="wrapper h-screen bg-white">
      <header className="flex justify-between items-center p-4 shadow-lg">
        <h2 className=" font-semibold text-base">Contacts</h2>
        <div className="flex items-center gap-1">
          <Search />
          <EllipsisVertical />
        </div>
      </header>

      <Outlet />
    </main>
  );
};

export default Root;
