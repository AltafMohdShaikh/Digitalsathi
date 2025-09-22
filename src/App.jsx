import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from './Components/ThemeContext';

import Navbar from './Components/Navbar'
import Chatbot from './Components/Chatbot';
import Home from "./page/Home";
import VideoPage from './page/VideoPage';
import VideosListPage from './page/VideosListPage';
import PlatformsPage from './page/PlatformsPage';
import HistoryPage from './page/HistoryPage';
import BlogPage from './page/BlogPage';
import WriteBlog from './page/WriteBlog';
import EventPage from './page/EventPage';
import Layout from './page/Layout';
import GovernmentPage from './page/GovernmentPage';
import MasterPage from './page/MasterPage';
import SearchPage from './page/SearchPage';
import Needhelp from './Components/Needhelp';

function App() {
  return (
    <ThemeProvider>
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
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/master" element={<MasterPage />} />
        </Route>
        <Route path="/video" element={<VideoPage />} />
      </Routes>
      <Chatbot />
    </ThemeProvider>
  )
}

export default App
