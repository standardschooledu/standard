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
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { loginUser } from "@/lib/auth";
import AuthGuard from "@/components/AuthGuard";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* School Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-white" />
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
                onSubmit={(e) => {
                  e.preventDefault();
                  loginUser(email, password);
                }}
                id="login-form"
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@gmail.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Remember me on this device
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary"
                >
                  Sign In
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
