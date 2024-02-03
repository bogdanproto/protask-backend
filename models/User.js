import { model } from 'mongoose';

import { handleSaveError, addUpdateSettings } from './hooks.js';
import { SchemaMongooseUser } from '../schemas/User/mongoose/index.js';

SchemaMongooseUser.post('save', handleSaveError);
SchemaMongooseUser.pre('findOneAndUpdate', addUpdateSettings);
SchemaMongooseUser.post('findOneAndUpdate', handleSaveError);

const User = model('user', SchemaMongooseUser);

export default User;
