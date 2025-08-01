import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SchemaProjectSidebar } from '@/components/sidebar/SchemaProjectSidebar';
import DiagramCanvas from '@/components/diagram/DiagramCanvas';
import { EnhancedTableProperties } from '@/components/properties/EnhancedTableProperties';
import { MainHeader } from '@/components/layout/MainHeader';
import { useDatabaseProject } from '@/hooks/useDatabaseProject';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

const Index = () => {
  const [showHelp, setShowHelp] = useState(false);
  
  const {
    project,
    selectedTable,
    setSelectedTable,
    addTable,
    updateTable,
    deleteTable,
    exportDDL,
    saveProject,
    updateRelationships,
    loadProject,
    parsePostgreSQLScript,
  } = useDatabaseProject();

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <MainHeader
          projectName={project.name}
          tablesCount={project.tables.length}
          relationshipsCount={project.relationships.length}
          onAddTable={addTable}
          onExportDDL={exportDDL}
          onSaveProject={saveProject}
          onImportSQL={parsePostgreSQLScript}
          onLoadProject={loadProject}
          onShowHelp={() => setShowHelp(!showHelp)}
        />

        <div className="flex w-full pt-16 relative">
        {/* Left Sidebar */}
        <SchemaProjectSidebar
          projectName={project.name}
          tables={project.tables}
          selectedTable={selectedTable}
          onTableSelect={setSelectedTable}
          onAddTable={addTable}
        />

          {/* Main Canvas */}
          <main className="flex-1 min-w-0">
            <DiagramCanvas
              tables={project.tables}
              onTableSelect={setSelectedTable}
              relationships={project.relationships}
              onUpdateRelationships={updateRelationships}
              showHelp={showHelp}
              onCloseHelp={() => setShowHelp(false)}
            />
          </main>

        {/* Right Properties Panel */}
        {selectedTable && (
          <aside className="w-80 xl:w-96 border-l border-border bg-card overflow-hidden">
            <EnhancedTableProperties
              table={selectedTable}
              onTableUpdate={updateTable}
            />
          </aside>
        )}
      </div>

          {/* Welcome State */}
          {project.tables.length === 0 && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40 pt-16">
              <div className="text-center space-y-8 p-8 max-w-lg">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                    <Database className="h-10 w-10 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">
                      Bem-vindo ao PostgreSQL Editor
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Crie diagramas visuais para seu banco de dados PostgreSQL de forma intuitiva e profissional
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-3 pointer-events-auto">
                  <Button 
                    onClick={addTable} 
                    size="lg"
                    className="bg-gradient-primary hover:bg-primary-hover shadow-lg text-lg py-6"
                  >
                    <Database className="h-5 w-5 mr-3" />
                    Criar Nova Tabela
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    ou use o botão "Importar" no header para carregar um projeto existente
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
