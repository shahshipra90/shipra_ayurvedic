import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // Prevent going back to the dashboard if not signed in
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, '', window.location.href);
      };
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    // Redirect to sign-in page if not authenticated
    router.push('/auth/signin');
    return null; // Return nothing while redirecting
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });  // Sign out and redirect to the login page
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>User ID: {session.user.id}</p>
      <p>Email: {session.user.email}</p>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default DashboardPage;
