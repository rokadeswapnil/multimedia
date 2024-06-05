import { Suspense, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import {QueryClient,QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


import Authentication from './pages/authentication/Authentication';


import HomeScreen from './pages/homescreen/HomeScreen';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>
            Loading....
          </div>}>
            {/* <Header/> */}
                  <Routes>
                      <Route path="/*" element={<HomeScreen />} />
                      <Route path="/auth" element={<Authentication/>}/>
                  </Routes>
                  {/* <Footer/> */}
          </Suspense>
          <ToastContainer position='top-right' theme='dark'/>
          <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
    );
}

export default App;
