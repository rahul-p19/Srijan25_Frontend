import { Call, EmailOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import toast from "react-hot-toast";

const notify = () => toast("Coming soon!");

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Contact() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState();
  const [validEmail, setValidEmail] = useState(0);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    email === "" ? setValidEmail(0) : isValidEmail(email) ? setValidEmail(1) : setValidEmail(-1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) toast.error("Please enter a valid email");
    setLoading(true);
    fetch(`${backendUrl}/newsletter`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) toast.error(`${res.message}`, {
          style: {
            fontSize: "16px",
            textAlign: "left",
            padding: "4px"
          }
        })
        else toast.success(res.message, {
          style: {
            fontSize: "16px",
            textAlign: "left",
            padding: "4px"
          }
        })
        setLoading(false);
      })
      .catch(() => {
        toast.error("An error occurred. Please try again later.", {
          style: {
            fontSize: "16px",
            textAlign: "left",
            padding: "4px"
          }
        });
        setLoading(false);
      })
    /*console.log(backendUrl);
    console.log(email);*/

    {/*onSubmit={(e) => handleSubmit(e)}>*/ }
  }

  return (
    <form className='min-h-[40vh] border-greyBorder border-t grid grid-cols-7 grid-rows-10 sm:grid-rows-1 sm:grid-cols-5'
      onSubmit={(e) => {
        e.preventDefault();
        notify();
        //handleSubmit(e);
      }}>
      <div className='relative row-span-4 border-greyBorder border-b sm:border-b-transparent col-span-7 sm:col-span-1'>
        <h2 className='absolute text-center text-3xl top-[50%] left-[50%] -translate-[50%]'>Get in Touch</h2>
        <img src='heading-outline.svg' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' />
        <div className='absolute left-[50%] top-[50%] -translate-[50%] w-5/7 h-full border-greyBorder border-l border-r sm:hidden'></div>
      </div>
      <div className='row-span-5 col-span-7 sm:col-span-3 border-greyBorder sm:border-l sm:border-r grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-5'>
        <div className='row-span-3 sm:row-span-4 border-greyBorder sm:border-r border-b sm:border-b-transparent flex flex-col items-center justify-center gap-4 sm:pt-8'>
          <div className='flex gap-2'>
            <EmailOutlined />
            <a href='mailto:srijan.ju@jadavpuruniversity.in'>srijan.ju@jadavpuruniversity.in</a>
          </div>
          <div className='flex gap-2'>
            <Call />
            <p>+917980623712</p>
          </div>
        </div>
        <div className='w-full row-span-1 sm:row-span-4 sm:pb-2 grid place-items-center sm:items-end'>
          <p className='text-center sm:p-1 w-5/7 sm:w-full sm:text-xl border-greyBorder'>SUBSCRIBE TO OUR NEWSLETTER</p>
        </div>
        <div className='border-greyBorder hidden sm:block sm:border-r sm:border-t'></div>
        <div className='border-greyBorder border-t w-full grid place-items-center'>
          <input className={`outline-none h-full w-5/7 sm:w-full border-r border-l sm:border-l-transparent sm:border-r-transparent px-4 placeholder:text-center`} type='text' placeholder='youremail@gmail.com' value={email} onChange={(e) => handleEmailChange(e)}
          />
        </div>
      </div>
      <div className='grid row-span-1 sm:grid-rows-5 col-span-7 sm:col-span-1'>
        <div className='row-span-4'></div>
        <div className='w-full grid place-items-center'>
          <button className={`w-5/7 sm:w-full ${loading || validEmail !== 1 ? 'bg-greyBorder' : 'bg-white'} text-center text-background h-full p-1 border-greyBorder border border-b-transparent border-t sm:border-l-transparent sm:border-r-transparent text-xl`} type='submit' disabled={loading || validEmail !== 1}>SUBSCRIBE</button>
        </div>
      </div>
    </form >
  )
}

export default Contact
