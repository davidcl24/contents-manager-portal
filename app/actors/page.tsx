import {ContentFormDate, ContentFormText, deleteForm, patchFormJson, postFormJson} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems, { fetchFromGateway } from "../fetch-data";
import { redirect } from "next/navigation";
import { API_GATEWAY_URL } from "../constants/consts";

/**
 * @summary Creates a component to manage the creation and modification of actors
 * @param searchParams - ID of the selected actor
 * @returns HTML component
 */
export default async function ActorPage({searchParams}: {searchParams: {id? :string}}) {
    const {id} = await searchParams;
    let actorData: any = null

    if (id) {
        actorData = await fetchFromGateway(`${API_GATEWAY_URL}/actors/${id}`);
    }
    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Actors</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl={`${API_GATEWAY_URL}/actors`} localUrl={"/actors/"} />

                <form className={styles.formWrapper} action={id ? patchFormJson : postFormJson}>
                    <input type="hidden" name="url" value={id ? `${API_GATEWAY_URL}/actors/${id}` : `${API_GATEWAY_URL}/actors`} />
                    <ContentFormText question={"Name"} value={actorData?.name ?? ""}/>
                    <ContentFormDate question={"Birth"} value={actorData?.birth ?? ""}/>
                    <input className={styles.button} type="submit" value={id ? 'Actualizar' : 'Enviar'}/>
                    {id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={async (formData: FormData) => {
                        'use server';
                        deleteForm(formData);
                        redirect('/actors');
                    }} />)}   
                    {id && (<input className={styles.button} type="submit" value="Cancelar" formAction={async () => {
                        'use server';
                        redirect('/actors');
                    }} />)}  
                 </form>
            </div>
        </section>
    );
}