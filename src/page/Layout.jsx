import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar stays fixed on desktop, hidden on mobile */}
      <Sidebar />

      {/* Main content changes */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full lg:w-auto">
        <Outlet />  {/* This will load Homefeed, EventPage, VideoPage, etc. */}
      </div>
    </div>
  );
}
