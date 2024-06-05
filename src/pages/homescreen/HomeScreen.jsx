import React, { Suspense ,useEffect } from 'react'
import Footer from '../../components/footer/Footer'
import Spinner from '../../components/spinner/Spinner'
import { Route, Routes } from 'react-router-dom'
import { fetchDataFromApi } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "../../store/homeSlice";
import Home from "../../pages/home/Home";
import Authentication from '../authentication/Authentication';
import Details from "../../pages/details/Details";
import SearchResult from "../../pages/searchResult/SearchResult";
import Explore from "../../pages/explore/Explore";
import PageNotFound from "../../pages/404/PageNotFound";
import Header from '../../components/header/Header';
import useUser from '../../hooks/useUser';
import UserProfile from '../userProfile/UserProfile';
import WishList from '../wishlist/WishList';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const {data,isLoading,isError} = useUser();
    const { url } = useSelector((state) => state.home);
    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };
  return (
    <div className='w-screen h-screen flex items-center justify-start flex-col'>
        <Header/>
        <main className='w-full'>
            <>
                {data?(<Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile/:uid' element={<UserProfile/>} />
                    <Route path='/watchlater' element={<WishList/>} />
                    <Route path="/:mediaType/:id" element={<Details />} />
                    <Route path="/search/:query" element={<SearchResult />} />
                    <Route path="/explore/:mediaType" element={<Explore />} />
                    <Route path="*" element={<PageNotFound />} /> 
                </Routes>):(<Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="*" element={<Authentication/>}/>
                    </Routes> )}
                    </>
        </main>
        <footer className='w-full'>
            <Footer/>
            </footer>
      
    </div>
  )
}

export default HomeScreen
