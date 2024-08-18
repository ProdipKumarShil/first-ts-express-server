import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(/^[a-zA-Z]+$/, { message: "Last name must contain only letters" }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father name is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father contact number is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father occupation is required" }),
  motherName: z.string().min(1, { message: "Mother name is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother contact number is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother occupation is required" }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: "Local guardian name is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});

const studentValidationSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: "Email must be a valid email address" }),
  contactNo: z.string().min(1, { message: "Contact number is required" }),
  emergencyContact: z
    .string()
    .min(1, { message: "Emergency contact is required" }),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  permanentAddress: z
    .string()
    .min(1, { message: "Permanent address is required" }),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean()
});

export default studentValidationSchema;
