import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems from "../fetch-data";


export default function ShowPage() {
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Shows</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl="http://localhost:30000/shows" localUrl={"/shows/"}/>

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
            </div>
        </section>
    );
}