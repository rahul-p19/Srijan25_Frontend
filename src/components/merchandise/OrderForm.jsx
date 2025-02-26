import { useState ,useEffect} from 'react';
const dataFetcher = async (setLoading, setQrLink, setShowOrderForm)=>{
  setLoading(true);
  try{
    const response = await fetch("http://localhost:3080/api/v1/merch/checkDiscount");
    if(response.ok){
      setQrLink("./discountedQR.jpeg")
      setLoading(false);
      return;
    }
    setQrLink("./regularQR.jpeg")
    setLoading(false);
  }
  catch(err){
    console.log(err);
    setQrLink("./regularQR.jpeg")
  setLoading(false);
  }
}

function OrderForm({setShowOrderForm}){
  const [loading, setLoading] = useState(true);
  const [qrLink, setQrLink] = useState("");
  useEffect(()=>{
    dataFetcher(setLoading,setQrLink, setShowOrderForm);
  },[])

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target);
    const fullname = formData.get("name");
    const email = formData.get("email");
    const nameOnShirt = formData.get("nameonshirt");
    const paymentProof = formData.get("paymentProof");
    const college=formData.get("college");
    const department=formData.get("department");
    const year=formData.get("year");

    // Validate the input
    if (!nameOnShirt.trim()) {
      alert("Please enter a name for the shirt.");
      return;
    }
    if (!paymentProof || paymentProof.size === 0) {
      alert("Please upload a payment proof image.");
      return;
    }

    try {
      // Simulate uploading the file (Replace with actual API call)
      console.log(nameOnShirt,paymentProof);
      const uploadFormData = new FormData();
      uploadFormData.append("image", paymentProof);
      uploadFormData.append("fullname", fullname);
      uploadFormData.append("email", email);
      uploadFormData.append("nameOnShirt", nameOnShirt);
      uploadFormData.append("college", college);
      uploadFormData.append("department", department);
      uploadFormData.append("year", year);
      console.log(uploadFormData);

      // Send the image to your backend API
     const response = await fetch("http://localhost:3080/api/v1/merch/submitImage", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        alert("Order submitted successfully!");
        setShowOrderForm(false); // Close the form after submission
      } else {
        alert("Failed to upload payment proof.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting your order.");
    }
  };
  const handleCloseForm = () => {
    setShowOrderForm(false);
  };
  return (
    <>
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="border border-gray-500 bg-background rounded-md w-full max-w-md mx-4 max-h-[80vh] mt-16 flex flex-col">
    <div className="p-6 overflow-y-auto">
    <h2 className="text-xl font-bold mb-4 text-center">Complete Your Order</h2>

    <form onSubmit={handleSubmitOrder}>
    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="name">
    Full Name
    </label>
    <input
    type="text"
    id="name"
    name="name"
    className="w-full p-2 bg-[#1c1c1c] border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
    required
    />
    </div>

    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="email">
    Email Address
    </label>
    <input
    type="email"
    id="email"
    name="email"
    className="w-full p-2 bg-[#1c1c1c] border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
    required
    />
    </div>

    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="nameonshirt">
    Name on Shirt(Max 10 Chars)
    </label>
    <input
    type="text"
    id="nameonshirt"
    name="nameonshirt"
    className="w-full p-2 bg-[#1c1c1c] border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
    maxLength={10}
    required
    />
    </div>


    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="nameonshirt">
    College
    </label>
    <input
    type="text"
    id="college"
    name="college"
    className="w-full p-2 bg-[#1c1c1c] border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
    required
    />
    </div>


    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="year">
    Year
    </label>
    <input
    type="number"
    id="year"
    name="year"
    className="w-full p-2 bg-[#1c1c1c] border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
    required
    />
    </div>

    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="department">
    Department
    </label>
    <input
    type="text"
    id="department"
    name="department"
    className="w-full p-2 bg-[#1c1c1c] border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-white"
    required
    />
    </div>

    <div className="mb-4">
    <label className="block text-sm font-medium mb-2" htmlFor="qr">
    QR code
    </label>


    {
      loading? "loading":<img
      src={qrLink}
      className="block w-full text-sm text-gray-100
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-green-100 file:text-white
      hover:file:bg-green-200"
      />
    }
    </div>
    <div className="mb-6"> 
    <label className="block text-sm font-medium mb-2" htmlFor="paymentProof"> 
    Payment Proof 
    </label> 
    <input 
    type="file" 
    accept="image/*" 
    id="paymentProof" 
    name="paymentProof" 
    className="block w-full text-sm text-gray-400 
    file:mr-4 file:py-2 file:px-4 
    file:rounded-lg file:border-0 
    file:text-sm file:font-semibold 
    file:bg-green-500 file:text-white 
    hover:file:bg-green-600" 
    /> 
    </div> 

    <div className="flex justify-between">
    <button
    type="button"
    className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700"
    onClick={handleCloseForm}
    >
    Cancel
    </button>
    <button
    type="submit"
    className="px-4 py-2 bg-[#1c1c1c] border border-gray-500 rounded hover:bg-gray-700"
    >
    Submit Order
    </button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </>
  )
}
export default OrderForm;
