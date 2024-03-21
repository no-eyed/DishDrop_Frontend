'use client'

import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLinks from "@/components/main-header/nav-links";
import { UserButton, useUser } from "@clerk/nextjs";

export default function MainHeader() {
    const { isSignedIn, isLoaded } = useUser();
    if (!isLoaded) 
        return;

    return (
        <>
        <MainHeaderBackground />
        <header className={classes.header}>
        <Link className={classes.logo} href="">
            <Image src={LogoImg} alt="A plate of food" priority/>
            Next Level Food
        </Link>
        
        <nav className={classes.nav}>
            <ul>
                <li><NavLinks href='/'>Home</NavLinks></li>
                {
                    isSignedIn && ( 
                        <>
                            <li><NavLinks href="/meals">Browse Meals</NavLinks></li>
                            <li><NavLinks href="/my-meals">My Meals</NavLinks></li>
                        </>
                    )
                }
                <li><NavLinks href="/community">Foodies Community</NavLinks></li>
                {
                    !isSignedIn && (
                    <>
                        <li><NavLinks href="/sign-in">Sign In</NavLinks></li>
                        <li><NavLinks href="/sign-up">Sign Up</NavLinks></li>
                    </>
                    )
                }   
                <li> <UserButton afterSignOutUrl="/"/></li>
            </ul>
        </nav> 
        </header>
        
        </>
    );
}