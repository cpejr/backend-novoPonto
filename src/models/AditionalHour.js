import mongoose from "mongoose";
import { castToObjectIdFields } from "../utils/modelsFunctions";

const AditionalHourSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "members",
      required: true,
    },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: false, versionKey: false }
);

AditionalHourSchema.virtual("member", {
  ref: "members", // The model to use
  localField: "memberId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true,
});

AditionalHourSchema.statics.findByDateRangeWithDuration = function (
  match,
  { startDate, endDate }
) {
  const newMatch = { ...match };
  
  castToObjectIdFields(newMatch, ["memberId", "_id"])

  if (startDate || endDate) {
    const start = {};
    if (startDate) start["$gte"] = startDate;
    if (endDate) start["$lte"] = endDate;

    newMatch.date = start;
  }
  
  return this.aggregate([
    {
      $match: newMatch,
    },
    {
      $addFields: {
        duration: { $subtract: ["$end", "$start"] },
      },
    },
  ]);
};

AditionalHourSchema.statics.getAllMembersSessions = function (
  match,
  { startDate, endDate }
) {
  const newMatch = { ...match };

  if (startDate || endDate) {
    const start = {};
    if (startDate) start["$gte"] = startDate;
    if (endDate) start["$lte"] = endDate;

    newMatch.start = start;
  }

  return this.aggregate([
    {
      $match: newMatch,
    },
    {
      $addFields: {
        duration: { $subtract: ["$end", "$start"] },
      },
    },
  ]);
};

const AditionalHourModel = mongoose.model(
  "aditionalHours",
  AditionalHourSchema
);

export default AditionalHourModel;
