import { useState } from 'react';
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card';
import { CardContent } from '../components/ui/card-content';
import { cn } from '../../src/lib/utils';
import Navbar from './Navbar';
import Footer from './Footer';
import GridLines from './GridLines';

const sizes = ['M', 'L', 'XL', 'XXL'];
const colors = ['White', 'Black'];

export default function MerchandisePage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isWhite, setIsWhite] = useState(true);
  const contacts = [
    { id: 1, upi: "user1@upi" },
    { id: 2, upi: "user2@upi" },
  ];


  return (

    <div className="relative bg-black text-white min-h-screen">




      
      <Navbar />

      <div className="min-h-screen bg-black text-white p-8">


      <div className="relative z-100 w-70 flex items-start">
        
        <img src='/merchicon.svg' style={{marginTop:"20px"}} />
      </div>      
      
      {/* Merchandise Section */}
      <div className="flex items-center justify-center h-screen bg-black text-white" style={{marginTop:"30px"}}>
      <div className="flex">
        {/* Left Side - Image and Carousel */}
        <div className="relative w-110">
          <img
            src="/shirt.svg" // Replace with actual path
            alt="T-Shirt"
            className="w-full"
          />
          {/* Navigation Arrows */}
          {/*<button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl">
            ❮
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl">
            ❯
          </button>*/}

          <button className="mt-4" style={{marginTop:"-2px", marginLeft:"285px", marginBottom:"80px"}}>
  <img
    src="/orderbutton.svg" 
    alt="Place Your Order"
    className="w-48 h-auto"
  />
</button>
        </div>

        

        {/* Right Side - Controls */}
        <div className="ml-5">
          {/* Size Selection */}
          <div className="mb-4" style={{marginTop:"250px"}}>
            <p className="text-sm mb-1" style={{marginLeft:"110px"}}>Size</p>
            <div className="flex space-x-2 grid grid-cols-4 gap-2 border border-white p-2 w-fit mx-auto">
              {["M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border ${
                    selectedSize === size ? "bg-gray-700" : "bg-gray-900"
                  } rounded`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>



          {/* Color Selection */}
          <div className="mb-4">
            <p className="text-sm mb-1" style={{marginLeft:"40px"}}>Colour</p>
            <div className="flex items-center space-x-3 grid-cols-4 gap-2 border border-white p-2 w-fit mx-auto">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="color"
                  value="white"
                  checked={selectedColor === "white"}
                  onChange={() => setSelectedColor("white")}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 inline-block border rounded-full ${
                    selectedColor === "white" ? "bg-white" : "bg-black"
                  }`}
                />
                <span>White</span>
              </label>

              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="color"
                  value="black"
                  checked={selectedColor === "black"}
                  onChange={() => setSelectedColor("black")}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 inline-block border rounded-full ${
                    selectedColor === "black" ? "bg-white" : "bg-black"
                  }`}
                />
                <span>Black</span>
              </label>
            </div>
        
          </div>

          <section className="mt-12" style={{marginRight:"-750px"}}>
        <h3 className="text-xl">Contact Us</h3>
        <div className="mt-4 space-y-2">
          <p>[name] [xxxxxxxxxx]</p>
          <p>[name] [xxxxxxxxxx]</p>
        </div>
      </section>


          <div className="flex justify-center items-center min-h-screen bg-black" style={{marginTop:"-300px", marginBottom:"-250px", marginRight:"-700px"}}>
      {/* Container with same background as page */}
      <div className="flex gap-2 p-4 bg-black">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex flex-col items-center">
            {/* Profile Placeholder */}
            <div className="w-24 h-24 bg-gray-400 rounded-md"></div>
            {/* UPI ID */}
            <span className="text-white text-sm mt-1">{contact.upi}</span>
          </div>
        ))}
      </div>
    </div>

        </div>
        </div>
        </div>
 
      {/* Pricing Section */}
      <div className="flex border border-gray-500 w-80" style={{marginTop: '-200px'}}>
      {/* Left Box */}
      <div className="w-30 bg-[#1c1c1c] text-white text-2xl flex justify-center items-center p-4 border-r border-gray-500">
        Price
      </div>

      {/* Right Box */}
      <div className="w-50 bg-[#141414] text-white text-2xl flex justify-center items-center p-4">
        Rs. xxx/-
      </div>
    </div>
      </div>
     

    

      <div>
       
      {/* How to Order Section */}
      <section className="mt-12">
      <img src='/orderimage.svg' />
        <p className="text-gray-400 mt-2" style={{textAlign:"center", marginTop:"50px", marginLeft:"40px", marginRight:"40px", marginBottom:"50px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat</p>
      </section>
      
      {/* Contact Section */}
      
    


      </div>
      <Footer />
     
      </div>

  );
}
