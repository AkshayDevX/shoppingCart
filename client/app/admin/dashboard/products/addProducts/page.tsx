"use client";
import React, { ChangeEvent, useState } from "react";

const AddProducts: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-7">
      <h1 className="text-xl font-bold">Add Products</h1>
      <div className="mx-auto mt-5 w-96">
        <form className="flex flex-col justify-center items-center gap-2">
          <label className="input input-bordered w-full flex items-center gap-2">
            Name
            <input type="text" placeholder="Name" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-base">Description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-96"
              placeholder="Description"
            ></textarea>
          </label>
          <label className="input input-bordered w-full flex items-center gap-2 mt-4">
            Price
            <input type="number" className="grow" placeholder="Price" />
          </label>
          <label className="input input-bordered w-full flex items-center gap-2 mt-4">
            Stock
            <input type="text" className="grow" placeholder="Stock" />
          </label>
          <input
            type="file"
            multiple
            className="file-input file-input-bordered w-full mt-4"
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className="w-24 h-24 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleImageDelete(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>
          <button className="btn btn-primary mt-6" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
