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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
}

export function SchemaProjectSidebar({ 
  projectName, 
  tables, 
  selectedTable, 
  onTableSelect, 
  onAddTable 
}: SchemaProjectSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const [searchFilter, setSearchFilter] = useState('');
  const [activeSchema, setActiveSchema] = useState<string>('');

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

  const schemas = Object.keys(filteredSchemaGroups);
  
  // Set active schema if not set
  if (!activeSchema && schemas.length > 0) {
    setActiveSchema(schemas[0]);
  }

  const getTableStats = (table: Table) => {
    const primaryKeys = table.columns.filter(col => col.primaryKey).length;
    const foreignKeys = table.columns.filter(col => col.foreignKey).length;
    const triggers = table.triggers?.length || 0;
    const indexes = table.indexes?.length || 0;
    return { primaryKeys, foreignKeys, columns: table.columns.length, triggers, indexes };
  };

  const getSchemaColor = (schema: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-cyan-500'
    ];
    const index = schemas.indexOf(schema) % colors.length;
    return colors[index];
  };

  if (collapsed) {
    return (
      <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 w-16">
        <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Database className="h-4 w-4 text-white" />
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="custom-scrollbar">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button 
                      onClick={onAddTable}
                      variant="ghost"
                      className="w-full justify-center h-auto py-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {schemas.map((schema) => (
            <SidebarGroup key={schema}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <div className="flex flex-col items-center py-2">
                      <div className={cn("w-3 h-3 rounded-full mb-1", getSchemaColor(schema))} />
                      <span className="text-xs text-sidebar-foreground/70 writing-mode-vertical">
                        {filteredSchemaGroups[schema]?.length || 0}
                      </span>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar flex-shrink-0 w-80">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sidebar-foreground truncate">
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
            className="pl-9 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar">
        {/* Add Table Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button 
                    onClick={onAddTable}
                    variant="ghost"
                    className="w-full justify-start h-auto py-3 text-sidebar-primary hover:bg-sidebar-accent"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="ml-2 font-medium">Nova Tabela</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Schema Tabs */}
        {schemas.length > 0 && (
          <Tabs value={activeSchema} onValueChange={setActiveSchema} className="flex-1">
            <div className="px-4 py-2 border-b border-sidebar-border">
              <TabsList className="grid w-full grid-cols-1 gap-1 bg-sidebar-accent/30">
                {schemas.map((schema) => (
                  <TabsTrigger 
                    key={schema} 
                    value={schema}
                    className="flex items-center gap-2 text-xs data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-accent-foreground"
                  >
                    <div className={cn("w-3 h-3 rounded-full", getSchemaColor(schema))} />
                    <Folder className="h-3 w-3" />
                    <span className="truncate">{schema}</span>
                    <Badge variant="secondary" className="ml-1 h-4 text-xs">
                      {filteredSchemaGroups[schema]?.length || 0}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {schemas.map((schema) => (
              <TabsContent key={schema} value={schema} className="mt-0 flex-1">
                <SidebarGroup>
                  <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase tracking-wider text-xs font-medium px-4">
                    Schema: {schema}
                  </SidebarGroupLabel>
                  
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {(filteredSchemaGroups[schema] || []).map((table) => {
                        const stats = getTableStats(table);
                        const isSelected = selectedTable?.id === table.id;
                        
                        return (
                          <SidebarMenuItem key={table.id}>
                            <SidebarMenuButton 
                              asChild
                              className={cn(
                                "cursor-pointer transition-colors",
                                isSelected && "bg-sidebar-accent text-sidebar-accent-foreground"
                              )}
                            >
                              <div 
                                onClick={() => onTableSelect(table)}
                                className="flex items-center gap-3 p-3 rounded-md"
                              >
                                <TableIcon className="h-4 w-4 text-sidebar-primary flex-shrink-0" />
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm truncate">
                                      {table.name.replace(`${schema}.`, '')}
                                    </span>
                                    <Badge 
                                      variant="secondary" 
                                      className="ml-2 h-5 text-xs bg-sidebar-accent text-sidebar-accent-foreground"
                                    >
                                      {stats.columns}
                                    </Badge>
                                  </div>
                                  
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
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                      
                      {(filteredSchemaGroups[schema] || []).length === 0 && (
                        <div className="text-center py-8 text-sidebar-foreground/50">
                          <TableIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Nenhuma tabela no schema</p>
                          <p className="text-xs mt-1">{schema}</p>
                        </div>
                      )}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Project Actions */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase tracking-wider text-xs font-medium">
            Projeto
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="ml-2">Documentação</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="ml-2">Configurações</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}