import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText} from "../form";
import styles from '../form.module.css'

export default function MoviePage() {
    return (
        <section>
            <form className={styles.formWrapper} action={postFormMultipart}>
                <input type="hidden" name="url" value="http://localhost:30000/movies" />
                <ContentFormText questions={["Title", "Synopsis"]}/>
                <ContentFormNumber questions={["Lenght"]} />
                <ContentFormDate questions={["Date"]} />
                <ContentFormNumber questions={["GenreID"]} />
                <ContentFormText questions={["PosterURL"]} />
                <ContentFormNumber questions={["Rating"]} />
                <label className={styles.label}>
                    Is published
                    <input type="checkbox" name="isPublished"/>
                </label>
                <input className={styles.fileInput} type="file" name="videoFile"/>
                <input className={styles.button} type="submit"/>
            </form>
        </section>
    );
}