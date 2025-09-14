import { useState } from 'react'
import { Routes, Route } from "react-router-dom";


import Navbar from './Components/Navbar'
import Home from "./page/Home";
import VideoPage from './page/Videopage';
import VideosListPage from './page/VideosListPage';
import PlatformsPage from './page/PlatformsPage';
import HistoryPage from './page/HistoryPage';
import BlogPage from './page/BlogPage';
import EventPage from './page/EventPage';
import Layout from './page/Layout';
import GovernmentPage from './page/GovernmentPage';
import Needhelp from './Components/Needhelp';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/schemes" element={<GovernmentPage />} />
          <Route path="/needhelp" element={<Needhelp />} />
          <Route path="/videos" element={<VideosListPage />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </>
  )
}

export default App
