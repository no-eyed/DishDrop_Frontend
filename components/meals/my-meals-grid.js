import classes from './meals-grid.module.css';
import MyMealItems from './my-meals-items';

export default function MyMealsGrid({meals}) {
  return (
    <ul className={classes.meals}>
        {meals && meals.map((meal) => (
        <li key={meal.id}>
            <MyMealItems {...meal}/>
        </li>
        ))}
        {!meals}
    </ul>
  );
}