import { web } from "./app/web.js";

web.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
const today = new Date();
console.log(today);
const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
