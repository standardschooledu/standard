import { NextResponse } from "next/server"
import {supabaseAdmin} from "@/lib/supabaseAdmin"
import { sendLoginEmail } from "@/lib/mail"

function generateRandomPassword(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join("")
}

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const password = generateRandomPassword()

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  try {
    await sendLoginEmail(email, password)
    return NextResponse.json({ success: true, message: "User created and email sent" })
  } catch (err: any) {
    return NextResponse.json({ error: "User created, but failed to send email" }, { status: 500 })
  }
}
