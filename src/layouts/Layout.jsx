import TopHeader from './Header/TopHeader'
import BottomHeader from './Header/BottomHeader'
import { Outlet, useLocation } from 'react-router'

export default function Layout() {
  const { pathname } = useLocation();
  const routes = [
    "/report-shipping",
  ]
  return (
    <div>
      <main className={`min-h-screen ${routes.includes(pathname) ? "px-0" : "px-4"} overflow-y-auto py-10`}>
        <Outlet />
      </main>
      <TopHeader />
      {/* <BottomHeader /> */}
    </div>
  )
}
