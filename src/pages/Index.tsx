// import React, { useState, useMemo } from 'react';
// import { SidebarProvider } from '@/components/ui/sidebar';
// import { SchemaProjectSidebar } from '@/components/sidebar/SchemaProjectSidebar';
// import DiagramCanvas from '@/components/diagram/DiagramCanvas';
// import { EnhancedTableProperties } from '@/components/properties/EnhancedTableProperties';
// import { MainHeader } from '@/components/layout/MainHeader';
// import { useDatabaseProject } from '@/hooks/useDatabaseProject';
// import { Button } from '@/components/ui/button';
// import { Database } from 'lucide-react';

// const Index = () => {
//   const [showHelp, setShowHelp] = useState(false);
//   const [activeSchema, setActiveSchema] = useState<string>('');
  
//   const {
//     project,
//     selectedTable,
//     setSelectedTable,
//     addTable,
//     updateTable,
//     deleteTable,
//     exportDDL,
//     saveProject,
//     updateRelationships,
//     loadProject,
//     parsePostgreSQLScript,
//   } = useDatabaseProject();

//   // Get unique schemas and set default
//   const schemas = useMemo(() => {
//     const uniqueSchemas = [...new Set(project.tables.map(table => table.schema || 'public'))];
//     if (!activeSchema && uniqueSchemas.length > 0) {
//       setActiveSchema(uniqueSchemas[0]);
//     }
//     return uniqueSchemas;
//   }, [project.tables, activeSchema]);

//   // Filter tables and relationships by active schema
//   const filteredTables = useMemo(() => {
//     if (!activeSchema) return project.tables;
//     return project.tables.filter(table => (table.schema || 'public') === activeSchema);
//   }, [project.tables, activeSchema]);

//   const filteredRelationships = useMemo(() => {
//     if (!activeSchema) return project.relationships;
//     const schemaTableIds = new Set(filteredTables.map(table => table.id));
//     return project.relationships.filter(rel => 
//       schemaTableIds.has(rel.source) && schemaTableIds.has(rel.target)
//     );
//   }, [project.relationships, filteredTables, activeSchema]);

//   const handleSchemaSelect = (schema: string) => {
//     setActiveSchema(schema);
//     // Clear table selection when switching schemas
//     setSelectedTable(null);
//   };

//   return (
//     <SidebarProvider>
//       <div className="min-h-screen w-full flex flex-col bg-background">
//         <MainHeader
//           projectName={project.name}
//           tablesCount={filteredTables.length}
//           relationshipsCount={filteredRelationships.length}
//           onAddTable={addTable}
//           onExportDDL={exportDDL}
//           onSaveProject={saveProject}
//           onImportSQL={parsePostgreSQLScript}
//           onLoadProject={loadProject}
//           onShowHelp={() => setShowHelp(!showHelp)}
//           activeSchema={activeSchema}
//           totalTables={project.tables.length}
//         />

//         <div className="flex flex-1 w-full">
//           {/* Left Sidebar */}
//           <SchemaProjectSidebar
//             projectName={project.name}
//             tables={project.tables}
//             selectedTable={selectedTable}
//             onTableSelect={setSelectedTable}
//             onAddTable={addTable}
//             activeSchema={activeSchema}
//             onSchemaSelect={handleSchemaSelect}
//           />

//           {/* Main Canvas */}
//           <main className="flex-1 min-w-0">
//             <DiagramCanvas
//               tables={filteredTables}
//               onTableSelect={setSelectedTable}
//               relationships={filteredRelationships}
//               onUpdateRelationships={updateRelationships}
//               showHelp={showHelp}
//               onCloseHelp={() => setShowHelp(false)}
//               activeSchema={activeSchema}
//             />
//           </main>

