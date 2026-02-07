export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-charcoal/60">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-rose-gold">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="progress-fill h-full bg-gradient-to-r from-rose-gold to-burgundy rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
