import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  )
}
