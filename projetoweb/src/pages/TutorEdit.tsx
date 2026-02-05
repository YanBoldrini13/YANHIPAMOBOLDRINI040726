import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarTutorPorId, atualizarTutor, uploadFotoTutor, vincularPet, desvincularPet } from "../api/tutor.service";
import { listarPets } from "../api/pet.service";
import type { Tutor } from "../tipos/Tutor";
import type { Pet } from "../tipos/Pet";

export default function TutorEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tutor, setTutor] = useState<Tutor | null>(null);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cpf, setCpf] = useState("");
    const [foto, setFoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Pet management
    const [allPets, setAllPets] = useState<Pet[]>([]);
    const [vincularLoading, setVincularLoading] = useState<number | null>(null);

    useEffect(() => {
        async function init() {
            if (!id) return;
            try {
                const [tutorData, petsData] = await Promise.all([
                    buscarTutorPorId(id),
                    listarPets(0, 100) // Get plenty of pets for linking
                ]);

                setTutor(tutorData);
                setNome(tutorData.nome);
                setEmail(tutorData.email);
                setTelefone(tutorData.telefone);
                setEndereco(tutorData.endereco);
                setCpf(tutorData.cpf?.toString() || "");
                setPreview(tutorData.foto?.url || null);

                setAllPets(petsData.content);
            } catch (error) {
                console.error("Erro ao carregar dados", error);
                alert("Erro ao carregar dados");
                navigate("/tutores");
            } finally {
                setLoading(false);
            }
        }
        init();
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
            await atualizarTutor(id, { nome, telefone, endereco });

            if (foto) {
                await uploadFotoTutor(id, foto);
            }

            alert("✅ Tutor atualizado com sucesso!");
            navigate("/tutores");
        } catch (error) {
            console.error("Erro ao atualizar tutor", error);
            alert("Erro ao atualizar tutor");
        } finally {
            setSaving(false);
        }
    };

    const handleTogglePet = async (petId: number, isLinked: boolean) => {
        if (!id) return;
        setVincularLoading(petId);
        try {
            if (isLinked) {
                await desvincularPet(id, petId);
            } else {
                await vincularPet(id, petId);
            }

            // Refresh pet por tutor.
            const updatedTutor = await buscarTutorPorId(id);
            setTutor(updatedTutor);
        } catch (error) {
            console.error("Erro ao vincular/desvincular pet", error);
            alert("Erro ao realizar operação com o pet");
        } finally {
            setVincularLoading(null);
        }
    };

    const linkedPets = (tutor as any)?.pets || [];

    if (loading) return <div className="text-center py-20 text-slate-400 font-medium animate-pulse">Carregando dados do tutor...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <button
                        onClick={() => navigate("/tutores")}
                        className="text-slate-400 hover:text-teal-400 flex items-center gap-2 mb-2 transition-colors"
                    >
                        ← Voltar para lista
                    </button>
                    <h2 className="text-3xl font-bold text-white">Editar Perfil do Tutor</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
                {/* Profile Card & Photo */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass rounded-[2rem] p-6 text-center space-y-4">
                        <div className="relative w-48 h-48 mx-auto group">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 group-hover:border-teal-500/50 transition-all duration-500">
                                {preview ? (
                                    <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-6xl">👤</div>
                                )}
                            </div>
                            <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-sm font-bold">
                                Trocar Foto
                                <input type="file" onChange={handleFotoChange} className="hidden" accept="image/*" />
                            </label>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white">{nome || "Nome do Tutor"}</h3>
                            <p className="text-slate-400 text-sm">{email}</p>
                        </div>
                    </div>

                    {/*  Info */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Informações Pessoais</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-400 text-sm">CPF:</span>
                                <span className="text-white text-sm font-mono">{cpf}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 text-sm">Registro:</span>
                                <span className="text-white text-sm">#{id}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Form & Pet Linking */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Edit Form */}
                    <div className="glass rounded-[2rem] p-8 space-y-8">
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-teal-400 text-2xl">📝</span> Dados Cadastrais
                        </h4>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-300 ml-1">Telefone</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={telefone}
                                            onChange={(e) => setTelefone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-400/50 ml-1">E-mail (fixo)</label>
                                        <input type="text" className="input-field opacity-50 bg-slate-900/50" value={email} disabled />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Endereço</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={endereco}
                                        onChange={(e) => setEndereco(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-grow btn-primary flex justify-center items-center gap-2 py-4"
                                >
                                    {saving ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : "Salvar Alterações"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Pet Linking Section */}
                    <div className="glass rounded-[2rem] p-8 space-y-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-teal-400 text-2xl">🐾</span> Vincular Pets
                        </h4>

                        <div className="max-h-96 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                            {allPets.map((pet) => {
                                const isLinked = linkedPets.some((p: any) => p.id === pet.id);
                                const isLoading = vincularLoading === pet.id;

                                return (
                                    <div key={pet.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center text-xl">
                                                {pet.foto?.url ? (
                                                    <img src={pet.foto.url} className="w-full h-full object-cover" />
                                                ) : "🐾"}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">{pet.nome}</p>
                                                <p className="text-xs text-slate-400">{pet.raca} • {pet.idade} anos</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleTogglePet(pet.id, isLinked)}
                                            disabled={isLoading}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${isLinked
                                                ? "bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                                                : "bg-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-white"
                                                } disabled:opacity-50`}
                                        >
                                            {isLoading ? "..." : (isLinked ? "Desvincular" : "Vincular")}
                                        </button>
                                    </div>
                                );
                            })}
                            {allPets.length === 0 && <p className="text-center text-slate-500 py-4">Nenhum pet cadastrado para vincular.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
