"use client";
import { createStore, updateStore } from "@/app/redux/e-commerce/adminSlice";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Create = ({ params }) => {
  let { operation } = params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gst, setGst] = useState("");

  const [title, setTitle] = useState("Create");
  const router = useRouter();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    gst: Yup.string()
    .length(15, "GST No must be exactly 15 characters")
    .matches(/^[A-Z0-9]+$/, "GST No must be alphanumeric (uppercase letters and digits only)")
    .required("GST Number is required"),
    username: Yup.string().trim().required("Username is required"),
    password: Yup.string().trim().required("Password is required"),
  });

  useEffect(() => {
    if (operation[0] == "update") {
      setTitle("Update");
      fetchStore();
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    operation[0] == "update" ? dispatch(updateStore({ username, password, gst, router, operation })) : dispatch(createStore({ username, password, gst, router }));
    setUsername("");
    setPassword("");
    setGst("");
  };

  const fetchStore = async () => {
    const response = await (await fetch(`http://localhost:3000/admin/store/${operation[1]}`)).json();
    if (response != null) {
      setUsername(response.username);
      setPassword(response.password);
      setGst(response.gst);
    }
  };

  const GetInformationOFGST = async () => {
    if (gst.toString().length == 15) {
      const url = new URL("https://simpatico.live/Googleform/default.aspx");

      url.searchParams.set("action", "getGstDetails");
      url.searchParams.set("gstno", gst);

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("gst data", data);
        if (data?.mtype.toString().toLowerCase() == "error") {
          // errorToast("Invalid GSTIN Number");
          return;
        }

        // let validateError = {shouldValidate: true,};
        setUsername(data?.tradeNam);
      } catch (error) {
        // errorToast(error);
      }
    }
  };

  // const createStore = async () => {
  //   const response = await fetch("http://localhost:3000/admin/createstore", {
  //     method: "POST",
  //     body: JSON.stringify({ username, password, gst }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
  //   if (response.status == 201) {
  //     router.push("/admin");
  //   }
  // };

  // const updateStore = async () => {
  //   const response = await fetch(`http://localhost:3000/admin/updatestore/${operation[1]}`, {
  //     method: "PUT",
  //     body: JSON.stringify({ username, password, gst }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.status == 200) {
  //     router.push("/admin");
  //   }
  // };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex justify-center w-full md:w-1/2 items-center p-8 bg-white">
          <div className="w-full">
            <Formik initialValues={{ username: "", password: "", gst: "" }} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <h1 className="text-4xl pb-4 font-bold">
                    {" "}
                    <span className="capitalize">{title}</span> store{" "}
                  </h1>

                  <div className="mb-4">
                    <Field
                      type="text"
                      name="gst"
                      className="w-full p-3 my-3 rounded border-none bg-gray-100"
                      placeholder="GST Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gst}
                    />
                    <ErrorMessage name="gst" component="div" className="text-red-500" />
                  </div>

                  <div className="mb-4">
                    <Field
                      type="text"
                      name="username"
                      className="w-full p-3 my-3 rounded border-none bg-gray-100"
                      placeholder="Username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500" />
                  </div>

                  <div className="mb-4">
                    <Field
                      type="password"
                      name="password"
                      className="w-full p-3 my-3 rounded border-none bg-gray-100"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full p-3 mt-4 rounded border-slate-500 bg-gray-100">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {/* <form onSubmit={onSubmit}>
            <h1 className="text-4xl pb-4 font-bold">
              {" "}
              <span className="capitalize">{title}</span> store{" "}
            </h1>
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="GST Number"
              onChange={(e) => setGst(e.target.value)}
              onKeyUp={() => GetInformationOFGST()}
              value={gst}
              required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-gray-100">
              Submit
            </button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default Create;
