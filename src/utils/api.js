import axios from "axios";
const BASE_URL= "https://api.themoviedb.org/3";
const TMDB_TOKEN= "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmNlMDA2ZDYzZTEyODY0NDRiNGQ2YmIxMzhmYzFiMCIsInN1YiI6IjY0MGE5NWZkY2FhY2EyMDBkNzM2MDJjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4_K-tvddkhAmOJevfzBpRTCb10N-dob16snDpUnQ-uA";
const headers = {
    Authorization: "bearer "+ TMDB_TOKEN,
}
export const fetchDataFromApi = async(url,params)=>{
    try {
        const {data} = await axios.get(BASE_URL+url,{headers, params});
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }

}