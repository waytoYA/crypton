import { useContext, useEffect, useState } from 'react'
import './App.css'
import AuthPage from './pages/authPage/AuthPage'
import ProfilePage from './pages/profilePage/ProfilePage'
import { api } from './http'
import Loading from './elements/Loading'
import { Context } from './main'
import Header from './elements/Header'

function App() {

    const { UserData } = useContext(Context)
    const [loading, setLoading] = useState<boolean>(true)
    
    useEffect(() => {
        document.querySelector('body')?.setAttribute('data-theme', localStorage.getItem('theme') || 'light')
        // Проверяем наличие токена
        if (!localStorage.getItem('auth')) {
            // Если нет, отключаем загрузку без подтверждения авторизации
            // И редиректим в дальнейшем на страницу с авторизацией
            setLoading(false)
            return;
        }
        // Если есть, запрашиваем данные
        api.user.profile()
        .then(data => UserData.set(data))
        .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div className='flex justify-center max-w-[1280px] mx-auto'>
                {
                    !UserData.auth
                    ? <AuthPage />
                    : <ProfilePage />
                }
            </div>
        </>
    )
}

export default App

