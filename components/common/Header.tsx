import Link from "next/link"
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Head from 'next/head'

export default function DashboardHeader() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    return (
        <html className={theme}>
            <Head>
                <title>Lunar</title>
                <meta content="Aesirdev" property="og:site_name" />
                <meta content="Lunar" property="og:title" />
                <meta content="Lunar effortlessly connects your Discord and Valorant accounts, streamlining your gaming experience. With a user-friendly dashboard and a convenient Discord bot, managing your in-game information has never been easier." property="og:description" />
                <meta content="https://valorant.aesirdev.tech" property="og:url" />
                <meta content="https://cdn.discordapp.com/attachments/774650675593609268/1136331735265722408/Bot_logo_witout_back.png" property="og:image" />
                <meta content="#43B581" data-react-helmet="true" name="theme-color" />
            </Head>
        <div
            className={
                "container max-w-full flex items-center px-6 border-b-2 h-24"
            }>
            <h1 className="fond-bold p-element">Aesir Development</h1>
            <div className='grow'>
                <div
                    className="flex items-center justify-center gap-2 md:gap-8">
                    <Link href="/" className='p-element'>Home</Link>
                    <Link href="search" className='p-element'>Search</Link>
                    <Link href="profile" className='p-element'>Profile</Link>
                    <Link href="settings" className='p-element'>Settings</Link>
                    <button
                        aria-label="Toggle Dark Mode"
                        type="button"
                        className="w-20 h-10 rounded focus:outline-none justify-self-end bg-indigo-400 dark:bg-violet-400 hover:bg-indigo-300 dark:hover:bg-violet-700"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {/* Change text based on theme used */}
                        {theme === "dark" ? ("dark") : ("light")}
                    </button>
                </div>
            </div>
        </div>
        </html>
    )
}
