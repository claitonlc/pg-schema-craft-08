// import React from 'react';
// import { Table, Column, Trigger, Index } from '@/types/database';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { 
//   Table as TableIcon, 
//   Key, 
//   Link, 
//   Type, 
//   Zap, 
//   List,
//   Database,
//   FileText,
//   Settings,
//   Code
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface EnhancedTablePropertiesProps {
//   table: Table;
//   onTableUpdate: (table: Table) => void;
// }

// export function EnhancedTableProperties({ table, onTableUpdate }: EnhancedTablePropertiesProps) {
//   const getColumnTypeColor = (type: string) => {
//     if (type.includes('serial')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//     if (type.includes('int') || type.includes('numeric') || type.includes('decimal')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//     if (type.includes('varchar') || type.includes('text') || type.includes('char')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
//     if (type.includes('timestamp') || type.includes('date') || type.includes('time')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
//     if (type.includes('boolean')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
//     if (type.includes('json')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
//     return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
//   };

//   const getTriggerEventColor = (event: string) => {
//     switch (event) {
//       case 'INSERT': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//       case 'UPDATE': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//       case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
//       case 'TRUNCATE': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
//             <TableIcon className="h-5 w-5 text-white" />
//           </div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-lg text-foreground">
//               {table.name.split('.').pop()}
//             </h3>
//             <p className="text-sm text-muted-foreground">
//               Schema: <span className="font-medium">{table.schema}</span>
//             </p>
//             {table.comment && (
//               <p className="text-sm text-muted-foreground mt-1">{table.comment}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="attributes" className="flex-1 flex flex-col">
//         <div className="px-4 py-2 border-b border-border">
//           <TabsList className="grid w-full grid-cols-5 bg-muted/30">
//             <TabsTrigger value="attributes" className="text-xs">
//               <Type className="h-3 w-3 mr-1" />
//               Atributos
//             </TabsTrigger>
//             <TabsTrigger value="keys" className="text-xs">
//               <Key className="h-3 w-3 mr-1" />
//               Chaves
//             </TabsTrigger>
//             <TabsTrigger value="indexes" className="text-xs">
//               <List className="h-3 w-3 mr-1" />
//               Índices
//             </TabsTrigger>
//             <TabsTrigger value="triggers" className="text-xs">
//               <Zap className="h-3 w-3 mr-1" />
//               Triggers
//             </TabsTrigger>
//             <TabsTrigger value="sql" className="text-xs">
//               <Code className="h-3 w-3 mr-1" />
//               SQL
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <div className="flex-1 overflow-hidden">
//           <TabsContent value="attributes" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-3">
//                 {table.columns.map((column) => (
//                   <Card key={column.id} className="border border-border/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h4 className="font-medium text-foreground">{column.name}</h4>
//                             <Badge 
//                               variant="secondary" 
//                               className={cn("text-xs", getColumnTypeColor(column.type))}
//                             >
//                               {column.type}
//                             </Badge>
//                           </div>
                          
//                           <div className="flex flex-wrap gap-2">
//                             {column.primaryKey && (
//                               <Badge variant="outline" className="text-xs border-primary text-primary">
//                                 <Key className="h-3 w-3 mr-1" />
//                                 Primary Key
//                               </Badge>
//                             )}
//                             {column.foreignKey && (
//                               <Badge variant="outline" className="text-xs border-accent text-accent">
//                                 <Link className="h-3 w-3 mr-1" />
//                                 Foreign Key
//                               </Badge>
//                             )}
//                             {column.unique && (
//                               <Badge variant="outline" className="text-xs">
//                                 Unique
//                               </Badge>
//                             )}
//                             {!column.nullable && (
//                               <Badge variant="outline" className="text-xs">
//                                 Not Null
//                               </Badge>
//                             )}
//                             {column.defaultValue && (
//                               <Badge variant="secondary" className="text-xs">
//                                 Default: {column.defaultValue}
//                               </Badge>
//                             )}
//                           </div>
                          
//                           {column.comment && (
//                             <p className="text-sm text-muted-foreground mt-2">{column.comment}</p>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           <TabsContent value="keys" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm flex items-center gap-2">
//                       <Key className="h-4 w-4 text-primary" />
//                       Chaves Primárias
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       {table.columns.filter(col => col.primaryKey).map((column) => (
//                         <div key={column.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
//                           <Key className="h-3 w-3 text-primary" />
//                           <span className="font-medium">{column.name}</span>
//                           <Badge variant="secondary" className="text-xs">
//                             {column.type}
//                           </Badge>
//                         </div>
//                       ))}
//                       {table.columns.filter(col => col.primaryKey).length === 0 && (
//                         <p className="text-sm text-muted-foreground">Nenhuma chave primária definida</p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm flex items-center gap-2">
//                       <Link className="h-4 w-4 text-accent" />
//                       Chaves Estrangeiras
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       {table.columns.filter(col => col.foreignKey).map((column) => (
//                         <div key={column.id} className="p-3 bg-muted/30 rounded">
//                           <div className="flex items-center gap-2 mb-1">
//                             <Link className="h-3 w-3 text-accent" />
//                             <span className="font-medium">{column.name}</span>
//                           </div>
//                           {column.foreignKey && (
//                             <div className="text-sm text-muted-foreground">
//                               Referencia: {column.foreignKey.targetTable}.{column.foreignKey.targetColumn}
//                               <div className="flex gap-2 mt-1">
//                                 {column.foreignKey.onDelete && (
//                                   <Badge variant="outline" className="text-xs">
//                                     ON DELETE {column.foreignKey.onDelete}
//                                   </Badge>
//                                 )}
//                                 {column.foreignKey.onUpdate && (
//                                   <Badge variant="outline" className="text-xs">
//                                     ON UPDATE {column.foreignKey.onUpdate}
//                                   </Badge>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                       {table.columns.filter(col => col.foreignKey).length === 0 && (
//                         <p className="text-sm text-muted-foreground">Nenhuma chave estrangeira definida</p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           <TabsContent value="indexes" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-3">
//                 {(table.indexes || []).map((index) => (
//                   <Card key={index.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <List className="h-4 w-4 text-green-500" />
//                             <h4 className="font-medium text-foreground">{index.name}</h4>
//                             <Badge variant={index.unique ? "default" : "secondary"} className="text-xs">
//                               {index.unique ? "UNIQUE" : index.type.toUpperCase()}
//                             </Badge>
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             Colunas: {index.columns.join(', ')}
//                           </div>
//                           {index.comment && (
//                             <p className="text-sm text-muted-foreground mt-1">{index.comment}</p>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//                 {(table.indexes || []).length === 0 && (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                     <p className="text-sm">Nenhum índice definido</p>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           <TabsContent value="triggers" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-3">
//                 {(table.triggers || []).map((trigger) => (
//                   <Card key={trigger.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <Zap className="h-4 w-4 text-orange-500" />
//                           <h4 className="font-medium text-foreground">{trigger.name}</h4>
//                           <Badge variant={trigger.enabled ? "default" : "secondary"} className="text-xs">
//                             {trigger.enabled ? "ATIVO" : "INATIVO"}
//                           </Badge>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-2">
//                         <div className="flex gap-2">
//                           <Badge className={cn("text-xs", getTriggerEventColor(trigger.event))}>
//                             {trigger.event}
//                           </Badge>
//                           <Badge variant="outline" className="text-xs">
//                             {trigger.timing}
//                           </Badge>
//                         </div>
                        
//                         <div className="text-sm text-muted-foreground">
//                           <span className="font-medium">Função:</span> {trigger.function}
//                         </div>
                        
//                         {trigger.comment && (
//                           <p className="text-sm text-muted-foreground">{trigger.comment}</p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//                 {(table.triggers || []).length === 0 && (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                     <p className="text-sm">Nenhum trigger definido</p>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           <TabsContent value="sql" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm flex items-center gap-2">
//                       <Code className="h-4 w-4" />
//                       DDL da Tabela
//                     </CardTitle>
//                     <CardDescription>
//                       Script SQL para criação da tabela
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="bg-muted/50 p-4 rounded font-mono text-sm">
//                       <pre className="whitespace-pre-wrap">
// {`CREATE TABLE ${table.name} (
// ${table.columns.map(col => {
//   let def = `  ${col.name} ${col.type}`;
//   if (!col.nullable) def += ' NOT NULL';
//   if (col.unique) def += ' UNIQUE';
//   if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
//   return def;
// }).join(',\n')}${table.columns.filter(col => col.primaryKey).length > 0 ? `,
//   PRIMARY KEY (${table.columns.filter(col => col.primaryKey).map(col => col.name).join(', ')})` : ''}
// );

// ${table.comment ? `COMMENT ON TABLE ${table.name} IS '${table.comment}';` : ''}

// ${table.columns.filter(col => col.comment).map(col => 
//   `COMMENT ON COLUMN ${table.name}.${col.name} IS '${col.comment}';`
// ).join('\n')}`}
//                       </pre>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </ScrollArea>
//           </TabsContent>
//         </div>
//       </Tabs>
//     </div>
//   );
// }

//codigo 2
// import React, { useState, useEffect } from 'react';
// import { Table, Column, Trigger, Index, PostgreSQLType, PostgreSQLTypes } from '@/types/database';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Button } from '@/components/ui/button';
// import { 
//   Table as TableIcon, 
//   Key, 
//   Link, 
//   Type, 
//   Zap, 
//   List,
//   Code,
//   Plus,
//   Trash2,
//   Hash,
//   GripVertical,
//   Eye,
//   EyeOff
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { toast } from 'sonner';
// import { v4 as uuidv4 } from 'uuid';

// interface EnhancedTablePropertiesProps {
//   table: Table;
//   onTableUpdate: (table: Table) => void;
//   onTableDelete?: (tableId: string) => void;
// }

// export function EnhancedTableProperties({ table, onTableUpdate, onTableDelete }: EnhancedTablePropertiesProps) {
//   const [editingTable, setEditingTable] = useState<Table>(table);
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   useEffect(() => {
//     setEditingTable(table);
//   }, [table]);

//   const handleTableNameChange = (name: string) => {
//     const updated = { ...editingTable, name };
//     setEditingTable(updated);
//     onTableUpdate(updated);
//   };

//   const handleTableCommentChange = (comment: string) => {
//     const updated = { ...editingTable, comment };
//     setEditingTable(updated);
//     onTableUpdate(updated);
//   };

//   const handleColumnUpdate = (columnId: string, updates: Partial<Column>) => {
//     const updatedColumns = editingTable.columns.map(col =>
//       col.id === columnId ? { ...col, ...updates } : col
//     );
//     const updated = { ...editingTable, columns: updatedColumns };
//     setEditingTable(updated);
//     onTableUpdate(updated);
//   };

//   const handleAddColumn = () => {
//     const newColumn: Column = {
//       id: uuidv4(),
//       name: `coluna_${editingTable.columns.length + 1}`,
//       type: 'varchar',
//       nullable: true,
//       primaryKey: false,
//       unique: false,
//     };
    
//     const updated = { 
//       ...editingTable, 
//       columns: [...editingTable.columns, newColumn] 
//     };
//     setEditingTable(updated);
//     onTableUpdate(updated);
//     toast.success('Coluna adicionada');
//   };

//   const handleDeleteColumn = (columnId: string) => {
//     if (editingTable.columns.length <= 1) {
//       toast.error('Uma tabela deve ter pelo menos uma coluna');
//       return;
//     }

//     const updatedColumns = editingTable.columns.filter(col => col.id !== columnId);
//     const updated = { ...editingTable, columns: updatedColumns };
//     setEditingTable(updated);
//     onTableUpdate(updated);
//     toast.success('Coluna removida');
//   };

//   const getColumnIcon = (column: Column) => {
//     if (column.primaryKey) return <Key className="h-3 w-3 text-primary" />;
//     if (column.foreignKey) return <Link className="h-3 w-3 text-accent" />;
//     return <Hash className="h-3 w-3 text-muted-foreground" />;
//   };

//   const getColumnTypeColor = (type: string) => {
//     if (type.includes('serial')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//     if (type.includes('int') || type.includes('numeric') || type.includes('decimal')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//     if (type.includes('varchar') || type.includes('text') || type.includes('char')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
//     if (type.includes('timestamp') || type.includes('date') || type.includes('time')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
//     if (type.includes('boolean')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
//     if (type.includes('json')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
//     return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
//   };

//   const getTriggerEventColor = (event: string) => {
//     switch (event) {
//       case 'INSERT': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//       case 'UPDATE': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//       case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
//       case 'TRUNCATE': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
//             <TableIcon className="h-5 w-5 text-white" />
//           </div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-lg text-foreground">
//               {editingTable.name.split('.').pop()}
//             </h3>
//             <p className="text-sm text-muted-foreground">
//               Schema: <span className="font-medium">{editingTable.schema}</span>
//             </p>
//           </div>
//           {onTableDelete && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => onTableDelete(table.id)}
//               className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
//             >
//               <Trash2 className="h-4 w-4" />
//             </Button>
//           )}
//         </div>
//         <div className="flex items-center justify-between pt-4">
//           <div className="flex gap-2">
//             <Badge variant="outline" className="bg-table-primary-key text-primary border-primary/20">
//               {editingTable.columns.filter(c => c.primaryKey).length} PK
//             </Badge>
//             <Badge variant="outline" className="bg-table-foreign-key text-accent border-accent/20">
//               {editingTable.columns.filter(c => c.foreignKey).length} FK
//             </Badge>
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="attributes" className="flex-1 flex flex-col">
//         <div className="px-4 py-2 border-b border-border">
//           <TabsList className="grid w-full grid-cols-5 bg-muted/30">
//             <TabsTrigger value="attributes" className="text-xs">
//               <Type className="h-3 w-3 mr-1" />
//               Atributos
//             </TabsTrigger>
//             <TabsTrigger value="keys" className="text-xs">
//               <Key className="h-3 w-3 mr-1" />
//               Chaves
//             </TabsTrigger>
//             <TabsTrigger value="indexes" className="text-xs">
//               <List className="h-3 w-3 mr-1" />
//               Índices
//             </TabsTrigger>
//             <TabsTrigger value="triggers" className="text-xs">
//               <Zap className="h-3 w-3 mr-1" />
//               Triggers
//             </TabsTrigger>
//             <TabsTrigger value="sql" className="text-xs">
//               <Code className="h-3 w-3 mr-1" />
//               SQL
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <div className="flex-1 overflow-hidden">
//           {/* Aba de edição de Atributos */}
//           <TabsContent value="attributes" className="h-full mt-0 flex flex-col">
//             <ScrollArea className="flex-1">
//               <div className="p-4 space-y-4">
//                 <Card>
//                   <CardHeader className="pb-4">
//                     <CardTitle className="text-lg flex items-center gap-2">
//                       <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
//                         <Hash className="h-3 w-3 text-white" />
//                       </div>
//                       Propriedades da Tabela
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4 pt-0">
//                     <div className="space-y-2">
//                       <Label htmlFor="table-name">Nome da Tabela</Label>
//                       <Input
//                         id="table-name"
//                         value={editingTable.name}
//                         onChange={(e) => handleTableNameChange(e.target.value)}
//                         placeholder="nome_da_tabela"
//                         className="font-mono"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="table-comment">Comentário</Label>
//                       <Textarea
//                         id="table-comment"
//                         value={editingTable.comment || ''}
//                         onChange={(e) => handleTableCommentChange(e.target.value)}
//                         placeholder="Descrição da tabela..."
//                         rows={3}
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-4">
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg">
//                         Colunas ({editingTable.columns.length})
//                       </CardTitle>
//                       <Button onClick={handleAddColumn} size="sm" variant="outline">
//                         <Plus className="h-4 w-4 mr-2" />
//                         Adicionar
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-3 pt-0">
//                     {editingTable.columns.map((column, index) => (
//                       <div key={column.id} className="border border-border rounded-lg p-3 space-y-3">
//                         {/* Column Header */}
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
//                             {getColumnIcon(column)}
//                             <span className="font-medium text-sm">{index + 1}</span>
//                           </div>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDeleteColumn(column.id)}
//                             disabled={editingTable.columns.length <= 1}
//                             className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
//                           >
//                             <Trash2 className="h-3 w-3" />
//                           </Button>
//                         </div>
//                         {/* Column Name */}
//                         <div className="space-y-1">
//                           <Label className="text-xs">Nome</Label>
//                           <Input
//                             value={column.name}
//                             onChange={(e) => handleColumnUpdate(column.id, { name: e.target.value })}
//                             placeholder="nome_coluna"
//                             className="h-8 font-mono text-sm"
//                           />
//                         </div>
//                         {/* Column Type */}
//                         <div className="space-y-1">
//                           <Label className="text-xs">Tipo</Label>
//                           <Select
//                             value={column.type}
//                             onValueChange={(value: PostgreSQLType) => handleColumnUpdate(column.id, { type: value })}
//                           >
//                             <SelectTrigger className="h-8 text-sm">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {PostgreSQLTypes.map((type) => (
//                                 <SelectItem key={type} value={type} className="font-mono text-sm">
//                                   {type}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>
//                         {/* Column Constraints */}
//                         <div className="grid grid-cols-2 gap-2">
//                           <div className="flex items-center space-x-2">
//                             <Checkbox
//                               id={`${column.id}-pk`}
//                               checked={column.primaryKey}
//                               onCheckedChange={(checked) => handleColumnUpdate(column.id, { primaryKey: !!checked })}
//                             />
//                             <Label htmlFor={`${column.id}-pk`} className="text-xs">
//                               PK
//                             </Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <Checkbox
//                               id={`${column.id}-nullable`}
//                               checked={column.nullable}
//                               onCheckedChange={(checked) => handleColumnUpdate(column.id, { nullable: !!checked })}
//                             />
//                             <Label htmlFor={`${column.id}-nullable`} className="text-xs">
//                               NULL
//                             </Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <Checkbox
//                               id={`${column.id}-unique`}
//                               checked={column.unique}
//                               onCheckedChange={(checked) => handleColumnUpdate(column.id, { unique: !!checked })}
//                             />
//                             <Label htmlFor={`${column.id}-unique`} className="text-xs">
//                               UNIQUE
//                             </Label>
//                           </div>
//                         </div>
//                         {/* Advanced Options */}
//                         {showAdvanced && (
//                           <>
//                             <div className="space-y-2">
//                               <Label className="text-xs">Valor Padrão</Label>
//                               <Input
//                                 value={column.defaultValue || ''}
//                                 onChange={(e) => handleColumnUpdate(column.id, { defaultValue: e.target.value || undefined })}
//                                 placeholder="DEFAULT NULL"
//                                 className="h-8 font-mono text-sm"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-xs">Comentário</Label>
//                               <Input
//                                 value={column.comment || ''}
//                                 onChange={(e) => handleColumnUpdate(column.id, { comment: e.target.value || undefined })}
//                                 placeholder="Descrição da coluna"
//                                 className="h-8 text-sm"
//                               />
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                     {/* Advanced Toggle */}
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setShowAdvanced(!showAdvanced)}
//                       className="w-full text-muted-foreground hover:text-foreground"
//                     >
//                       {showAdvanced ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
//                       {showAdvanced ? 'Ocultar' : 'Mostrar'} Opções Avançadas
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           {/* Aba de visualização de Chaves (sem edição) */}
//           <TabsContent value="keys" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm flex items-center gap-2">
//                       <Key className="h-4 w-4 text-primary" />
//                       Chaves Primárias
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       {table.columns.filter(col => col.primaryKey).map((column) => (
//                         <div key={column.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
//                           <Key className="h-3 w-3 text-primary" />
//                           <span className="font-medium">{column.name}</span>
//                           <Badge variant="secondary" className="text-xs">
//                             {column.type}
//                           </Badge>
//                         </div>
//                       ))}
//                       {table.columns.filter(col => col.primaryKey).length === 0 && (
//                         <p className="text-sm text-muted-foreground">Nenhuma chave primária definida</p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm flex items-center gap-2">
//                       <Link className="h-4 w-4 text-accent" />
//                       Chaves Estrangeiras
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-2">
//                       {table.columns.filter(col => col.foreignKey).map((column) => (
//                         <div key={column.id} className="p-3 bg-muted/30 rounded">
//                           <div className="flex items-center gap-2 mb-1">
//                             <Link className="h-3 w-3 text-accent" />
//                             <span className="font-medium">{column.name}</span>
//                           </div>
//                           {column.foreignKey && (
//                             <div className="text-sm text-muted-foreground">
//                               Referencia: {column.foreignKey.targetTable}.{column.foreignKey.targetColumn}
//                               <div className="flex gap-2 mt-1">
//                                 {column.foreignKey.onDelete && (
//                                   <Badge variant="outline" className="text-xs">
//                                     ON DELETE {column.foreignKey.onDelete}
//                                   </Badge>
//                                 )}
//                                 {column.foreignKey.onUpdate && (
//                                   <Badge variant="outline" className="text-xs">
//                                     ON UPDATE {column.foreignKey.onUpdate}
//                                   </Badge>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                       {table.columns.filter(col => col.foreignKey).length === 0 && (
//                         <p className="text-sm text-muted-foreground">Nenhuma chave estrangeira definida</p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           {/* Aba de visualização de Índices (sem edição) */}
//           <TabsContent value="indexes" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-3">
//                 {(table.indexes || []).map((index) => (
//                   <Card key={index.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <List className="h-4 w-4 text-green-500" />
//                             <h4 className="font-medium text-foreground">{index.name}</h4>
//                             <Badge variant={index.unique ? "default" : "secondary"} className="text-xs">
//                               {index.unique ? "UNIQUE" : index.type.toUpperCase()}
//                             </Badge>
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             Colunas: {index.columns.join(', ')}
//                           </div>
//                           {index.comment && (
//                             <p className="text-sm text-muted-foreground mt-1">{index.comment}</p>
//                           )}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//                 {(table.indexes || []).length === 0 && (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                     <p className="text-sm">Nenhum índice definido</p>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           {/* Aba de visualização de Triggers (sem edição) */}
//           <TabsContent value="triggers" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4 space-y-3">
//                 {(table.triggers || []).map((trigger) => (
//                   <Card key={trigger.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <Zap className="h-4 w-4 text-orange-500" />
//                           <h4 className="font-medium text-foreground">{trigger.name}</h4>
//                           <Badge variant={trigger.enabled ? "default" : "secondary"} className="text-xs">
//                             {trigger.enabled ? "ATIVO" : "INATIVO"}
//                           </Badge>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-2">
//                         <div className="flex gap-2">
//                           <Badge className={cn("text-xs", getTriggerEventColor(trigger.event))}>
//                             {trigger.event}
//                           </Badge>
//                           <Badge variant="outline" className="text-xs">
//                             {trigger.timing}
//                           </Badge>
//                         </div>
                        
//                         <div className="text-sm text-muted-foreground">
//                           <span className="font-medium">Função:</span> {trigger.function}
//                         </div>
                        
//                         {trigger.comment && (
//                           <p className="text-sm text-muted-foreground">{trigger.comment}</p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//                 {(table.triggers || []).length === 0 && (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                     <p className="text-sm">Nenhum trigger definido</p>
//                   </div>
//                 )}
//               </div>
//             </ScrollArea>
//           </TabsContent>

//           {/* Aba de visualização do SQL (sem edição) */}
//           <TabsContent value="sql" className="h-full mt-0">
//             <ScrollArea className="h-full">
//               <div className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm flex items-center gap-2">
//                       <Code className="h-4 w-4" />
//                       DDL da Tabela
//                     </CardTitle>
//                     <CardDescription>
//                       Script SQL para criação da tabela
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="bg-muted/50 p-4 rounded font-mono text-sm">
//                       <pre className="whitespace-pre-wrap">
// {`CREATE TABLE ${table.name} (
// ${table.columns.map(col => {
//   let def = `  ${col.name} ${col.type}`;
//   if (!col.nullable) def += ' NOT NULL';
//   if (col.unique) def += ' UNIQUE';
//   if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
//   return def;
// }).join(',\n')}${table.columns.filter(col => col.primaryKey).length > 0 ? `,
//   PRIMARY KEY (${table.columns.filter(col => col.primaryKey).map(col => col.name).join(', ')})` : ''}
// );

// ${table.comment ? `COMMENT ON TABLE ${table.name} IS '${table.comment}';` : ''}

// ${table.columns.filter(col => col.comment).map(col => 
//   `COMMENT ON COLUMN ${table.name}.${col.name} IS '${col.comment}';`
// ).join('\n')}`}
//                       </pre>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </ScrollArea>
//           </TabsContent>
//         </div>
//       </Tabs>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Table, Column, Trigger, Index, PostgreSQLType, PostgreSQLTypes } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Table as TableIcon, 
  Key, 
  Link, 
  Type, 
  Zap, 
  List,
  Code,
  Plus,
  Trash2,
  Hash,
  GripVertical,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface EnhancedTablePropertiesProps {
  table: Table;
  onTableUpdate: (table: Table) => void;
  onTableDelete?: (tableId: string) => void;
}

export function EnhancedTableProperties({ table, onTableUpdate, onTableDelete }: EnhancedTablePropertiesProps) {
  const [editingTable, setEditingTable] = useState<Table>(table);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [editingIndex, setEditingIndex] = useState<Index | null>(null);
  const [editingTrigger, setEditingTrigger] = useState<Trigger | null>(null);

  useEffect(() => {
    setEditingTable(table);
  }, [table]);

  const handleUpdate = (updatedData: Partial<Table>) => {
    const updated = { ...editingTable, ...updatedData };
    setEditingTable(updated);
    onTableUpdate(updated);
  };

  const handleTableNameChange = (name: string) => {
    handleUpdate({ name });
  };

  const handleTableCommentChange = (comment: string) => {
    handleUpdate({ comment });
  };

  const handleColumnUpdate = (columnId: string, updates: Partial<Column>) => {
    const updatedColumns = editingTable.columns.map(col =>
      col.id === columnId ? { ...col, ...updates } : col
    );
    handleUpdate({ columns: updatedColumns });
  };

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      name: `coluna_${editingTable.columns.length + 1}`,
      type: 'varchar',
      nullable: true,
      primaryKey: false,
      unique: false,
    };
    const updatedColumns = [...editingTable.columns, newColumn];
    handleUpdate({ columns: updatedColumns });
    toast.success('Coluna adicionada');
  };

  const handleDeleteColumn = (columnId: string) => {
    if (editingTable.columns.length <= 1) {
      toast.error('Uma tabela deve ter pelo menos uma coluna');
      return;
    }
    const updatedColumns = editingTable.columns.filter(col => col.id !== columnId);
    handleUpdate({ columns: updatedColumns });
    toast.success('Coluna removida');
  };

  const handleAddIndex = () => {
    setEditingIndex({
      id: uuidv4(),
      name: `idx_${editingTable.name}_${editingTable.indexes?.length ?? 0 + 1}`,
      columns: [],
      unique: false,
      type: 'btree',
    });
  };

  const handleSaveIndex = (index: Index) => {
    let updatedIndexes = editingTable.indexes || [];
    if (editingIndex?.id) {
      updatedIndexes = updatedIndexes.map(idx => idx.id === index.id ? index : idx);
    } else {
      updatedIndexes = [...updatedIndexes, index];
    }
    handleUpdate({ indexes: updatedIndexes });
    setEditingIndex(null);
    toast.success('Índice salvo');
  };

  const handleDeleteIndex = (indexId: string) => {
    const updatedIndexes = (editingTable.indexes || []).filter(idx => idx.id !== indexId);
    handleUpdate({ indexes: updatedIndexes });
    toast.success('Índice removido');
  };

  const handleAddTrigger = () => {
    setEditingTrigger({
      id: uuidv4(),
      name: `trigger_${editingTable.name}_${editingTable.triggers?.length ?? 0 + 1}`,
      event: 'INSERT',
      timing: 'BEFORE',
      function: 'function_name()',
      enabled: true,
    });
  };

  const handleSaveTrigger = (trigger: Trigger) => {
    let updatedTriggers = editingTable.triggers || [];
    if (editingTrigger?.id) {
      updatedTriggers = updatedTriggers.map(trig => trig.id === trigger.id ? trigger : trig);
    } else {
      updatedTriggers = [...updatedTriggers, trigger];
    }
    handleUpdate({ triggers: updatedTriggers });
    setEditingTrigger(null);
    toast.success('Trigger salvo');
  };

  const handleDeleteTrigger = (triggerId: string) => {
    const updatedTriggers = (editingTable.triggers || []).filter(trig => trig.id !== triggerId);
    handleUpdate({ triggers: updatedTriggers });
    toast.success('Trigger removido');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Script SQL copiado!');
    } catch (err) {
      toast.error('Falha ao copiar o script');
    }
  };

  const getColumnIcon = (column: Column) => {
    if (column.primaryKey) return <Key className="h-3 w-3 text-primary" />;
    if (column.foreignKey) return <Link className="h-3 w-3 text-accent" />;
    return <Hash className="h-3 w-3 text-muted-foreground" />;
  };

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

  const generatedSql = `CREATE TABLE ${editingTable.name} (
${editingTable.columns.map(col => {
  let def = `  ${col.name} ${col.type}`;
  if (!col.nullable) def += ' NOT NULL';
  if (col.unique) def += ' UNIQUE';
  if (col.defaultValue) def += ` DEFAULT ${col.defaultValue}`;
  return def;
}).join(',\n')}${editingTable.columns.filter(col => col.primaryKey).length > 0 ? `,
  PRIMARY KEY (${editingTable.columns.filter(col => col.primaryKey).map(col => col.name).join(', ')})` : ''}
);

${editingTable.comment ? `COMMENT ON TABLE ${editingTable.name} IS '${editingTable.comment}';` : ''}

${editingTable.columns.filter(col => col.comment).map(col => 
  `COMMENT ON COLUMN ${editingTable.name}.${col.name} IS '${col.comment}';`
).join('\n')}`;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TableIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">
              {editingTable.name.split('.').pop()}
            </h3>
            <p className="text-sm text-muted-foreground">
              Schema: <span className="font-medium">{editingTable.schema}</span>
            </p>
            {editingTable.comment && (
              <p className="text-sm text-muted-foreground mt-1">{editingTable.comment}</p>
            )}
          </div>
          {onTableDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTableDelete(table.id)}
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
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
              <div className="p-4 space-y-4">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                        <Hash className="h-3 w-3 text-white" />
                      </div>
                      Propriedades da Tabela
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 pt-0">
                    <div className="space-y-2">
                      <Label htmlFor="table-name">Nome da Tabela</Label>
                      <Input
                        id="table-name"
                        value={editingTable.name}
                        onChange={(e) => handleTableNameChange(e.target.value)}
                        placeholder="nome_da_tabela"
                        className="font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="table-comment">Comentário</Label>
                      <Textarea
                        id="table-comment"
                        value={editingTable.comment || ''}
                        onChange={(e) => handleTableCommentChange(e.target.value)}
                        placeholder="Descrição da tabela..."
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-table-primary-key text-primary border-primary/20">
                          {editingTable.columns.filter(c => c.primaryKey).length} PK
                        </Badge>
                        <Badge variant="outline" className="bg-table-foreign-key text-accent border-accent/20">
                          {editingTable.columns.filter(c => c.foreignKey).length} FK
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Colunas ({editingTable.columns.length})
                      </CardTitle>
                      <Button onClick={handleAddColumn} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3 pt-0">
                    {editingTable.columns.map((column, index) => (
                      <div key={column.id} className="border border-border rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            {getColumnIcon(column)}
                            <span className="font-medium text-sm">{index + 1}</span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteColumn(column.id)}
                            disabled={editingTable.columns.length <= 1}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Nome</Label>
                          <Input
                            value={column.name}
                            onChange={(e) => handleColumnUpdate(column.id, { name: e.target.value })}
                            placeholder="nome_coluna"
                            className="h-8 font-mono text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Tipo</Label>
                          <Select
                            value={column.type}
                            onValueChange={(value: PostgreSQLType) => 
                              handleColumnUpdate(column.id, { type: value })
                            }
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PostgreSQLTypes.map((type) => (
                                <SelectItem key={type} value={type} className="font-mono text-sm">
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${column.id}-pk`}
                              checked={column.primaryKey}
                              onCheckedChange={(checked) => 
                                handleColumnUpdate(column.id, { primaryKey: !!checked })
                              }
                            />
                            <Label htmlFor={`${column.id}-pk`} className="text-xs">
                              PK
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${column.id}-nullable`}
                              checked={!column.nullable} // Invertendo para "Not Null"
                              onCheckedChange={(checked) => 
                                handleColumnUpdate(column.id, { nullable: !checked })
                              }
                            />
                            <Label htmlFor={`${column.id}-nullable`} className="text-xs">
                              Not Null
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${column.id}-unique`}
                              checked={column.unique}
                              onCheckedChange={(checked) => 
                                handleColumnUpdate(column.id, { unique: !!checked })
                              }
                            />
                            <Label htmlFor={`${column.id}-unique`} className="text-xs">
                              UNIQUE
                            </Label>
                          </div>
                        </div>

                        {showAdvanced && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-xs">Valor Padrão</Label>
                              <Input
                                value={column.defaultValue || ''}
                                onChange={(e) => handleColumnUpdate(column.id, { defaultValue: e.target.value || undefined })}
                                placeholder="e.g., 'NOW()'"
                                className="h-8 font-mono text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs">Comentário</Label>
                              <Input
                                value={column.comment || ''}
                                onChange={(e) => handleColumnUpdate(column.id, { comment: e.target.value || undefined })}
                                placeholder="Descrição da coluna"
                                className="h-8 text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full text-muted-foreground hover:text-foreground"
                    >
                      {showAdvanced ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                      {showAdvanced ? 'Ocultar' : 'Mostrar'} Opções Avançadas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Aba de visualização de Chaves */}
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
                      {editingTable.columns.filter(col => col.primaryKey).map((column) => (
                        <div key={column.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                          <Key className="h-3 w-3 text-primary" />
                          <span className="font-medium">{column.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {column.type}
                          </Badge>
                        </div>
                      ))}
                      {editingTable.columns.filter(col => col.primaryKey).length === 0 && (
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
                      {editingTable.columns.filter(col => col.foreignKey).map((column) => (
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
                      {editingTable.columns.filter(col => col.foreignKey).length === 0 && (
                        <p className="text-sm text-muted-foreground">Nenhuma chave estrangeira definida</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Aba de edição de Índices */}
          <TabsContent value="indexes" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                <Button onClick={handleAddIndex} size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Índice
                </Button>
                
                {editingIndex && (
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-1">
                        <Label>Nome</Label>
                        <Input
                          value={editingIndex.name}
                          onChange={(e) => setEditingIndex({...editingIndex, name: e.target.value})}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Colunas</Label>
                        <Input
                          value={editingIndex.columns.join(', ')}
                          onChange={(e) => setEditingIndex({...editingIndex, columns: e.target.value.split(',').map(c => c.trim())})}
                          placeholder="coluna_1, coluna_2"
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Tipo</Label>
                        <Select
                          value={editingIndex.type}
                          onValueChange={(value: Index['type']) => setEditingIndex({...editingIndex, type: value})}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="btree">B-Tree</SelectItem>
                            <SelectItem value="hash">Hash</SelectItem>
                            <SelectItem value="gin">GIN</SelectItem>
                            <SelectItem value="gist">GIST</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="unique-index"
                          checked={editingIndex.unique}
                          onCheckedChange={(checked) => setEditingIndex({...editingIndex, unique: !!checked})}
                        />
                        <Label htmlFor="unique-index" className="text-sm">
                          Único
                        </Label>
                      </div>
                      <Button onClick={() => handleSaveIndex(editingIndex)} className="w-full mt-2">Salvar Índice</Button>
                      <Button onClick={() => setEditingIndex(null)} variant="ghost" className="w-full">Cancelar</Button>
                    </CardContent>
                  </Card>
                )}
                
                {(editingTable.indexes || []).map((index) => (
                  <Card key={index.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{index.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={index.unique ? "default" : "secondary"} className="text-xs">
                              {index.unique ? "UNIQUE" : index.type.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => setEditingIndex(index)}><List className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteIndex(index.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Colunas: {index.columns.join(', ')}</p>
                    </CardContent>
                  </Card>
                ))}
                {(editingTable.indexes || []).length === 0 && !editingIndex && (
                  <div className="text-center py-8 text-muted-foreground">
                    <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum índice definido</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Aba de edição de Triggers */}
          <TabsContent value="triggers" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                <Button onClick={handleAddTrigger} size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Trigger
                </Button>
                
                {editingTrigger && (
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-1">
                        <Label>Nome</Label>
                        <Input
                          value={editingTrigger.name}
                          onChange={(e) => setEditingTrigger({...editingTrigger, name: e.target.value})}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Evento</Label>
                        <Select
                          value={editingTrigger.event}
                          onValueChange={(value: Trigger['event']) => setEditingTrigger({...editingTrigger, event: value})}
                        >
                          <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INSERT">INSERT</SelectItem>
                            <SelectItem value="UPDATE">UPDATE</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="TRUNCATE">TRUNCATE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Momento</Label>
                        <Select
                          value={editingTrigger.timing}
                          onValueChange={(value: Trigger['timing']) => setEditingTrigger({...editingTrigger, timing: value})}
                        >
                          <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BEFORE">BEFORE</SelectItem>
                            <SelectItem value="AFTER">AFTER</SelectItem>
                            <SelectItem value="INSTEAD OF">INSTEAD OF</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Função</Label>
                        <Input
                          value={editingTrigger.function}
                          onChange={(e) => setEditingTrigger({...editingTrigger, function: e.target.value})}
                          className="h-8 text-sm"
                        />
                      </div>
                      <Button onClick={() => handleSaveTrigger(editingTrigger)} className="w-full mt-2">Salvar Trigger</Button>
                      <Button onClick={() => setEditingTrigger(null)} variant="ghost" className="w-full">Cancelar</Button>
                    </CardContent>
                  </Card>
                )}

                {(editingTable.triggers || []).map((trigger) => (
                  <Card key={trigger.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <h4 className="font-medium text-foreground">{trigger.name}</h4>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => setEditingTrigger(trigger)}><Zap className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteTrigger(trigger.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex gap-2">
                          <Badge className={cn("text-xs", getTriggerEventColor(trigger.event))}>
                            {trigger.event}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {trigger.timing}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground"><span className="font-medium">Função:</span> {trigger.function}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(editingTable.triggers || []).length === 0 && !editingTrigger && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum trigger definido</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Aba de visualização e cópia do SQL */}
          <TabsContent value="sql" className="h-full mt-0">
            <ScrollArea className="h-full">
              <div className="p-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        <CardTitle className="text-sm">DDL da Tabela</CardTitle>
                      </div>
                      <Button onClick={() => copyToClipboard(generatedSql)} size="sm" variant="ghost">
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                    <CardDescription>
                      Script SQL para criação da tabela
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded font-mono text-sm">
                      <pre className="whitespace-pre-wrap">
                        {generatedSql}
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