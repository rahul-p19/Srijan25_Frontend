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

export const DashboardPage = ({ userID, logout }) => {
  const [user, setUser] = useState(undefined);

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

  // const navigate = useNavigate();

  useEffect(() => {
    const sid = localStorage.getItem("sid");
    const providerID = JSON.parse(localStorage.getItem("providerID"));
    getUserById(sid, providerID).then((r) => {
      setUser(r.data);
    });
  }, []);

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
          </div>
        </div>
      </main>
      <Contact />
      <Footer />
    </div>
  );
};
