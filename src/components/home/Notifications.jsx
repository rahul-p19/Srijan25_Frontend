// import { useEffect, useState } from 'react';
// import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

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
const items = [
  { id: 1, title: 'Barcelona vs Real Madrid', description: 'Barcelona defeated 5-2 yesterday', timestamp: Date.now() - 100000 },
  { id: 2, title: 'Barcelona vs Bayern Munich', description: 'Barcelona defeated 4-0 last month', timestamp: Date.now() - 5000000 },
  { id: 3, title: 'Athletico Madrid vs Real Madrid', description: 'Match Finished 1-1 tonight', timestamp: Date.now() - 3600000 },
  { id: 4, title: 'Athletico Madrid vs Real Madrid', description: 'Match Finished 1-1 tonight', timestamp: Date.now() - 7200000 },
  { id: 5, title: 'Bablu Badmos sent you a friend request!', description: 'Mele Babu ne thana thaya? :p', timestamp: Date.now() - 20000 },
];

const Notifications = ({ user }) => {
  // const [item, setItems] = useState(items); // Use fallback data initially

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/notifications')
  //     .then(response => {
  //       console.log("Fetched Notifications:", response.data);
  //       if (response.data.length > 0) {
  //         setItems(response.data); // Use API data if available
  //       }
  //     })
  //     .catch(error => console.error("Error fetching notifications:", error));
  // }, []);

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
    <div className='font-mono min-h-screen w-screen max-w-full relative overflow-x-clip bg-background  text-white p-6'>
          <Navbar/>
      <div className="text-center my-1 ">
        <h1 className='text-2xl sm:text-xl xl:text-3xl font-semibold'>
          {user.name}&apos;s Notifications
        </h1>
      </div>

      <div className="border-gray-900 overflow-hidden rounded-md">
        <ul role="list" className="divide-y divide-gray-800">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="border-2 border-gray-500 overflow-hidden rounded-md gap-1 m-1">
                <li className="px-6 py-4 hover:bg-black focus:outline-none focus:border-gray-500">
                 <div className="flex justify-between items-center">
                 <h2 className='text-lg font-medium'>{item.title}</h2>
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
     <Footer/>
    </div>
  );
};

export default Notifications;