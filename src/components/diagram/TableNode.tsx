// import React, { memo } from 'react';
// import { Handle, Position } from '@xyflow/react';
// import { Table, Column } from '@/types/database';
// import { Badge } from '@/components/ui/badge';
// import { Key, Link, Hash } from 'lucide-react';
// import { cn } from '@/lib/utils';

// interface TableNodeProps {
//   data: Table;
//   isConnectable: boolean;
//   selected?: boolean;
// }

// const TableNode = memo(({ data, isConnectable, selected }: TableNodeProps) => {
//   const primaryKeys = data.columns.filter(col => col.primaryKey);
//   const foreignKeys = data.columns.filter(col => col.foreignKey);

//   const getColumnIcon = (column: Column) => {
//     if (column.primaryKey) return <Key className="h-3 w-3 text-primary" />;
//     if (column.foreignKey) return <Link className="h-3 w-3 text-accent" />;
//     return <Hash className="h-3 w-3 text-muted-foreground" />;
//   };

//   const getColumnBadgeColor = (column: Column) => {
//     if (column.primaryKey) return 'bg-table-primary-key text-primary border-primary/20';
//     if (column.foreignKey) return 'bg-table-foreign-key text-accent border-accent/20';
//     return 'bg-muted text-muted-foreground border-border';
//   };

//   return (
//     <div className={cn(
//       "table-node bg-table-background border-2 border-table-border rounded-lg min-w-[280px] shadow-table",
//       selected && "border-primary ring-2 ring-primary/20"
//     )}>
//       {/* Table Header */}
//       <div className="bg-table-header px-4 py-3 rounded-t-lg border-b border-table-border">
//         <div className="flex items-center justify-between">
//           <h3 className="font-semibold text-foreground text-sm">{data.name}</h3>
//           <div className="flex gap-1">
//             {primaryKeys.length > 0 && (
//               <Badge variant="outline" className="h-5 text-xs bg-table-primary-key text-primary border-primary/20">
//                 PK
//               </Badge>
//             )}
//             {foreignKeys.length > 0 && (
//               <Badge variant="outline" className="h-5 text-xs bg-table-foreign-key text-accent border-accent/20">
//                 FK
//               </Badge>
//             )}
//           </div>
//         </div>
//         {data.comment && (
//           <p className="text-xs text-muted-foreground mt-1">{data.comment}</p>
//         )}
//       </div>

//       {/* Table Columns */}
//       <div className="divide-y divide-table-border">
//         {data.columns.map((column) => (
//           <div 
//             key={column.id}
//             className={cn(
//               "px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors",
//               column.primaryKey && "bg-table-primary-key/20",
//               column.foreignKey && "bg-table-foreign-key/20"
//             )}
//           >
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               {getColumnIcon(column)}
//               <span className="font-medium text-sm text-foreground truncate">
//                 {column.name}
//               </span>
//               {!column.nullable && (
//                 <span className="text-xs text-destructive font-medium">*</span>
//               )}
//             </div>
            
//             <div className="flex items-center gap-2 ml-2">
//               <Badge 
//                 variant="outline" 
//                 className={cn("text-xs h-5", getColumnBadgeColor(column))}
//               >
//                 {column.type}
//               </Badge>
              
//               {column.unique && (
//                 <Badge variant="outline" className="text-xs h-5 bg-warning/10 text-warning border-warning/20">
//                   U
//                 </Badge>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Connection Handles */}
//       <Handle
//         type="target"
//         position={Position.Left}
//         isConnectable={isConnectable}
//         className="w-3 h-3 bg-primary border-2 border-background"
//       />
//       <Handle
//         type="source"
//         position={Position.Right}
//         isConnectable={isConnectable}
//         className="w-3 h-3 bg-primary border-2 border-background"
//       />
//       <Handle
//         type="target"
//         position={Position.Top}
//         isConnectable={isConnectable}
//         className="w-3 h-3 bg-primary border-2 border-background"
//       />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         isConnectable={isConnectable}
//         className="w-3 h-3 bg-primary border-2 border-background"
//       />
//     </div>
//   );
// });

// TableNode.displayName = 'TableNode';

// export default TableNode;

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Table, Column } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { Key, Link, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableNodeProps {
  data: Table;
  isConnectable: boolean;
  selected?: boolean;
}

const TableNode = memo(({ data, isConnectable, selected }: TableNodeProps) => {
  const primaryKeys = data.columns.filter(col => col.primaryKey);
  const foreignKeys = data.columns.filter(col => col.foreignKey);

  const getColumnIcon = (column: Column) => {
    if (column.primaryKey) return <Key className="h-3 w-3 text-primary" />;
    if (column.foreignKey) return <Link className="h-3 w-3 text-accent" />;
    return <Hash className="h-3 w-3 text-muted-foreground" />;
  };

  const getColumnBadgeColor = (column: Column) => {
    if (column.primaryKey) return 'bg-table-primary-key text-primary border-primary/20';
    if (column.foreignKey) return 'bg-table-foreign-key text-accent border-accent/20';
    return 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className={cn(
      "table-node bg-table-background border-2 border-table-border rounded-lg min-w-[280px] shadow-table",
      selected && "border-primary ring-2 ring-primary/20"
    )}>
      {/* Table Header */}
      <div className="bg-table-header px-4 py-3 rounded-t-lg border-b border-table-border">
        {/* Adicione min-w-0 para garantir que o truncamento do nome da tabela funcione corretamente */}
        <div className="flex items-center justify-between min-w-0">
          <h3 className="font-semibold text-foreground text-sm truncate">{data.name}</h3>
          <div className="flex gap-1">
            {primaryKeys.length > 0 && (
              <Badge variant="outline" className="h-5 text-xs bg-table-primary-key text-primary border-primary/20">
                PK
              </Badge>
            )}
            {foreignKeys.length > 0 && (
              <Badge variant="outline" className="h-5 text-xs bg-table-foreign-key text-accent border-accent/20">
                FK
              </Badge>
            )}
          </div>
        </div>
        {data.comment && (
          <p className="text-xs text-muted-foreground mt-1">{data.comment}</p>
        )}
      </div>

      {/* Table Columns */}
      <div className="divide-y divide-table-border">
        {data.columns.map((column) => (
          <div 
            key={column.id}
            className={cn(
              "px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors",
              column.primaryKey && "bg-table-primary-key/20",
              column.foreignKey && "bg-table-foreign-key/20"
            )}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {getColumnIcon(column)}
              <span className="font-medium text-sm text-foreground truncate">
                {column.name}
              </span>
              {!column.nullable && (
                <span className="text-xs text-destructive font-medium">*</span>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-2">
              <Badge 
                variant="outline" 
                className={cn("text-xs h-5", getColumnBadgeColor(column))}
              >
                {column.type}
              </Badge>
              
              {column.unique && (
                <Badge variant="outline" className="text-xs h-5 bg-warning/10 text-warning border-warning/20">
                  U
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background"
      />
    </div>
  );
});

TableNode.displayName = 'TableNode';

export default TableNode;