import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
  }),
  middleName: Joi.string().required(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/, "letters")
    .required()
    .messages({
      "any.required": "Last Name is required",
      "string.pattern.base": "{#label} must only contain letters",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only":
      "The gender field can only be one of the following: male, female, or other.",
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
    }),
  contactNo: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ),
  permanentAddress: Joi.string().required(),
  presentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
