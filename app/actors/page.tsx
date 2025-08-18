import {ContentFormDate, ContentFormText, postFormJson} from "../form";
import styles from '../form.module.css'

export default function ActorPage() {
    return (
        <section>
            <form className={styles.formWrapper} action={postFormJson}>
                <input type="hidden" name="url" value="http://localhost:30000/actors" />
                <ContentFormText questions={["Name"]}/>
                <ContentFormDate questions={["Birth"]}/>
                <input className={styles.button} type="submit"/>
            </form>
        </section>
    );
}