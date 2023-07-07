import Link from "next/link"

export default function DashboardHeader() {
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
                </div>
            </div>
        </div>
    )
}
