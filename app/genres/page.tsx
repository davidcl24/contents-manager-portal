import {ContentFormText, postFormJson} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems from "../fetch-data";


export default function GenrePage() {
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Genres</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl="http://localhost:30000/genres" localUrl={"/genres/"} />

                 <form className={styles.formWrapper} action={postFormJson}>
                    <input type="hidden" name="url" value="http://localhost:30000/genres" />
                    <ContentFormText questions={["Name"]}/>
                <input className={styles.button} type="submit"/>
            </form>
            </div>
        </section>
    );
}