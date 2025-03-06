// pages/auth/reset-password.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      // Show success or redirect user
      alert('Password reset email sent!');
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/signin');  // Redirects back to login page
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleBackToLogin}
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
