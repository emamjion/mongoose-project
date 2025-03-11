import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).max(20, { message: 'First name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  occupation: z.string().min(1, { message: 'Local guardian occupation is required' }),
  address: z.string().min(1, { message: 'Local guardian address is required' }),
  contactNo: z.string().min(1, { message: 'Local guardian contact number is required' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z.string().min(1, { message: 'Father occupation is required' }),
  fatherContactNo: z.string().min(1, { message: 'Father contact number is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z.string().min(1, { message: 'Mother occupation is required' }),
  motherContactNo: z.string().min(1, { message: 'Mother contact number is required' }),
});

const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], { message: 'Gender is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email('Invalid email format'),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z.string().min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z.enum(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'], { message: 'Blood group is required' }).optional(),
  permanentAddress: z.string().min(1, { message: 'Permanent address is required' }),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
