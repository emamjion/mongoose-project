import bcrypt from 'bcrypt';
import { model } from 'mongoose';
import config from '../../config';
import { StudentModel, TStudent } from './student.interface';
import { studentSchema } from './student.schema';

// pre save middleware / hook in mongoose : will work on create() function and save() function.
studentSchema.pre('save', async function (next) {
  const user = this; // refer to document.
  // Hasing the password and save it to the Database.
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );

  next();
});

// post save middleware / hook in mongoose
studentSchema.post('save', function (doc, next) {
  doc.password = '**********'; // Hiding the password from the response.
  next();
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Creating a custom istance method in mongoose.
/*
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
*/

// Using virtual() in mongoose.
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Creating a static instance method in mongoose.
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
