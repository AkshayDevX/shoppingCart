"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/actions/products/getSingleProduct";
import useDeleteImageMutation from "@/actions/products/deleteProductImage";
import useUpdateProductMutation from "@/actions/products/updateProduct";

const AddProducts: React.FC = () => {
  const { slug } = useParams();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { data: product } = useGetSingleProductQuery(slug as string);
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutate: updateProduct, isPending: isUpdating } =
    useUpdateProductMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<{ publicId: string; url: string }[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImages(product.images);
    }
  }, [product]);

  // Handle image selection
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle image deletion client side
  const handleImageDelete = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // update product
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
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
    updateProduct({
      id: slug as string,
      name: name,
      description: description,
      price: price,
      stock: stock,
      images: selectedImages,
    });
  };

  // delete images from server
  const imageDelete = (id: string, publicId: string) => {
    toast.promise(deleteImage({ id, publicId }), {
      loading: "Deleting image",
      success: "Image deleted successfully",
      error: "Failed to delete image",
    });
  };

  return (
    <div className="mt-7">
      <h1 className="text-xl font-bold">Edit</h1>
      <div className="mx-auto mt-5 w-96">
        <form
          className="flex flex-col justify-center items-center gap-2"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className="input input-bordered w-full flex items-center gap-2">
            Name
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
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
              value={stock}
              onChange={(e: any) => setStock(e.target.value)}
            />
          </label>
          <input
            type="file"
            multiple
            className="file-input file-input-bordered w-full mt-4"
            disabled={selectedImages.length + images.length >= 5}
            onChange={handleImageChange}
          />
          {selectedImages.length + images.length >= 5 && (
            <p className="text-red-500 text-sm mt-1">image limit reached</p>
          )}
          <div className="flex flex-wrap gap-2 mt-4">
            {images &&
              images.map((image) => (
                <div key={image.publicId} className="relative">
                  <img
                    src={image.url}
                    alt={`Selected ${image.publicId}`}
                    className="w-24 h-24 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => imageDelete(slug as string, image.publicId)}
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>
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
            disabled={isUpdating}
            className="btn btn-primary mt-6"
            type="submit"
          >
            Update
            {isUpdating && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
