import bcrypt from 'bcrypt';
import { model } from 'mongoose';
import config from '../../config';
import { StudentModel, TStudent } from './student.interface';
import { studentSchema } from './student.schema';

// pre save middleware / hook in mongoose : will work on create() function and save() function.
studentSchema.pre('save', function () {
  // console.log(this, 'pre save hook : we will save the data');
  const user = this;
  // Hasing the password and save it to the Database.
  bcrypt.hash(user.password, Number(config.BCRYPT_SALT_ROUNDS), function () {});
});

// post save middleware / hook in mongoose
studentSchema.post('save', function () {
  console.log(this, 'post save hook : data saved successfully');
});

// Creating a custom istance method in mongoose.
/*
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
*/

// Creating a static instance method in mongoose.
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
