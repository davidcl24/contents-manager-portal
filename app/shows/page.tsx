import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText, patchFormMultipart, deleteForm} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems from "../fetch-data";


export default async function ShowPage({searchParams}: {searchParams: {id? :string}}) {
    const {id} = await searchParams;
    let showData: any = null

    if (id) {
        const res = await fetch(`http://localhost:30000/shows/${id}`)
        if (res.ok) {
            showData = await res.json();
        }
    }
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Shows</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl="http://localhost:30000/shows" localUrl={"/shows/"}/>

                <form className={styles.formWrapper} action={id ? patchFormMultipart : postFormMultipart}>
                    <input type="hidden" name="url" value={id ? `http://localhost:30000/shows/${id}` : "http://localhost:30000/shows"} />
                    <ContentFormText question={"Title"} value={showData?.title ?? ""}/>
                    <ContentFormText question={"Synopsis"} value={showData?.synopsis ?? ""}/>
                    <ContentFormNumber question={"SeasonsNum"} value={showData?.seasons_num ?? ""}/>
                    <ContentFormDate question={"Date"} value={showData?.date ?? ""}/>
                    <ContentFormNumber question={"GenreId"} value={showData?.genre_id ?? ""}/>
                    <ContentFormText question={"PosterUrl"} value={showData?.poster_url ?? ""}/>
                    <ContentFormNumber question={"Rating"} value={showData?.rating ?? ""}/>
                    <label className={styles.label}>
                        Is published
                        <input type="checkbox" name="is_published"/>
                    </label>
                    <input className={styles.button} type="submit" value={id ? 'Actualizar' : 'Enviar'}/>
                    {id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={deleteForm} />)} 
                </form>
            </div>
        </section>
    );
}