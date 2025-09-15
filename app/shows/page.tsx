import {postFormMultipart ,ContentFormDate, ContentFormNumber, ContentFormText, patchFormMultipart, deleteForm, ContentFormFloat} from "../form";
import styles from '../form.module.css';
import stylesList from '../list.module.css';
import ShowFetchedItems, { fetchFromGateway } from "../fetch-data";
import { redirect } from "next/navigation";
import { ContentFormDropdown } from "../form-client";
import { API_GATEWAY_URL } from "../constants/consts";

export default async function ShowPage({searchParams}: {searchParams: {id? :string, episode_id?: string}}) {
    const {id, episode_id} = await searchParams;
    let showData: any = null;
    let episodeData: any = null;
    let episodesData: any = [];
    let genresData: any[] = [];

    if (id) {
        showData = await fetchFromGateway(`${API_GATEWAY_URL}/shows/${id}`);
        episodesData = await fetchFromGateway(`${API_GATEWAY_URL}/shows/${id}/episodes`);
    }
    if (episode_id) {
        episodeData = await fetchFromGateway(`${API_GATEWAY_URL}/episodes/${episode_id}`);
    }
    genresData = await fetchFromGateway(`${API_GATEWAY_URL}/genres`);

    return (
        <section>
            <div className="flex  justify-center">
                <h1 className="text-5xl font-bold">Shows</h1>
            </div>

            <div className={stylesList.container}>
                <ShowFetchedItems apiUrl={`${API_GATEWAY_URL}/shows`} localUrl={"/shows/"}/>

                <form className={styles.formWrapper} action={id ? patchFormMultipart : postFormMultipart}>
                    <input type="hidden" name="url" value={id ? `${API_GATEWAY_URL}/shows/${id}` : `${API_GATEWAY_URL}/shows`} />
                    <ContentFormText question={"Title"} value={showData?.title ?? ""}/>
                    <ContentFormText question={"Synopsis"} value={showData?.synopsis ?? ""}/>
                    <ContentFormNumber question={"SeasonsNum"} value={showData?.seasons_num ?? ""}/>
                    <ContentFormDropdown question="Episodes" items={episodesData} value={" "} />
                    <ContentFormDate question={"ReleaseDate"} value={showData?.release_date ?? ""}/>
                    {/* <ContentFormNumber question={"GenreId"} value={showData?.genre_id ?? ""}/> */}
                    <ContentFormDropdown question={"GenreId"} items={genresData} value={showData?.genre_id ?? ""} />
                    <ContentFormText question={"PosterUrl"} value={showData?.poster_url ?? ""}/>
                    <ContentFormFloat question={"Rating"} value={showData?.rating ?? ""}/>
                    <label className={styles.label}>
                        Is published
                        <input type="checkbox" name="is_published"/>
                    </label>
                    <input className={styles.button} type="submit" value={id ? 'Actualizar' : 'Enviar'}/>
                    {id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={async (formData: FormData) => {
                        'use server';
                        deleteForm(formData);
                        redirect("/shows");
                    }} />)} 
                    {id && (<input className={styles.button} type="submit" value="Cancelar" formAction={async () => {
                        'use server';
                        redirect('/shows');
                    }} />)}  
                </form>

                {id && 
                (<form className={styles.formWrapper} action={episode_id ? patchFormMultipart : postFormMultipart}>
                    <input type="hidden" name="url" value={episodeData ? `http://localhost:30000/episodes/${episode_id}` : "http://localhost:30000/episodes"}/>
                    <ContentFormText question="Title" value={episodeData?.title ?? ""} />
                    <ContentFormText question="Synopsis" value={episodeData?.synopsis ?? ""} />
                    <ContentFormNumber question="SeasonNum" value={episodeData?.season_num ?? ""} />
                    <ContentFormNumber question="EpisodeNum" value={episodeData?.episode_num ?? ""} />
                    <ContentFormNumber question="Length" value={episodeData?.length ?? ""} />
                    <ContentFormDate question="ReleaseDate" value={episodeData?.release_date ?? ""} />
                    <label className={styles.label}>
                        <input value={id} type='hidden' name={"show_id"} />
                    </label>
                    <input className={styles.fileInput} type="file" name="videoFile"/>

                    <input className={styles.button} type="submit" value={'Enviar'}/>
                    {episode_id && (<input className={styles.button} type={"submit"} value="Borrar" formAction={async (formData: FormData) => {
                        'use server';
                        deleteForm(formData);
                        redirect(`/shows/?id=${id}`);
                    }} />)} 
                    {episode_id && (<input className={styles.button} type="submit" value="Cancelar" formAction={async () => {
                        'use server';
                        redirect(`/shows/?id=${id}`);
                    }} />)}  
                </form>)}
            </div>
        </section>
    );
}