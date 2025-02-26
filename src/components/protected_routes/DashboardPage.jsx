/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Contact from "../home/Contact";
import Navbar from "../Navbar";

import LogoutIcon from "../../assets/icons/logout.svg";
import NotifsIcon from "../../assets/icons/notifications.svg";
import EditIcon from "../../assets/icons/pen.svg";
import { getUserById } from "../../services/http/users";
import { Box, Modal } from "@mui/material";
import { PhoneInput, TextInput } from "../login/ui/inputs";
import { SignUpButton } from "../login/ui/buttons";
import toast from "react-hot-toast";
import { usersController } from "../../services/http";
import { FancyButton } from "../Events/Eventpage";
import eventData from "../Events/allevents/data.json"; // Adjust path if necessary

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

export const DashboardPage = ({ logout }) => {
  const [user, setUser] = useState(undefined);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    photo: null,
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
  const [activeCategory, setActiveCategory] = useState("Registered Events");

  const filterTypeEvent = (type) => {
    if (type === "Registered Events") {
      return user?.registeredEvents ?? [];
    } else if (type === "WishlistedEvents") {
      return user?.wishlist ?? [];
    } else {
      return user?.pendingEvents ?? [];
    }
  };

  useEffect(() => {
    setFormData({ name: user?.name, phone: user?.phone });
  }, [user]);

  const isFormValid =
    Object.entries(formData)
      .filter(([key]) => key !== "photo")
      .every(([, value]) => value?.trim() !== "") &&
    Object.values(errors).every((error) => error === "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    try {
      const response = await usersController.editUser({
        name: formData.name,
        phone: formData.phone,
        photo: formData.photo,
      });

      setUser((d) => ({
        name: response.data.name,
        phone: response.data.phone,
        photo: { ...d.photo, url: response.data.photourl },
        ...d,
      }));
      console.log(user);
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

  // const navigate = useNavigate();

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const providerID = localStorage.getItem("providerID");
    getUserById(sid, providerID).then((r) => {
      setUser(r.data);
    });
  }, []);

  const handleCardClick = (eventData) => {
    window.location.href = `/events/${eventData?.category}/${eventData?.slug}`;
  };

  const truncateText = (text, maxLength = 310) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

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
                  src="/merch-in-dashboard.svg"
                  alt="Merchandise placeholder"
                />
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
                  <img src={EditIcon} alt="edit your profile" />
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
                      <div>
                        <div className="text-white font-extrabold text-sm sm:text-base">
                          <span className="text-[#8420FF]">Upload a</span>{" "}
                          profile picture
                        </div>
                        <div className="rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px">
                          <input
                            accept="image/*"
                            className="w-full rounded-md bg-[var(--color-background)] p-4 file:mr-2 file:rounded-full file:border-0 file:bg-violet-50 file:px-3 file:p-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                            name="photo"
                            type="file"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
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
              <div className="flex flex-col items-start text-base">
                <p className="relative after:absolute after:left-0 after:bottom-[0.3em] after:h-[0.1em] after:w-full after:bg-gradient-to-r after:from-red-700 after:via-purple-800 after:to-blue-900">
                  NAME: {user?.name}
                </p>
                <p className="relative after:absolute after:left-0 after:bottom-[0.3em] after:h-[0.1em] after:w-full after:bg-gradient-to-r after:from-red-700 after:via-purple-800 after:to-blue-900">
                  EMAIL: {user?.email}
                </p>
                <p className="relative after:absolute after:left-0 after:bottom-[0.3em] after:h-[0.1em] after:w-full after:bg-gradient-to-r after:from-red-700 after:via-purple-800 after:to-blue-900">
                  PHONE NO.: {user?.phone ?? "Not available"}
                </p>
              </div>
            </section>
          </div>
          {/* <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-3">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              <p className="text-2xl flex">Registered Events</p>
              <p className="flex text-lg">
                No events have been registered to, yet!
              </p>
            </section>
          </div>
          <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-4">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              <p className="text-2xl flex">Wishlisted Events</p>
              <p className="flex text-lg">
                No events have been wishlisted, yet!
              </p>
            </section>
          </div>
          <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-5">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              <p className="text-2xl flex">Pending Events</p>
              <p className="flex text-lg">No events are pending, yet!</p>
            </section>
          </div> */}
          <nav className="col-span-full flex flex-wrap justify-center gap-8 mb-10 order-4">
            {["Registered Events", "Wishlisted Events", "Pending Events"].map(
              (category) => (
                <FancyButton
                  key={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </FancyButton>
              ),
            )}
          </nav>
          <div className="col-span-full rounded-md bg-gradient-to-r from-red-700 via-purple-800 to-blue-900 p-px order-5">
            <section className="flex flex-col gap-6 md:gap-8 rounded-md h-full w-full bg-[#141414] py-6 md:py-8 px-[6vw]">
              {filterTypeEvent(activeCategory).length === 0 ? (
                <p className="flex text-lg">No events in this section, yet!</p>
              ) : (
                filterTypeEvent(activeCategory).map((item) => (
                  <div
                    key={item?.slug}
                    onClick={() => handleCardClick(item)}
                    className="card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <img
                      src={
                        eventData
                          .filter((f) => f.eventName === item?.name)
                          .at(0)?.eventPoster
                      }
                      alt={item?.name}
                      className="w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      className="
                      absolute 
                      left-0 
                      right-0 
                      bottom-0 
                      p-4 
                      bg-gradient-to-t from-black to-transparent 
                      text-white 
                      opacity-0 
                      group-hover:opacity-100 
                      transition-opacity 
                      duration-300
                    "
                    >
                      <h3 className="text-xl font-bold mb-1">{item?.name}</h3>

                      <p className="text-sm">
                        {truncateText(
                          Array.isArray(item?.description)
                            ? item?.description.join(" ")
                            : item?.description,
                          310,
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </main>
      <Contact />
      <Footer />
    </div>
  );
};
