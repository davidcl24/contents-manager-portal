'use server';
import { API_GATEWAY_URL } from "./constants/consts";
import { cookies } from "next/headers";

/**
 * @summary Lets the user login into the app
 * @param formData - The data that comes from the form
 * @returns HTTP response status code
 */
export async function login(formData: FormData) {
    const body = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_GATEWAY_URL}/login/admin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    const myCookies = res.headers.getSetCookie();

    for (const cookie of myCookies) {
        const cookieStore = await cookies();
        const [name, value] = cookie.split('=');
        cookieStore.set({
            name: name,
            value: value,
            httpOnly: true,
            path: '/'
        });
    }

    //log(res.headers.getSetCookie())
    return res.ok;
}


/**
 * @summary Lets the user logout from the app
 * @returns HTTP response status code
 */
export async function logout() {
    const res = await fetch(`${API_GATEWAY_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    const myCookies = res.headers.getSetCookie();

    for (const cookie of myCookies) {
        const cookieStore = await cookies();
        const [name, value] = cookie.split('=');
        cookieStore.set({
            name: name,
            value: value,
            maxAge: 0,
            httpOnly: true,
            path: '/'
        });
    }
    return res.ok;
}