"use client";

export const TextInput = ({
  placeholder,
  onChange,
  label,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type="text"
        id="first_name"
        className="bg-zinc-800 border border-zinc-700 text-gray-300 text-sm rounded-lg focus:outline-none focus:ring-0 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};
