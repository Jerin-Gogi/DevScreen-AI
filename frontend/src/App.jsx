
import { Show,SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {


  return (
    <>
      <h1>Welcome to DevScreen AI</h1>

      <Show when={"signed-in"}>
        <SignOutButton/>
      </Show>

      <Show when= {"signed-out"}>
        <SignInButton>
          <button>Login</button>
        </SignInButton>
        <SignUpButton/>
      </Show>
      <UserButton/>
    </>
  )
}

export default App;
