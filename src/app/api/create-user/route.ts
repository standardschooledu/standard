import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { sendLoginEmail } from "@/lib/mail"

function generateRandomPassword(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
  return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join("")
}

export async function POST(req: Request) {
  const { email, accountType } = await req.json()

  if (!email || !accountType) {
    return NextResponse.json({ error: "Email and accountType are required" }, { status: 400 })
  }

  const validAccountTypes = ["teachers", "parents", "admins"]
  if (!validAccountTypes.includes(accountType)) {
    return NextResponse.json({ error: "Invalid accountType" }, { status: 400 })
  }

  const password = generateRandomPassword()

  // 1. Create the user
  const { data, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createUserError || !data?.user) {
    return NextResponse.json({ error: createUserError?.message || "User creation failed" }, { status: 500 })
  }

  const userId = data.user.id

  // 2. Insert into the correct table based on accountType
  const { error: insertError } = await supabaseAdmin
    .from(accountType)
    .insert([{ id: userId, email }]) // Insert minimal data; you can add more fields later

  if (insertError) {
    return NextResponse.json({ error: `User created, but failed to insert into ${accountType} table` }, { status: 500 })
  }

  // 3. Send login email
  try {
    await sendLoginEmail(email, password)
    return NextResponse.json({
      success: true,
      message: `User created in ${accountType} table and login email sent`,
    })
  } catch (emailError) {
    return NextResponse.json({
      error: `User created and inserted into ${accountType}, but failed to send email`,
    }, { status: 500 })
  }
}
