import React from 'react'
import { Route, Routes } from 'react-router'
import { routesData } from './routesData'
import Layout from '../layouts/Layout'

export default function routes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {routesData.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}