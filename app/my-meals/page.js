import Link from 'next/link';
import classes from './page.module.css';
import MyMealsGrid from '@/components/meals/my-meals-grid';
import { getMyMeals } from '@/lib/meals';
import { Suspense } from 'react';

async function Meals() {
    const meals = await getMyMeals();
    return <MyMealsGrid meals={meals} />;
}

export default function MyMealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Meals, created by <span className={classes.highlight}>You</span>
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