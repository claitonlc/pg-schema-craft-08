import React from 'react';
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
import { Table } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Table as TableIcon, 
  Plus, 
  Key, 
  Link,
  FileText,
  Settings,
  Folder
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectSidebarProps {
  projectName: string;
  tables: Table[];
  selectedTable?: Table | null;
  onTableSelect: (table: Table) => void;
  onAddTable: () => void;
}

export function ProjectSidebar({ 
  projectName, 
  tables, 
  selectedTable, 
  onTableSelect, 
  onAddTable 
}: ProjectSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const getTableStats = (table: Table) => {
    const primaryKeys = table.columns.filter(col => col.primaryKey).length;
    const foreignKeys = table.columns.filter(col => col.foreignKey).length;
    return { primaryKeys, foreignKeys, columns: table.columns.length };
  };

  return (
    <Sidebar className={cn(
      "border-r border-sidebar-border bg-sidebar flex-shrink-0",
      collapsed ? "w-16" : "w-72 lg:w-80"
    )}>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        {!collapsed ? (
          <div className="flex items-center gap-3">
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
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Database className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
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
                    {!collapsed && (
                      <span className="ml-2 font-medium">Nova Tabela</span>
                    )}
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tables Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 uppercase tracking-wider text-xs font-medium">
            {!collapsed && `Tabelas (${tables.length})`}
            {collapsed && tables.length}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {tables.map((table) => {
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
                        
                        {!collapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm truncate">
                                {table.name}
                              </span>
                              <Badge 
                                variant="secondary" 
                                className="ml-2 h-5 text-xs bg-sidebar-accent text-sidebar-accent-foreground"
                              >
                                {stats.columns}
                              </Badge>
                            </div>
                            
                            {(stats.primaryKeys > 0 || stats.foreignKeys > 0) && (
                              <div className="flex items-center gap-2 mt-1">
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
                              </div>
                            )}
                            
                            {table.comment && (
                              <p className="text-xs text-sidebar-foreground/50 mt-1 truncate">
                                {table.comment}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              
              {tables.length === 0 && !collapsed && (
                <div className="text-center py-8 text-sidebar-foreground/50">
                  <TableIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma tabela criada</p>
                  <p className="text-xs mt-1">
                    Clique em "Nova Tabela" para começar
                  </p>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Project Actions */}
        {!collapsed && (
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
        )}
      </SidebarContent>
    </Sidebar>
  );
}