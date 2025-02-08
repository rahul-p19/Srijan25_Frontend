/* eslint-disable react/prop-types */
import Footer from "../Footer";
import Contact from "../home/Contact";
import Navbar from "../Navbar";

import LogoutIcon from "../../assets/icons/logout.svg";
import NotifsIcon from "../../assets/icons/notifications.svg";
import EditIcon from "../../assets/icons/pen.svg";

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 * @property {string[]} permissions
 * @property {string} [imageURL]
 * @property {string} year
 * @property {string} department
 *
 * @typedef {object} DashboardProps
 * @property {User} user
 * @property {function} logout
 *
 * The protected dashboard page
 * @param {DashboardProps} props
 * @returns {JSX.Element}
 */
export const DashboardPage = ({ user, logout }) => (
  <div className="font-sometypeMono">
    <Navbar />
    <main className="px-6 xms:px-16 md:px-[6vw]">
      <header className="flex gap-4 justify-around py-6 md:py-8">
        <button
          type="button"
          className="cursor-pointer p-1 rounded-xs transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
          onClick={logout}
        >
          <img src={LogoutIcon} alt="logout of your account" />
        </button>
        <p className="text-2xl grid place-items-center">My Dashboard</p>
        <a
          href="/notifications"
          className="cursor-pointer p-1 rounded-xs transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
        >
          <img src={NotifsIcon} alt="check notifications" />
        </a>
      </header>
      <div className="pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 xms:gap-x-16 md:gap-x-[6vw] md:gap-y-8">
        <div>
          <p className="flex py-4 text-2xl">Hello, {user.name}!</p>
          <div className="rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px">
            <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full bg-[#141414]">
              <p className="py-2 text-xl">My Merchandise</p>
              <img
                className="w-full max-w-3xs transition-all hover:-translate-y-0.5 active:translate-y-0"
                src="/merch-in-dashboard.svg"
                alt="Merchandise placeholder"
              />
            </section>
          </div>
        </div>
        <div className="rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px">
          <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full bg-[#141414] text-xl">
            <p>My Profile</p>
            <div className="relative w-full max-w-48">
              <img
                className="w-full bg-zinc-300 rounded-full ring-1 ring-slate-400/70"
                src={user.imageURL ?? "/empty-user.svg"}
                alt="User profile picture"
              />
              <button
                type="button"
                className="absolute bottom-1 right-1 cursor-pointer p-2 bg-zinc-200 ring-2 ring-slate-400/70 rounded-full transition-all hover:shadow-md hover:scale-110 active:scale-100 focus:outline-none"
              >
                <img src={EditIcon} alt="edit your profile picture" />
              </button>
            </div>
            <div className="flex flex-col items-start">
              <p>Name: {user.name}</p>
              <p>Department: {user.department}</p>
              <p>Year: {user.year}</p>
            </div>
          </section>
        </div>
        <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px">
          <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
            <p className="text-2xl flex">Events Registered</p>
            <p className="flex text-lg">
              No events have been registered to, yet!
            </p>
          </section>
        </div>
      </div>
    </main>
    <Contact />
    <Footer />
  </div>
);
