export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="w-full p-3 bg-green-600 text-white rounded"
    >
      {children}
    </button>
  );
}