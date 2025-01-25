import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, LockKeyhole, CircleX  } from 'lucide-react';
import { api } from '@/http'
import { ILoginData } from './Interface';

function AuthPage() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [retryPassword, setRetryPassword] = useState<string>('')
    const [typeAuth, setTypeAuth] = useState<string>('registration')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    
    const errorHandler = (error: any) => {
        const errorCode = error.response.data.code
        if (errorCode == 'invalid_credentials') {
            setError('Неверные данные')
            return;
        }
        if (errorCode == 'weak_password') {
            setError('Пароль должен содержить минимум 6 символов')
            return;
        }
        if (errorCode == 'user_already_exists') {
            setError('Аккаунт уже существует')
            return;
        }
        setError(error.response.data.message)
    }

    const validEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return pattern.test(email)
    }

    const startAuth = () => {
        if (!email) {
            setError('Введите email')
            return
        }
        if (!password) {
            setError('Введите password')
            return
        }
        if (!validEmail(email)) {
            setError('Некорректная почта')
            return
        }

        const userData = {
            email: email,
            password: password
        } as ILoginData

        if (typeAuth == 'registration') {

            if (!retryPassword) {
                setError('Повторите password')
                return
            }
            if (password != retryPassword) {
                setError('Пароли не совпадают')
                return
            }

            setLoading(true)
            api.user.register(userData)
            .then(data => {
                // Успешная авторизация
                localStorage.setItem('auth', data.token)
                window.location.reload()
            })
            .catch(error => {
                errorHandler(error)
            })
            .finally(() => setLoading(false))
        }
        if (typeAuth == 'login') {
            setLoading(true)
            api.user.login(userData)
            .then(data => {
                // Успешная авторизация
                localStorage.setItem('auth', data.token)
                window.location.reload()
            })
            .catch(error => {
                errorHandler(error)
            })
            .finally(() => setLoading(false))
        }

    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
    }

    const changeRetryPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setRetryPassword(value)
    }

    const changeTypeAuth = () => {
        if (typeAuth == 'registration') {
            setTypeAuth('login')
        } else {
            setTypeAuth('registration')
        }
        setEmail('')
        setPassword('')
        setRetryPassword('')
        setError('')
    }

    return (
        <>
        <div className='w-[360px] text-black p-6 rounded-xl border-3 border-violet-400'>
                <div className='font-600 mb-4 text-xl font-bold'>
                {
                        typeAuth == 'registration'
                        ? 'Регистрация'
                        : 'Войти'
                    }
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                    <Label className='flex items-center' htmlFor="email">
                        <Mail size={14}/>
                        <span className='ml-1'>Email</span>
                    </Label>
                    <Input
                        className='bg-violet-300'
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => changeEmail(e)}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                    <Label className='flex items-center' htmlFor="password">
                        <Lock size={14}/>
                        <span className='ml-1'>Password</span>
                    </Label>
                    <Input
                        className='bg-violet-300'
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => changePassword(e)}
                    />
                </div>

                {
                    typeAuth == 'registration' &&
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                        <Label className='flex items-center' htmlFor="retry-password">
                            <LockKeyhole size={14}/>
                            <span className='ml-1'>Retry password</span>
                        </Label>
                        <Input
                            className='bg-violet-300'
                            type="password"
                            id="retry-password"
                            placeholder="Retry password"
                            value={retryPassword}
                            onChange={e => changeRetryPassword(e)}
                        />
                    </div>
                }

                {
                    error && 
                    <div className="flex items-center bg-red-200 text-red-500 text-sm rounded-sm p-1 w-full max-w-sm gap-1.5 mt-3 mb-3">
                        <CircleX size={16}/> {error}
                    </div>
                }

                <Button
                    className='bg-violet-300 w-full mb-2'
                    onClick={startAuth}
                    disabled={loading}
                >
                    {loading && <Loader2 className="animate-spin" /> }
                    
                    {
                        typeAuth == 'registration'
                        ? 'Создать аккаунт'
                        : 'Войти'
                    }
                </Button>
                <Button
                    className='bg-violet-100 w-full'
                    variant="secondary"
                    onClick={changeTypeAuth}
                >
                    {
                        typeAuth == 'registration'
                        ? 'Уже есть аккаунт'
                        : 'Зарегистрироваться'
                    }
                </Button>
        </div>
        </>
    )
}

export default AuthPage

