import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Shop from '../pages/Shop'
import ShopCategory from '../pages/ShopCategory'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import LoginSignup from '../pages/LoginSignup'
import Layout from '../layout/Layout'
import men_banner from '../assets/banner_mens.png'
import women_banner from '../assets/banner_women.png'
import kid_banner from '../assets/banner_kids.png'
import CreateProduct from '../ADMIN/CreateProduct'
import EditUser from '../ADMIN/EditUser'
import List from '../ADMIN/List'
import Register from '../pages/Register'




function RouteFiles() {
  return (
    <div>
        <Routes>
           <Route path='/' element={<Layout/>}>
           <Route path='/' element={<Shop/>}/>
           <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
           <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
           <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids"/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
            <Route path='/register' element={<Register/>}/>
           </Route>

            
            <Route path='/product' element={<Product/>}>
            
             <Route path=':productId' element={<Product/>}/>
            </Route>

            <Route path='/auth/admin/add-product' element={<CreateProduct/>}/>
            <Route path='/auth/admin/all-products' element={<List/>}/>
            <Route path='/auth/admin/edit-product/:productId' element={<EditUser/>}/>

        </Routes>
    </div>
  )
}

export default RouteFiles