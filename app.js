import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import citas from "./src/routes/citas.js"
import equipo from "./src/routes/equipo.js";
import especialidades from "./src/routes/especialidades.js";
import expedientes from "./src/routes/expedientes.js";
import loginPacientes from "./src/routes/loginPacientes.js"
import logout from "./src/routes/logout.js"
import pacientes from "./src/routes/pacientes.js";
import pacientesregistro from "./src/routes/pacientesRegistro.js";
import recuperacionPacientes from "./src/routes/recuperacionPacientes.js"


const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/citas", citas);
app.use("/api/equipo", equipo);
app.use("/api/especialidades", especialidades);
app.use("/api/expedientes", expedientes);
app.use("/api/loginPacientes", loginPacientes);
app.use("/api/logout", logout);
app.use("/api/pacientes", pacientes);
app.use("/api/pacientesregistro", pacientesregistro);
app.use("/api/recuperacionPacientes", recuperacionPacientes);

export default app;