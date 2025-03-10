import { TaskList } from '@/components/shared/TaskList';

export const HomePage = () => {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task list</h1>
      <TaskList />
    </main>
  );
};

export default HomePage;
