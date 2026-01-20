import Activity from "../models/Activity.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const activities = await Activity.find({ user: userId });

    /* ================= METRICS ================= */
    const totalFields = new Set(activities.map(a => a.field)).size;
    const totalArea = activities.reduce((s, a) => s + (a.area || 0), 0);
    const activeCrops = new Set(activities.map(a => a.crop)).size;
    const totalYield = activities.reduce((s, a) => s + (a.yield || 0), 0);

    /* ================= CROP DISTRIBUTION ================= */
    const cropDistribution = Object.values(
      activities.reduce((acc, a) => {
        if (!a.crop || !a.area) return acc;
        acc[a.crop] = acc[a.crop] || { name: a.crop, value: 0 };
        acc[a.crop].value += a.area;
        return acc;
      }, {})
    );

    /* ================= MONTHLY YIELD ================= */
    const monthlyYield = Object.values(
      activities.reduce((acc, a) => {
        if (!a.date) return acc;
        const month = new Date(a.date).toLocaleString("default", { month: "short" });
        acc[month] = acc[month] || { month, yield: 0 };
        acc[month].yield += a.yield || 0;
        return acc;
      }, {})
    );

    /* ================= CROP-WISE YIELD ================= */
    const cropWiseYield = Object.values(
      activities.reduce((acc, a) => {
        if (!a.crop) return acc;
        acc[a.crop] = acc[a.crop] || { crop: a.crop, yield: 0 };
        acc[a.crop].yield += a.yield || 0;
        return acc;
      }, {})
    );

    /* ================= SEASONAL TIMELINE ================= */
    const seasonalTimeline = Object.values(
      activities.reduce((acc, a) => {
        if (!a.date) return acc;
        const month = new Date(a.date).toLocaleString("default", { month: "short" });
        acc[month] = acc[month] || { month, count: 0 };
        acc[month].count += 1;
        return acc;
      }, {})
    );

    /* ================= FIELD TABLE ================= */
    /* ================= FIELD TABLE ================= */
    // Sort chronologically to determine current state
    activities.sort((a, b) => new Date(a.date) - new Date(b.date));

    const fields = Object.values(
      activities.reduce((acc, a) => {
        if (!a.field) return acc;

        // Initialize or retrieve existing field entry
        if (!acc[a.field]) {
          acc[a.field] = {
            field: a.field,
            crop: a.crop,
            area: 0,
            status: 'Active',
            health: 'Good' // Default
          };
        }

        // Update Crop: Recent activity defines the current crop
        acc[a.field].crop = a.crop;

        // Update Area: Only if provided (prevents zeroing out by Irrigation/etc)
        if (a.area && a.area > 0) {
          acc[a.field].area = a.area;
        }

        // Derive Status from Activity Type
        if (a.activityType === 'Sowing') acc[a.field].status = 'Planted';
        else if (a.activityType === 'Harvest') acc[a.field].status = 'Harvested';
        else acc[a.field].status = 'Growing';

        return acc;
      }, {})
    );

    res.json({
      metrics: {
        totalFields,
        totalArea,
        activeCrops,
        totalYield
      },
      cropDistribution,
      monthlyYield,
      cropWiseYield,
      seasonalTimeline,
      fields
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};