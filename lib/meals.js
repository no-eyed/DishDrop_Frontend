import fs from 'fs';
import xss from 'xss';
import axios from 'axios';
import { getAuthHeader } from '@/utils/AuthUtils';
import { generateRandom } from '@/utils/RandomUtils';

export async function getMeals() {
        
    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/meals`);
        const meals = response.data;

        return meals;
    }
    catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
}

export async function getMyMeals() {
    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };

    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/meals/my-meals/${auth.userId}`, { 
            headers: headers});
        const meals = response.data;

        return meals;
    }
    catch (error) {
        console.error('Error fetching user meals:', error);
        throw error;
    }
}

export async function getMeal(id) {

    try {
        const response = await axios(`${process.env.BACKEND_URL}/meals/${id}`);
        const meals = response.data;

        return meals;
    }
    catch (error) {
        console.error('Error fetching meal:', error);
        throw error;
    }
}

export async function saveMeal(meal) {
    meal.instructions = xss(meal.instructions);

    const extenstion = meal.image.name.split('.').pop();
    const timestamp = Date.now();
    const dateString = timestamp.toLocaleString();
    const fileName = `${generateRandom(32)}` + `${dateString}` + `.${extenstion}`;

    const stream = fs.createWriteStream(`public/mealImages/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            throw new Error('Failed to save image');
        }
    });
    
    meal.image = `/mealImages/${fileName}`;

    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };

    try {
        const response = await axios.post(`${process.env.BACKEND_URL}meals/${auth.userId}`, meal, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error saving meal:', error);
        throw error;
    }
}

export async function editMeal(meal, mealId, prevImage) {
    meal.instructions = xss(meal.instructions);

    const extenstion = meal.image.name.split('.').pop();
    const timestamp = Date.now();
    const dateString = timestamp.toLocaleString();
    const fileName = `${generateRandom(32)}` + `${dateString}` + `.${extenstion}`;

    prevImage = `./public${prevImage}`;
    fs.unlink(prevImage, err => {
        if (err) {
            throw new Error('Failed to delete image');
        }
    });

    const stream = fs.createWriteStream(`public/mealImages/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            throw new Error('Failed to save image');
        }
    });
    
    meal.image = `/mealImages/${fileName}`;

    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };

    try { 
        const response = await axios.put(`${process.env.BACKEND_URL}/meals/${auth.userId}/${mealId}`, meal, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error editing meal:', error);
        throw error;
    }
}


export async function removeMeal(mealId, prevImage) {
    const auth = getAuthHeader();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + auth.token
    };
    try {
        prevImage = `./public${prevImage}`;
        fs.unlink(prevImage, err => {
            if (err) {
                throw new Error('Failed to delete image');
            }
        });
        const response = await axios.delete(`${process.env.BACKEND_URL}/meals/${auth.userId}/${mealId}`, { 
        headers: headers});
        const res = await response.data;
        return res;
    }
    catch (error) {
        console.error('Error deleting meal:', error);
        throw error;
    }
}