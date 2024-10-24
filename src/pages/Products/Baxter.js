import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { products } from "../../utils/productdata";
import Button from "../../components/Button";
import { IC_WELCOME_BG } from "../../assets/images";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "font-bold text-red-500" : "text-gray-700";

  const handleViewDetails = (id) => {
    navigate(`/products/baxter/details/${id}`);
  };

  const welcomeBackgroundImg = IC_WELCOME_BG;

  return (
    <div className="flex h-fit flex-col items-center">
      
      <div
        className="flex h-64 w-full px-4 items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${welcomeBackgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rounded-md">
          <h1 className="text-4xl font-bold">{products.name}</h1>
          <p className="mt-4 text-lg font-medium">
            The branch of medicine that deals with the physiology and diseases
            of the kidneys. Here at Meditech Devices we offer a wide range of
            disposable products to provide our patients with quality care.
          </p>
        </div>
      </div>
      

      <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-5 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg border bg-white p-4  cursor-pointer "
            onClick={() => handleViewDetails(product.id)}
          >
            <img
              src="https://images.stockcake.com/public/2/7/8/2786aaa1-66ae-4360-8af3-160232beced6/medical-equipment-stand-stockcake.jpg"
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="flex-grow">
              <h2 className="mt-2 text-base text-theme-black">{product.name}</h2>
              <p className="text-theme-black text-sm">{product.model}</p>
            </div>
            {/* <Button
              onClick={() => handleViewDetails(product.id)}
              className="mt-4 h-10 w-fit rounded border-[1px] bg-theme-dark px-3 font-medium text-theme-black sm:px-2"
            >
              View Product
            </Button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
