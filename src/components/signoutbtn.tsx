'use client'
import React from 'react'
import { Button } from './ui/button'
// import { useRouter } from 'next/router';
import { signOutUser } from '@/lib/auth';

const Signoutbtn = () => {
        // const router = useRouter();
    
        const handleSignOut = async () => {
        try {
          await signOutUser();
        //   router.replace("/login"); // Optional redirect after logout
        } catch (err: any) {
          alert("Failed to log out: " + err.message);
        }
      };
      
  return (
    <Button className="w-full rounded" onClick={handleSignOut}>Sign out</Button>
  )
}

export default Signoutbtn