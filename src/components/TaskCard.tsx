import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

const categoryColors = {
  work: 'bg-primary/10 text-primary border-primary/20',
  personal: 'bg-accent/10 text-accent border-accent/20',
  urgent: 'bg-destructive/10 text-destructive border-destructive/20',
  ideas: 'bg-warning/10 text-warning border-warning/20',
};

export const TaskCard = ({ task, onEdit, onDelete, isDragging }: TaskCardProps) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-card rounded-lg p-4 shadow-md hover:shadow-lg border border-border/50 backdrop-blur-sm transition-all ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
      
      <div className="relative space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
            {task.title}
          </h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.description}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {task.category && (
            <Badge variant="outline" className={categoryColors[task.category]}>
              <Tag className="h-3 w-3 mr-1" />
              {task.category}
            </Badge>
          )}
          
          {task.dueDate && (
            <Badge
              variant="outline"
              className={
                isOverdue
                  ? 'bg-destructive/10 text-destructive border-destructive/20'
                  : 'bg-muted text-muted-foreground'
              }
            >
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(task.dueDate), 'MMM dd')}
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
};
