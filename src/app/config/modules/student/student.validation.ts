import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(new RegExp('^[A-Z][a-z]*$'))
    .messages({
      'string.empty': 'First Name is required',
      'string.max': 'First name can not be more than 20 characters',
      'string.pattern.base': 'First name must start with a capital letter',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp('^[A-Za-z]+$'))
    .messages({
      'string.empty': 'Last Name is required',
      'string.pattern.base': 'Last Name is not valid',
    }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian occupation is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian address is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Local guardian contact number is required',
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Mother contact number is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string()
    .trim()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'string.empty': 'Gender is required',
      'any.only': '{#value} is not a valid gender',
    }),
  dateOfBirth: Joi.string().trim().required().messages({
    'string.empty': 'Date of Birth is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': '{#value} is not a valid email type',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .trim()
    .valid('A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImg: Joi.string().trim().allow(''),
  isActive: Joi.string()
    .trim()
    .valid('active', 'blocked')
    .default('active')
    .messages({
      'any.only': '{#value} is not a valid status',
    }),
});

export default studentValidationSchema;
