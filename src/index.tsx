import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {setupStore} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Weather} from "./components/service/Weather";
import {Profile} from "./components/profile/Profile";
import {Details} from "./components/profile/Details";
import {MyMedia} from "./components/profile/MyMedia";
import {PrivateChats} from "./components/profile/PrivateChats";
import {NoMatch} from "./components/service/NoMatch";
import {MostPopular} from "./components/media/MostPopular";
import {MediaElement} from "./components/media/MediaElement";
import {Last10} from "./components/media/Last10";
import {SearchResult} from "./components/media/SearchResult";
import {AddNewMedia} from "./components/media/PostMedia";
import {EditMedia} from "./components/media/EditMedia";
import App from "./components/App";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="weather" element={<Weather />} />
                    <Route path="profile" element={<Profile />}>
                        <Route path="details" element={<Details />}/>
                        <Route path="add_new_media" element={<AddNewMedia />}/>
                        <Route path="my_media" element={<MyMedia />}>
                            <Route path="add_new_media" element={<AddNewMedia />}/>
                            <Route path="edit_media" element={<EditMedia />}>
                                <Route path=":mediaId" element={<EditMedia />}/>
                            </Route>
                        </Route>
                        <Route path="private_chat" element={<PrivateChats />}/>
                    </Route>
                    <Route path="searchResult" element={<SearchResult />}/>
                    <Route path="last10" element={<Last10 />}/>
                    <Route path="most_popular" element={<MostPopular />}/>
                    <Route path="media" element={<MediaElement />}>
                        <Route path=":mediaId" element={<MediaElement />} />
                    </Route>
                </Route>
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
