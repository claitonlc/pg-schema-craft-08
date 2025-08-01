import React, { useState } from 'react';
import { Table, Column, PostgreSQLTypes, PostgreSQLType } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  Key, 
  Link, 
  Hash,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TablePropertiesProps {
  table: Table;
  onTableUpdate: (table: Table) => void;
  onTableDelete?: (tableId: string) => void;
}

export function TableProperties({ table, onTableUpdate, onTableDelete }: TablePropertiesProps) {
  const [editingTable, setEditingTable] = useState<Table>(table);
  const [showAdvanced, setShowAdvanced] = useState(false);

  React.useEffect(() => {
    setEditingTable(table);
  }, [table]);

  const handleTableNameChange = (name: string) => {
    const updated = { ...editingTable, name };
    setEditingTable(updated);
    onTableUpdate(updated);
  };

  const handleTableCommentChange = (comment: string) => {
    const updated = { ...editingTable, comment };
    setEditingTable(updated);
    onTableUpdate(updated);
  };

  const handleColumnUpdate = (columnId: string, updates: Partial<Column>) => {
    const updatedColumns = editingTable.columns.map(col =>
      col.id === columnId ? { ...col, ...updates } : col
    );
    const updated = { ...editingTable, columns: updatedColumns };
    setEditingTable(updated);
    onTableUpdate(updated);
  };

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `col_${Date.now()}`,
      name: `coluna_${editingTable.columns.length + 1}`,
      type: 'varchar',
      nullable: true,
      primaryKey: false,
      unique: false,
    };
    
    const updated = { 
      ...editingTable, 
      columns: [...editingTable.columns, newColumn] 
    };
    setEditingTable(updated);
    onTableUpdate(updated);
    toast.success('Coluna adicionada');
  };

  const handleDeleteColumn = (columnId: string) => {
    if (editingTable.columns.length <= 1) {
      toast.error('Uma tabela deve ter pelo menos uma coluna');
      return;
    }

    const updatedColumns = editingTable.columns.filter(col => col.id !== columnId);
    const updated = { ...editingTable, columns: updatedColumns };
    setEditingTable(updated);
    onTableUpdate(updated);
    toast.success('Coluna removida');
  };

  const getColumnIcon = (column: Column) => {
    if (column.primaryKey) return <Key className="h-3 w-3 text-primary" />;
    if (column.foreignKey) return <Link className="h-3 w-3 text-accent" />;
    return <Hash className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className="w-full max-w-md border-l border-border bg-card h-full overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6">
        {/* Table Info */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                <Hash className="h-3 w-3 text-white" />
              </div>
              Propriedades da Tabela
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Columns */}
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
          
          <CardContent className="space-y-3">
            {editingTable.columns.map((column, index) => (
              <div key={column.id} className="border border-border rounded-lg p-3 space-y-3">
                {/* Column Header */}
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

                {/* Column Name */}
                <div className="space-y-1">
                  <Label className="text-xs">Nome</Label>
                  <Input
                    value={column.name}
                    onChange={(e) => handleColumnUpdate(column.id, { name: e.target.value })}
                    placeholder="nome_coluna"
                    className="h-8 font-mono text-sm"
                  />
                </div>

                {/* Column Type */}
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

                {/* Column Constraints */}
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
                      checked={column.nullable}
                      onCheckedChange={(checked) => 
                        handleColumnUpdate(column.id, { nullable: !!checked })
                      }
                    />
                    <Label htmlFor={`${column.id}-nullable`} className="text-xs">
                      NULL
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

                {/* Advanced Options */}
                {showAdvanced && (
                  <>
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Valor Padrão</Label>
                      <Input
                        value={column.defaultValue || ''}
                        onChange={(e) => handleColumnUpdate(column.id, { defaultValue: e.target.value || undefined })}
                        placeholder="DEFAULT NULL"
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

            {/* Advanced Toggle */}
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
    </div>
  );
}