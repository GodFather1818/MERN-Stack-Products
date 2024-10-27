import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"; // Import the Alert Dialog

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Rocket, Pencil } from "lucide-react";
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/products`
        );
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error("Response is not an array:", response.data);
          toast.error("Unexpected response format");
        }
      } catch (error: any) {
        console.error(`Error While Fetching Products: ${error.message}`);
        toast.error("Error While Fetching Products");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/${id}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      toast.success("Product Deleted Successfully");
    } catch (error: any) {
      console.error(`Error While Deleting Product: ${error.message}`);
      toast.error("Error While Deleting Product");
    }
  };
  return (
    <div className="min-h-screen w-full p-6 bg-gray-100 dark:bg-gray-800">
      <div className=" w-full mt-3 flex justify-center items-center text-4xl font-semibold whitespace-nowrap dark:text-white">
        <h1 className="font-PL">Current Products</h1>
        <span className="ml-3 mt-2">
          <Rocket fill="orange" />
        </span>
      </div>
      <div className="products-container w-full font-PL">
        {products.length === 0 ? (
          <p className="h-5 mt-[8vh] dark:text-white text-black w-full flex justify-center items-center">
            No products found 😟
            <span className="ml-2 text-blue dark:text-blue-600">
              <Link to="/create" className="">
                {" "}
                Create Product Here
              </Link>
            </span>
          </p>
        ) : (
          <div className="pl-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(products) &&
              products.map((product, index) => (
                <Card
                  key={index}
                  className="w-[400px] mt-4 dark:bg-slate-900 shadow-xl"
                >
                  <CardHeader>
                    {/* Display the product image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <h2 className="text-2xl font-bold font-PL">
                      {product.name}
                    </h2>
                    <p className="text-lg text-gray-800 dark:text-gray-400 font-PL">
                      Price: ₹{product.price}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link
                      to={`/${product._id}`}
                      className="text-blue-500 dark:text-blue-800"
                    >
                      <Pencil />
                    </Link>

                    {/* Alert Dialog for the users to again confirm that whether they want to surely delete this */}

                    <AlertDialog>

                    <AlertDialogTrigger asChild>
                      <Trash2 className="cursor-pointer" onClick={()=> setDeleteProductId(product._id)}/>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:bg-gray-500">
                      <AlertDialogHeader>
                        <h2 className="text-xl font-bold " >Are you sure?</h2>
                      </AlertDialogHeader>
                      <p className="font-semibold font-RW">Do you really want to delete the product: "{product.name}" ? This action cannot be undone!!</p>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:bg-slate-600 hover:dark:bg-slate-800">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="dark:bg-slate-400 hover:dark:bg-slate-950 hover:dark:text-white"
                          onClick={()=> {
                            if (deleteProductId) {
                              handleDelete(deleteProductId);
                            }
                          }}
                        >Yes, Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>

                    </AlertDialog>


                  </CardFooter>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
