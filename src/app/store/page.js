"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Drawer from "./components/Drawer";
const Store = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetchItem();
    if (user == "") {
      setUser(localStorage.getItem("user"));
      console.log(user);
    }
  }, []);

  const fetchItem = async () => {
    const response = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    // if(response.status){
    //   router.push('/')
    // }
    const data = await response.json();
    console.log(data);
    setItem(data);
  };

  const deleteItem = async (id) => {
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    });
    if (response.status == 200) {
      fetchItem();
    }
  };

  return (
    <>
      <Drawer user={`Hello, ${user}`}>
        <div className="flex  flex-col  justify-center px-8 py-12 ">
        {/* min-h-screen max-h-screen*/}
          {/* <div className="flex justify-between items-center w-full bg-white p-4 pt-8">
            <div className="text-4xl font-semibold">Hi, {user}</div>
            <div className="flex">
              <Link href={`/store/create`}>
                <button className="bg-gray-100 px-4 py-2 rounded-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                  </svg>
                  <span className="ms-1">Create</span>
                </button>
              </Link>
              <button
                onClick={() => {
                  localStorage.clear();
                  router.push("/");
                }}
                className="bg-red-100 px-4 py-2 rounded-md flex items-center ms-3 text-red-800 hover:font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                  />
                </svg>
                <span className="ms-1">Logout</span>
              </button>
            </div>
          </div> */}
          <div className="p-4 pb-10 bg-white d-flex   no-scrollbar">
          {/* overflow-scroll max-h-screen*/}
            <table className="w-full  p-4 rounded text-center  px-8 ">
              <thead className="bg-gray-100">
                <tr>
                  <td className="p-4 font-semibold">Product Image</td>
                  <td className="p-4 font-semibold">ID</td>
                  <td className="p-4 font-semibold">Product Name</td>
                  <td className="p-4 font-semibold">Price</td>
                  <td className="p-4 font-semibold">Stock</td>
                  <td className="p-4 font-semibold">Action</td>
                </tr>
              </thead>
              <tbody className="">
                {item?.map((item, i) => {
                  return (
                    <tr key={i} className="border-b">
                      <td className="p-3">
                        <div className="w-full relative pt-[100%]">
                        {/*  */}
                          <Image src={`/${item.image}`} alt={item.image} objectFit="fill" fill className="w-full h-full  top-0 left-0 object-cover rounded-2xl"/>
                          {/* */}
                        </div>
                      </td>
                      <td className="p-3">{item._id}</td>
                      <td className="p-3">{item.productname}</td>
                      <td className="p-3">{item.price}</td>
                      <td className="p-3">{item.stock}</td>
                      <td className="p-3">
                        <Link href={`/store/update/${item._id}`}>
                          <button type="submit" className="p-2 px-3 mr-2 bg-green-100 text-green-800 hover:font-semibold">
                            Edit
                          </button>
                        </Link>
                        <button
                          type="submit"
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                          className="p-2 rounded bg-red-100 text-red-800 hover:font-semibold"
                        >
                          Delete
                        </button>
                        {/* onSubmit={deleteStore(item._id)} */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Store;
