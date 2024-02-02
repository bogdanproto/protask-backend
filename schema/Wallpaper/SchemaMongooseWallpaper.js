import { Schema } from 'mongoose';

const SchemaMongooseWallpaper = new Schema(
  {
    desktopCloudURL: {
      type: String,
      required: [true, 'desktopCloudURL is required'],
    },
    tabletCloudURL: {
      type: String,
      required: [true, 'tabletCloudURL is required'],
    },
    mobileCloudURL: {
      type: String,
      required: [true, 'mobileCloudURL is required'],
    },
    iconCloudURL: {
      type: String,
      required: [true, 'iconCloudURL is required'],
    },
  },
  { timestamps: true }
);

export default SchemaMongooseWallpaper;
