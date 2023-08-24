import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "@/package.json";

export default function Footer() {
  return (
    <footer className="place-content-center">
      <hr className="divide-slate-500"/>
      
      
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
  );
}