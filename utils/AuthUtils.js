import { cookies } from 'next/headers';
import { auth } from '@clerk/nextjs';

export function getAuthHeader() {
    const authToken = cookies().get('__session');

    const {userId} = auth();

    if (!userId || !authToken) {
        return undefined;
    }

    return {
        token : authToken.value,
        userId : userId
    }
}