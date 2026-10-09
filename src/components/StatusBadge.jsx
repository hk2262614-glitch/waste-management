export default function StatusBadge({ status }) {
  const styles = {
    Completed: 'bg-eco-100 dark:bg-eco-900/30 text-eco-700 dark:text-eco-400 ring-eco-500/20',
    'In Progress': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 ring-amber-500/20',
    Pending: 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 ring-gray-500/20',
    Active: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 ring-blue-500/20',
    Critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 ring-red-500/20',
  };

  const dotColors = {
    Completed: 'bg-eco-500',
    'In Progress': 'bg-amber-500',
    Pending: 'bg-gray-400',
    Active: 'bg-blue-500',
    Critical: 'bg-red-500 animate-pulse',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
        styles[status] || styles.Pending
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status] || dotColors.Pending}`}></span>
      {status}
    </span>
  );
}
