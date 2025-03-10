import Board from '@/components/pages/Board';

export const HomePage = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Task list</h1>
      <Board />
    </main>
  );
};

export default HomePage;
