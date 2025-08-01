import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Database, 
  Plus, 
  Download, 
  Save, 
  Info, 
  Upload,
  Menu,
  Settings
} from 'lucide-react';
import { ImportProjectDialog } from '@/components/import/ImportProjectDialog';
import { DatabaseProject } from '@/types/database';

interface MainHeaderProps {
  projectName: string;
  tablesCount: number;
  relationshipsCount: number;
  onAddTable: () => void;
  onExportDDL: () => void;
  onSaveProject: () => void;
  onImportSQL: (sql: string) => void;
  onLoadProject: (project: DatabaseProject) => void;
  onShowHelp: () => void;
  activeSchema?: string;
  totalTables?: number;
}

export function MainHeader({
  projectName,
  tablesCount,
  relationshipsCount,
  onAddTable,
  onExportDDL,
  onSaveProject,
  onImportSQL,
  onLoadProject,
  onShowHelp,
  activeSchema,
  totalTables,
}: MainHeaderProps) {
  const [showImportDialog, setShowImportDialog] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card/98 backdrop-blur-md border-b border-border/50 shadow-sm z-50">
        <div className="h-full flex items-center justify-between px-6 max-w-screen-2xl mx-auto">
          {/* Left Section - Logo & Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-muted/50 transition-colors" />
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-foreground text-base tracking-tight">{projectName}</h1>
                <p className="text-xs text-muted-foreground font-medium">
                  {activeSchema && totalTables ? (
                    <>Schema: {activeSchema} • {tablesCount}/{totalTables} tabelas • {relationshipsCount} relacionamento{relationshipsCount !== 1 ? 's' : ''}</>
                  ) : (
                    <>{tablesCount} tabela{tablesCount !== 1 ? 's' : ''} • {relationshipsCount} relacionamento{relationshipsCount !== 1 ? 's' : ''}</>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Main Actions */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={onAddTable}
              size="sm"
              className="bg-gradient-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Nova Tabela</span>
              <span className="sm:hidden">Nova</span>
            </Button>
            
            <div className="w-px h-6 bg-border/60"></div>
            
            <Button 
              onClick={() => setShowImportDialog(true)}
              variant="outline"
              size="sm"
              className="shadow-sm hover:shadow-md hover:bg-muted/80 transition-all duration-200 font-medium"
            >
              <Upload className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Importar</span>
            </Button>
            
            <Button 
              onClick={onExportDDL}
              variant="outline"
              size="sm"
              className="shadow-sm hover:shadow-md hover:bg-muted/80 transition-all duration-200 font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Exportar SQL</span>
              <span className="sm:hidden">Export</span>
            </Button>
            
            <Button 
              onClick={onSaveProject}
              variant="outline"
              size="sm"
              className="shadow-sm hover:shadow-md hover:bg-muted/80 transition-all duration-200 font-medium"
            >
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Salvar</span>
            </Button>
          </div>

          {/* Right Section - Secondary Actions */}
          <div className="flex items-center gap-2">
            <Button 
              onClick={onShowHelp}
              variant="ghost"
              size="sm"
              className="hover:bg-muted/60 transition-colors font-medium"
            >
              <Info className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Ajuda</span>
            </Button>
          </div>
        </div>
      </header>

      <ImportProjectDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportSQL={onImportSQL}
        onLoadProject={onLoadProject}
      />
    </>
  );
}