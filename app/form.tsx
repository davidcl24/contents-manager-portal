import { revalidatePath } from 'next/cache';
import styles from './form.module.css'

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

export function ContentFormText({questions}: {questions: string[]}) {
    return (
        questions.map((question) => (
            <label className={styles.label} key={question}>
                <input className={styles.input} placeholder={question} type="text" name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
            </label>
        ))
    );
}

export function ContentFormNumber({questions}: {questions: string[]}) {
    return (
        questions.map((question) => (
            <label className={styles.label} key={question}>
                <input className={styles.input} placeholder={question} type='number' name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
            </label>
        ))
    );
}

export function ContentFormDate({questions}: {questions: string[]}) {
    return (
        questions.map((question) => (
            <label className={styles.label} key={question}>
                <input className={styles.input} placeholder={question} type='date' name={question.split(/\.?(?=[A-Z])/).join('_').toLowerCase()} />
            </label>
        ))
    );
}
