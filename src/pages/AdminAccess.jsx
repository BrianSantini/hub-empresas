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
import { Trash2, Plus, Edit, Shield, ArrowLeft } from "lucide-react";

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

// Lista de emails de administradores que pueden acceder a esta página
const ADMIN_EMAILS = [
  "lmachado@casanova.ar"
  // Agregar más emails de administradores aquí
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

  // Verificar si el usuario actual es admin
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

  const getAppNames = (appIds) => {
    return appIds
      .map(id => AVAILABLE_APPS.find(app => app.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  // Pantalla de carga
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  // Si no es admin, mostrar acceso denegado
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
          <p className="text-gray-400 mb-6">No tienes permisos para acceder a esta página.</p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </a>
            <div>
              <h1 className="text-3xl font-bold">Administración de Accesos</h1>
              <p className="text-gray-400">Gestiona qué usuarios pueden ver cada aplicación</p>
            </div>
          </div>
          <Button 
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Cargando usuarios...</div>
          ) : userAccesses.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">No hay usuarios configurados</p>
              <Button 
                onClick={() => handleOpenModal()}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar primer usuario
              </Button>
            </div>
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
                            <span 
                              key={appId}
                              className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded"
                            >
                              {app.name}
                            </span>
                          ) : null;
                        })}
                        {(!access.apps || access.apps.length === 0) && (
                          <span className="text-gray-500 text-sm">Sin accesos</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleOpenModal(access)}
                          className="text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(access.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
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

        {/* Info de apps disponibles */}
        <div className="mt-8 p-6 bg-[#1a1a1a] rounded-lg border border-white/10">
          <h2 className="text-lg font-semibold mb-4">Aplicaciones Disponibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AVAILABLE_APPS.map(app => (
              <div key={app.id} className="flex items-center gap-3 p-3 bg-black/50 rounded-lg">
                <img src={app.logo} alt={app.name} className="w-10 h-10 object-contain" />
                <div>
                  <p className="font-medium text-sm">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="usuario@email.com"
                className="bg-black border-white/20 text-white"
                disabled={!!editingUser}
              />
              {editingUser && (
                <p className="text-xs text-gray-500 mt-1">El email no se puede modificar</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nombre (opcional)</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre del usuario"
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-3 block">Aplicaciones con acceso</label>
              <div className="space-y-3">
                {AVAILABLE_APPS.map(app => (
                  <div 
                    key={app.id}
                    className="flex items-center gap-3 p-3 bg-black/50 rounded-lg cursor-pointer hover:bg-black/70"
                    onClick={() => handleAppToggle(app.id)}
                  >
                    <Checkbox
                      checked={formData.apps.includes(app.id)}
                      onCheckedChange={() => handleAppToggle(app.id)}
                      className="border-white/30 data-[state=checked]:bg-blue-600"
                    />
                    <img src={app.logo} alt={app.name} className="w-8 h-8 object-contain" />
                    <span>{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleCloseModal}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.email.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editingUser ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
