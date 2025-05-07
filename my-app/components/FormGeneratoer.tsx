import { FieldType } from "@/@types/index.types";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";

type FormGeneratorProps = {
  field: FieldType;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  formvalue?: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
  valueMultiSelect?: string[];
};

const FormGenerator: React.FC<FormGeneratorProps> = ({
  field,
  register,
  formvalue,
  onChange,
  defaultValue,
  valueMultiSelect,
}) => {
  const { name, fieldType, label, disabled, placeholder, options } = field;

  const getSelectedItems = (
    options: { label: string; value: string }[],
    valueMultiSelect: string[] = []
  ) => {
    return options.filter((option) => valueMultiSelect.includes(option.value));
  };
  return (
    <div className="grid gap-2">
      {label && <label htmlFor={name}>{label}</label>}
      {fieldType === "text" && (
        <Input
          id={name}
          type="text"
          className="!h-12 shadow-none"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}
      {fieldType === "number" && (
        <Input
          id={name}
          type="number"
          className="!h-12 shadow-none placeholder:!text-muted-foreground"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}

      {fieldType === "number" && (
        <Input
          id={name}
          type="number"
          className="!h-12 shadow-none placeholder:!text-muted-foreground"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}

      {fieldType === "currency" && (
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500 dark:text-gray-400">
            $
          </span>
          <Input
            id={name}
            type="text"
            className="!h-12 shadow-none placeholder:!text-muted-foreground pl-9"
            disabled={disabled}
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            {...(register(name),
            {
              onChange: (e) => {
                const rawValue = e.target.value
                  ? e.target.value.replace(/\D/g, "")
                  : "";
                const formattedValue = rawValue
                  ? new Intl.NumberFormat().format(Number(rawValue))
                  : "";
                e.target.value = formattedValue;
              },
              setValueAs: (value) => {
                if (typeof value === "string" || typeof value === "number") {
                  const cleanedValue = String(value).replace(/\D/g, "");
                  return cleanedValue ? Number(cleanedValue) : null;
                }
                return null;
              },
            })}
          />
        </div>
      )}

      {fieldType === "phone" && (
        <Input
          id={name}
          type="number"
          className="!h-12 shadow-none placeholder:!text-muted-foreground"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}
    </div>
  );
};

export default FormGenerator;
