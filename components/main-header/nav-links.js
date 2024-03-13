'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from '@/components/main-header/nav-links.module.css';

export default function NavLinks({href, children}) {
    const path = usePathname();
    return (
        <Link href={href} className={path.startsWith({href}) 
        ? `${classes.link} ${classes.active}` 
        : `${classes.link}`}> 
        {children}
        </Link>
    );
}