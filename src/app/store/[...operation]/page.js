"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Operation = ({ params }) => {
  //   const [title, setTitle] = useState("");

  const router = useRouter();

  const [img, setImg] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (params.operation[0] == "update") {
      fetchItem();
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    params.operation[0] == "create" ? createItem() : updateItem();
  };

  const fetchItem = async () => {
    const response = await fetch(`http://localhost:3000/${params.operation[1]}`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data.image);
    setImg(data.image);
    setProductName(data.productname);
    setPrice(data.price);
    setStock(data.stock);
  };

  const createItem = async () => {
    console.log(JSON.stringify({ image: img, productname: productName, price: price, stock: stock }))
    console.log(img)
    const formData = new FormData();
    formData.append('image', img);
    formData.append('productname', productName);
    formData.append('price', price);
    formData.append('stock', stock);
    console.log(formData)

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      // body: JSON.stringify({ image: img, productname: productName, price: price, stock: stock }),
      body: formData,
      headers: {
        token: localStorage.getItem("token"),
        // "Content-type": "application/json",
        // "Content-type": "multipart/form-data",
      },
    });
    if (response.status == 201) {
      router.push("/store");
    }
  };

  const updateItem = async () => {
    const response = await fetch(`http://localhost:3000/${params.operation[1]}`, {
      method: "PUT",
      body: JSON.stringify({ image: img, productname: productName, price: price, stock: stock }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      router.push("/store");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center p-8 bg-white">
          {/* w-full */}
          <form onSubmit={onSubmit}>
            <h1 className="text-4xl pb-4 font-bold">
              <span className="capitalize">{params.operation[0]}</span> item
            </h1>
            <input
              type="file"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Product image"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setImg(e.target.files[0]);
              }}
              // value={img}
              // required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Product name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Stock No"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              required
            />
            <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-gray-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Operation;
