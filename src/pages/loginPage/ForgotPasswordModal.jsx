import { useState } from 'react';

export default function ForgotPasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset link sent to:', email);
    setEmail('');
    handleClose();
  };

  return (
    <div>
      {/* Forgot Password Link */}
      <a
        href="#"
        className="text-sm text-black mb-10 hover:text-red-500 dark:text-white dark:hover:text-amber-300"
        onClick={handleOpen}
      >
        Forgot your password?
      </a>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Send Reset Link
              </button>
            </form>
            <button
              onClick={handleClose}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
