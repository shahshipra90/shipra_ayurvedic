import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page when the app loads
    router.push("/auth/signin");
  }, [router]);

  return <div>Loading...</div>;
};

export default HomePage;
