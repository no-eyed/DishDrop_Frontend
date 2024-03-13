'use client';

import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { updateMeal } from '@/lib/actions';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function UpdateMealPage({params}) {
  const image = useSearchParams().get('image');
  const [title, setTitle] = useState(useSearchParams().get('title'));
  const [summary, setSummary] = useState(useSearchParams().get('summary'));
  const [instructions, setInstructions] = useState(useSearchParams().get('instructions'));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'summary':
        setSummary(value);
        break;
      case 'instructions':
        setInstructions(value);
        break;
      default:
        break;
    }
  };

  const mealId = params.id;
  const [state, formAction] = useFormState(updateMeal, {message: null, image: image});

  return (
    <>
      <header className={classes.header}>
        <h1>
          Update your <span className={classes.highlight}>meal</span>
        </h1>
        {/* <p>Or any other meal you feel needs sharing!</p> */}
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <p style={{display: 'none'}}><input name='id' value={mealId} readOnly={true}></input></p>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required value={title} onChange={handleInputChange}/>
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required value={summary} onChange={handleInputChange}/>
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
              value={instructions}
              onChange={handleInputChange}
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" image={image}/>
          {state.message && <p className={classes.error}>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit active = {'Submitting...'} passive = {'Share Meal'}/>
          </p>
        </form>
      </main>
    </>
  );
}