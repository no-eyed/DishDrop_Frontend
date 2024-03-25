'use client';

import { deleteMeal} from '@/lib/actions';
import classes from './page.module.css';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useSearchParams } from 'next/navigation';

export default function DeleteMealPage({params}) {
    const mealId = params.id;
    const image = useSearchParams().get('image');
    const [state, formAction] = useFormState(deleteMeal, {message: null, id: mealId, image: image});

    return (
        <>
        <header className={classes.header}>
            <div className={classes.headerText}>
                <h1>Are you sure you want to delete this meal?</h1>
                <h2>This action is permanent. The data will be completely deleted from our servers.</h2>
            </div>
        </header>
        <main>
            <form className={classes.actions} action={formAction}>
                <MealsFormSubmit className={classes.actions_delete} active={'Deleting...'} passive={'Delete'}/>
                <Link href={`/my-meals`} className={classes.actions_cancel}>Cancel</Link>
            </form>
        </main>
        </>
    );
}