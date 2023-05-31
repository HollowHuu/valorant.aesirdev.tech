import DashboardHeader from "./Header";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <DashboardHeader />
            <main>{children}</main>
            <Footer />
        </>
    );
}