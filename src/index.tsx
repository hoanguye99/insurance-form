import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import 'styles/global.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout, EmptyLayout } from 'components/layout'
import { Home } from 'components/home'
import About from 'components/about'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmptyLayout />}>
            <Route path="about" element={<MainLayout />}>
              <Route index element={<About />} />
            </Route>
            <Route index element={<Home />} />
            <Route
              path="*"
              element={
                <main >
                  <p>404! Nothing is found</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
