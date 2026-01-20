import User from "../models/User.js";

/* ================= GET PROFILE ================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      profile: user.profile || {},
      documents: user.documents || {}, // 🔥 VERY IMPORTANT
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Profile fetch failed" });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.profile = {
      ...user.profile,
      ...req.body,
    };

    await user.save();

    res.json({ message: "Profile updated" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

/* ================= UPDATE DOCUMENTS ================= */
export const updateDocuments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.documents = {
      ...user.documents,
      ...req.body,
    };

    await user.save();

    res.json({ message: "Documents updated" });
  } catch (error) {
    console.error("Update documents error:", error);
    res.status(500).json({ message: "Documents update failed" });
  }
};