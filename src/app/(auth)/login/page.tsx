"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeClosed, EyeOff, GraduationCap, Info, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { loginUser } from "@/lib/auth";
import AuthGuard from "@/components/AuthGuard";
import LoadingSpinner from "@/components/loader";
import { useAuthStore } from "@/store/useStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)


  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            ← Back
          </button>
          {/* School Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="border-primary border-2 p-3 rounded-full hover:opacity-50">
                <a href="/">
                  <Image src="/images/school_logo_enhanced_brightness-no-bg.png" alt="School Logo" width={40} height={40} />
                </a>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Standard School
            </h1>
            <p className="text-slate-600 mt-1">Admin, Staff & Parent Portal</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  try {
                    const data = await loginUser(email, password);
                  // set the user state
                  useAuthStore.getState().setUser(data.user);
                  console.log(data.user)
                  } catch(err: any){
                    // alert(err.message)
                    setError(err.message)
                  }
                  setLoading(false);
                }}
                id="login-form"
                className="space-y-4"
              >
                {
                  error ? 
                  <div className="text-red-500 border-red-500 border rounded p-2 text-sm flex items-center gap-3">
                    <Info className="w-4" />
                    <span>error: {error}</span>
                  </div> : null
                }
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                      <Mail className="text-gray-400 w-4 absolute left-2 top-[8px]" />
                      <Input
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null)
                        }}
                        value={email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="user@gmail.com"
                        className="py-5 px-8 rounded"
                        required
                      />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                      <Lock className="text-gray-400 w-4 absolute left-2 top-[8px]" />
                      <Input
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null)
                      }}
                      value={password}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="py-5 px-8 rounded"
                      placeholder="Enter your password"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)}>
                      {
                        showPassword ? <Eye className="text-gray-400 w-4 absolute right-2 top-[8px]" /> : <EyeOff className="text-gray-400 w-4 absolute right-2 top-[8px]" />
                      }
                    </button>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-[12px] font-normal cursor-pointer text-gray-600"
                  >
                    Remember me on this device
                  </Label>
                </div> */}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary rounded"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-4">
                      Loading... <LoadingSpinner />
                    </div>
                  ) : (
                    "sign In"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary hover:underline"
                >
                  Forgot your password?
                </a>
                <div className="text-sm text-slate-600">
                  Need help? Contact{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-primary hover:underline"
                  >
                    IT Support
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} Standard School. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
