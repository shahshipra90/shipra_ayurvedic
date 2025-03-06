// src/pages/auth/error.tsx
import { useRouter } from "next/router";

export default function AuthErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="text-gray-600">{error ? error : "An unknown error occurred."}</p>
      <button
        onClick={() => router.push("/auth/signin")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Go to Sign In
      </button>
    </div>
  );
}
