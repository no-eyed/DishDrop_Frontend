import Link from 'next/link';
import Image from 'next/image';

import classes from './my-meals-items.module.css';

export default function MealItems({ id, title, slug, image, summary, creator, instructions }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${id}`} className={classes.actions_view}>View Details</Link>
          <Link href={{ pathname : `/my-meals/edit/${id}`, query: {title: title, slug: slug, image: image, summary: summary, creator: creator, instructions: instructions}}} className={classes.actions_update}>Update Meal</Link>
          <Link href={`my-meals/delete/${id}`} className={classes.actions_delete}>Delete Meal</Link>
        </div>
      </div>
    </article>
  );
}