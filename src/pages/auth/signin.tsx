import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Import the useRouter hook from Next.js
import { signIn } from 'next-auth/react';  // Import signIn from next-auth

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();  // Initialize the router

  // On page load, check if there are stored credentials in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);  // Automatically check the 'Remember Me' checkbox
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await signIn('credentials', {
      redirect: false,  // Prevent automatic redirect
      email,
      password,
    });

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      // Handle successful login
      console.log('Login successful');
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      // Redirect to the dashboard after successful login
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-center mb-6 text-600">
          Shipra Ayurvedic Herbals
        </h1>

        {/* Sign In Form */}
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

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}  // Toggle rememberMe value
              id="rememberMe"
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
          </div>

          {/* Error Message */}
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            Sign In
          </button>
        </form>

        {/* Password Reset Link */}
        <div className="mt-4 text-center">
          <a href="/auth/reset" className="text-blue-500 hover:underline">Click here to reset your password</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
