import { Schema } from 'mongoose';

const needHelpMongooseSchema = new Schema (
    { 
    email:{
        type: String,
        required: [true, 'missing required email field'],

    },
    comment:{
        type: String,
        minLength: 10,
        maxLength: 300,
        required: [true, 'missing required comment field'],

    },

},
{
    versionKey: false,
    timestamps: true,
}
)

export default needHelpMongooseSchema;