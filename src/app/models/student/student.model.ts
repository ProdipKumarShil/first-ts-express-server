import { Schema, model } from "mongoose";
import validator from "validator";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethod,
  StudentModel,
  TUserName,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, "First name is required"] },
  middleName: { type: String, required: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    validate: {
      validator: (value) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const localGuardian = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, "password is required"],
    unique: true,
    maxlength: [20, "Password can not be more than 20 characters"],
  },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "{VALUE} is not defined The gender field can only be one of the following 'male' 'female' or 'other'.",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "{VALUE} is not valid email",
    },
  },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardian, required: true },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

// pre save middleware hook : will work on create() save()
studentSchema.pre("save", async function (next) {
  // console.log(this, 'pre hook: we will save the data')

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;
  // hashing password and save into DB
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware hook
studentSchema.post("save", function () {
  console.log(this, "post hook: we saved our data");
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExist = async function(id: string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
