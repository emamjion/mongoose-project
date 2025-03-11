import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = await req.body;

    const { error, value } = studentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log('Error in student controller: ', error);
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
