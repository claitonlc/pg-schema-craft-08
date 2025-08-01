import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Database } from 'lucide-react';
import { toast } from 'sonner';
import { DatabaseProject } from '@/types/database';

interface ImportProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSQL: (sql: string) => void;
  onLoadProject: (project: DatabaseProject) => void;
}

export function ImportProjectDialog({
  open,
  onOpenChange,
  onImportSQL,
  onLoadProject,
}: ImportProjectDialogProps) {
  const [sqlScript, setSqlScript] = useState('');
  const [savedProjects, setSavedProjects] = useState<DatabaseProject[]>([]);
  const [activeTab, setActiveTab] = useState<'sql' | 'projects'>('sql');

  React.useEffect(() => {
    if (open) {
      loadSavedProjects();
    }
  }, [open]);

  const loadSavedProjects = () => {
    const projects: DatabaseProject[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('db_project_')) {
        try {
          const projectData = localStorage.getItem(key);
          if (projectData) {
            const project = JSON.parse(projectData);
            // Convert date strings back to Date objects
            project.createdAt = new Date(project.createdAt);
            project.updatedAt = new Date(project.updatedAt);
            projects.push(project);
          }
        } catch (error) {
          console.error('Error loading project:', error);
        }
      }
    }
    projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setSavedProjects(projects);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/sql' || file.name.endsWith('.sql')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSqlScript(content);
      };
      reader.readAsText(file);
    } else {
      toast.error('Por favor, selecione um arquivo SQL válido');
    }
  };

  const handleImportSQL = () => {
    if (!sqlScript.trim()) {
      toast.error('Por favor, insira ou carregue um script SQL');
      return;
    }
    onImportSQL(sqlScript);
    onOpenChange(false);
    setSqlScript('');
  };

  const handleLoadProject = (project: DatabaseProject) => {
    onLoadProject(project);
    onOpenChange(false);
  };

  const deleteProject = (projectId: string) => {
    localStorage.removeItem(`db_project_${projectId}`);
    loadSavedProjects();
    toast.success('Projeto removido');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar Projeto
          </DialogTitle>
          <DialogDescription>
            Importe um script SQL do PostgreSQL ou carregue um projeto salvo
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-1 mb-4">
          <Button
            variant={activeTab === 'sql' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('sql')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Script SQL
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-2"
          >
            <Database className="h-4 w-4" />
            Projetos Salvos ({savedProjects.length})
          </Button>
        </div>

        {activeTab === 'sql' && (
          <div className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="sql-file">Carregar arquivo SQL</Label>
              <input
                id="sql-file"
                type="file"
                accept=".sql"
                onChange={handleFileUpload}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="sql-script">Ou cole o script SQL aqui</Label>
              <Textarea
                id="sql-script"
                placeholder={`-- Exemplo de script PostgreSQL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
                value={sqlScript}
                onChange={(e) => setSqlScript(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleImportSQL} disabled={!sqlScript.trim()}>
                <Upload className="h-4 w-4 mr-2" />
                Importar SQL
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            {savedProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum projeto salvo encontrado</p>
                <p className="text-sm">Salve um projeto primeiro para poder carregá-lo aqui</p>
              </div>
            ) : (
              <div className="grid gap-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                {savedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        {project.description && (
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{project.tables.length} tabelas</span>
                          <span>{project.relationships.length} relacionamentos</span>
                          <span>Atualizado: {new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleLoadProject(project)}
                          className="bg-gradient-primary hover:bg-primary-hover"
                        >
                          Carregar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProject(project.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}