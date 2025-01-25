import { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Context } from '@/main'

function ProfilePage() {

    const { UserData } = useContext(Context)

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <>
        <div className='min-w-[360px] backdrop-blur-md text-black p-6 rounded-xl border-3 border-violet-400'>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                <Label htmlFor="email">Ваш Email</Label>
                <Input
                    className='bg-violet-300'
                    type="email"
                    id="email"
                    placeholder="Email"
                    disabled 
                    value={UserData.data.email}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-3">
                <Label htmlFor="userId">Ваш ID</Label>
                <Input
                    className='bg-violet-300'
                    type="text"
                    id="userId"
                    placeholder="Id"
                    disabled 
                    value={UserData.data.id}
                />
            </div>
            <Button
                className='bg-red-200 w-full'
                onClick={logout}
            >
                Выйти
            </Button>
        </div>
        </>
    )
}

export default ProfilePage

