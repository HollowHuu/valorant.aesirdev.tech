import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "@/package.json";

export default function Footer() {
  return (
    <footer className="place-content-center">
      <hr className="divide-slate-500"/>
      <p className="justify-center text-center">Made By <code><Link rel="stylesheet" href="https://github.com/HollowHuu" className="text-sky-400">HollowHuu</Link></code></p>
    </footer>
  );
}