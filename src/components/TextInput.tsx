import { useCallback } from "react";

type Props = {
  label: string;
  value: string;
  validateMessage?: string;
  placeHolder?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};

function TextInput({
  label,
  value,
  validateMessage,
  placeHolder = "",
  setValue,
  disabled = false,
}: Props) {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) {
        const value = event.target.value;
        setValue(value);
      }
    },
    [setValue]
  );
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 my-2">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
        ${(!value || validateMessage) && "border-red-500"}`}
        type="text"
        placeholder={placeHolder}
        onChange={handleOnChange}
        value={value || ""}
        disabled={disabled}
      />

      {value ? null : (
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      )}
      {!validateMessage ? null : (
        <p className="text-red-500 text-xs italic">{validateMessage}</p>
      )}
    </div>
  );
}

export default TextInput;
