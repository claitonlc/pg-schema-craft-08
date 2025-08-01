import React, { useCallback, useRef, useState, useMemo } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  ConnectionMode,
  Node,
  Edge,
  Connection,
  ReactFlowProvider,
  useReactFlow,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './TableNode';
import { Table } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Plus, Download, Save, Settings, Info } from 'lucide-react';
import { toast } from 'sonner';
import { RelationshipHelp } from '@/components/help/RelationshipHelp';

const nodeTypes = {
  table: TableNode,
};

interface DiagramCanvasProps {
  tables: Table[];
  onTableSelect?: (table: Table | null) => void;
  relationships?: any[];
  onUpdateRelationships?: (relationships: any[]) => void;
  showHelp?: boolean;
  onCloseHelp?: () => void;
}

const DiagramCanvasInner = ({ 
  tables, 
  onTableSelect, 
  relationships = [],
  onUpdateRelationships,
  showHelp = false,
  onCloseHelp
}: DiagramCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Convert tables to nodes
  const initialNodes: Node[] = useMemo(() => 
    tables.map((table) => ({
      id: table.id,
      type: 'table',
      position: table.position,
      data: table,
      draggable: true,
    })), [tables]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(relationships || []);

  // Update nodes when tables change
  React.useEffect(() => {
    const newNodes = tables.map((table) => ({
      id: table.id,
      type: 'table',
      position: table.position,
      data: table,
      draggable: true,
    }));
    setNodes(newNodes);
  }, [tables, setNodes]);

  const onConnect = useCallback((params: Connection) => {
    if (params.source && params.target && params.source !== params.target) {
      // Find source and target tables
      const sourceTable = tables.find(t => t.id === params.source);
      const targetTable = tables.find(t => t.id === params.target);
      
      if (sourceTable && targetTable) {
        // Add relationship info to the connection data
        const newEdge = {
          ...params,
          type: 'smoothstep',
          style: { stroke: 'hsl(var(--relationship-line))', strokeWidth: 2 },
          markerEnd: {
            type: 'arrowclosed',
            color: 'hsl(var(--relationship-line))',
          },
          data: {
            sourceTable: sourceTable.name,
            targetTable: targetTable.name,
            type: 'foreign_key'
          }
        };
        
        setEdges((eds) => {
          const updatedEdges = addEdge(newEdge, eds);
          onUpdateRelationships?.(updatedEdges);
          return updatedEdges;
        });
        toast.success(`Relacionamento criado: ${sourceTable.name} → ${targetTable.name}`);
      }
    }
  }, [setEdges, tables]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'table') {
      onTableSelect?.(node.data as unknown as Table);
    }
  }, [onTableSelect]);

  const onPaneClick = useCallback(() => {
    onTableSelect?.(null);
  }, [onTableSelect]);

  return (
    <div className="w-full h-full diagram-canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-gradient-canvas"
        proOptions={{ hideAttribution: true }}
      >
        <Controls 
          className="bg-card border border-border shadow-lg rounded-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--canvas-grid))"
          className="diagram-grid"
        />

        {/* Help Panel */}
        {showHelp && (
          <Panel position="top-right" className="m-4">
            <RelationshipHelp onClose={onCloseHelp} />
          </Panel>
        )}

        {/* Bottom Panel with Status */}
        <Panel position="bottom-right" className="m-4">
          <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-lg px-3 py-2 text-xs text-muted-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="font-medium">PostgreSQL Editor</span>
              <span className="text-border">•</span>
              <span>{tables.length} tabela{tables.length !== 1 ? 's' : ''}</span>
              <span className="text-border">•</span>
              <span>{edges.length} relacionamento{edges.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

const DiagramCanvas = (props: DiagramCanvasProps) => (
  <ReactFlowProvider>
    <DiagramCanvasInner {...props} />
  </ReactFlowProvider>
);

export default DiagramCanvas;