import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading data...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <Loader2 className="w-10 h-10 text-eco-500 animate-spin mb-4" />
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{message}</p>
    </div>
  );
}
