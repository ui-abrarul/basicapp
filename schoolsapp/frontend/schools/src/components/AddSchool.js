import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from "axios";
import {DevTool} from "@hookform/devtools"
import { Link } from "react-router-dom";


const AddSchool = () => {
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm();
  const { register, handleSubmit, control, reset, formState } = form;

  const { errors } = formState;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      toast.success("Registration Completed !!!");
      setIsLoading(false);
    }
  }, [formState, reset]);

  const onSubmit = (data) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("address", data.address);
    formdata.append("city", data.city);
    formdata.append("state", data.state);
    formdata.append("contact", data.contact);
    formdata.append("image", data.file[0]); 
    axios
      .post("http://localhost:8081/register", formdata)
      .then((res) => {
        if (res.statusText === 'OK') {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
   <div className="form-page">
     <div className="form-container">
      <div className="form-title">
        <h2>Registration</h2>
        <Link to='/'>View Schools</Link>
      </div>
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
          />
          {errors.name && <p className="error">{errors.name?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            {...register("email", {
              pattern: {
                value:
                /^\S+@\S+$/i,
                message: "Invalid Email",
              },
              required: { value: true, message: "Email is required" },
            })}
          />
          {errors.email && <p className="error">{errors.email?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="address">Address</label>
          <input
            type="textarea"
            id="address"
            placeholder="Enter your address"
            name="address"
            {...register("address", {
              required: { value: true, message: "Address is required" },
            })}
          />
          {errors.address && <p className="error">{errors.address?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            name="city"
            {...register("city", {
              required: { value: true, message: "City is required" },
            })}
          />
          {errors.city && <p className="error">{errors.city?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            placeholder="Enter your state"
            name="state"
            {...register("state", {
              required: { value: true, message: "State is required" },
            })}
          />
          {errors.state && <p className="error">{errors.state?.message}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            placeholder="Enter your contact"
            name="contact"
            {...register("contact", {
              pattern: {
                value:
                /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
                message: "Invalid Number",
              },
              required: { value: true, message: "Contact is required" },
            })}
          />
          {errors.contact && <p className="error">{errors.contact?.message}</p>}
        </div>

        <div className="input-box image-box">
          <label htmlFor="file">Upload Image</label>
          <input
            type="file"
            id="file"
            name="file"
            {...register("file", {
              required: { value: true, message: "Image is required" },
            })}
          />
          {errors.file && <p className="error">{errors.file?.message}</p>}
        </div>

        <div className="reg-btn">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      <DevTool control={control}/>
    </div>
   </div>
  );
};

export default AddSchool;
