// import React, { useState, useMemo } from 'react';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   useSidebar,
// } from '@/components/ui/sidebar';
// import { Table, Schema } from '@/types/database';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { 
//   Database, 
//   Table as TableIcon, 
//   Plus, 
//   Key, 
//   Link,
//   FileText,
//   Settings,
//   Search,
//   Zap,
//   List,
//   Folder
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface SchemaProjectSidebarProps {
//   projectName: string;
//   tables: Table[];
//   selectedTable?: Table | null;
//   onTableSelect: (table: Table) => void;
//   onAddTable: () => void;
//   activeSchema?: string;
//   onSchemaSelect?: (schema: string) => void;
// }

// export function SchemaProjectSidebar({ 
//   projectName, 
//   tables, 
//   selectedTable, 
//   onTableSelect, 
//   onAddTable,
//   activeSchema: externalActiveSchema = '',
//   onSchemaSelect
// }: SchemaProjectSidebarProps) {
//   const { state } = useSidebar();
//   const collapsed = state === 'collapsed';
//   const [searchFilter, setSearchFilter] = useState('');
//   const [internalActiveSchema, setInternalActiveSchema] = useState<string>('');
  
//   const activeSchema = externalActiveSchema || internalActiveSchema;

//   // Group tables by schema
//   const schemaGroups = useMemo(() => {
//     const groups: { [key: string]: Table[] } = {};
    
//     tables.forEach(table => {
//       const schema = table.schema || 'public';
//       if (!groups[schema]) {
//         groups[schema] = [];
//       }
//       groups[schema].push(table);
//     });
    
//     return groups;
//   }, [tables]);

//   // Filter tables based on search
//   const filteredSchemaGroups = useMemo(() => {
//     if (!searchFilter) return schemaGroups;
    
//     const filtered: { [key: string]: Table[] } = {};
    
//     Object.entries(schemaGroups).forEach(([schema, schemaTables]) => {
//       const filteredTables = schemaTables.filter(table =>
//         table.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
//         table.comment?.toLowerCase().includes(searchFilter.toLowerCase())
//       );
      
//       if (filteredTables.length > 0) {
//         filtered[schema] = filteredTables;
//       }
//     });
    
//     return filtered;
//   }, [schemaGroups, searchFilter]);

//   const schemas = Object.keys(filteredSchemaGroups);
  
//   // Set active schema if not set
//   const handleSchemaChange = (schema: string) => {
//     if (onSchemaSelect) {
//       onSchemaSelect(schema);
//     } else {
//       setInternalActiveSchema(schema);
//     }
//   };
  
//   if (!activeSchema && schemas.length > 0) {
//     handleSchemaChange(schemas[0]);
//   }

//   const getTableStats = (table: Table) => {
//     const primaryKeys = table.columns.filter(col => col.primaryKey).length;
//     const foreignKeys = table.columns.filter(col => col.foreignKey).length;
//     const triggers = table.triggers?.length || 0;
//     const indexes = table.indexes?.length || 0;
//     return { primaryKeys, foreignKeys, columns: table.columns.length, triggers, indexes };
//   };

//   const getSchemaColor = (schema: string) => {
//     const colorClasses = {
//       'public': 'bg-blue-500',
//       'auth': 'bg-purple-500',
//       'admin': 'bg-green-500',
//       'api': 'bg-orange-500',
//       'storage': 'bg-red-500',
//       'realtime': 'bg-teal-500'
//     };
//     return colorClasses[schema] || 'bg-blue-500';
//   };
  
//   const getSchemaColorActive = (schema: string, isActive: boolean) => {
//     if (!isActive) return getSchemaColor(schema);
    
//     const activeColorClasses = {
//       'public': 'bg-blue-600 ring-2 ring-blue-300',
//       'auth': 'bg-purple-600 ring-2 ring-purple-300',
//       'admin': 'bg-green-600 ring-2 ring-green-300',
//       'api': 'bg-orange-600 ring-2 ring-orange-300',
//       'storage': 'bg-red-600 ring-2 ring-red-300',
//       'realtime': 'bg-teal-600 ring-2 ring-teal-300'
//     };
//     return activeColorClasses[schema] || 'bg-blue-600 ring-2 ring-blue-300';
//   };

//   if (collapsed) {
//     return (
//       <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 w-16">
//         <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
//           <div className="flex justify-center">
//             <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
//               <Database className="h-4 w-4 text-white" />
//             </div>
//           </div>
//         </SidebarHeader>
        
//         <SidebarContent className="custom-scrollbar">
//           <SidebarGroup>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 <SidebarMenuItem>
//                   <SidebarMenuButton asChild>
//                     <Button 
//                       onClick={onAddTable}
//                       variant="ghost"
//                       className="w-full justify-center h-auto py-3"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>

//           {schemas.map((schema) => (
//             <SidebarGroup key={schema}>
//               <SidebarGroupContent>
//                 <SidebarMenu>
//                   <SidebarMenuItem>
//                     <div className="flex flex-col items-center py-2">
//                       <div className={cn("w-3 h-3 rounded-full mb-1 transition-all", getSchemaColorActive(schema, activeSchema === schema))} />
//                       <span className="text-xs text-sidebar-foreground/70 writing-mode-vertical">
//                         {filteredSchemaGroups[schema]?.length || 0}
//                       </span>
//                     </div>
//                   </SidebarMenuItem>
//                 </SidebarMenu>
//               </SidebarGroupContent>
//             </SidebarGroup>
//           ))}
//         </SidebarContent>
//       </Sidebar>
//     );
//   }

//   return (
//     <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 w-80">
//       <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
//             <Database className="h-4 w-4 text-white" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h2 className="font-semibold text-sidebar-foreground truncate">
//               {projectName}
//             </h2>
//             <p className="text-xs text-sidebar-foreground/70">
//               PostgreSQL Database
//             </p>
//           </div>
//         </div>

//         {/* Search Filter */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
//           <Input
//             placeholder="Filtrar tabelas..."
//             value={searchFilter}
//             onChange={(e) => setSearchFilter(e.target.value)}
//             className="pl-9 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
//           />
//         </div>
//       </SidebarHeader>

//       <SidebarContent className="custom-scrollbar">
//         {/* Add Table Section */}
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                   <Button 
//                     onClick={onAddTable}
//                     variant="ghost"
//                     className="w-full justify-start h-auto py-3 text-sidebar-primary hover:bg-sidebar-accent"
//                   >
//                     <Plus className="h-4 w-4" />
//                     <span className="ml-2 font-medium">Nova Tabela</span>
//                   </Button>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         {/* Schema Tabs */}
//         {schemas.length > 0 && (
//           <Tabs value={activeSchema} onValueChange={handleSchemaChange} className="flex-1">
//             <div className="px-4 py-2 border-b border-sidebar-border">
//               <TabsList className="grid w-full grid-cols-1 gap-1 bg-sidebar-accent/30">
//                 {schemas.map((schema) => (
//                   <TabsTrigger 
//                     key={schema} 
//                     value={schema}
//                     className={cn(
//                       "flex items-center gap-2 text-xs transition-all",
//                       "data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-accent-foreground",
//                       "data-[state=active]:shadow-sm data-[state=active]:border-l-2",
//                       schema === 'public' && "data-[state=active]:border-l-blue-500",
//                       schema === 'auth' && "data-[state=active]:border-l-purple-500",
//                       schema === 'admin' && "data-[state=active]:border-l-green-500",
//                       schema === 'api' && "data-[state=active]:border-l-orange-500",
//                       schema === 'storage' && "data-[state=active]:border-l-red-500",
//                       schema === 'realtime' && "data-[state=active]:border-l-teal-500"
//                     )}
//                   >
//                     <div className={cn("w-3 h-3 rounded-full transition-all", getSchemaColorActive(schema, activeSchema === schema))} />
//                     <Folder className="h-3 w-3" />
//                     <span className="truncate font-medium">{schema}</span>
//                     <Badge variant="secondary" className="ml-1 h-4 text-xs">
//                       {filteredSchemaGroups[schema]?.length || 0}
//                     </Badge>
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//             </div>

//             {schemas.map((schema) => (
//               <TabsContent key={schema} value={schema} className="mt-0 flex-1">
//                 <SidebarGroup>
//                   <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase tracking-wider text-xs font-medium px-4">
//                     Schema: {schema}
//                   </SidebarGroupLabel>
                  
//                   <SidebarGroupContent>
//                     <SidebarMenu>
//                       {(filteredSchemaGroups[schema] || []).map((table) => {
//                         const stats = getTableStats(table);
//                         const isSelected = selectedTable?.id === table.id;
                        
//                         return (
//                           <SidebarMenuItem key={table.id}>
//                             <SidebarMenuButton 
//                               asChild
//                               className={cn(
//                                 "cursor-pointer transition-colors",
//                                 isSelected && "bg-sidebar-accent text-sidebar-accent-foreground"
//                               )}
//                             >
//                               <div 
//                                 onClick={() => onTableSelect(table)}
//                                 className="flex items-center gap-3 p-3 rounded-md"
//                               >
//                                 <TableIcon className="h-4 w-4 text-sidebar-primary flex-shrink-0" />
                                
//                                 <div className="flex-1 min-w-0">
//                                   <div className="flex items-center justify-between">
//                                     <span className="font-medium text-sm truncate">
//                                       {table.name.replace(`${schema}.`, '')}
//                                     </span>
//                                     <Badge 
//                                       variant="secondary" 
//                                       className="ml-2 h-5 text-xs bg-sidebar-accent text-sidebar-accent-foreground"
//                                     >
//                                       {stats.columns}
//                                     </Badge>
//                                   </div>
                                  
//                                   <div className="flex items-center gap-3 mt-1">
//                                     {stats.primaryKeys > 0 && (
//                                       <div className="flex items-center gap-1">
//                                         <Key className="h-3 w-3 text-primary" />
//                                         <span className="text-xs text-sidebar-foreground/70">
//                                           {stats.primaryKeys}
//                                         </span>
//                                       </div>
//                                     )}
//                                     {stats.foreignKeys > 0 && (
//                                       <div className="flex items-center gap-1">
//                                         <Link className="h-3 w-3 text-accent" />
//                                         <span className="text-xs text-sidebar-foreground/70">
//                                           {stats.foreignKeys}
//                                         </span>
//                                       </div>
//                                     )}
//                                     {stats.triggers > 0 && (
//                                       <div className="flex items-center gap-1">
//                                         <Zap className="h-3 w-3 text-orange-500" />
//                                         <span className="text-xs text-sidebar-foreground/70">
//                                           {stats.triggers}
//                                         </span>
//                                       </div>
//                                     )}
//                                     {stats.indexes > 0 && (
//                                       <div className="flex items-center gap-1">
//                                         <List className="h-3 w-3 text-green-500" />
//                                         <span className="text-xs text-sidebar-foreground/70">
//                                           {stats.indexes}
//                                         </span>
//                                       </div>
//                                     )}
//                                   </div>
                                  
//                                   {table.comment && (
//                                     <p className="text-xs text-sidebar-foreground/50 mt-1 truncate">
//                                       {table.comment}
//                                     </p>
//                                   )}
//                                 </div>
//                               </div>
//                             </SidebarMenuButton>
//                           </SidebarMenuItem>
//                         );
//                       })}
                      
//                       {(filteredSchemaGroups[schema] || []).length === 0 && (
//                         <div className="text-center py-8 text-sidebar-foreground/50">
//                           <TableIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                           <p className="text-sm">Nenhuma tabela no schema</p>
//                           <p className="text-xs mt-1">{schema}</p>
//                         </div>
//                       )}
//                     </SidebarMenu>
//                   </SidebarGroupContent>
//                 </SidebarGroup>
//               </TabsContent>
//             ))}
//           </Tabs>
//         )}

//         {/* Project Actions */}
//         <SidebarGroup className="mt-auto">
//           <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase tracking-wider text-xs font-medium">
//             Projeto
//           </SidebarGroupLabel>
          
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                   <Button 
//                     variant="ghost"
//                     className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
//                   >
//                     <FileText className="h-4 w-4" />
//                     <span className="ml-2">Documentação</span>
//                   </Button>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
              
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                   <Button 
//                     variant="ghost"
//                     className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
//                   >
//                     <Settings className="h-4 w-4" />
//                     <span className="ml-2">Configurações</span>
//                   </Button>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
import React, { useState, useMemo } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Table, Schema } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Database, 
  Table as TableIcon, 
  Plus, 
  Key, 
  Link,
  FileText,
  Settings,
  Search,
  Zap,
  List,
  Folder
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SchemaProjectSidebarProps {
  projectName: string;
  tables: Table[];
  selectedTable?: Table | null;
  onTableSelect: (table: Table) => void;
  onAddTable: () => void;
  activeSchema?: string;
  onSchemaSelect?: (schema: string) => void;
}

