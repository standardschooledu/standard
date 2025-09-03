import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { sendLoginEmail } from "@/lib/mail"

function generateRandomPassword(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join("")
}

export async function POST(req: Request) {
  const { email, account_type } = await req.json()

  if (!email || !account_type) {
    return NextResponse.json({ error: "Email and account_type are required" }, { status: 400 })
  }

  const validAccountTypes = ["teachers", "parents", "admins", "students"]
  if (!validAccountTypes.includes(account_type)) {
    return NextResponse.json({ error: "Invalid account_type" }, { status: 400 })
  }

  const password = generateRandomPassword()

  // 1. Create the user
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
    user_type: account_type, // 👈 no "options"
  },
  })

  if (error || !data?.user) {
    return NextResponse.json({ error: error?.message || "User creation failed" }, { status: 500 })
  }

  // const userId = data.user.id

  // 2. Insert into the correct table based on account_type
  // const { error: insertError } = await supabaseAdmin
  //   .from("user_roles")
  //   .insert([{ uuid: userId, email, account_type}])

  // if (insertError) {
  //   return NextResponse.json({ error: `User created, but failed to insert into user_roles table` }, { status: 500 })
  // }

  // 3. Send login email
  try {
    await sendLoginEmail(email, password)
    return NextResponse.json({
      success: true,
      message: `User created successfully and login email sent`,
    })
  } catch (emailError) {
    return NextResponse.json({
      error: `User created successfully, but failed to send email`,
    }, { status: 500 })
  }
}
