import React from 'react'
import Navbar from "./Navbar"
import { Toaster } from "react-hot-toast"

function PageNotFound() {
  return (
    <div className='bg-background h-screen relative font-sometypeMono'>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            backgroundColor: "#141414",
            borderRadius: "0px",
            fontSize: "24px",
            padding: "12px",
            color: "white",
            borderTop: "1px solid #b60000",
            borderLeft: "1px solid #b60000",
            borderBottom: "1px solid #532e8f",
            borderRight: "1px solid #532e8f",
            zIndex: 1005,
            textAlign: "center"
          }
        }}
        containerStyle={{
          top: "15vh",
          right: "40vw",
          left: "40vw",
        }}
      />
      <div className='absolute w-full'>
        <Navbar />
      </div>
      <div className='absolute top-[50%] left-[50%] -translate-[50%] flex flex-col gap-y-4'>
        <h1 className='text-9xl text-red text-center font-bold'>404</h1>
        <h1 className='text-3xl font-semibold text-center'>Page Not Found</h1>
        <h3 className='text-lg font-semibold text-center'>Oops! Looks like you're lost</h3>
      </div>
      <div className='absolute h-full bg-transparent left-[50%] -translate-x-[50%] w-5/7 sm:w-3/5 border-greyBorder border-r border-l'></div>
      <div className='absolute w-full top-[85%] -translate-y-[50%] h-[1px] bg-greyBorder'></div>
    </div>
  )
}

export default PageNotFound
