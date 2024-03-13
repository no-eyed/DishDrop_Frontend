'use client';

import {useFormStatus} from 'react-dom';

export default function MealsFormSubmit({onSubmit, active, passive}) {
    const {pending} = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? `${active}` : `${passive}`}
        </button>
    )
}   