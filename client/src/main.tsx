import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/routes.tsx'
import { store, StoreContext } from './stores/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router}/>
    </StoreContext.Provider>
  </StrictMode>,
)
