import { Schema } from 'mongoose';
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First name can not be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameValue === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    // validate : {
    //   validator : (value : string) => validator.isAlpha(value),
    //   message : '{VALUE} is not valid'
    // }
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local guardian occupation is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local guardian address is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local guardian contact number is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact number is required'],
  },
});

export const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, trim: true, required: true, unique: true },
  password: {
    type: String,
    trim: true,
    required: [true, 'Paswword is required'],
    unique: true,
    maxlength: [20, 'Password can not be more than 20 characters.'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
    trim: true,
    required: [true, 'Date of Birth is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    // validate : {
    //   validator : (value : string) => validator.isEmail(value),
    //   message : '{VALUE} is not a valid email type'
    // }
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    trim: true,
    enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, 'Permanent address is required'],
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'Present address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian information is required'],
  },
  profileImg: { type: String, trim: true },
  isActive: {
    type: String,
    trim: true,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});
