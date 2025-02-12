const app = require("./src/app");

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// The server is started on port 5000. The app module is imported from src/app.js and used to create the server.