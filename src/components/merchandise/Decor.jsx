import React from 'react';
import { Calendar, ShoppingBag, Clock, BadgeDollarSign } from 'lucide-react';

const SrijanMerchandiseAnnouncement = () => {
  return (
    <div className="border border-gray-600 p-6 rounded-lg shadow-md max-w-2xl mx-auto text-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-300">Srijan'25 Official Merchandise</h1>
        <div className="mt-2 border border-yellow-500 p-2 rounded-md inline-block">
          <span className="font-bold text-yellow-300">Early Bird Offer:</span> First 100 T-shirts at ₹319 only! Later ₹349
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <Calendar className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={24} />
          <div>
            <h2 className="font-bold text-lg text-blue-300">Important Dates</h2>
            <ul className="sm:ml-2 space-y-2 mt-2">
              <li className="flex items-center">
                <span className="border border-blue-500 text-blue-200 px-2 py-1 rounded mr-2 text-sm font-medium w-24 text-center">By March 8</span>
                <span>Receive by March 20</span>
              </li>
              <li className="flex items-center">
                <span className="border border-blue-500 text-blue-200 px-2 py-1 rounded mr-2 text-sm font-medium w-24 text-center">March 9-15</span>
                <span>Delivered during Srijan'25 (March 21-23)</span>
              </li>
              <li className="flex items-center">
                <span className="border border-blue-500 text-blue-200 px-2 py-1 rounded mr-2 text-sm font-medium w-24 text-center">After March 15</span>
                <span>Collect from campus on a later date</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-start">
          <ShoppingBag className="text-blue-300 mr-3 mt-1 flex-shrink-0" size={24} />
          <div>
            <h2 className="font-bold text-lg text-blue-300">T-shirt Availability</h2>
            <p className="ml-2 mt-1">T-shirts will be available from March 20 onwards based on your order date.</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className='flex justify-center relative w-full'>
          <BadgeDollarSign className="text-blue-300 mr-3 mt-1 absolute left-0 flex-shrink-0" size={24} />
            <h2 className="font-bold text-lg text-blue-300">Pricing</h2>
          </div>
          <div>
            <ul className="sm:ml-2 space-y-3 mt-3">
              <li className="flex items-center">
                <span className="font-bold text-left">Early Bird:</span>
                <span className="ml-2 text-left">₹319 (first 100 orders only)</span>
              </li>
              <li className="flex items-center">
                <span className="font-bold">Regular Price:</span>
                <span className="ml-2">₹349</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-blue-500 p-4 rounded-md">
        <div className="flex items-center justify-center">
          <Clock className="text-blue-300 mr-2" size={20} />
          <h2 className="font-bold text-lg text-blue-300">Hurry Up!</h2>
        </div>
        <p className="text-center mt-1">Payment details and contact information for T-shirt collection are provided at registration.</p>
      </div>
    {
      /*
      <div className="mt-6 text-center">
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Register Now
        </button>
      </div>
      */
    }
    </div>
  );
};

export default SrijanMerchandiseAnnouncement;
