import { FieldType } from "@/@types/index.types";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { PhoneInput } from "./ui/phone-input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import MultipleSelector from "./ui/multi-select";

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
    options: { key?: string; label: string; value: string }[],
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
            {...register(name, {
              onChange: (e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formattedValue = rawValue
                  ? new Intl.NumberFormat().format(Number(rawValue))
                  : "";
                e.target.value = formattedValue;
              },
              setValueAs: (value) => {
                if (typeof value === "string" || typeof value === "number") {
                  const cleaned = String(value).replace(/\D/g, "");
                  return cleaned ? Number(cleaned) : null;
                }
                return null;
              },
            })}
          />
        </div>
      )}

      {fieldType === "phone" && (
        <PhoneInput
          id={name}
          className="phone-input !h-12"
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          onChange={(value) => onChange?.(value)}
        />
      )}

      {fieldType === "textarea" && (
        <Textarea
          id={name}
          className="!h-24"
          disabled={disabled}
          placeholder={placeholder || label}
          defaultValue={defaultValue}
          {...register(name)}
        />
      )}

      {fieldType === "select" && (
        <Select
          value={formvalue || ""}
          onValueChange={(value) => onChange?.(value)}
          disabled={disabled || options?.length === 0}
        >
          <SelectTrigger className="w-full !h-12 shadow-none data-[placeholder]:text-muted-foreground">
            <SelectValue placeholder={placeholder || `Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options?.length === 0 && (
              <p className="text-center text-sm text-muted-foreground leading-10">
                No options found
              </p>
            )}
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {fieldType === "multiselect" && options && (
        <MultipleSelector
          options={options}
          placeholder={placeholder || `Select ${label}`}
          disabled={disabled}
          className="w-full !min-h-12 shadow-none"
          badgeClassName="bg-primary/10 shadow-none text-black !font-medium"
          value={getSelectedItems(options, valueMultiSelect)}
          onChange={(selectedItems) => {
            const selectedValues = selectedItems.map((item) => item.value);
            onChange?.(selectedValues);
          }}
          emptyIndicator={
            <p className="text-center text-sm text-muted-foreground leading-10">
              No options found
            </p>
          }
        />
      )}
    </div>
  );
};

export default FormGenerator;
