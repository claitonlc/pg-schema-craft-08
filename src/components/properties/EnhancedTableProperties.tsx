import React from 'react';
import { Table, Column, Trigger, Index } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table as TableIcon, 
  Key, 
  Link, 
  Type, 
  Zap, 
  List,
  Database,
  FileText,
  Settings,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedTablePropertiesProps {
  table: Table;
  onTableUpdate: (table: Table) => void;
}

export function EnhancedTableProperties({ table, onTableUpdate }: EnhancedTablePropertiesProps) {
  const getColumnTypeColor = (type: string) => {
    if (type.includes('serial')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    if (type.includes('int') || type.includes('numeric') || type.includes('decimal')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (type.includes('varchar') || type.includes('text') || type.includes('char')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    if (type.includes('timestamp') || type.includes('date') || type.includes('time')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    if (type.includes('boolean')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
    if (type.includes('json')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const getTriggerEventColor = (event: string) => {
    switch (event) {
      case 'INSERT': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'UPDATE': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'TRUNCATE': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TableIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">
              {table.name.split('.').pop()}
            </h3>
            <p className="text-sm text-muted-foreground">
              Schema: <span className="font-medium">{table.schema}</span>
            </p>
            {table.comment && (
              <p className="text-sm text-muted-foreground mt-1">{table.comment}</p>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="attributes" className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b border-border">
          <TabsList className="grid w-full grid-cols-5 bg-muted/30">
            <TabsTrigger value="attributes" className="text-xs">
              <Type className="h-3 w-3 mr-1" />
              Atributos
            </TabsTrigger>
            <TabsTrigger value="keys" className="text-xs">
              <Key className="h-3 w-3 mr-1" />
              Chaves
            </TabsTrigger>
            <TabsTrigger value="indexes" className="text-xs">
              <List className="h-3 w-3 mr-1" />
              Índices
            </TabsTrigger>
            <TabsTrigger value="triggers" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Triggers
            </TabsTrigger>
            <TabsTrigger value="sql" className="text-xs">
              <Code className="h-3 w-3 mr-1" />
              SQL
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="attributes" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {table.columns.map((column) => (
                  <Card key={column.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-foreground">{column.name}</h4>
                            <Badge 
                              variant="secondary" 
                              className={cn("text-xs", getColumnTypeColor(column.type))}
                            >
                              {column.type}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {column.primaryKey && (
                              <Badge variant="outline" className="text-xs border-primary text-primary">
                                <Key className="h-3 w-3 mr-1" />
                                Primary Key
                              </Badge>
                            )}
                            {column.foreignKey && (
                              <Badge variant="outline" className="text-xs border-accent text-accent">
                                <Link className="h-3 w-3 mr-1" />
                                Foreign Key
                              </Badge>
                            )}
                            {column.unique && (
                              <Badge variant="outline" className="text-xs">
                                Unique
                              </Badge>
                            )}
                            {!column.nullable && (
                              <Badge variant="outline" className="text-xs">
                                Not Null
                              </Badge>
                            )}
                            {column.defaultValue && (
                              <Badge variant="secondary" className="text-xs">
                                Default: {column.defaultValue}
                              </Badge>
                            )}
                          </div>
                          
                          {column.comment && (
                            <p className="text-sm text-muted-foreground mt-2">{column.comment}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="keys" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Key className="h-4 w-4 text-primary" />
                      Chaves Primárias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {table.columns.filter(col => col.primaryKey).map((column) => (
                        <div key={column.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                          <Key className="h-3 w-3 text-primary" />
                          <span className="font-medium">{column.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {column.type}
                          </Badge>
                        </div>
                      ))}
                      {table.columns.filter(col => col.primaryKey).length === 0 && (
                        <p className="text-sm text-muted-foreground">Nenhuma chave primária definida</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Link className="h-4 w-4 text-accent" />
                      Chaves Estrangeiras
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {table.columns.filter(col => col.foreignKey).map((column) => (
                        <div key={column.id} className="p-3 bg-muted/30 rounded">
                          <div className="flex items-center gap-2 mb-1">
                            <Link className="h-3 w-3 text-accent" />
                            <span className="font-medium">{column.name}</span>
                          </div>
                          {column.foreignKey && (
                            <div className="text-sm text-muted-foreground">
                              Referencia: {column.foreignKey.targetTable}.{column.foreignKey.targetColumn}
                              <div className="flex gap-2 mt-1">
                                {column.foreignKey.onDelete && (
                                  <Badge variant="outline" className="text-xs">
                                    ON DELETE {column.foreignKey.onDelete}
                                  </Badge>
                                )}
                                {column.foreignKey.onUpdate && (
                                  <Badge variant="outline" className="text-xs">
                                    ON UPDATE {column.foreignKey.onUpdate}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {table.columns.filter(col => col.foreignKey).length === 0 && (
                        <p className="text-sm text-muted-foreground">Nenhuma chave estrangeira definida</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="indexes" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {(table.indexes || []).map((index) => (
                  <Card key={index.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <List className="h-4 w-4 text-green-500" />
                            <h4 className="font-medium text-foreground">{index.name}</h4>
                            <Badge variant={index.unique ? "default" : "secondary"} className="text-xs">
                              {index.unique ? "UNIQUE" : index.type.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Colunas: {index.columns.join(', ')}
                          </div>
                          {index.comment && (
                            <p className="text-sm text-muted-foreground mt-1">{index.comment}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(table.indexes || []).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum índice definido</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="triggers" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {(table.triggers || []).map((trigger) => (
                  <Card key={trigger.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <h4 className="font-medium text-foreground">{trigger.name}</h4>
                          <Badge variant={trigger.enabled ? "default" : "secondary"} className="text-xs">
                            {trigger.enabled ? "ATIVO" : "INATIVO"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Badge className={cn("text-xs", getTriggerEventColor(trigger.event))}>
                            {trigger.event}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {trigger.timing}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Função:</span> {trigger.function}
                        </div>
                        
                        {trigger.comment && (
                          <p className="text-sm text-muted-foreground">{trigger.comment}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(table.triggers || []).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum trigger definido</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="sql" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      DDL da Tabela
                    </CardTitle>
                    <CardDescription>
                      Script SQL para criação da tabela
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded font-mono text-sm">
                      <pre className="whitespace-pre-wrap">
{`CREATE TABLE ${table.name} (
${table.columns.map(col => {
  let def = `  ${col.name} ${col.type}`;
  if (!col.nullable) def += ' NOT NULL';
  if (col.unique) def += ' UNIQUE';
  if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
  return def;
}).join(',\n')}${table.columns.filter(col => col.primaryKey).length > 0 ? `,
  PRIMARY KEY (${table.columns.filter(col => col.primaryKey).map(col => col.name).join(', ')})` : ''}
);

${table.comment ? `COMMENT ON TABLE ${table.name} IS '${table.comment}';` : ''}

${table.columns.filter(col => col.comment).map(col => 
  `COMMENT ON COLUMN ${table.name}.${col.name} IS '${col.comment}';`
).join('\n')}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}