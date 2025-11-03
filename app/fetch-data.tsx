import { redirect } from "next/navigation";
import styles from './list.module.css'
import { cookies } from "next/headers";

export async function getCookieHeader() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const relevantCookies = allCookies.filter(cookie => 
        ['access_token', 'refresh_token'].includes(cookie.name)
    );

    const cookieHeader = relevantCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    return cookieHeader;
}

export async function fetchFromGateway(url: string) {
    'use server';
    const cookieHeader = await getCookieHeader();
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader || '',
        },
        credentials: 'include',
    });

    if (res.ok) {
        return await res.json()
    }
}



export default async function ShowFetchedItems({apiUrl, localUrl}: {apiUrl: string, localUrl: string}) {
    const data = await fetchFromGateway(apiUrl);
    const items = Array.isArray(data) ? data : [];

    
    return (
        <div>
            <div className={styles.listBox}>
            {items.map((item: any) => {
                const [firstKey, firstValue] = Object.entries(item)[0] || [];

                return (
                <div key={item.id} className={styles.listItem}>
                    <p>
                    <span onClick={async () => {
                        'use server';
                        redirect(`${localUrl}/?id=${item.id}`);
                    }} className="font-bold cursor-pointer">{String(firstValue)}</span>
                    </p>
                </div>
                );
            })}
            </div>
        </div>
        );
}