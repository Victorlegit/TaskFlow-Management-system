import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const columnConfig = {
  todo: {
    title: 'To Do',
    icon: ListTodo,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/50',
  },
  inProgress: {
    title: 'In Progress',
    icon: Clock,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  completed: {
    title: 'Completed',
    icon: CheckCircle2,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
};

export const TaskColumn = ({ status, tasks, onEditTask, onDeleteTask }: TaskColumnProps) => {
  const config = columnConfig[status];
  const Icon = config.icon;
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col h-full min-w-[320px]">
      {/* Column Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${config.bgColor}`}
      >
        <Icon className={`h-5 w-5 ${config.color}`} />
        <h2 className="font-semibold text-foreground">{config.title}</h2>
        <span className="ml-auto text-sm font-medium text-muted-foreground bg-background/50 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </motion.div>

      {/* Droppable Area */}
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`flex-1 space-y-3 p-3 rounded-lg border-2 border-dashed transition-colors min-h-[200px] ${
            isOver
              ? 'border-primary bg-primary/5'
              : 'border-border/50 bg-muted/20'
          }`}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
          
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
              No tasks yet
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};
