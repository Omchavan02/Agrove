import Activity from "../models/Activity.js";


const cleanNumber = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  return Number(String(value).replace(/[^0-9.]/g, ""));
};


/* =====================================================
   CREATE ACTIVITY
===================================================== */
export const createActivity = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("Authentication failed: req.user is undefined");
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.user.id;

    console.log('Received request body:', req.body);

    const {
      activityType,
      field,
      crop,
      date,
      priority,
      completed,

      location,
      weather,
      temperature,
      humidity,

      seedType,
      seedQuantity,
      sowingMethod,
      area,

      waterAmount,
      irrigationMethod,

      productName,
      dosage,
      reason,

      yield: yieldValue,
      yieldUnit,
      yieldDisplay,
      qualityGrade,
      marketPrice,

      notes
    } = req.body;
    // 🔢 SAFE NUMBER CONVERSION


    // 🔒 Basic validation
    if (!activityType || !field || !crop || !date) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    // 🚜 Harvest rules
    let finalYield = undefined;
    let finalYieldUnit = undefined;
    let finalYieldDisplay = undefined;

    if (activityType === "Harvest") {
      finalYield = Number(yieldValue) || 0;
      finalYieldUnit = yieldUnit || "kg";
      finalYieldDisplay =
        yieldDisplay || `${finalYield} ${finalYieldUnit}`;
    }

    // 🌱 Area allowed only for Sowing & Harvest
    let finalArea = undefined;
    console.log('Original area from request:', area);
    if (activityType === "Sowing" || activityType === "Harvest") {
      finalArea = area ? Number(area) : undefined;
      console.log('Final area for Sowing/Harvest:', finalArea);
    } else {
      console.log('Activity type is', activityType, '- area will be undefined');
    }



    const activity = await Activity.create({
      user: userId,

      activityType,
      field,
      crop,
      date,
      priority,
      completed,

      location,
      weather,
      temperature: cleanNumber(temperature),
      humidity: cleanNumber(humidity),

      seedType,
      seedQuantity: cleanNumber(seedQuantity),
      sowingMethod,
      area: finalArea,

      waterAmount: cleanNumber(waterAmount),
      irrigationMethod,

      productName,
      dosage,
      reason,

      yield: finalYield,
      yieldUnit: finalYieldUnit,
      yieldDisplay: finalYieldDisplay,
      qualityGrade,
      marketPrice: cleanNumber(marketPrice),

      notes
    });

    console.log('Activity saved to database:', activity);


    res.status(201).json(activity);
  } catch (error) {
    console.error("Create activity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   GET ALL ACTIVITIES (USER-SCOPED)
===================================================== */
export const getActivities = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      console.error("Authentication failed: req.user is undefined");
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.user.id;

    const activities = await Activity.find({ user: userId })
      .sort({ date: -1 });

    res.json(activities);
  } catch (error) {
    console.error("Get activities error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* =====================================================
   UPDATE ACTIVITY
===================================================== */
export const updateActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const activity = await Activity.findOne({
      _id: id,
      user: userId
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    Object.assign(activity, req.body);

    // 🚜 Recalculate Harvest Yield Display
    if (activity.activityType === "Harvest") {
      // Ensure yield is a number
      if (req.body.yield !== undefined) {
        activity.yield = Number(req.body.yield);
      }

      // Update display string if yield changed
      const yVal = activity.yield || 0;
      const yUnit = activity.yieldUnit || "kg";
      activity.yieldDisplay = `${yVal} ${yUnit}`;
    }

    // Re-apply rules
    if (activity.activityType !== "Harvest") {
      activity.yield = undefined;
      activity.yieldUnit = undefined;
      activity.yieldDisplay = undefined;
    }

    if (
      activity.activityType !== "Sowing" &&
      activity.activityType !== "Harvest"
    ) {
      activity.area = undefined;
    }

    await activity.save();

    res.json(activity);
  } catch (error) {
    console.error("Update activity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   DELETE ACTIVITY (HARD DELETE)
===================================================== */
export const deleteActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const activity = await Activity.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Delete activity error:", error);
    res.status(500).json({ message: "Server error" });
  }
};