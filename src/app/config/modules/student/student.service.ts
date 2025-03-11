import { Student } from './student.interface';
import { StudentModel } from './student.model';

/* built in static method in mongoose.
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
*/

// built in instance method in mongoose.
const createStudentIntoDB = async (studentData: Student) => {
  const student = new StudentModel(studentData);
  const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSpecificStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSpecificStudentsFromDB,
};
