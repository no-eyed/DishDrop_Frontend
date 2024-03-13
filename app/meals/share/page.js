'use client';

import {useFormState} from 'react-dom'
import { shareMeal } from '@/lib/actions';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {
  const [state, formAction] = useFormState(shareMeal, {message: null});

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image"/>
          {state.message && <p className={classes.error}>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit active={'Submitting....'} passive={'Share Meal'}/>
          </p>
        </form>
      </main>
    </>
  );
}