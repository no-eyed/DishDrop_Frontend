'use client';

import { deleteMeal} from '@/lib/actions';
import classes from './page.module.css';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function DeleteMealPage({params}) {
    const mealId = params.id;
    const [state, formAction] = useFormState(deleteMeal, {message: null, id: mealId});

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
                {/* <p style={{display: 'none'}}><input name='id' value={mealId} readOnly={true}></input></p> */}
                <MealsFormSubmit className={classes.actions_delete} active={'Deleting...'} passive={'Delete'}/>
                <Link href={`/my-meals`} className={classes.actions_cancel}>Cancel</Link>
            </form>
        </main>
        </>
    );
}