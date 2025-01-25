import { Switch } from '@/components/ui/Switch';
import { Github, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

function Header() {

    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')

    const changeTheme = () => {
        if (theme == 'light') {
            localStorage.setItem('theme', 'dark')
            document.querySelector('body')?.setAttribute('data-theme', 'dark')
            setTheme('dark')
        } else {
            localStorage.setItem('theme', 'light')
            document.querySelector('body')?.setAttribute('data-theme', 'light')
            setTheme('light')
        }
    }

    return (
        <div className="w-full absolute top-2 flex items-center justify-between bg-violet-100 h-12 p-4">
            <a href={"https://github.com/waytoYA/crypton"} target='_blank'>
                <Github size={36}/>
            </a>
            <div className='flex'>
                <Sun />
                <Switch
                    className='mx-2'
                    checked={theme == 'dark'}
                    onCheckedChange={changeTheme}
                />
                <Moon />
            </div>
        </div>
    )
}

export default Header