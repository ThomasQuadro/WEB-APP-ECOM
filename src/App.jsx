import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar        from './components/Navbar'
import CartSidebar   from './components/CartSidebar'
import Footer        from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ChatWidget    from './components/ChatWidget'
import Home           from './pages/Home'
import Catalog        from './pages/Catalog'
import ProductDetail  from './pages/ProductDetail'
import Configurator   from './pages/Configurator'
import Cart           from './pages/Cart'
import Login          from './pages/Login'
import Register       from './pages/Register'
import Dashboard      from './pages/Dashboard'
import FAQ            from './pages/FAQ'
import Guide          from './pages/Guide'
import Garantie       from './pages/Garantie'
import MentionsLegales from './pages/MentionsLegales'
import CGV            from './pages/CGV'
import Confidentialite from './pages/Confidentialite'
import Cookies        from './pages/Cookies'

const NO_FOOTER = ['/login', '/register']

export default function App() {
  const { pathname } = useLocation()
  const showFooter   = !NO_FOOTER.includes(pathname)

  return (
    <div className="min-h-screen bg-g-bg flex flex-col">
      <Navbar />
      <CartSidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/"                 element={<Home />} />
          <Route path="/boutique"         element={<Catalog />} />
          <Route path="/produit/:id"      element={<ProductDetail />} />
          <Route path="/configurateur"    element={<Configurator />} />
          <Route path="/panier"           element={<Cart />} />
          <Route path="/login"            element={<Login />} />
          <Route path="/register"         element={<Register />} />
          <Route path="/dashboard"        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/faq"              element={<FAQ />} />
          <Route path="/guide"            element={<Guide />} />
          <Route path="/garantie"         element={<Garantie />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv"              element={<CGV />} />
          <Route path="/confidentialite"  element={<Confidentialite />} />
          <Route path="/cookies"          element={<Cookies />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <ChatWidget />
    </div>
  )
}
