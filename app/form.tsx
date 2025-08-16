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
}


export function ContentFormText({questions}: {questions: string[]}) {
    return (
        questions.map((question) => (
            <label className={styles.label} key={question}>
                <input className={styles.input} placeholder={question} type="text" name={question.toLowerCase()} />
            </label>
        ))
    );
}

export function ContentFormNumber({questions}: {questions: string[]}) {
    return (
        questions.map((question) => (
            <label className={styles.label} key={question}>
                <input className={styles.input} placeholder={question} type='number' name={question.toLowerCase()} />
            </label>
        ))
    );
}

export function ContentFormDate({questions}: {questions: string[]}) {
    return (
        questions.map((question) => (
            <label className={styles.label} key={question}>
                <input className={styles.input} placeholder={question} type='date' name={question.toLowerCase()} />
            </label>
        ))
    );
}
