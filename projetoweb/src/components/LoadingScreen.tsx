export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-xl">
                    🐾
                </div>
            </div>
            <p className="mt-4 text-slate-400 font-medium animate-pulse">Carregando...</p>
        </div>
    );
}
