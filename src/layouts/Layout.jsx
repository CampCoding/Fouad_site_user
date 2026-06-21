import TopHeader from './Header/TopHeader'
import { Outlet, useLocation } from 'react-router'
import PageTransition from '../components/Common/PageTransition'

export default function Layout() {
  const { pathname } = useLocation()

  const isFullWidthPage = pathname.startsWith('/report-shipping')

  return (
    <div>
      <main
        className={`min-h-screen overflow-y-auto py-10 ${isFullWidthPage ? 'px-0' : 'px-4'
          }`}
      >
        <Outlet />
      </main>

      <TopHeader />

      <PageTransition />
    </div>
  )
}