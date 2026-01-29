import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarTutores } from "../api/tutor.service";
import type { Tutor } from "../tipos/Tutor";

export default function TutoresList() {
    const [tutores, setTutores] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 10;

    useEffect(() => {
        async function fetchTutores() {
            setLoading(true);
            try {
                const data = await listarTutores(page, size);
                setTutores(data.content);
                setTotalPages(data.pageCount);
            } catch (error) {
                console.error("Erro ao carregar tutores", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTutores();
    }, [page]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white">👥 Tutores Cadastrados</h2>
                    <p className="text-slate-400 mt-2">Gerencie os responsáveis pelos pets no sistema.</p>
                </div>
                <Link to="/tutor/novo" className="btn-primary flex items-center gap-2">
                    <span>+</span> Novo Tutor
                </Link>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-20 bg-slate-800/50 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="glass rounded-3xl overflow-hidden overflow-x-auto shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm">Nome</th>
                                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm hidden md:table-cell">E-mail</th>
                                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm hidden lg:table-cell">Telefone</th>
                                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm hidden xl:table-cell">Endereço</th>
                                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {tutores.map((tutor) => (
                                    <tr key={tutor.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                                                    {tutor.nome.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-white font-medium group-hover:text-teal-400 transition-colors">{tutor.nome}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">{tutor.email}</td>
                                        <td className="px-6 py-4 text-slate-400 text-sm hidden lg:table-cell">{tutor.telefone}</td>
                                        <td className="px-6 py-4 text-slate-400 text-sm hidden xl:table-cell max-w-xs truncate">{tutor.endereco}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/tutor/editar/${tutor.id}`}
                                                className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-teal-500 text-slate-300 hover:text-white rounded-xl transition-all duration-300 text-xs font-semibold"
                                            >
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {tutores.length === 0 && (
                            <div className="py-20 text-center text-slate-500">
                                Nenhum tutor encontrado. ✨
                            </div>
                        )}
                    </div>

                    {/* Paginação */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                            <button
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="p-2 rounded-lg bg-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-700 transition-colors"
                            >
                                ← Anterior
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-all ${page === i
                                                ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                                className="p-2 rounded-lg bg-slate-800 text-slate-400 disabled:opacity-30 hover:bg-slate-700 transition-colors"
                            >
                                Próximo →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
