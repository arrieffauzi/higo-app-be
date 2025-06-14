import { Document, Schema, model } from "mongoose";

// 1. Define the TypeScript interface
export interface IMock extends Document {
  number: number;
  name_of_location: string;
  date: string;
  login_hour: string;
  name: string;
  birthYear: number;
  gender: string;
  email: string;
  phone: string;
  brand_device: string;
  digital_interest: string;
  location_type: string;
}

// 2. Create the Mongoose schema
const mockSchema: Schema = new Schema<IMock>({
  number: { type: Number, required: true },
  name_of_location: { type: String, required: true },
  date: { type: String, required: true },
  login_hour: { type: String, required: true },
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  brand_device: { type: String, required: true },
  digital_interest: { type: String, required: true },
  location_type: { type: String, required: true },
});

// 3. Export the model
export const Mock = model<IMock>("Mock", mockSchema);