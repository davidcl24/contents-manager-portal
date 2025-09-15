import { revalidatePath } from 'next/cache';
import styles from './form.module.css';

export async function deleteForm(formData: FormData) {
    'use server';
    try {
        const url = formData.get('url') as string;
        const res = await fetch (url, {
            method: 'DELETE'
        });
    } catch (err) {
        console.error(err);
    }
    revalidatePath('/');
}

export async function postFormMultipart(formData: FormData) {
    'use server';
    try {
        const url = formData.get('url') as string;
        const res = await fetch (url, {
            method: 'POST',
            body: formData
        });
    } catch (err) {
        console.error(err);
    }
    revalidatePath('/');
}


export async function patchFormMultipart(formData: FormData) {
    'use server';
    try {
        const url = formData.get('url') as string;
        const res = await fetch (url, {
            method: 'PATCH',
            body: formData
        });
    } catch (err) {
        console.error(err);
    }
    revalidatePath('/');
}


export async function postFormJson(formData: FormData) {
    'use server';
    try {
        const url = formData.get('url') as string;
        const body = Object.fromEntries(formData.entries());

        const res = await fetch (url, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err);
    }
    revalidatePath('/');
}

export async function patchFormJson(formData: FormData) {
    'use server';
    try {
        const url = formData.get('url') as string;
        const body = Object.fromEntries(formData.entries());

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err);
    }
    revalidatePath('/');
}

export function ContentFormText({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label}>
            <input defaultValue={value} className={styles.input} placeholder={question} type="text" name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
        </label>
    );
}

export function ContentFormTextArea({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label}>
            <textarea defaultValue={value} className={styles.input} placeholder={question} rows={5} cols={30} name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
        </label>
    );
}

export function ContentFormFloat({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label}>
            <input defaultValue={value} className={styles.input} placeholder={question} type='number' step="0.01" min={0} max={10} name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
        </label>
    );
}

export function ContentFormNumber({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label}>
            <input defaultValue={value} className={styles.input} placeholder={question} type='number' name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
        </label>
    );
}

export function ContentFormDate({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label} key={question}>
            <input defaultValue={value} className={styles.input} placeholder={question} type='date' name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
        </label>
    );
}
