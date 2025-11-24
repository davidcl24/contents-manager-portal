'use client';

import { useEffect, useState } from "react";
import styles from './form.module.css';
import { redirect, usePathname, useSearchParams } from "next/navigation";

/**
 * @summary It creates a component for a dropdown selection of items (only one can be selected at a time)
 * @param params - The text for the name, the items that will be displayed, and the defualt value
 * @returns HTML component
 */
export function ContentFormDropdown({question, items, value}: {question: string, items: any[], value: string}) {
    const [selected, setSelected] = useState(value || "");
    useEffect(() => { setSelected(value || ""); }, [value]);
    const url = usePathname() + "?" + "id=" + useSearchParams().get("id")?.toString();

    const nameAndId = question.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
    return (
        <select  className={styles.input}
                    name={nameAndId}
                    id={nameAndId}
                    value={selected}
                    onChange={(e) => {
                        setSelected(e.target.value);
                        if (question === 'Episodes')
                            redirect(`${url}&episode_id=${e.target.value}`)
                    }}>
            <option disabled={!!value} value={""}> -- select an option -- </option>
            {items.map((item) => (
                <option key={item.id} className={styles.input} value={item.id}>{item.name ?? item.title}</option>
            ))}
        </select>
    )
}

/**
 * @summary It creates a component for a dropdown selection of multple items (multiple can be selected)
 * @param params - The text for the name, the items that will be displayed, and the defualt value
 * @returns HTML component
 */
export function ContentFormDropdownMultiple({question, items, value}: {question: string, items: any[], value: string[] | null}) {
    const [selected, setSelected] = useState<string[]>(value || []);
    useEffect(() => { setSelected(value || []); }, [value]);

    const nameAndId = question.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
    return (
        <select  className={styles.input}
                    name={`${nameAndId}[]`}
                    id={nameAndId}
                    multiple
                    value={selected}
                    onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, opt => opt.value);
                        setSelected(values);
                    }}
                >
            <option disabled={!!value} value={""}> -- select an option -- </option>
            {items.map((item) => (
                <option key={item.id} className={styles.input} value={item.id}>{item.name ?? item.title}</option>
            ))}
        </select>
    )
}