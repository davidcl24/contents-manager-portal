import {ContentFormDate, ContentFormText, deleteForm, patchFormJson, postFormJson} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems from "../fetch-data";
import { redirect } from "next/navigation";


export default async function DirectorPage({searchParams}: {searchParams: {id? :string}}) {
    const {id} = await searchParams;
    let directorData: any = null

    if (id) {
        const res = await fetch(`http://localhost:30000/directors/${id}`)
        if (res.ok) {
            directorData = await res.json();
        }
    }
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Directors</h1>
            </div>
            
            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl="http://localhost:30000/directors" localUrl={"/directors/"} />

                <form className={styles.formWrapper} action={id ? patchFormJson : postFormJson}>
                    <input type="hidden" name="url" value={id ? `http://localhost:30000/directors/${id}` : `http://localhost:30000/directors`} />
                    <ContentFormText question={"Name"} value={directorData?.name ?? ""}/>
                    <ContentFormDate question={"Birth"} value={directorData?.birth ?? ""}/>
                    <input className={styles.button} type="submit" value={id ? 'Actualizar' : 'Enviar'}/>
                    {id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={async (formData: FormData) => {
                        'use server';
                        deleteForm(formData);
                        redirect('/directors')
                    }} />)}     
                    {id && (<input className={styles.button} type="submit" value="Cancelar" formAction={async () => {
                        'use server';
                        redirect('/directors');
                    }} />)}     
                </form>
            </div>
        </section>
    );
}