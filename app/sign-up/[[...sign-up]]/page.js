'use client'

import classes from './page.module.css'
// import { SignUp } from '@clerk/nextjs'

// export default function SignUpPage() {
//     return (
//         <div className={classes.SignupBox}>
//         <SignUp />
//         </div>
//     )
// }

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Socials from '@/components/auth/socials';

 
export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  // start the sign up process.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        username: e.target.username.value,
        email_address: e.target.email.value,
        password: e.target.password.value,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  return (
    <div>
      {!pendingVerification && (
        <div className={classes.SignupBox}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <h2>Sign Up</h2>
            <h3>to continue to Foodies</h3>
            <div className={classes.form_input}>
              <div className={classes.name}>
                <div>
                  <label htmlFor="firstname">FirstName</label>
                  <input id="firstname" name="first_name" type="text" />
                </div>
                <div>
                  <label htmlFor="lastname">LastName</label>
                  <input id="lastname" name="last_name" type="text" />
                </div>
              </div>
              <div>
                <label htmlFor="username">UserName</label>
                <input id="username" name="username" type="text" />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" required/>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required/>
              </div>
            </div>
            <button type='submit'>Sign up</button>
            <hr/>
            <Socials />
          </form>
        </div>
      )}
      {pendingVerification && (
        <div className={classes.VerifyBox}>
          <form className={classes.form}>
            <h3>Paste the 6-digit code provided to verify your email.</h3>
            <input
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={onPressVerify}>
              Verify Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
}