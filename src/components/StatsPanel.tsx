import { TaskStats } from '@/types/task';
import { motion } from 'framer-motion';
import { ListTodo, Clock, CheckCircle2, Target } from 'lucide-react';

interface StatsPanelProps {
  stats: TaskStats;
}

const statCards = [
  { key: 'total', label: 'Total Tasks', icon: Target, color: 'text-foreground', bgColor: 'bg-muted' },
  { key: 'todo', label: 'To Do', icon: ListTodo, color: 'text-muted-foreground', bgColor: 'bg-muted/50' },
  { key: 'inProgress', label: 'In Progress', icon: Clock, color: 'text-primary', bgColor: 'bg-primary/10' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, color: 'text-success', bgColor: 'bg-success/10' },
];

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const value = stats[card.key as keyof TaskStats];
        
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg p-4 ${card.bgColor} border border-border/50 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {value}
                </p>
              </div>
              <Icon className={`h-10 w-10 ${card.color} opacity-50`} />
            </div>
            
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-full blur-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
};
