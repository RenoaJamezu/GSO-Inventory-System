import QRCode from "react-qr-code";

type QrCardProps = {
  value: string;
  size?: number;
  label?: string;
  onDownload?: () => void;
};

export default function QrCard({
  value,
  size = 120,
  label,
  onDownload,
}: QrCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>
      )}

      <QRCode value={value} size={size} />

      <button
        onClick={onDownload}
        className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-white"
      >
        Download QR
      </button>
    </div>
  );
}
