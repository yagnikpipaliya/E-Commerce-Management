"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/Drawer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Operation = ({ params }) => {
  //   const [title, setTitle] = useState("");

  const router = useRouter();

  const [img, setImg] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageURLs, setImageURLs] = useState([]);

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
    console.log(JSON.stringify({ image: img, productname: productName, price: price, stock: stock }));
    console.log(img);
    const formData = new FormData();
    formData.append("image", img);
    formData.append("productname", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    console.log(formData);

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

  const categories = [
    { value: "", label: "Select a category" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home" },
    { value: "beauty", label: "Beauty" },
    { value: "sports", label: "Sports" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "shoes", label: "shoes" },
    // Add more categories as needed
  ];

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product name is required"),
    sellingPrice: Yup.number().required("Selling price is required").positive("Selling price must be positive"),
    costPrice: Yup.number().required("Cost price is required").positive("Cost price must be positive"),
    stock: Yup.number().required("Stock number is required").positive("Stock number must be positive"),
    category: Yup.string()
      .required("Category is required")
      .oneOf(
        categories.map((cat) => cat.value),
        "Invalid category"
      ),
    images: Yup.array()
      .min(1, "At least one image is required")
      .max(5, "You can upload up to 5 images")
      .test("fileSize", "Each file should be less than 500kb", (value) => {
        return value.every((file) => file.size <= 500 * 1024);
      })
      .test("fileType", "Unsupported file format", (value) => {
        return value.every((file) => ["image/jpg", "image/jpeg", "image/png"].includes(file.type));
      }),
  });

  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 500 * 1024 && ["image/jpg", "image/jpeg", "image/png"].includes(file.type));
    const newImageURLs = validFiles.map((file) => URL.createObjectURL(file));

    //set valiad files to input
    const dataTransfer = new DataTransfer();
    validFiles.forEach((file) => dataTransfer.items.add(file));
    e.target.files = dataTransfer.files;

    setImageURLs(newImageURLs);
    setFieldValue("images", validFiles);
  };
  return (
    <>
      <PersistentDrawerLeft>
        <div className=" container mx-auto md:px-20">
          {/*  flex justify-center items-center */}
          {/* <div className="min-h-screen flex justify-center items-center"> */}
          <div className=" p-8 bg-white">
            {/*flex w-full justify-center items-center */}
            <Formik
              initialValues={{
                productName: "",
                sellingPrice: "",
                costPrice: "",
                stock: "",
                category: "",
                images: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                // Handle form submission
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <h1 className="text-4xl pb-4 font-bold">
                    <span className="capitalize">Create</span> item
                  </h1>

                  <div className="grid grid-cols-3 lg:grid-cols-12 md:grid-cols-6 gap-4">
                    {imageURLs &&
                      imageURLs.map((imgURL, index) => (
                        <Image key={index} src={imgURL} width={100} height={100} className="top-0 left-0 object-cover rounded-md" alt={`Preview ${index}`} />
                      ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="file"
                        className="w-full pr-3 my-3 rounded border-none bg-gray-100"
                        placeholder="Product images"
                        accept=".jpg, .jpeg, .png"
                        multiple
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                      />
                      <ErrorMessage name="images" component="div" className="ErrorMessage" />
                    </div>
                    <div>
                      <Field type="text" name="productName" className="w-full p-3 my-3 rounded border-none bg-gray-100" placeholder="Product name" />
                      <ErrorMessage name="productName" component="div" className="ErrorMessage" />
                    </div>
                    <div>
                      <Field type="text" name="sellingPrice" className="w-full p-3 my-3 rounded border-none bg-gray-100" placeholder="Selling Price" />
                      <ErrorMessage name="sellingPrice" component="div" className="ErrorMessage" />
                    </div>
                    <div>
                      <Field type="text" name="costPrice" className="w-full p-3 my-3 rounded border-none bg-gray-100" placeholder="Cost Price" />
                      <ErrorMessage name="costPrice" component="div" className="ErrorMessage" />
                    </div>
                    <div>
                      <Field type="text" name="stock" className="w-full p-3 my-3 rounded border-none bg-gray-100" placeholder="Stock No" />
                      <ErrorMessage name="stock" component="div" className="ErrorMessage" />
                    </div>
                    <div>
                      {/* <Field type="text" name="category" className="w-full p-3 my-3 rounded border-none bg-gray-100" placeholder="Category" />
                      <ErrorMessage name="category" component="div" className="ErrorMessage"/> */}
                      <Field as="select" name="category" className="w-full p-3 my-3 rounded border-none bg-gray-100">
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="category" component="div" className="form-error" />
                    </div>
                  </div>
                  <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-gray-100">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            {/* <form onSubmit={onSubmit}>
              <h1 className="text-4xl pb-4 font-bold">
                <span className="capitalize">{params.operation[0]}</span> item
              </h1>
              <div className="row">{imgURL && <Image src={imgURL} width={100} height={100} className="top-0 left-0 object-cover rounded-md" />}</div>
              {/* w-full h-full rounded-2xl*
              <input
                type="file"
                className="w-full p-3 my-3 rounded border-none bg-gray-100"
                placeholder="Product image"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={(e) => {
                  setImg(null);
                  setImgURL(null);
                  console.log(e.target.files);
                  setImg(e.target.files[0]);
                  setImgURL(URL.createObjectURL(e.target.files[0]));
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
                placeholder="Selling Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
              <input
                type="text"
                className="w-full p-3 my-3 rounded border-none bg-gray-100"
                placeholder="Cost Price"
                // onChange={(e) => setPrice(e.target.value)}
                // value={price}
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
              <input
                type="text"
                className="w-full p-3 my-3 rounded border-none bg-gray-100"
                placeholder="Category"
                // onChange={(e) => setStock(e.target.value)}
                // value={stock}
                required
              />
              <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-gray-100">
                Submit
              </button>
            </form>  */}
          </div>
        </div>
      </PersistentDrawerLeft>
    </>
  );
};

export default Operation;
