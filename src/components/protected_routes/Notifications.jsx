import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

/**
 * @typedef {object} NotificationItem
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} timestamp
 */

/**
 * Mock Data (Fallback if API is empty)
 * @type {NotificationItem[]}
 */


const getNotification = async (setItems)=>{
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${backendUrl}/api/v1/notifications/getAll`, {
    credentials: 'include'
  })
  const {data} = await response.json();
  const notifications = data.map(noti => {
    return {
      id: noti._id,
      title: noti.title,
      description: noti.description,
      timestamp: new Date(noti.createdAt)
    }
  });
  
  setItems(notifications.reverse());
}
const Notifications = ({ user }) => {
    const userId = localStorage.getItem("sid");
    // console.log( userId );
    if (!userId) {
      window.location.href = "/login";
      // return;
    }

   const [items, setItems] = useState([]); // Use fallback data initially

   useEffect(() => {
     getNotification(setItems);
   }, []);

  // Function to format timestamp
  const getTimeDifference = (timestamp) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="font-mono min-h-screen w-full bg-background text-white p-6 flex flex-col">
    <Navbar />
    <div className="text-center m-2">
      <h1 className="text-2xl sm:text-xl mt-2 xl:text-3xl font-semibold">
        {user.name}&apos;s Notifications
      </h1>
    </div>

    <div className="flex-grow overflow-auto mt-4">
      <div className="border-gray-900 overflow-hidden rounded-md">
        <ul role="list" className="divide-y divide-gray-800">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="border-2 border-gray-500 overflow-hidden rounded-md gap-1 m-1">
                <li className="px-6 py-4 hover:bg-black focus:outline-none focus:border-gray-500">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">{item.title}</h2>
                    <span className="text-gray-500 text-sm">{getTimeDifference(item.timestamp)}</span>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </li>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No notifications available.</p>
          )}
        </ul>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default Notifications;