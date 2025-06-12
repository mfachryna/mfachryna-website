import { RESUME_GOOGLE_DRIVE_ID } from '$env/static/private';

export async function load() {
    return {
        resumeUrl: RESUME_GOOGLE_DRIVE_ID 
            ? `https://drive.google.com/file/d/${RESUME_GOOGLE_DRIVE_ID}/view`
            : null
    };
}