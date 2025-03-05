import { model } from 'mongoose';
import { Student } from './student.interface';
import { studentSchema } from './student.schema';

export const StudentModel = model<Student>('Student', studentSchema);
