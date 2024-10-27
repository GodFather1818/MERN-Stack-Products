// import axios from 'node_modules/axios/index.d.cts';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProduct } from "@/contexts/ProductContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductUpdate = () => {
  const { id } = useParams();
  console.log(id);
  // const [product, setProduct] = useState({});

  const { theme } = useTheme();
  const navigate = useNavigate();
  const { name, price, imageURL, isLoading, dispatch } = useProduct();

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    price: "",
    imageURL: "",
  });

  const validationForm = () => {
    const errors: any = {};
    if (!name.trim()) {
      errors.name = "Product Name Required!";
    }
    if (!price || price <= 0) {
      errors.price = "Price is Required. Price must be a Positive Number!";
    }
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!imageURL || !urlPattern.test(imageURL)) {
      errors.imageURL = "Invalid Image URL!";
    }
    return errors;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/${id}`
      );
      console.log("Particular Product feteched: ", response.data.data);

      const productName : string = response.data.data.name;
      const  productPrice : number = response.data.data.price;
      const productImageURL : string = response.data.data.image;

      dispatch({type: "productName", payload: productName});
      dispatch({type: "productPrice", payload: productPrice});
      dispatch({type: "productImageURL", payload: productImageURL});

      // console.log(response.data);
    };
    try {
      dispatch({type:"loadingState", payload: true});
      fetchProduct();
      dispatch({type: "loadingState", payload:false});
      // navigate("/");
    }catch(error : any) {
      console.error(`Error fetching this product: ${error.message}`);
      toast.error("Error while fetching this product details!");
    }
  }, [id]);

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validationForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    dispatch({type : "loadingState", payload: true});

    try {
      const upatedProduct = {
        name: name,
        price: price,
        image: imageURL
      }
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/api/products/${id}`, upatedProduct);
      console.log(response.data);
      dispatch({ type: "loadingState", payload: false });
      dispatch({ type: "productImageURL", payload: "" });
      dispatch({ type: "productName", payload: "" });
      dispatch({ type: "productPrice", payload: null });
      toast.success("Product has been updated successfully!");
      navigate("/");
    }catch(error : any) {
      if (error.response) {
        console.error("Backend Error Response: ", error.response.data);
      } else if (error.request) {
        console.error("No response received: ", error.request);
      } else {
        console.error("Error while creating the product: ", error.message);
      }
      toast.error("Error creating product!");
    }
  }

  return (
    <div>
      {/* {product} */}

      <div className="relative flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="absolute inset-0 bg-gray-300 bg-opacity-10 backdrop-blur-lg z-0"></div>
        <Card className="w-[500px] relative z-10 dark:bg-gray-900">
          <CardHeader className="font-PL">
            <CardTitle>Update Product</CardTitle>
            <CardDescription>
              Update Product to show the correct details to Customers!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="productUpdateForm" onSubmit={handleSubmit} >
              <div className="w-full items-center grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter the Name of Product"
                    name="name"
                    className={theme === "dark" ? "bg-gray-800" : ""}
                    onChange={(e) =>
                      dispatch({ type: "productName", payload: e.target.value })
                    }
                    value={name}
                    required
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    placeholder="Enter the Price"
                    name="price"
                    value={price !== null ? price : ""}
                    className={theme === "dark" ? "bg-gray-800" : ""}
                    onChange={(e) =>
                      dispatch({
                        type: "productPrice",
                        payload: Number(e.target.value),
                      })
                    }
                  />
                  {validationErrors.price && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.price}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="price">Image URL</Label>
                  <Input
                    type="text"
                    placeholder="Enter the Image URL"
                    name="image"
                    className={theme === "dark" ? "bg-gray-800" : ""}
                    onChange={(e) =>
                      dispatch({
                        type: "productImageURL",
                        payload: e.target.value,
                      })
                    }
                    value={imageURL}
                  />
                  {validationErrors.imageURL && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.imageURL}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
          {isLoading ? (
            <>
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              type="submit"
              form="productUpdateForm"
              className="dark:hover:bg-white dark:hover:text-black hover:bg-slate-500 hover:text-white dark:bg-slate-400 dark:text-black bg-slate-300 text-black"
            >
              Update Product
            </Button>
          )}
          {/* <Button>Deploy</Button> */}
        </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductUpdate;
