import express from "express";
const router = express.Router();

// Store visibility status for multiple forms
let formVisibility = {
  sportsForm: true,
  presidentForm: true,
  facultyForm: true,
  // Add more forms as needed
};

// GET route to get visibility status of all forms
router.get("/", (req, res) => {
  res.json(formVisibility);
});

// GET route to get visibility of a specific form
router.get("/:formName", (req, res) => {
  const { formName } = req.params;
  if (formVisibility[formName] === undefined) {
    return res.status(404).json({ message: `Form "${formName}" not found` });
  }
  res.json({ [formName]: formVisibility[formName] });
});

// POST route to update visibility of a specific form
router.post("/:formName", (req, res) => {
  const { formName } = req.params;
  const { showForm } = req.body;

  if (typeof showForm !== "boolean") {
    return res.status(400).json({ message: "showForm should be a boolean" });
  }

  // If form doesn't exist yet, you can choose to allow or disallow creating new
  formVisibility[formName] = showForm;

  res.json({ message: `Visibility of "${formName}" updated successfully` });
});

export default router;
