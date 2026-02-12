import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, Plus, Edit, Shield, ArrowLeft, Mail, User, Grid } from "lucide-react";

// Definición de las aplicaciones disponibles
const AVAILABLE_APPS = [
  {
    id: "hache",
    name: "Hache",
    url: "https://hache.base44.app",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6983a2ceb064115bb66490cb/6ffcc1cfb_ChatGPTImage5feb202610_47_20.png"
  },
  {
    id: "lacapital",
    name: "La Capital Multimedios",
    url: "https://lacapitalmultimedios.base44.app",
    logo: "https://base44.app/api/apps/6980a1b99f15bcad4675bfb0/files/public/6980a1b99f15bcad4675bfb0/4b8b96964_ChatGPTImage2feb202610_13_44.png"
  },
  {
    id: "casanova",
    name: "Casanova Abogados",
    url: "https://casanovaabogados.base44.app",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69834ed290afab1ffdc6e966/dc9f43d33_casanova.png"
  },
    {
    id: "leandro",
    name: "Informe Leandro",
    url: "https://leandro.base44.app",
    logo:"https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698b1ea389075bf898624a83/449a98ff8_ChatGPTImage10feb202612_48_55.png",
  },
  {
    id: "estiba",
    name: "Estiba",
    url: "https://estiba.base44.app",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6980928ed81e2aed5e54a361/1c7d0c11c_ChatGPTImage4feb202610_37_32.png"
  }
];

// Lista de emails de administradores
const ADMIN_EMAILS = [
  "lmachado@casanova.ar"
];

export default function AdminAccess() {
  const { user, isLoadingAuth } = useAuth();
  const [userAccesses, setUserAccesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    apps: []
  });

  const isAdmin = user && ADMIN_EMAILS.includes(user.email?.toLowerCase());

  useEffect(() => {
    if (!isLoadingAuth && isAdmin) {
      loadUserAccesses();
    }
  }, [isLoadingAuth, isAdmin]);

  const loadUserAccesses = async () => {
    try {
      setLoading(true);
      const accesses = await base44.entities.UserAccess.list();
      setUserAccesses(accesses || []);
    } catch (error) {
      console.error("Error loading user accesses:", error);
      setUserAccesses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (userAccess = null) => {
    if (userAccess) {
      setEditingUser(userAccess);
      setFormData({
        email: userAccess.email || "",
        name: userAccess.name || "",
        apps: userAccess.apps || []
      });
    } else {
      setEditingUser(null);
      setFormData({
        email: "",
        name: "",
        apps: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ email: "", name: "", apps: [] });
  };

  const handleAppToggle = (appId) => {
    setFormData(prev => ({
      ...prev,
      apps: prev.apps.includes(appId)
        ? prev.apps.filter(id => id !== appId)
        : [...prev.apps, appId]
    }));
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        email: formData.email.toLowerCase().trim(),
        name: formData.name.trim(),
        apps: formData.apps
      };

      if (editingUser) {
        await base44.entities.UserAccess.update(editingUser.id, dataToSave);
      } else {
        await base44.entities.UserAccess.create(dataToSave);
      }

      handleCloseModal();
      loadUserAccesses();
    } catch (error) {
      console.error("Error saving user access:", error);
      alert("Error al guardar. Verifica que el email no esté duplicado.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este acceso?")) return;
    try {
      await base44.entities.UserAccess.delete(id);
      loadUserAccesses();
    } catch (error) {
      console.error("Error deleting user access:", error);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
          <p className="text-gray-400 mb-6">No tienes permisos para acceder a esta página.</p>
          <a href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </a>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Administración</h1>
              <p className="text-gray-400 text-sm md:text-base">Gestiona accesos y permisos</p>
            </div>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" /> Nuevo Usuario
          </Button>
        </div>

        {/* --- VISTA DE ESCRITORIO (TABLA) --- */}
        <div className="hidden md:block bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Cargando usuarios...</div>
          ) : userAccesses.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No hay usuarios configurados</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Nombre</TableHead>
                  <TableHead className="text-gray-400">Aplicaciones</TableHead>
                  <TableHead className="text-gray-400 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userAccesses.map((access) => (
                  <TableRow key={access.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium">{access.email}</TableCell>
                    <TableCell>{access.name || "-"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {access.apps?.map(appId => {
                          const app = AVAILABLE_APPS.find(a => a.id === appId);
                          return app ? (
                            <span key={appId} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                              {app.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenModal(access)} className="text-gray-400 hover:text-white hover:bg-white/10">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(access.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* --- VISTA MÓVIL (TARJETAS) --- */}
        <div className="md:hidden space-y-4">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Cargando...</div>
          ) : userAccesses.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No hay usuarios.</div>
          ) : (
            userAccesses.map((access) => (
              <div key={access.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 font-bold">
                      {access.name ? access.name[0].toUpperCase() : <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{access.name || "Sin nombre"}</h3>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {access.email}
                      </div>
                    </div>
                  </div>
                  {/* Menú de acciones móvil */}
                  <div className="flex gap-1">
                     <Button variant="ghost" size="icon" onClick={() => handleOpenModal(access)} className="h-8 w-8 text-gray-400">
                        <Edit className="w-4 h-4" />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => handleDelete(access.id)} className="h-8 w-8 text-red-400">
                        <Trash2 className="w-4 h-4" />
                     </Button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 uppercase tracking-wider">
                    <Grid className="w-3 h-3" /> Acceso a Aplicaciones
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {access.apps?.length > 0 ? (
                      access.apps.map(appId => {
                        const app = AVAILABLE_APPS.find(a => a.id === appId);
                        return app ? (
                          <div key={appId} className="flex items-center gap-2 bg-black/40 pr-3 rounded-full border border-white/5 overflow-hidden">
                             <img src={app.logo} className="w-6 h-6 bg-white object-contain" alt="" />
                             <span className="text-xs text-gray-300 py-1">{app.name}</span>
                          </div>
                        ) : null;
                      })
                    ) : (
                      <span className="text-gray-500 text-sm italic">Sin aplicaciones asignadas</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal - adaptado para móvil */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white w-[95vw] max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-black border-white/20 text-white"
                disabled={!!editingUser}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nombre</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-black border-white/20 text-white"
              />
            </div>
            <div className="max-h-[40vh] overflow-y-auto">
              <label className="text-sm text-gray-400 mb-3 block sticky top-0 bg-[#1a1a1a] pb-2 z-10">Apps</label>
              <div className="space-y-3">
                {AVAILABLE_APPS.map(app => (
                  <div 
                    key={app.id}
                    className="flex items-center gap-3 p-3 bg-black/50 rounded-lg active:scale-95 transition-transform"
                    onClick={() => handleAppToggle(app.id)}
                  >
                    <Checkbox
                      checked={formData.apps.includes(app.id)}
                      onCheckedChange={() => handleAppToggle(app.id)}
                      className="border-white/30 data-[state=checked]:bg-blue-600"
                    />
                    <img src={app.logo} alt={app.name} className="w-8 h-8 object-contain" />
                    <span className="text-sm">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={handleCloseModal} className="w-full sm:w-auto border-white/20 text-white">Cancelar</Button>
            <Button onClick={handleSave} disabled={!formData.email.trim()} className="w-full sm:w-auto bg-blue-600">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}