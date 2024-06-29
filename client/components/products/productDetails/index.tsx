const ProductDetails = () => {
  return (
    <div className="lg:flex md:flex mx-auto mt-24">
      <div className="lg:w-1/2 md:w-1/2 flex justify-center items-center mb-6">
        <div className="carousel rounded-box lg:w-96 md:96 w-64">
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              className="w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Product Name
        </h1>
        <hr className="border-t-2 border-gray-200 mb-4"></hr>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Description
        </h1>
        <p className="text-base text-gray-600 mb-4">
          This is a great product that you will love.
        </p>
        <p className="text-lg text-gray-900 font-bold mb-6">Price: $200</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
