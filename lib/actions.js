'use server';

import { redirect } from 'next/navigation';
import { saveMeal, editMeal, removeMeal, getMeal } from './meals';
import { revalidatePath } from 'next/cache';
import { imagePathToFile } from '@/utils/ImageUtils';

function isValid(text) {
    return text.trim() != '';
}

export async function shareMeal(prevState ,formData) {
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image')
    }

    if (!isValid(meal.title) || !isValid(meal.summary) || !isValid(meal.instructions) || meal.image.size === 0) {
        return {message: 'Invalid input'} 
    }

    await saveMeal(meal);

    revalidatePath('/meals', 'layout');
    redirect('/meals');
}

export async function updateMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image').size == 0 ? await imagePathToFile(prevState.image) : formData.get('image')
    }
    const mealId = formData.get('id');

    if (!isValid(meal.title) || !isValid(meal.summary) || !isValid(meal.instructions) || meal.image.size === 0) { 
        return {message: 'Invalid input'} 
    }
  
    await editMeal(meal, mealId);
    revalidatePath('/my-meals', 'layout');
    redirect('/my-meals');
}

export async function deleteMeal(prevState, formData) {
    const mealId = prevState.id;

    await removeMeal(mealId);

    revalidatePath('/my-meals', 'layout');
    redirect('/my-meals');
}