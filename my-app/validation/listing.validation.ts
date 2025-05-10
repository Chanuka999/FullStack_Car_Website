import {
  CAR_BODY_TYPE_OPTIONS,
  CAR_BRAND_OPTIONS,
  CAR_COLOR_OPTIONS,
  CAR_CONDITION_OPTIONS,
  CAR_DRIVETRAIN_OPTIONS,
  CAR_FUELTYPE_OPTIONS,
  CAR_KEY_FEATURES_OPTIONS,
  CAR_MODEL_OPTIONS,
  CAR_SECOND_CONDITION_OPTIONS,
  CAR_TRANSMISSION_OPTIONS,
  CAR_YEAR_OPTIONS,
} from "@/constants/car-options";
import { z } from "zod";

const createEnum = (options: { value: string }[], fieldName: string) => {
  const values = options.map((item) => item.value);
  if (values.length === 0) {
    throw new Error(`No options found for ${fieldName}`);
  }
  return z.enum([values[0], ...values.slice(1)], {
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: `please select a valid ${fieldName}` };
      }
      return { message: ctx.defaultError };
    },
  });
};

const CarBrandEnum = createEnum(CAR_BRAND_OPTIONS, "brand");
const CarModelEnum = createEnum(CAR_MODEL_OPTIONS, "model");
const CarYearEnum = createEnum(CAR_YEAR_OPTIONS, "year");
const CarColorEnum = createEnum(CAR_COLOR_OPTIONS, "exteriorColor");
const CarConditionEnum = createEnum(CAR_CONDITION_OPTIONS, "condition");
const CarSecondConditionEnum = createEnum(
  CAR_SECOND_CONDITION_OPTIONS,
  "secondCondition"
);
const CarTransmitionEnum = createEnum(CAR_TRANSMISSION_OPTIONS, "transmition");
const CarFuelTypeEnum = createEnum(CAR_FUELTYPE_OPTIONS, "fuelType");
const CarKeyFeacturesEnum = createEnum(CAR_KEY_FEATURES_OPTIONS, "keyFeatures");
const CarBodyTypeEnum = createEnum(CAR_BODY_TYPE_OPTIONS, "bodyType");
const CarDrivetrainEnum = createEnum(CAR_DRIVETRAIN_OPTIONS, "drivertrain");

export const listingSchema = z.object({
  brand: CarBrandEnum,
  model: CarModelEnum,
  yearOfManufacture: CarYearEnum,
  exteriorColor: CarColorEnum,
  interiorColor: CarColorEnum.optional(),
  condition: CarConditionEnum,
  secondCondition: z.array(CarSecondConditionEnum).optional(),
  mileage: z.string().optional(),
  transmission: CarTransmitionEnum,
  fuelType: CarFuelTypeEnum,
  keyFeatures: z.array(CarKeyFeacturesEnum).optional(),
  vin: z.string().optional(),
  bodyType: CarBodyTypeEnum,
  drivetrain: CarDrivetrainEnum,
  seatingCapacity: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(1, "Price is required"),
  imageUrls: z.array(z.string()).min(3, "At least 3 images required"),
});

export const listingBackendSchema = listingSchema.extend({
  shopId: z
    .string({
      required_error: "shop ID is required",
    })
    .min(1),
  displayTitle: z
    .string({
      required_error: "Display title is required",
    })
    .min(1, "display title is required"),
  contactPhone: z
    .string({
      required_error: "contact phone is required",
    })
    .min(1, "contact phone is required"),
});
