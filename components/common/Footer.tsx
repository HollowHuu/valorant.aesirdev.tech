import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "@/package.json";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={theme}>
    <footer className="place-content-center">
      <hr className="border-black dark:border-white"/>
      
      
      {/* Privacy and TOS */}
      <div className="flex flex-row justify-evenly ">
        <p className="justify-center text-center">Made By <code><Link rel="stylesheet" href="https://github.com/HollowHuu" className="text-sky-400">HollowHuu</Link></code></p>
        <p className="justify-center text-center">Lunar {packageJSON.version}</p>
        <Link href="/privacy">
          Privacy Policy
        </Link>
        <Link href="/tos">
          Terms of Service
        </Link>
      </div>
    </footer>
    </div>
  );
}