export function SchemaProjectSidebar({ 
  projectName, 
  tables, 
  selectedTable, 
  onTableSelect, 
  onAddTable,
  activeSchema: externalActiveSchema = '',
  onSchemaSelect
}: SchemaProjectSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const [searchFilter, setSearchFilter] = useState('');
  const [internalActiveSchema, setInternalActiveSchema] = useState<string>('');
  
  const activeSchema = externalActiveSchema || internalActiveSchema;

  // Group tables by schema
  const schemaGroups = useMemo(() => {
    const groups: { [key: string]: Table[] } = {};
    
    tables.forEach(table => {
      const schema = table.schema || 'public';
      if (!groups[schema]) {
        groups[schema] = [];
      }
      groups[schema].push(table);
    });
    
    return groups;
  }, [tables]);

  // Filter tables based on search
  const filteredSchemaGroups = useMemo(() => {
    if (!searchFilter) return schemaGroups;
    
    const filtered: { [key: string]: Table[] } = {};
    
    Object.entries(schemaGroups).forEach(([schema, schemaTables]) => {
      const filteredTables = schemaTables.filter(table =>
        table.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        table.comment?.toLowerCase().includes(searchFilter.toLowerCase())
      );
      
      if (filteredTables.length > 0) {
        filtered[schema] = filteredTables;
      }
    });
    
    return filtered;
  }, [schemaGroups, searchFilter]);

  const schemas = Object.keys(filteredSchemaGroups).sort();
  
  // Set active schema if not set
  const handleSchemaChange = (schema: string) => {
    if (onSchemaSelect) {
      onSchemaSelect(schema);
    } else {
      setInternalActiveSchema(schema);
    }
  };
  
  // Auto-select first schema if none selected
  React.useEffect(() => {
    if (!activeSchema && schemas.length > 0) {
      handleSchemaChange(schemas[0]);
    }
  }, [schemas, activeSchema]);

  const getTableStats = (table: Table) => {
    const primaryKeys = table.columns.filter(col => col.primaryKey).length;
    const foreignKeys = table.columns.filter(col => col.foreignKey).length;
    const triggers = table.triggers?.length || 0;
    const indexes = table.indexes?.length || 0;
    return { primaryKeys, foreignKeys, columns: table.columns.length, triggers, indexes };
  };

  const getSchemaColor = (schema: string) => {
    const colorClasses = {
      'public': 'bg-blue-500',
      'auth': 'bg-purple-500',
      'admin': 'bg-green-500',
      'api': 'bg-orange-500',
      'storage': 'bg-red-500',
      'realtime': 'bg-teal-500'
    };
    return colorClasses[schema] || 'bg-blue-500';
  };

  // Collapsed sidebar view
  if (collapsed) {
    return (
      <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 w-16">
        <SidebarHeader className="border-b border-sidebar-border px-2 py-4 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          <SidebarGroup className="py-2">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button 
                      onClick={onAddTable}
                      variant="ghost"
                      size="sm"
                      className="w-full h-10 p-0 justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Schema indicators when collapsed */}
          <div className="space-y-2 py-2">
            {schemas.map((schema) => (
              <div 
                key={schema}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleSchemaChange(schema)}
              >
                <div className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  getSchemaColor(schema),
                  activeSchema === schema && "ring-2 ring-offset-1 ring-current"
                )} />
                <Badge 
                  variant="secondary" 
                  className="mt-1 h-4 text-xs px-1 group-hover:bg-sidebar-accent"
                >
                  {filteredSchemaGroups[schema]?.length || 0}
                </Badge>
              </div>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 w-80">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4 space-y-4">
        {/* Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sidebar-foreground truncate text-base">
              {projectName}
            </h2>
            <p className="text-xs text-sidebar-foreground/70">
              PostgreSQL Database
            </p>
          </div>
        </div>

        {/* Search Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
          <Input
            placeholder="Filtrar tabelas..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-9 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 h-9"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col">
        {/* Add Table Button */}
        <div className="p-4 border-b border-sidebar-border">
          <Button 
            onClick={onAddTable}
            variant="ghost"
            className="w-full justify-start h-10 text-sidebar-primary hover:bg-sidebar-accent font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Tabela
          </Button>
        </div>

        {/* Schema Selector */}
        {schemas.length > 1 && (
          <div className="p-4 space-y-2 border-b border-sidebar-border">
            <p className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
              Schemas
            </p>
            <div className="grid grid-cols-1 gap-1">
              {schemas.map((schema) => (
                <Button
                  key={schema}
                  variant={activeSchema === schema ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleSchemaChange(schema)}
                  className={cn(
                    "w-full justify-start h-8 text-xs font-medium transition-all",
                    activeSchema === schema 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                      : "hover:bg-sidebar-accent/50"
                  )}
                >
                  <div className={cn("w-3 h-3 rounded-full mr-2", getSchemaColor(schema))} />
                  <Folder className="h-3 w-3 mr-2" />
                  <span className="flex-1 text-left truncate">{schema}</span>
                  <Badge variant="secondary" className="h-4 text-xs ml-2">
                    {filteredSchemaGroups[schema]?.length || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Tables List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {activeSchema && filteredSchemaGroups[activeSchema] ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                    Tabelas - {activeSchema}
                  </p>
                  <Badge variant="outline" className="h-5 text-xs">
                    {filteredSchemaGroups[activeSchema].length}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  {filteredSchemaGroups[activeSchema].map((table) => {
                    const stats = getTableStats(table);
                    const isSelected = selectedTable?.id === table.id;
                    
                    return (
                      <div
                        key={table.id}
                        onClick={() => onTableSelect(table)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all hover:bg-sidebar-accent/80",
                          isSelected && "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-sidebar-primary/20"
                        )}
                      >
                        <TableIcon className="h-4 w-4 text-sidebar-primary flex-shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">
                              {table.name.replace(`${activeSchema}.`, '')}
                            </span>
                            <Badge 
                              variant="secondary" 
                              className="ml-2 h-5 text-xs bg-sidebar-accent text-sidebar-accent-foreground"
                            >
                              {stats.columns}
                            </Badge>
                          </div>
                          
                          {/* Table stats */}
                          <div className="flex items-center gap-3 mt-1">
                            {stats.primaryKeys > 0 && (
                              <div className="flex items-center gap-1">
                                <Key className="h-3 w-3 text-primary" />
                                <span className="text-xs text-sidebar-foreground/70">
                                  {stats.primaryKeys}
                                </span>
                              </div>
                            )}
                            {stats.foreignKeys > 0 && (
                              <div className="flex items-center gap-1">
                                <Link className="h-3 w-3 text-accent" />
                                <span className="text-xs text-sidebar-foreground/70">
                                  {stats.foreignKeys}
                                </span>
                              </div>
                            )}
                            {stats.triggers > 0 && (
                              <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3 text-orange-500" />
                                <span className="text-xs text-sidebar-foreground/70">
                                  {stats.triggers}
                                </span>
                              </div>
                            )}
                            {stats.indexes > 0 && (
                              <div className="flex items-center gap-1">
                                <List className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-sidebar-foreground/70">
                                  {stats.indexes}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {table.comment && (
                            <p className="text-xs text-sidebar-foreground/50 mt-1 truncate">
                              {table.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-sidebar-foreground/50">
                <TableIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma tabela encontrada</p>
                {activeSchema && (
                  <p className="text-xs mt-1">Schema: {activeSchema}</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <p className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider mb-2">
            Projeto
          </p>
          
          <Button 
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <FileText className="h-4 w-4 mr-2" />
            Documentação
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}