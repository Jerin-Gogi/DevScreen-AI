import React from 'react'
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";
import toast from 'react-hot-toast';
function HomePage() {
  return (
    <>
      <button className='btn btn-secondary' onClick={()=>toast.success("Sucessful toast")}>Click Me </button>

      <Show when={"signed-in"}>
        <SignOutButton />
      </Show>

      <Show when={"signed-out"}>
        <SignInButton>
          <button>Login</button>
        </SignInButton>
        <SignUpButton />
      </Show>
      <UserButton />
    </>
  );
}

export default HomePage
