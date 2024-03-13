import classes from './loading.module.css';

export default function MealsLoadingPage() {
    return (
        <div className={classes.loading}>
            <p>Fetching Meals...</p>
        </div>
        
    );
}