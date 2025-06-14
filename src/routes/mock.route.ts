import express, { Request, Response, Router } from "express";
import { Mock } from "../models/mock.mongo";

const routerMock = Router();
const router = routerMock;

// Get data with pagination
router.post("/mock/get-list", async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, filters = {} } = req.body;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Mock.find(filters).skip(skip).limit(limit),
      Mock.countDocuments(filters),
    ]);

    const response = {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    res.json({ code: 200, message: "ok", data: response });
  } catch (error) {
    console.error("Fetch mock error:", error);
    res.status(500).json({ error: "Failed to fetch mock data" });
  }
});

// Get summary data
router.get("/mock/summary", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();

  try {
    const [genderSummary, locationSummary, ageSummary] = await Promise.all([
      Mock.aggregate([
        {
          $match: {
            gender: { $ne: null },
          },
        },
        {
          $group: {
            _id: { $toLower: "$gender" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            gender: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ]),
      Mock.aggregate([
        {
          $group: {
            _id: "$location_type",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            locationType: "$_id",
            count: 1,
            _id: 0,
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),
      Mock.aggregate([
        {
          $project: {
            age: { $subtract: [currentYear, "$birth_year"] },
          },
        },
        {
          $group: {
            _id: null,
            minAge: { $min: "$age" },
            maxAge: { $max: "$age" },
            avgAge: { $avg: "$age" },
          },
        },
        {
          $project: {
            _id: 0,
            minAge: 1,
            maxAge: 1,
            avgAge: { $round: ["$avgAge", 2] },
          },
        },
      ]),
    ]);

    const response = {
      genderSummary,
      locationSummary,
      ageSummary: ageSummary[0] ?? { minAge: 0, maxAge: 0, avgAge: 0 },
    };

    res.json({ code: 200, message: "ok", data: response });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

export { routerMock };
