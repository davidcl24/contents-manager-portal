import { redirect } from "next/navigation";
import ShowFetchedItems from "../fetch-data";
import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText, patchFormMultipart, deleteForm, ContentFormFloat, ContentFormTextArea} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import { ContentFormDropdown, ContentFormDropdownMultiple } from "../form-client";
import { fetchFromGateway } from "../fetch-data";
import { API_GATEWAY_URL } from "../constants/consts";

export default async function MoviePage({searchParams}: {searchParams: {id? :string}}) {
    const {id} = await searchParams;
    let movieData: any = null;
    let genresData: any[] = [];
    let directorsData: any[] = [];
    let actorsData: any[] = [];

    if (id) {
        movieData = await fetchFromGateway(`${API_GATEWAY_URL}/movies/${id}`);
    }

    genresData = await fetchFromGateway(`${API_GATEWAY_URL}/genres`);
    directorsData = await fetchFromGateway(`${API_GATEWAY_URL}/directors`);
    actorsData = await fetchFromGateway(`${API_GATEWAY_URL}/actors`);

    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Movies</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl={`${API_GATEWAY_URL}/movies`} localUrl={"/movies/"} />

                <form className={styles.formWrapper} action={id ? patchFormMultipart : postFormMultipart}>
                    <input type="hidden" name="url" value={id ? `${API_GATEWAY_URL}/movies/${id}` : `${API_GATEWAY_URL}/movies`} />
                    <ContentFormText question={"Title"} value={movieData?.title ?? ""}/>
                    <ContentFormTextArea question="Synopsis" value={movieData?.synopsis ?? ""}/>
                    <ContentFormNumber question={"Lenght"} value={movieData?.length ?? ""}/>
                    <ContentFormDate question={"ReleaseDate"} value={movieData?.release_date ?? ""}/>
                    {/* <ContentFormNumber question={"GenreId"} value={movieData?.genre_id ?? ""}/> */}
                    <ContentFormDropdown question={"GenreId"} items={genresData} value={movieData?.genre_id ?? ""} />
                    <ContentFormDropdownMultiple question={"DirectorsIds"} items={directorsData} value={null} />
                    <ContentFormDropdownMultiple question={"ActorsIds"} items={actorsData} value={null} />
                    <ContentFormText question={"PosterUrl"} value={movieData?.poster_url ?? ""}/>
                    <ContentFormFloat question={"Rating"} value={movieData?.rating ?? ""}/>
                    <label className={styles.label}>
                        Is published
                        <input type="checkbox" name="is_published"/>
                    </label>
                    <input className={styles.fileInput} type="file" name="videoFile"/>
                    <input className={styles.button} type="submit" value={id ? 'Actualizar' : 'Enviar'}/>
                    {id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={async (formData: FormData) => {
                        'use server';
                        deleteForm(formData);
                        redirect('/movies');
                    }} />)} 
                    {id && (<input className={styles.button} type="submit" value="Cancelar" formAction={async () => {
                        'use server';
                        redirect('/movies');
                    }} />)}  
                </form>
            </div>
        </section>
    );
}