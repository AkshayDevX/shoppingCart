import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { IconContext } from "react-icons";
import { FaPaperPlane } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";
import useLogoutMutation from "@/actions/user/logoutUser";

const AdminSidebar = () => {
  const { mutate: logout } = useLogoutMutation();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleOutsideClick = (event: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpenSidebar(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (openSidebar) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openSidebar]);

  return (
    <>
      {openSidebar && isMobile ? (
        <nav
          ref={sidebarRef}
          className="flex flex-col z-10 items-start h-screen gap-4 w-4/5 bg-slate-950 fixed top-0 bottom-0 text-white overflow-auto pb-9"
        >
          <div className="flex items-center py-5 mx-auto">
            <Image
              src="https://res.cloudinary.com/dtrhzpgsd/image/upload/v1719501711/shoppingCart/huizmtf0zikec8xrys0n.png"
              width={40}
              height={40}
              alt="logo"
              className="rounded-full mr-1"
            />
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-3xl">E-Shop</h1>
            </div>
            <button
              className="p-2 hover:bg-gray-500 rounded-full absolute right-1 top-1"
              onClick={() => setOpenSidebar(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="w-full mt-4">
            <div className="flex flex-col">
              <Link
                className={`hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center ${
                  pathname === "/admin/dashboard" ? "activeLink" : ""
                }`}
                href="/admin/dashboard"
              >
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <FaHome />
                </IconContext.Provider>
                <p className="ml-2">Dashboard</p>
              </Link>
              <Link
                className={`hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center ${
                  pathname === "/admin/dashboard/products" ? "activeLink" : ""
                }`}
                href="/admin/dashboard/products"
              >
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <AiFillProduct />
                </IconContext.Provider>
                <p className="ml-2">Products</p>
              </Link>
              <Link
                className={`hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center ${
                  pathname === "/admin/dashboard/orders" ? "activeLink" : ""
                }`}
                href="/admin/dashboard/orders"
              >
                <IconContext.Provider value={{ size: "1.4em" }}>
                  <FaPaperPlane />
                </IconContext.Provider>
                <p className="ml-2">Orders</p>
              </Link>
              <Link
                href=""
                onClick={() => logout()}
                className="hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2">Logout</p>
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
      {isMobile ? (
        <div className="absolute left-1 top-1">
          <button
            onClick={() => setOpenSidebar(true)}
            className="p-2 hover:bg-gray-500 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      ) : (
        <nav className="flex flex-col items-start h-screen gap-4 lg:w-64 md:w-52 bg-slate-950 fixed top-0 bottom-0 text-white overflow-auto hideScrollbar pb-9">
          <div className="flex items-center py-5 mx-auto">
            <Image
              width={40}
              height={40}
              src="https://res.cloudinary.com/dtrhzpgsd/image/upload/v1719501711/shoppingCart/huizmtf0zikec8xrys0n.png"
              alt="logo"
              className="rounded-full mr-1"
            />
            <div className="flex flex-col justify-center items-center w-full">
              <h1 className="text-3xl">E-Shop</h1>
            </div>
          </div>
          <div className="w-full mt-4">
            <div className="flex flex-col">
              <Link
                className={`hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center ${
                  pathname === "/admin/dashboard" ? "activeLink" : ""
                }`}
                href="/admin/dashboard"
              >
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <FaHome />
                </IconContext.Provider>
                <p className="ml-2">Dashboard</p>
              </Link>
              <Link
                className={`hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center ${
                  pathname === "/admin/dashboard/products" ? "activeLink" : ""
                }`}
                href="/admin/dashboard/products"
              >
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <AiFillProduct />
                </IconContext.Provider>
                <p className="ml-2">Products</p>
              </Link>
              <Link
                className={`hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center ${
                  pathname === "/admin/dashboard/orders" ? "activeLink" : ""
                }`}
                href="/admin/dashboard/orders"
              >
                <IconContext.Provider value={{ size: "1.4em" }}>
                  <FaPaperPlane />
                </IconContext.Provider>
                <p className="ml-2">Orders</p>
              </Link>
              <Link
                href={""}
                onClick={() => logout()}
                className="hover:bg-gray-700 py-3 px-4 rounded-lg w-full flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2">Logout</p>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default AdminSidebar;
