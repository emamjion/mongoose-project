import { TStudent } from './student.interface';
import { Student } from './student.model';

/* built in static method in mongoose. */
const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await Student.create(studentData);
  return result;
};

// built in instance method in mongoose.
/*
const createStudentIntoDB = async (studentData: TStudent) => {
  const student = new Student(studentData); // Create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await student.save();
  return result;
};
*/

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

/* using findOne() method to get a specific student.
const getSpecificStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
*/

// using aggregate() method to get a specific student.
const getSpecificStudentsFromDB = async (id: string) => {
  const result = await Student.aggregate([
    {
      $match: { id: id },
    },
  ]);
  return result;
};

// using updateOne() method to delete a specific student.
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSpecificStudentsFromDB,
  deleteStudentFromDB,
};
