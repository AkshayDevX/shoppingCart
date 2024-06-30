"use client"
import { useProductsQuery } from "@/actions/products/getAllProducts";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";


const ProductsListAdmin = () => {
  const { data: products } = useProductsQuery()
  return (
    <div className="mt-7">
        <div className="flex justify-between">
      <h1 className="text-xl font-bold">Products List</h1>
      <Link href="/admin/dashboard/products/addProducts">
      <button className="btn btn-primary">Add Product</button>
      </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Decription</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {products && products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={product.images[0].url}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {product.description}
              </td>
              <td>
                {product.stock}
                
              </td>
              <td>{product.price}</td>
              <th>
                <Link href={`/admin/dashboard/products/edit/${btoa(product._id)}`}>
                <button className="btn btn-warning"><FaEdit /></button>
                </Link>
              </th>
              <th>
                <button className="btn btn-error"><FaTrash /></button>
              </th>
            </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductsListAdmin;
