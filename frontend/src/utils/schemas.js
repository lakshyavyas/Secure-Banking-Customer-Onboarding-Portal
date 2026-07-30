import { z } from "zod";

// --- AUTH SERVICE SCHEMAS ---

// Login Request Validation
export const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

// Reusable Password Rule (Used in Register & Reset Password)
const strongPassword = z
  .string()
  .nonempty("Password is required")
  .min(8, "Password must be between 8 and 20 characters")
  .max(20, "Password must be between 8 and 20 characters")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
    "Password must contain uppercase, lowercase, number and special character",
  );

// --- CHANGE PASSWORD SCHEMA --- Abhishek

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty("Current password is required"),
    newPassword: strongPassword,
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"], // Connects error message to the newPassword field
  });

// Customer & Employee Registration Schema
export const registrationSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(4, "Username must be between 4 and 20 characters")
    .max(20, "Username must be between 4 and 20 characters"),
  password: strongPassword,
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  newPassword: strongPassword,
});

// --- CUSTOMER PROFILE SERVICE SCHEMA ---

export const customerProfileSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be between 2 and 30 characters")
    .max(30, "First name must be between 2 and 30 characters")
    .regex(/^[A-Za-z ]+$/, "First name should contain only letters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be between 2 and 30 characters")
    .max(30, "Last name must be between 2 and 30 characters")
    .regex(/^[A-Za-z ]+$/, "Last name should contain only letters"),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  mobile: z
    .string()
    .nonempty("Mobile number is required")
    .regex(
      /^[6-9]\d{9}$/,
      "Mobile number must be 10 digits and start with 6-9",
    ),
  dateOfBirth: z
    .string()
    .nonempty("Date of birth is required")
    .refine((val) => new Date(val) < new Date(), {
      message: "Date of birth must be in the past",
    }),
  gender: z
    .string()
    .nonempty("Gender is required")
    .refine((val) => ["Male", "Female", "Other"].includes(val), {
      message: "Gender must be Male, Female or Other",
    }),
});

// --- KYC SERVICE SCHEMA ---

export const kycSchema = z.object({
  aadhaarNumber: z
    .string()
    .nonempty("Aadhaar Number is required")
    .regex(/^\d{12}$/, "Aadhaar Number must contain exactly 12 digits"),
  panNumber: z
    .string()
    .nonempty("PAN Number is required")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN Number"),
  address: z
    .string()
    .nonempty("Address is required")
    .min(10, "Address must be between 10 and 250 characters")
    .max(250, "Address must be between 10 and 250 characters"),
});

// --- ACCOUNT SERVICE SCHEMA ---

export const openAccountSchema = z.object({
  accountType: z.string().nonempty("Account type is required"),
});
