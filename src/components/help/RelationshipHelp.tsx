import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, ArrowRight, MousePointer, Link } from 'lucide-react';

interface RelationshipHelpProps {
  onClose?: () => void;
}

export function RelationshipHelp({ onClose }: RelationshipHelpProps) {
  return (
    <Card className="w-80 bg-card border border-border shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Info className="h-4 w-4 text-primary" />
          Como criar relacionamentos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MousePointer className="h-3 w-3 text-accent" />
            <span className="font-medium">Passo 1:</span>
          </div>
          <p className="text-muted-foreground text-xs ml-5">
            Arraste do <Badge variant="secondary" className="text-xs">handle</Badge> de uma tabela para outra
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link className="h-3 w-3 text-accent" />
            <span className="font-medium">Passo 2:</span>
          </div>
          <p className="text-muted-foreground text-xs ml-5">
            O sistema criará automaticamente a foreign key
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-3 w-3 text-accent" />
            <span className="font-medium">Exemplo:</span>
          </div>
          <div className="ml-5 space-y-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-mono bg-muted px-1 rounded">clientes</span> → <span className="font-mono bg-muted px-1 rounded">pedidos</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Criará: <span className="font-mono text-primary">clientes_id</span> em pedidos
            </p>
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            💡 Os handles aparecem quando você move o mouse sobre as tabelas
          </p>
        </div>

        {onClose && (
          <Button 
            onClick={onClose} 
            variant="outline" 
            size="sm" 
            className="w-full mt-3"
          >
            Entendi
          </Button>
        )}
      </CardContent>
    </Card>
  );
}