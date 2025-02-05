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

  return (

    <div className="relative bg-black text-white min-h-screen">

<GridLines />

    <div className="min-h-screen bg-black text-white p-8">
      
      <Navbar />



      <div className="relative flex items-start">
        
        <img src='/merchicon.svg' style={{marginTop:"20px"}} />
      </div>      
      
      {/* Merchandise Section */}
      <div className="flex items-center justify-center h-screen bg-black text-white" style={{marginTop:"-150px"}}>
      <div className="flex">
        {/* Left Side - Image and Carousel */}
        <div className="relative w-80">
          <img
            src="/shirt.svg" // Replace with actual path
            alt="T-Shirt"
            className="w-full"
          />
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl">
            ❮
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl">
            ❯
          </button>

          <button className="mt-4" style={{marginTop:"-2px", marginLeft:"125px"}}>
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
          <div className="mb-4" style={{marginTop:"150px"}}>
            <p className="text-sm mb-1" style={{marginLeft:"110px"}}>Size</p>
            <div className="flex space-x-2">
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
            <div className="flex items-center space-x-3">
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
                    selectedColor === "white" ? "bg-white" : "bg-transparent"
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
                    selectedColor === "black" ? "bg-black" : "bg-transparent"
                  }`}
                />
                <span>Black</span>
              </label>
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
        <p className="text-gray-400 mt-2" style={{textAlign:"center", marginTop:"50px", marginLeft:"40px", marginRight:"40px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat</p>
      </section>
      
      {/* Contact Section */}
      <section className="mt-12">
        <h3 className="text-xl">Contacts</h3>
        <div className="mt-4 space-y-2">
          <p>[name] [xxxxxxxxxx]</p>
          <p>[name] [xxxxxxxxxx]</p>
        </div>
      </section>
      </div>
      
      <Footer />
    </div>

  );
}
