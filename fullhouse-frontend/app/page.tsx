"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handles login
  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login_user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to dashboard on successful login
        router.push("/dashboard");
      } else {
        // Handle error when account doesn't exist or incorrect credentials
        const errorData = await response.json();
        if (errorData.message === "User not found" || errorData.message === "Incorrect password") {
          alert("Invalid username or password");
        } else {
          alert(errorData.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
  };

  // Redirects to signup form
  const handleSignupRedirect = () => {
    router.push("/signup"); // Assumes you have a signup page at this route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-2">Full House</h1>
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
        <p className="text-gray-600 mb-6 max-w-sm">
          Find your roommate for the summer / post-graduation
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <Button className="w-full" variant="default" onClick={handleLogin}>
            Login
          </Button>
          <Button className="w-full" variant="outline" onClick={handleSignupRedirect}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
