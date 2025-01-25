import { StrictMode, createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserDataStore from './store/UserDataStore.tsx'

export const Context = createContext(null as any)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{
      UserData: new UserDataStore()
    }}>
      <App />
    </Context.Provider>
  </StrictMode>,
)
