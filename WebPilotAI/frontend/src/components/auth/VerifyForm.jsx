import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyForm = ({ email }) => {
  const [code, setCode] = useState("");
  const { verifyUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyUser({ email, code });
      alert("Account verified! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      alert("Invalid code, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl">Verify your account</h2>
      <p>Enter the code sent to {email}</p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
        Verify
      </button>
    </form>
  );
};

export default VerifyForm;