//           {/* Right Properties Panel */}
//           {selectedTable && (
//             <aside className="w-80 xl:w-96 border-l border-border bg-card overflow-hidden">
//               <EnhancedTableProperties
//                 table={selectedTable}
//                 onTableUpdate={updateTable}
//               />
//             </aside>
//           )}
//         </div>

//         {/* Welcome State */}
//         {project.tables.length === 0 && (
//           <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
//             <div className="text-center space-y-8 p-8 max-w-lg">
//               <div className="space-y-4">
//                 <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-lg">
//                   <Database className="h-10 w-10 text-white" />
//                 </div>
//                 <div className="space-y-3">
//                   <h2 className="text-3xl font-bold text-foreground">
//                     Bem-vindo ao PostgreSQL Editor
//                   </h2>
//                   <p className="text-muted-foreground text-lg leading-relaxed">
//                     Crie diagramas visuais para seu banco de dados PostgreSQL de forma intuitiva e profissional
//                   </p>
//                 </div>
//               </div>
              
//               <div className="grid gap-3 pointer-events-auto">
//                 <Button 
//                   onClick={addTable} 
//                   size="lg"
//                   className="bg-gradient-primary hover:bg-primary-hover shadow-lg text-lg py-6"
//                 >
//                   <Database className="h-5 w-5 mr-3" />
//                   Criar Nova Tabela
//                 </Button>
                
//                 <div className="text-sm text-muted-foreground">
//                   ou use o botão "Importar" no header para carregar um projeto existente
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </SidebarProvider>
//   );
// };

// export default Index;
import React, { useState, useMemo } from 'react';
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
  const [activeSchema, setActiveSchema] = useState<string>('');
  
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

  // Get unique schemas and set default
  const schemas = useMemo(() => {
    const uniqueSchemas = [...new Set(project.tables.map(table => table.schema || 'public'))];
    if (!activeSchema && uniqueSchemas.length > 0) {
      setActiveSchema(uniqueSchemas[0]);
    }
    return uniqueSchemas;
  }, [project.tables, activeSchema]);

  // Filter tables and relationships by active schema
  const filteredTables = useMemo(() => {
    if (!activeSchema) return project.tables;
    return project.tables.filter(table => (table.schema || 'public') === activeSchema);
  }, [project.tables, activeSchema]);

  const filteredRelationships = useMemo(() => {
    if (!activeSchema) return project.relationships;
    const schemaTableIds = new Set(filteredTables.map(table => table.id));
    return project.relationships.filter(rel => 
      schemaTableIds.has(rel.source) && schemaTableIds.has(rel.target)
    );
  }, [project.relationships, filteredTables, activeSchema]);

  const handleSchemaSelect = (schema: string) => {
    setActiveSchema(schema);
    // Clear table selection when switching schemas
    setSelectedTable(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <MainHeader
          projectName={project.name}
          tablesCount={filteredTables.length}
          relationshipsCount={filteredRelationships.length}
          onAddTable={addTable}
          onExportDDL={exportDDL}
          onSaveProject={saveProject}
          onImportSQL={parsePostgreSQLScript}
          onLoadProject={loadProject}
          onShowHelp={() => setShowHelp(!showHelp)}
          activeSchema={activeSchema}
          totalTables={project.tables.length}
        />

        <div className="flex flex-1 w-full mt-16">
          {/* Left Sidebar */}
          <SchemaProjectSidebar
            projectName={project.name}
            tables={project.tables}
            selectedTable={selectedTable}
            onTableSelect={setSelectedTable}
            onAddTable={addTable}
            activeSchema={activeSchema}
            onSchemaSelect={handleSchemaSelect}
          />

          {/* Main Canvas */}
          <main className="flex-1 min-w-0">
            <DiagramCanvas
              tables={filteredTables}
              onTableSelect={setSelectedTable}
              relationships={filteredRelationships}
              onUpdateRelationships={updateRelationships}
              showHelp={showHelp}
              onCloseHelp={() => setShowHelp(false)}
              activeSchema={activeSchema}
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
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
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