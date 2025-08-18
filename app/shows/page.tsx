import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText} from "../form";
import styles from '../form.module.css'

export default function ShowPage() {
    return (
        <section>
            <form className={styles.formWrapper} action={postFormMultipart}>
                <input type="hidden" name="url" value="http://localhost:30000/shows" />
                <ContentFormText questions={["Title", "Synopsis"]}/>
                <ContentFormNumber questions={["SeasonsNum"]} />
                <ContentFormDate questions={["Date"]} />
                <ContentFormNumber questions={["GenreId"]} />
                <ContentFormText questions={["PosterUrl"]} />
                <ContentFormNumber questions={["Rating"]} />
                <label className={styles.label}>
                    Is published
                    <input type="checkbox" name="is_published"/>
                </label>
                <input className={styles.button} type="submit"/>
            </form>
        </section>
    );
}