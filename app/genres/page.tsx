import {ContentFormText, deleteForm, patchFormJson, postFormJson} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems from "../fetch-data";
import { redirect } from "next/navigation";


export default async function GenrePage({searchParams}: {searchParams: {id? :string}}) {
    const {id} = await searchParams;
    let genreData: any = null

    if (id) {
        const res = await fetch(`http://localhost:30000/genres/${id}`)
        if (res.ok) {
            genreData = await res.json();
        }
    }
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Genres</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl="http://localhost:30000/genres" localUrl={"/genres/"} />

                 <form className={styles.formWrapper} action={id ? patchFormJson : postFormJson}>
                    <input type="hidden" name="url" value={id ? `http://localhost:30000/genres/${id}` : "http://localhost:30000/genres"} />
                    <ContentFormText question={"Name"} value={genreData?.name ?? ""}/>
                    <input className={styles.button} type="submit" value={id ? 'Actualizar' : 'Enviar'}/>
                    {id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={async (formData: FormData) => {
                        'use server';
                        deleteForm(formData);
                        redirect('/genres');
                    }} />)} 
                    {id && (<input className={styles.button} type="submit" value="Cancelar" formAction={async () => {
                        'use server';
                        redirect('/genres');
                    }} />)}  
            </form>
            </div>
        </section>
    );
}