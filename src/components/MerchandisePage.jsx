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
  const contacts = [
    { id: 1, upi: "user1@upi" },
    { id: 2, upi: "user2@upi" },
  ];

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar />

      <div className="min-h-screen bg-black text-white p-4 md:p-8">
        {/* Merch Icon - Mobile Centered */}
        <div className="relative z-10 w-full flex justify-center mb-4 md:mb-0">
          <img 
            src='/merchicon.svg' 
            className="w-32 md:w-auto" 
            alt="Merchandise Icon" 
          />
        </div>      
        
        {/* Merchandise Section - Responsive Flex */}
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen space-y-6 md:space-y-0 md:space-x-6">
          {/* Left Side - Image and Order Button */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
              src="/shirt.svg"
              alt="T-Shirt"
              className="max-w-full h-auto"
            />
            <button className="mt-4 w-48">
              <img
                src="/orderbutton.svg" 
                alt="Place Your Order"
                className="w-full h-auto"
              />
            </button>
          </div>

          {/* Right Side - Controls */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm mb-2">Size</p>
              <div className="flex justify-center md:justify-start space-x-2">
                {["M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 text-white text-center border border-white ${
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
            <div className="mb-6">
              <p className="text-sm mb-2">Colour</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <label className="flex items-center space-x-2">
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

                <label className="flex items-center space-x-2">
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

            {/* Price Section */}
            <div className="flex justify-center md:justify-start border border-gray-500 w-full max-w-xs mx-auto md:mx-0 mb-6">
              <div className="w-1/2 bg-[#1c1c1c] text-white text-xl flex justify-center items-center p-4 border-r border-gray-500">
                Price
              </div>
              <div className="w-1/2 bg-[#141414] text-white text-xl flex justify-center items-center p-4">
                Rs. xxx/-
              </div>
            </div>

            {/* Contacts Section */}
            <div className="mt-6">
              <h3 className="text-xl mb-4">Contact Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-400 rounded-md"></div>
                    <span className="text-white text-sm mt-1">{contact.upi}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How to Order Section */}
        <section className="mt-12 text-center px-4">
          <img src='/orderimage.svg' className="mx-auto mb-4" alt="Order Instructions" />
          <p className="text-gray-400 max-w-xl mx-auto">
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
