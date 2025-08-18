import {ContentFormText, postFormJson} from "../form";
import styles from '../form.module.css'

export default function ShowPage() {
    return (
        <section>
            <form className={styles.formWrapper} action={postFormJson}>
                <input type="hidden" name="url" value="http://localhost:30000/genres" />
                <ContentFormText questions={["Name"]}/>
                <input className={styles.button} type="submit"/>
            </form>
        </section>
    );
}