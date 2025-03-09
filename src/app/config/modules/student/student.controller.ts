import { Request, Response } from 'express';
import Joi from 'joi';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const userNameSchema = Joi.object({
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

    const localGuardianSchema = Joi.object({
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

    const guardianSchema = Joi.object({
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

    const studentSchema = Joi.object({
      id: Joi.string().trim().required().messages({
        'string.empty': 'Student ID is required',
      }),
      name: userNameSchema.required().messages({
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
      guardian: guardianSchema.required().messages({
        'any.required': 'Guardian information is required',
      }),
      localGuardian: localGuardianSchema.required().messages({
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

    const { student: studentData } = await req.body;

    const { error, value } = studentSchema.validate(studentData);
    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: 'Students are retrieved sucessfully',
    data: result,
  });
};

const getSpecificStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSpecificStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSpecificStudent,
};
