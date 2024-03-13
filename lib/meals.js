import fs from 'fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import axios from 'axios';
import { getAuthHeader } from '@/utils/AuthUtils';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const response = await axios.get('http://localhost:8080/meals');
    const meals = response.data;

    return meals;
}

export async function getMyMeals() {
    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };
    const response = await axios.get(`http://localhost:8080/meals/my-meals/${auth.userId}`, { 
        headers: headers});
    const meals = response.data;

    return meals;
}

export async function getMeal(id) {
    const response = await axios(`http://localhost:8080/meals/${id}`);
    const meals = response.data;

    return meals;
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extenstion = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extenstion}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            throw new Error('Failed to save image');
        }
    });
    
    meal.image = `/images/${fileName}`;

    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };

    try {
        const response = await axios.post(`http://localhost:8080/meals/${auth.userId}`, meal, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error saving meal:', error);
        throw error;
    }
}

export async function editMeal(meal, mealId) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extenstion = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extenstion}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            throw new Error('Failed to save image');
        }
    });
    
    meal.image = `/images/${fileName}`;

    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };

    try {
        const response = await axios.put(`http://localhost:8080/meals/${auth.userId}/${mealId}`, meal, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error editing meal:', error);
        throw error;
    }
}


export async function removeMeal(mealId) {
    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };
    try {
        const response = await axios.delete(`http://localhost:8080/meals/${auth.userId}/${mealId}`, { 
        headers: headers});
        const res = await response.data;
        return res;
    }
    catch (error) {
        console.error('Error deleting meal:', error);
        throw error;
    }
}