import { PORT } from './configs/environment/environment.config.js';
import app from './app.js';

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));