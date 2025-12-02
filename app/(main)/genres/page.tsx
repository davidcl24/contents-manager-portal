import {ContentFormText, deleteForm, patchFormJson, postFormJson} from "../../form";
import styles from '../../form.module.css';
import stylesList from '../../list.module.css';
import ShowFetchedItems, { fetchFromGateway } from "../../fetch-data";
import { redirect } from "next/navigation";
import { API_GATEWAY_URL } from "../../constants/consts";

/**
 * @summary Creates a component to manage the creation and modification of genres
 * @param searchParams - ID of the selected genre
 * @returns HTML component
 */
export default async function GenrePage({searchParams}: {searchParams: {id? :string}}) {
    const {id} = await searchParams;
    let genreData: any = null

    if (id) {
        genreData = await fetchFromGateway(`${API_GATEWAY_URL}/genres/${id}`);
    }
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Genres</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl={`${API_GATEWAY_URL}/genres`} localUrl={"/genres/"} />

                 <form className={styles.formWrapper} action={id ? patchFormJson : postFormJson}>
                    <input type="hidden" name="url" value={id ? `${API_GATEWAY_URL}/genres/${id}` : `${API_GATEWAY_URL}/genres`} />
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