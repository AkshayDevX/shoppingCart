import Link from "next/link";

const ProductCard = () => {
  const products = [
    {
      name: "Shoe",
      description: "it's just a shoe",
      price: "200",
    },
    {
      name: "Shoe fff",
      description: "it's just a shoe",
      price: "200",
    },
    {
      name: "Shoe",
      description: "it's just a shoe",
      price: "200",
    },
    {
      name: "Shoe",
      description: "it's just a shoe",
      price: "200",
    },
    {
      name: "Shoe",
      description: "it's just a shoe",
      price: "200",
    },
    {
      name: "Shoe",
      description: "it's just a shoe",
      price: "200",
    },
  ];
  return (
    <div className="flex justify-center items-center mt-24">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {products &&
          products.map((product, index) => (
            <Link key={index} href={`/product/${product.name}`}>
              <div className="card bg-base-100 w-72 shadow-xl">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>
                    Price: <span className="font-bold">${product.price}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductCard;
