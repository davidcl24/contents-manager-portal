import { redirect } from "next/navigation";
import styles from './list.module.css'

async function fetchFromGateway(url: string) {
    const res = await fetch(url, {
        method: 'GET',
    });

    const data = await res.json();
    return data;
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