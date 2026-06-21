import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router'
import { routesData } from './routesData'
import Layout from '../layouts/Layout'

export default function AppRoutes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        {routesData.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
    </RouterRoutes>
  )
}