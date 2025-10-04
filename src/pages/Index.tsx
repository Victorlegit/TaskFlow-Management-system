import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useTheme } from '@/hooks/useTheme';
import { Task, TaskStatus } from '@/types/task';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from '@/components/TaskColumn';
import { TaskDialog } from '@/components/TaskDialog';
import { StatsPanel } from '@/components/StatsPanel';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Plus, Moon, Sun, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Index = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask, getStats } = useTasks();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tasksByStatus = {
    todo: filteredTasks.filter((t) => t.status === 'todo'),
    inProgress: filteredTasks.filter((t) => t.status === 'inProgress'),
    completed: filteredTasks.filter((t) => t.status === 'completed'),
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Move task to new status
    moveTask(draggableId, destination.droppableId as TaskStatus);
    toast.success('Task moved successfully');
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      toast.success('Task updated successfully');
    } else {
      addTask(taskData);
      toast.success('Task created successfully');
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success('Task deleted');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </motion.div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button onClick={handleAddTask} className="gap-2">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <StatsPanel stats={getStats()} />

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TaskColumn
              status="todo"
              tasks={tasksByStatus.todo}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              status="inProgress"
              tasks={tasksByStatus.inProgress}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              status="completed"
              tasks={tasksByStatus.completed}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </DragDropContext>
      </main>

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default Index;
