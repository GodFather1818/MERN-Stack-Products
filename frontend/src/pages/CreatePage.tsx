import React, { useState } from "react";
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
import { useTheme } from "@/components/theme-provider";
import { useProduct } from "@/contexts/ProductContext";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreatePage: React.FC = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validationForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    dispatch({ type: "loadingState", payload: true });

    const newProduct = {
      name,
      price,
      imageURL,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/products`,
        newProduct
      );

      console.log("The Response from the backend Server: ", res.data);
      dispatch({ type: "loadingState", payload: false });
      dispatch({ type: "productImageURL", payload: "" });
      dispatch({ type: "productName", payload: "" });
      dispatch({ type: "productPrice", payload: null });
      toast.success("Product has been created");
      navigate("/");
    } catch (error: any) {
      if (error.response) {
        console.error("Backend Error Response: ", error.response.data);
      } else if (error.request) {
        console.error("No response received: ", error.request);
      } else {
        console.error("Error while creating the product: ", error.message);
      }
      toast.error("Error creating product!");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="absolute inset-0 bg-gray-300 bg-opacity-10 backdrop-blur-lg z-0"></div>
      <Card className="w-[500px] relative z-10 dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Add a New Product</CardTitle>
          <CardDescription>
            Add a new Product to showcase it to our customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="productForm" onSubmit={handleSubmit}>
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
              form="productForm"
              className="dark:hover:bg-white dark:hover:text-black hover:bg-slate-500 hover:text-white dark:bg-slate-400 dark:text-black bg-slate-300 text-black"
            >
              Add New Product
            </Button>
          )}
          {/* <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreatePage;
