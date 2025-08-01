import { useState, useCallback } from 'react';
import { Table, Column, DatabaseProject, PostgreSQLType } from '@/types/database';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export function useDatabaseProject() {
  const [project, setProject] = useState<DatabaseProject>({
    id: uuidv4(),
    name: 'Novo Projeto',
    description: 'Diagrama de banco PostgreSQL',
    tables: [],
    relationships: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const updateProject = useCallback((updates: Partial<DatabaseProject>) => {
    setProject(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  }, []);

  const addTable = useCallback(() => {
    const newTable: Table = {
      id: uuidv4(),
      name: `tabela_${project.tables.length + 1}`,
      schema: 'public',
      comment: 'Nova tabela',
      columns: [
        {
          id: uuidv4(),
          name: 'id',
          type: 'serial',
          nullable: false,
          primaryKey: true,
          unique: false,
        }
      ],
      triggers: [],
      indexes: [],
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 300 + 100 
      },
    };

    const updatedTables = [...project.tables, newTable];
    updateProject({ tables: updatedTables });
    setSelectedTable(newTable);
    return newTable;
  }, [project.tables, updateProject]);

  const updateTable = useCallback((updatedTable: Table) => {
    const updatedTables = project.tables.map(table =>
      table.id === updatedTable.id ? updatedTable : table
    );
    updateProject({ tables: updatedTables });
    
    // Update selected table if it's the one being updated
    if (selectedTable?.id === updatedTable.id) {
      setSelectedTable(updatedTable);
    }
  }, [project.tables, selectedTable, updateProject]);

  const deleteTable = useCallback((tableId: string) => {
    const updatedTables = project.tables.filter(table => table.id !== tableId);
    updateProject({ tables: updatedTables });
    
    // Clear selection if deleted table was selected
    if (selectedTable?.id === tableId) {
      setSelectedTable(null);
    }
    
    toast.success('Tabela removida');
  }, [project.tables, selectedTable, updateProject]);

  const exportDDL = useCallback(() => {
    let ddl = '-- PostgreSQL Database Schema\n';
    ddl += `-- Generated on ${new Date().toLocaleString()}\n\n`;

    // Create tables first
    project.tables.forEach(table => {
      ddl += `-- Table: ${table.name}\n`;
      if (table.comment) {
        ddl += `-- ${table.comment}\n`;
      }
      ddl += `CREATE TABLE ${table.name} (\n`;

      const columnDefinitions = table.columns.map(column => {
        let def = `  ${column.name} ${column.type}`;
        
        if (!column.nullable) def += ' NOT NULL';
        if (column.unique) def += ' UNIQUE';
        if (column.defaultValue) def += ` DEFAULT ${column.defaultValue}`;
        
        return def;
      });

      ddl += columnDefinitions.join(',\n');

      // Add primary key constraint
      const primaryKeys = table.columns.filter(col => col.primaryKey);
      if (primaryKeys.length > 0) {
        ddl += `,\n  PRIMARY KEY (${primaryKeys.map(pk => pk.name).join(', ')})`;
      }

      ddl += '\n);\n\n';

      // Add column comments
      table.columns.forEach(column => {
        if (column.comment) {
          ddl += `COMMENT ON COLUMN ${table.name}.${column.name} IS '${column.comment}';\n`;
        }
      });

      if (table.comment) {
        ddl += `COMMENT ON TABLE ${table.name} IS '${table.comment}';\n`;
      }

      ddl += '\n';
    });

    // Add foreign key constraints from relationships
    if (project.relationships && project.relationships.length > 0) {
      ddl += '-- Foreign Key Constraints\n';
      project.relationships.forEach((rel, index) => {
        if (rel.data?.sourceTable && rel.data?.targetTable && rel.data.type === 'foreign_key') {
          const constraintName = `fk_${rel.data.sourceTable}_${rel.data.targetTable}_${index + 1}`;
          ddl += `ALTER TABLE ${rel.data.targetTable} ADD CONSTRAINT ${constraintName} `;
          ddl += `FOREIGN KEY (${rel.data.sourceTable}_id) REFERENCES ${rel.data.sourceTable}(id);\n`;
        }
      });
      ddl += '\n';
    }

    // Create and download file
    const blob = new Blob([ddl], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_').toLowerCase()}.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('SQL exportado com sucesso');
  }, [project]);

  const saveProject = useCallback(() => {
    const projectData = JSON.stringify(project, null, 2);
    localStorage.setItem(`db_project_${project.id}`, projectData);
    toast.success('Projeto salvo localmente');
  }, [project]);

  const updateRelationships = useCallback((relationships: any[]) => {
    updateProject({ relationships });
  }, [updateProject]);

  const loadProject = useCallback((newProject: DatabaseProject) => {
    setProject(newProject);
    setSelectedTable(null);
    toast.success('Projeto carregado com sucesso');
  }, []);

  const parsePostgreSQLScript = useCallback((sql: string) => {
    try {
      const tables: Table[] = [];
      const relationships: any[] = [];
      
      // Clean and prepare the SQL content
      const lines = sql.split('\n').map(line => line.trim());
      const sqlContent = lines.join('\n');
      
      // Extract schemas (for reference, but we'll include schema name in table names)
      const schemas = new Set<string>();
      const schemaMatches = sqlContent.matchAll(/CREATE\s+SCHEMA\s+"?([^"\s;]+)"?\s*;/gi);
      for (const match of schemaMatches) {
        schemas.add(match[1]);
      }
      
      // Parse CREATE TABLE statements with schema support
      const tableMatches = sqlContent.matchAll(/CREATE\s+TABLE\s+"?([^"\s.]+)"?\."?([^"\s(]+)"?\s*\(\s*([\s\S]*?)\)\s*(?:WITH\s*\([^)]*\))?\s*;/gi);
      
      for (const match of tableMatches) {
        const [, schema, tableName, tableContent] = match;
        const fullTableName = `${schema}.${tableName}`;
        
        // Parse columns from table content
        const columns: Column[] = [];
        const columnLines = tableContent.split('\n').map(line => line.trim()).filter(line => line);
        
        for (const line of columnLines) {
          // Skip constraint definitions and other non-column lines
          if (line.startsWith('CONSTRAINT') || line.startsWith('ALTER') || line.startsWith('PRIMARY KEY') || !line.includes('"')) {
            continue;
          }
          
          // Match column definition with quoted names
          const columnMatch = line.match(/^"([^"]+)"\s+([^,\s]+(?:\([^)]*\))?|\w+)\s*(.*?)(?:,\s*)?$/i);
          if (columnMatch) {
            const [, columnName, dataType, constraints = ''] = columnMatch;
            
            // Clean and map data types
            let cleanType = dataType.toLowerCase().replace(/\s+/g, ' ').trim();
            
            // Handle type variants
            const typeMapping: { [key: string]: PostgreSQLType } = {
              'bigserial': 'bigserial',
              'serial': 'serial',
              'smallserial': 'smallserial',
              'bigint': 'bigint',
              'integer': 'integer',
              'int': 'integer',
              'smallint': 'smallint',
              'text': 'text',
              'varchar': 'varchar',
              'character varying': 'varchar',
              'char': 'char',
              'character': 'char',
              'boolean': 'boolean',
              'bool': 'boolean',
              'timestamp': 'timestamp',
              'timestamptz': 'timestamp with time zone',
              'timestamp with time zone': 'timestamp with time zone',
              'timestamp without time zone': 'timestamp',
              'date': 'date',
              'time': 'time',
              'real': 'real',
              'numeric': 'numeric',
              'decimal': 'numeric',
              'double precision': 'double precision',
              'xml': 'xml',
              'json': 'json',
              'jsonb': 'jsonb',
              'uuid': 'uuid'
            };
            
            // Handle types with precision/scale like VARCHAR(255), NUMERIC(15,2)
            const typeWithParams = cleanType.match(/^(\w+)(\([^)]+\))?/);
            const baseType = typeWithParams ? typeWithParams[1] : cleanType;
            
            const mappedType = typeMapping[baseType] || 'text';
            const finalType: PostgreSQLType = typeWithParams && typeWithParams[2] 
              ? `${mappedType}${typeWithParams[2]}` as PostgreSQLType
              : mappedType;
            
            // Parse constraints
            const constraintsLower = constraints.toLowerCase();
            const nullable = !constraintsLower.includes('not null');
            const primaryKey = constraintsLower.includes('primary key') || mappedType.includes('serial');
            const unique = constraintsLower.includes('unique');
            
            // Extract default value
            let defaultValue: string | undefined;
            const defaultMatch = constraints.match(/DEFAULT\s+((?:[^,\s]+(?:\s+[^,\s]+)*|'[^']*'|\([^)]*\)))/i);
            if (defaultMatch) {
              defaultValue = defaultMatch[1].replace(/'/g, '');
            }
            
            // Extract CHECK constraints for comments
            const checkMatch = constraints.match(/CONSTRAINT\s+"[^"]*"\s+CHECK\s*\(([^)]+)\)/i);
            const comment = checkMatch ? `Check: ${checkMatch[1]}` : '';
            
            columns.push({
              id: uuidv4(),
              name: columnName,
              type: finalType,
              nullable,
              primaryKey,
              unique,
              defaultValue,
              comment
            });
          }
        }
        
        // Add table with schema prefix
        tables.push({
          id: uuidv4(),
          name: fullTableName,
          schema: schema,
          comment: `Tabela do schema ${schema}`,
          columns,
          triggers: [],
          indexes: [],
          position: { 
            x: Math.random() * 400 + 100, 
            y: Math.random() * 400 + 100 
          }
        });
      }
      
      // Parse foreign key relationships from ALTER TABLE statements
      const foreignKeyMatches = sqlContent.matchAll(/ALTER\s+TABLE\s+"?([^"\s.]+)"?\."?([^"\s]+)"?\s+ADD\s+CONSTRAINT\s+"([^"]+)"\s+FOREIGN\s+KEY\s*\(\s*"([^"]+)"\s*\)\s+REFERENCES\s+"?([^"\s.]+)"?\."?([^"\s]+)"?\s*\(\s*"([^"]+)"\s*\)/gi);
      
      for (const match of foreignKeyMatches) {
        const [, sourceSchema, sourceTable, constraintName, sourceColumn, targetSchema, targetTable, targetColumn] = match;
        
        const sourceTableName = `${sourceSchema}.${sourceTable}`;
        const targetTableName = `${targetSchema}.${targetTable}`;
        
        // Find the tables
        const sourceTableObj = tables.find(t => t.name === sourceTableName);
        const targetTableObj = tables.find(t => t.name === targetTableName);
        
        if (sourceTableObj && targetTableObj) {
          relationships.push({
            id: uuidv4(),
            type: 'smoothstep',
            source: sourceTableObj.id,
            target: targetTableObj.id,
            sourceHandle: `${sourceTableObj.id}-${sourceColumn}`,
            targetHandle: `${targetTableObj.id}-${targetColumn}`,
            data: {
              sourceTable: sourceTableName,
              targetTable: targetTableName,
              sourceColumn,
              targetColumn,
              constraintName,
              type: 'foreign_key'
            }
          });
        }
      }
      
      if (tables.length === 0) {
        toast.error('Nenhuma tabela válida encontrada no script SQL');
        return;
      }
      
      // Extract project name from comments if available
      const projectNameMatch = sqlContent.match(/Project:\s*([^\r\n]+)/i);
      const projectName = projectNameMatch ? projectNameMatch[1].trim() : 'Projeto Toad Modeler';
      
      // Extract description from model name
      const modelMatch = sqlContent.match(/Model:\s*([^\r\n]+)/i);
      const description = modelMatch 
        ? `Modelo: ${modelMatch[1].trim()}` 
        : 'Projeto importado do Toad Modeler 7.3';
      
      // Create new project with imported tables and relationships
      const newProject: DatabaseProject = {
        id: uuidv4(),
        name: projectName,
        description,
        tables,
        relationships,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      loadProject(newProject);
      toast.success(`Importado: ${tables.length} tabela(s) e ${relationships.length} relacionamento(s)`);
      
    } catch (error) {
      console.error('Error parsing Toad Modeler SQL:', error);
      toast.error('Erro ao analisar o script do Toad Modeler. Verifique a sintaxe e tente novamente.');
    }
  }, [loadProject]);

  return {
    project,
    selectedTable,
    setSelectedTable,
    updateProject,
    addTable,
    updateTable,
    deleteTable,
    exportDDL,
    saveProject,
    updateRelationships,
    loadProject,
    parsePostgreSQLScript,
  };
}