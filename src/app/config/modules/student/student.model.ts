import { model } from 'mongoose';
import { StudentModel, TStudent } from './student.interface';
import { studentSchema } from './student.schema';


// Creating a custom istance method in mongoose.
/*
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
*/

// Creating a static instance method in mongoose.
studentSchema.statics.isUserExists = async function (id : string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
