'use client'

import { FcGoogle } from "react-icons/fc";
import { useSignIn } from "@clerk/nextjs";
import classes from './page.module.css';

export default function Socials() {
    const { signIn } = useSignIn();

    const signInWith = (strategy) => {
        try {
            return signIn?.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (error) {
            console.error(error);
        }
        // return signIn?.authenticateWithRedirect({
        // strategy,
        // redirectUrl: "/sso-callback",
        // redirectUrlComplete: "/",
        // });
    };

    return (
        <div className={classes.social}>
            {/* <div className={classes.go}> */}
                <button onClick={() => signInWith("oauth_google")} type="button">
                
                    <FcGoogle/>
                </button>
            {/* </div> */}
        </div>
    );
}