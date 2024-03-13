import classes from './meals-grid.module.css';
import MealItems from './meals-items';

export default function MealsGrid({meals}) {
  return (
    <ul className={classes.meals}>
        {meals && meals.map((meal) => (
        <li key={meal.id}>
            <MealItems {...meal}/>
        </li>
        ))}
        {!meals}
    </ul>
  );
}