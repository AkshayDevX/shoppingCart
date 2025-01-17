"use client";
import useAddProductMutation from "@/actions/products/addProduct";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const AddProducts: React.FC = () => {
  const { mutate: addProduct, isSuccess, isPending } = useAddProductMutation();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle image selection
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle image deletion
  const handleImageDelete = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // add product
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      return toast.error("Please select at least one image");
    }
    if (selectedImages.length > 5) {
      return toast.error("More than 5 images are not allowed");
    }
    if (selectedImages.some((image) => image.size > 1024 * 1024)) {
      return toast.error("Image size must be less than 1MB");
    }
    if (
      selectedImages.some(
        (image) => image.type !== "image/jpeg" && image.type !== "image/png"
      )
    ) {
      return toast.error("Only JPEG and PNG images are allowed");
    }
    addProduct({
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      images: selectedImages,
    });
  };

  // reset form on success
  useEffect(() => {
    if (isSuccess) {
      setSelectedImages([]);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [isSuccess]);

  return (
    <div className="mt-7">
      <h1 className="text-xl font-bold">Add Products</h1>
      <div className="mx-auto mt-5 w-96">
        <form
          className="flex flex-col justify-center items-center gap-2"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className="input input-bordered w-full flex items-center gap-2">
            Name
            <input type="text" placeholder="Name" name="name" required />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-base">Description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-96"
              placeholder="Description"
              name="description"
              required
            ></textarea>
          </label>
          <label className="input input-bordered w-full flex items-center gap-2 mt-4">
            Price
            <input
              type="number"
              className="grow"
              placeholder="Price"
              name="price"
              required
            />
          </label>
          <label className="input input-bordered w-full flex items-center gap-2 mt-4">
            Stock
            <input
              type="number"
              className="grow"
              placeholder="Stock"
              name="stock"
              required
            />
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
          <button
            disabled={isPending}
            className="btn btn-primary mt-6"
            type="submit"
          >
            Add Product
            {isPending && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
