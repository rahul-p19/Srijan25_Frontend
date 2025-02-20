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
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const contacts = [
    { id: 1, upi: "user1@upi" },
    { id: 2, upi: "user2@upi" },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow px-4 md:px-8 py-6 md:py-8 relative">
        {/* Header - Center on mobile, left on desktop */}
        <div className="mb-6 md:mb-12 mt-2 md:mt-4 flex justify-center md:justify-start">
          <img src='/merchicon.svg' alt="Merchandise Icon" className="h-16 md:h-25" />
        </div>
        
        {/* Main Product Container */}
        <div className="flex flex-col md:flex-row relative">
          {/* Desktop Price Tag - Hidden on mobile */}
          <div className="hidden md:block md:w-1/6" style={{marginTop:"120px", marginRight:"20px"}}>
            <div className="flex border border-gray-500 w-full mt-48">
              <div className="w-1/3 bg-[#1c1c1c] text-white text-lg flex justify-center items-center p-2 border-r border-gray-500">
                Price
              </div>
              <div className="w-2/3 bg-[#141414] text-white text-lg flex justify-center items-center p-2">
                Rs. xxx/-
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <img
              src="/shirt.svg"
              alt="T-Shirt"
              className="w-4/5 md:w-full max-w-md"
            />
            
            {/* Order Button - Centered on mobile */}
            <div className="mt-4 md:mt-6 flex justify-center md:justify-start md:ml-64">
              <button className="focus:outline-none">
                <img
                  src="/orderbutton.svg"
                  alt="Place Your Order"
                  className="w-40 md:w-48 h-auto"
                  style={{marginTop:"-22px", marginBottom:"50px"}}
                />
              </button>
            </div>
            
            {/* Mobile Price Tag - Below order button, only visible on mobile */}
            <div className="md:hidden w-full mt-8">
              <div className="flex border border-gray-500 w-full">
                <div className="w-1/3 bg-[#1c1c1c] text-white text-lg flex justify-center items-center p-2 border-r border-gray-500">
                  Price
                </div>
                <div className="w-2/3 bg-[#141414] text-white text-lg flex justify-center items-center p-2">
                  Rs. xxx/-
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="w-full md:w-1/3 px-2 md:pl-4 flex flex-col items-center md:items-start md:justify-start md:pt-12">
            {/* Size Selection */}
            <div className="mb-6 md:mb-4 w-full max-w-xs">
              <p className="text-sm mb-2">Size</p>
              <div className="grid grid-cols-4 w-full gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-2 text-white text-center border border-white ${
                      selectedSize === size ? "bg-gray-700" : "bg-transparent"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6 md:mb-4 w-full max-w-xs">
              <p className="text-sm mb-2">Colour</p>
              <div className="grid grid-cols-2 gap-4">
                {colors.map(color => (
                  <label key={color} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="color"
                      value={color.toLowerCase()}
                      checked={selectedColor.toLowerCase() === color.toLowerCase()}
                      onChange={() => setSelectedColor(color)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 inline-block border rounded-full ${
                        selectedColor.toLowerCase() === color.toLowerCase() ? "ring-2 ring-white" : ""
                      } ${color.toLowerCase() === 'white' ? "bg-white" : "bg-black"}`}
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Us - Full width on mobile */}
          <div className="w-full md:w-1/6 mt-4 md:mt-8 px-2 md:px-0">
            <h3 className="text-xl mb-3 text-center md:text-left">Contact Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 md:flex-row">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-md"></div>
                  <span className="text-white text-sm mt-2">{contact.upi}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Order Section - Center on mobile, left on desktop */}
        <section className="my-8 md:my-16">
          {/* Image container - centered on mobile, left-aligned on desktop */}
          <div className="flex justify-center md:justify-start">
            <img 
              src='/orderimage.svg' 
              alt="How to Order" 
              className="w-full max-w-lg md:max-w-2xl" 
            />
          </div>
          {/* Text - centered on both mobile and desktop */}
          <p className="text-gray-400 mt-6 text-center max-w-3xl mx-auto px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}