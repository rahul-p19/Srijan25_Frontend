/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Contact from "../home/Contact";
import Navbar from "../Navbar";
import eventData from "../Events/allevents/event-ids";

import LogoutIcon from "../../assets/icons/logout.svg";
import NotifsIcon from "../../assets/icons/notifications.svg";
import EditIcon from "../../assets/icons/pen.svg";
import { getUserById } from "../../services/http/users";
import { Box, Modal } from "@mui/material";
import { PhoneInput, TextInput } from "../login/ui/inputs";
import { SignUpButton } from "../login/ui/buttons";
import toast from "react-hot-toast";
import { usersController } from "../../services/http";
import { env } from "../../config/config";
import { Link, redirect } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "var(--color-background)",
  border: "2px solid var(--color-greyBorder)",
  boxShadow: 24,
  p: 4,
};

export const DashboardPage = ({ userDetails, logout }) => {
  if (!userDetails || userDetails === "") redirect("/login");
  const [user, setUser] = useState(userDetails);
  const merchStatus = user.merchandise?.status ?? "Not ordered.";
  const merchColour = user.merchandise?.color;
  const merchSize = user.merchandise?.size;
  const merchPlaceholder = (user.merchandise && user.merchandise.color) ? user.merchandise.color.toLowerCase() === "black" ? "/merchandise/tshirt2.png" : "/merchandise/tshirt1.png" : "/merchandise/merch-in-dashboard.svg";

  // const registeredEvents = user.registeredEvents.length > 0 ? user.registeredEvents.map((eventId)=>await getEventById(eventId)) : [];
  // const pendingEvents = user.pendingEvents;
  // const wishlist = user.wishlist;

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    if (user.registeredEvents && user.registeredEvents.length > 0) {
      user.registeredEvents.map(eventId => {

        const newEvent = eventData.find((event) => event._id === eventId);

        setRegisteredEvents(prev => [...prev, newEvent])
      });
    }
    if (user.pendingEvents && user.pendingEvents.length > 0) {
      user.pendingEvents.map(eventId => {

        const newEvent = eventData.find((event) => event._id === eventId);

        setPendingEvents(prev => [...prev, newEvent])
      });
    }
    if (user.wishlist && user.wishlist.length > 0) {
      user.wishlist.map(eventId => {

        const newEvent = eventData.find((event) => {
          return event._id === eventId;
        });

        if (newEvent) setWishlist(prev => [...prev, newEvent])
      });
    }

    // console.log("events: ",{registeredEvents,pendingEvents,wishlist});

  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isFormValid =
    Object.values(formData).every((field) => field.trim() !== "") &&
    Object.values(errors).every((error) => error === "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    try {
      const response = await usersController.editUser({
        name: formData.name,
        phone: formData.phone,
      });

      setUser((d) => ({
        name: response.data.name,
        phone: response.data.phone,
        ...d,
      }));
      setMessage("Your details were edited successfully!");
      toast.success(message);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setMessage("Error while editing details. Try again.");
      toast.error(message);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  // const getMerchandise = async () => {
  //   try{
  //     const res = await fetch(`${env.API_SERVER}/users/get/Merchandise`,{
  //       credentials: "include"
  //     });
  //     const data = await res.json();
  //     if(data.success){
  //       setMerchStatus(data.merchandise.status);
  //       setMerchColour(data.merchandise.color);
  //       setMerchSize(data.merchandise.size);
  //       setMerchPlaceholder(data.merchandise.color.toLowerCase() === "black" ? "/merchandise/tshirt2.png" : "/merchandise/tshirt1.png")
  //     }
  //     else setMerchStatus("No merchandise orders. If you think this is incorrect, please contact us.");
  //     }catch(_err){
  //       setMerchStatus("An error occurred while fetching your merch status, please try again later.");
  //     }
  // }

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const sid = localStorage.getItem("sid");
  //   const providerID = localStorage.getItem("providerID");
  //   getUserById(sid, providerID).then((r) => {
  //     setUser(r.data);
  //   });
  //   getMerchandise();
  // }, []);

  return (
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
          <button
            type="button"
            onClick={() => {
              toast("Coming Soon!");
              // navigate("/notifications");
            }}
            className="cursor-pointer p-1 rounded-xs transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
          >
            <img src={NotifsIcon} alt="check notifications" />
          </button>
        </header>
        <p className="flex gap-4 py-6 md:py-8 text-2xl md:hidden">
          Hello, {user?.name}!
        </p>
        <div className="pb-6 md:pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 xms:gap-x-16 md:gap-x-[6vw] md:gap-y-8">
          <div className="order-2 md:order-1">
            <p className="md:flex py-4 text-2xl hidden">Hello, {user?.name}!</p>
            <div className="rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px">
              <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full bg-[#141414]">
                <p className="py-2 text-xl">My Merchandise</p>
                <img
                  className="w-full max-w-3xs transition-all hover:-translate-y-0.5 active:translate-y-0"
                  src={merchPlaceholder}
                  alt="Merchandise placeholder"
                />
                <p className="flex text-lg">Status: {merchStatus}</p>
                <p className="flex text-lg">{merchColour && `Colour: ${merchColour}`}</p>
                <p className="flex text-lg">{merchSize && `Size: ${merchSize}`}</p>
              </section>
            </div>
          </div>
          <div className="rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-1 md:order-2">
            <section className="flex flex-col items-center gap-6 p-6 rounded-md h-full w-full bg-[#141414] text-xl">
              <div className="flex justify-center items-center w-full">
                <p className="font-bold">My Profile</p>
                <button
                  type="button"
                  onClick={handleOpen}
                  className="cursor-pointer py-2 px-3 rounded-xs transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
                >
                  <img src={EditIcon} alt="edit your profile picture" />
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <p className="font-bold text-xl">Edit Profile</p>
                    <form
                      id="signupForm"
                      className="space-y-4 mt-4"
                      onSubmit={handleSubmit}
                    >
                      <TextInput
                        labelContent={
                          <>
                            <span className="text-[#8420FF]">Enter your</span>{" "}
                            name
                          </>
                        }
                        name="name"
                        type="text"
                        placeholder="Name..."
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <PhoneInput
                        labelContent={
                          <>
                            <span className="text-[#8420FF]">Enter your</span>{" "}
                            phone number
                          </>
                        }
                        name="phone"
                        value={formData.phone}
                        error={errors.phone}
                        setErrors={setErrors}
                        onChange={handleChange}
                      />
                      <div className="w-full flex justify-center mt-6">
                        <SignUpButton
                          onClick={handleSubmit}
                          textContent={loading ? "Confirming..." : "Confirm"}
                        />
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
              <img
                className="w-full max-w-48 bg-zinc-300 rounded-full ring-1 ring-slate-400/70"
                src={user?.photo?.url ?? "/empty-user.svg"}
                alt="User profile picture"
              />
              <div className="flex flex-col items-start">
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Phone No.: {user?.phone ?? "Not available"}</p>
              </div>
            </section>
          </div>
          <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-3">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              <p className="text-2xl flex">Registered Events</p>
              {registeredEvents && registeredEvents.length > 0 ?
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {registeredEvents.map((event, ind) => <Link key={ind} to={`/events/${event.slug}`} className="border border-greyBorder p-3 shadow-lg rounded-md">{event.name}</Link>)}
                </ul> :
                <p className="flex text-lg">
                  No events have been registered to, as of now!
                </p>}
            </section>
          </div>
          <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-4">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              <p className="text-2xl flex">Wishlisted Events</p>
              {wishlist && wishlist.length > 0 ?
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {wishlist.map((event, ind) => <Link key={ind} to={`/events/${event.slug}`} className="border border-greyBorder p-3 shadow-lg rounded-md">{event.name}</Link>)}
                </ul> :
                <p className="flex text-lg">
                  No events are in your wishlist, as of now!
                </p>}
            </section>
          </div>
          <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-5">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              <p className="text-2xl flex">Pending Events</p>
              {pendingEvents && pendingEvents.length > 0 ?
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {pendingEvents.map((event, ind) => <Link key={ind} to={`/events/${event.slug}`} className="border border-greyBorder p-3 shadow-lg rounded-md">{event.name}</Link>)}
                </ul> :
                <p className="flex text-lg">
                  No events are pending, as of now!
                </p>}
            </section>
          </div>
        </div>
      </main>
      <Contact />
      <Footer />
    </div>
  );
};
