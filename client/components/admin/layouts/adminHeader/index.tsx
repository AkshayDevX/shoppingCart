import Image from "next/image";

const AdminHeader = () => {
  return (
    <>
      <nav className="flex py-5 border-b border-b-slate-600">
        <div className="flex-1 flex">
          <Image
            src={
              "https://res.cloudinary.com/dtrhzpgsd/image/upload/v1719502471/shoppingCart/l5s5rlnoa2h9n701xlr0.jpg"
            }
            className="rounded-full"
            width={40}
            height={40}
            alt="profile"
          />
          <div className="ml-2">
            <h1 className="text-md">Akshay</h1>
            <h1 className="text-xs">akshay@gmail.com</h1>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminHeader;
