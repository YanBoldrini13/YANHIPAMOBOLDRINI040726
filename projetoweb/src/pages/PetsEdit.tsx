import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarPetPorId, atualizarPet, uploadFotoPet } from "../api/pet.service";
import { buscarTutorPorId } from "../api/tutor.service";
import type { Pet } from "../tipos/Pet";
import type { Tutor } from "../tipos/Tutor";

export default function PetsEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pet, setPet] = useState<Pet | null>(null);
    const [tutor, setTutor] = useState<Tutor | null>(null);

    const [nome, setNome] = useState("");
    const [raca, setRaca] = useState("");
    const [idade, setIdade] = useState(0);
    const [foto, setFoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        async function loadPet() {
            if (!id) return;
            try {
                const data = await buscarPetPorId(id);
                setPet(data);
                setNome(data.nome);
                setRaca(data.raca);
                setIdade(data.idade);
                setPreview(data.foto?.url || null);

                // Se o pet tiver tutor vinculado, busca os dados completos do tutor
                if (data.tutor?.id) {
                    try {
                        const tutorData = await buscarTutorPorId(data.tutor.id);
                        setTutor(tutorData);
                    } catch (error) {
                        console.error("Erro ao carregar dados do tutor", error);
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar pet", error);
                alert("Erro ao carregar pet");
                navigate("/pets");
            } finally {
                setLoading(false);
            }
        }
        loadPet();
    }, [id, navigate]);

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setSaving(true);
        try {
            await atualizarPet(id, { nome, raca, idade });

            if (foto) {
                await uploadFotoPet(id, foto);
            }

            alert("Pet atualizado com sucesso!");
            navigate("/pets");
        } catch (error) {
            console.error("Erro ao atualizar pet", error);
            alert("Erro ao atualizar pet");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-slate-400">Carregando dados do amiguinho...</div>;

    return (
        <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8">
                <button
                    onClick={() => navigate("/pets")}
                    className="text-slate-400 hover:text-teal-400 flex items-center gap-2 mb-4 transition-colors"
                >
                    ← Voltar para lista
                </button>
                <h2 className="text-3xl font-bold text-white">Editar Perfil: {pet?.nome}</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Foto do pet */}
                <div className="md:col-span-1 space-y-4">
                    <div className="glass rounded-2xl p-4 aspect-square flex flex-col items-center justify-center relative overflow-hidden group">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            <div className="text-slate-600 text-6xl">🐾</div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4 text-center">
                            <span className="text-sm font-medium">Trocar Foto</span>
                            <input
                                type="file"
                                onChange={handleFotoChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center">Dica: Fotos bem iluminadas ajudam a identificar o pet! ✨</p>
                </div>

                {/* info dados pets */}
                <div className="md:col-span-2 glass rounded-2xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Nome do Pet</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Raça</label>
                                <input
                                    type="text"
                                    value={raca}
                                    onChange={(e) => setRaca(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Idade (anos)</label>
                                <input
                                    type="number"
                                    value={idade}
                                    onChange={(e) => setIdade(Number(e.target.value))}
                                    className="input-field"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-grow btn-primary flex justify-center items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Salvando...
                                </>
                            ) : (
                                "Salvar Alterações"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/pets")}
                            className="px-6 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
