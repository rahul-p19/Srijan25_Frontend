export default function QRCodeHolder() {
  const qrValue = "upi://pay?pa=user@upi&pn=User&mc=123456&tid=9876543210";

  return (
    <div className="p-4 border border-gray-500 rounded-md text-white bg-gray-900 text-center">
      <h3 className="text-lg font-bold mb-2">Scan to Pay</h3>

      {/* QR Code Image from Google Charts API */}
      <img
        src={`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(qrValue)}`}
        alt="QR Code"
        className="mx-auto"
      />

      <p className="text-sm mt-2">UPI ID: user@upi</p>
    </div>
  );
}
