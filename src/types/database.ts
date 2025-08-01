export interface Column {
  id: string;
  name: string;
  type: PostgreSQLType;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: ForeignKey;
  unique: boolean;
  defaultValue?: string;
  comment?: string;
}

export interface Trigger {
  id: string;
  name: string;
  event: 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE';
  timing: 'BEFORE' | 'AFTER' | 'INSTEAD OF';
  function: string;
  enabled: boolean;
  comment?: string;
}

export interface Index {
  id: string;
  name: string;
  columns: string[];
  unique: boolean;
  type: 'btree' | 'hash' | 'gin' | 'gist';
  comment?: string;
}

export interface ForeignKey {
  targetTable: string;
  targetColumn: string;
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
}

export interface Table extends Record<string, unknown> {
  id: string;
  name: string;
  schema: string;
  comment?: string;
  columns: Column[];
  triggers?: Trigger[];
  indexes?: Index[];
  position: { x: number; y: number };
}

export interface Schema {
  name: string;
  tables: Table[];
  color?: string;
}

export interface Relationship {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  data?: {
    sourceTable: string;
    targetTable: string;
    type: 'foreign_key' | 'one-to-one' | 'one-to-many' | 'many-to-many';
  };
}

export interface DatabaseProject {
  id: string;
  name: string;
  description?: string;
  tables: Table[];
  relationships: Relationship[];
  createdAt: Date;
  updatedAt: Date;
}

export type PostgreSQLType = 
  // Numeric types
  | 'smallint' | 'integer' | 'bigint' | 'decimal' | 'numeric' | 'real' | 'double precision'
  | 'smallserial' | 'serial' | 'bigserial'
  // Character types
  | 'character varying' | 'varchar' | 'character' | 'char' | 'text'
  // Binary types
  | 'bytea'
  // Date/time types
  | 'timestamp' | 'timestamp with time zone' | 'date' | 'time' | 'time with time zone'
  | 'interval'
  // Boolean type
  | 'boolean'
  // Geometric types
  | 'point' | 'line' | 'lseg' | 'box' | 'path' | 'polygon' | 'circle'
  // Network address types
  | 'cidr' | 'inet' | 'macaddr' | 'macaddr8'
  // Bit string types
  | 'bit' | 'bit varying'
  // Text search types
  | 'tsvector' | 'tsquery'
  // UUID type
  | 'uuid'
  // XML type
  | 'xml'
  // JSON types
  | 'json' | 'jsonb'
  // Arrays
  | 'integer[]' | 'text[]' | 'varchar[]'
  // Range types
  | 'int4range' | 'int8range' | 'numrange' | 'tsrange' | 'tstzrange' | 'daterange';

export const PostgreSQLTypes: PostgreSQLType[] = [
  // Numeric
  'integer', 'bigint', 'smallint', 'decimal', 'numeric', 'real', 'double precision',
  'serial', 'bigserial', 'smallserial',
  // Text
  'varchar', 'text', 'char',
  // Date/Time
  'timestamp', 'timestamp with time zone', 'date', 'time', 'interval',
  // Boolean
  'boolean',
  // JSON
  'json', 'jsonb',
  // UUID
  'uuid',
  // Arrays
  'integer[]', 'text[]', 'varchar[]',
  // Network
  'inet', 'cidr',
  // Binary
  'bytea'
];