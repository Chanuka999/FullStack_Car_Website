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
    </div>
  );
};

export default FormGenerator;
