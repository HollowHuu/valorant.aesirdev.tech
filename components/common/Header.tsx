import Link from "next/link"
import { useTheme } from "next-themes";

export default function DashboardHeader() {
    const { theme, setTheme } = useTheme();
    return (

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
                        className="w-20 h-10 p-3 rounded focus:outline-none justify-self-end bg-indigo-400 dark:bg-violet-400 hover:bg-indigo-300 dark:hover:bg-violet-700"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {/* Change text based on theme used */}
                        {theme === "dark" ? ("Dark") : ("Light")}
                    </button>
                </div>
            </div>
        </div>
    )
}
