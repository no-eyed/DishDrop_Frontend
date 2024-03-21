'use client'

import classes from './page.module.css'
// import { SignIn } from '@clerk/nextjs'

// export default function SignInPage() {
//     return (
//         <div className={classes.SigninBox}>
//         <SignIn />
//         </div>
//     )
// 

 
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Socials from '@/components/auth/socials';
 
export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  //const [username, setUsername] = React.useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
 
  // Handle the submission of the sign-in form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    // Start the sign-in process using the email and password provided
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
 
      if (completeSignIn.status !== 'complete') {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.log(JSON.stringify(completeSignIn, null, 2));
      }
 
      if (completeSignIn.status === 'complete') {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push('/');
      }
    } catch (err) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // Display a form to capture the user's email and password
  return (
    <div className={classes.SigninBox}>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
        <h2>Sign In</h2>
        <h3>to continue to Foodies</h3>
        <div className={classes.form_input}>
          <div>
            <label htmlFor="email">Email or Username</label>
            <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" value={email} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" value={password} />
          </div>
        </div>
        <button type="submit">Sign In</button>
        <hr/>
        <Socials />
      </form>
    </div>
  );
}