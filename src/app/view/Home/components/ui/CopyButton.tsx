export function CopyButton({ onCopy }: { onCopy: () => void }) {
  return (
    <button
      onClick={onCopy}
      className="text-xs text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
    >
      Copy
    </button>
  );
}
