import ShowFetchedItems from "../fetch-data";
import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';

export default function MoviePage() {
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Movies</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl="http://localhost:30000/movies" localUrl={"/movies/"} />

                <form className={styles.formWrapper} action={postFormMultipart}>
                    <input type="hidden" name="url" value="http://localhost:30000/movies" />
                    <ContentFormText questions={["Title", "Synopsis"]}/>
                    <ContentFormNumber questions={["Lenght"]} />
                    <ContentFormDate questions={["ReleaseDate"]} />
                    <ContentFormNumber questions={["GenreId"]} />
                    <ContentFormText questions={["PosterUrl"]} />
                    <ContentFormNumber questions={["Rating"]} />
                    <label className={styles.label}>
                        Is published
                        <input type="checkbox" name="is_published"/>
                    </label>
                    <input className={styles.fileInput} type="file" name="videoFile"/>
                    <input className={styles.button} type="submit"/>
                </form>
            </div>
        </section>
    );
}