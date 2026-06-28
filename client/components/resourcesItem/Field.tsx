import CopyClip from "./CopyClip";

interface FieldProps {
  label: string;
  value: string;
  copy?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, value, copy }) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
    <div className="flex gap-2">
      <input value={value} readOnly className="h-9 text-center text-neutral-800 dark:text-neutral-300 border rounded-sm w-full outline-none shadow-lg" />
      {copy && <CopyClip copyClip={value} />}
    </div>
  </div>
);

export default Field