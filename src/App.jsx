import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Configurator from './pages/Configurator'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-g-bg">
      <Navbar />
      <CartSidebar />
      <main>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/boutique"      element={<Catalog />} />
          <Route path="/produit/:id"   element={<ProductDetail />} />
          <Route path="/configurateur" element={<Configurator />} />
          <Route path="/panier"        element={<Cart />} />
          <Route path="/login"         element={<Login />} />
          <Route path="/register"      element={<Register />} />
          <Route path="/dashboard"     element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  )
}
