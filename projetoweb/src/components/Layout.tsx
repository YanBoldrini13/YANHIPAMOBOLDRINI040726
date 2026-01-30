import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-height-screen bg-slate-900 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                {children}
            </main>
            <footer className="py-6 text-center text-slate-500 text-sm border-t border-white/5">
                &copy; {new Date().getFullYear()} Pet gerenciador - Todos os direitos reservados.
            </footer>
        </div>
    );
}
