'use client';

import { useEffect, useState } from "react";
import styles from './form.module.css';


export function ContentFormDropdown({question, items, value}: {question: string, items: any[], value: string}) {
    const [selected, setSelected] = useState(value || "");
    useEffect(() => { setSelected(value || ""); }, [value]);

    const nameAndId = question.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
    return (
        <select  className={styles.input}
                    name={nameAndId}
                    id={nameAndId}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}>
            <option disabled={!!value} value={""}> -- select an option -- </option>
            {items.map((item) => (
                <option key={item.id} className={styles.input} value={item.id}>{item.name ?? item.title}</option>
            ))}
        </select>
    )
}