import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Meals, created by Our Community<span className={classes.highlight}></span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself</p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>Share your favorite recipe</Link>
                </p>
            </header>
            <main>
                <Suspense fallback={<p className={classes.loading}>
            Fetching Meals...</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    );
}