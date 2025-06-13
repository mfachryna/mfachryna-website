import type { PageServerLoad } from './$types';
import { BLOGS } from '$env/static/private';

export const load: PageServerLoad = async () => {
    return {
        showBlogs: BLOGS === 'true',
    };
};