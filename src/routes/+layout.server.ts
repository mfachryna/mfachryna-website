import { RESUME_URL } from '$env/static/private';

export async function load() {
    return {
        resumeUrl: RESUME_URL 
            ? RESUME_URL
            : null
    };
}