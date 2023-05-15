import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//https://www.npmjs.com/package/multer
//multer koristimo kako bi uploadali fileove na server 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + file.originalname)
    }
  })

const upload = multer({ storage })

// api endpoint za upload 
app.post('/api/uploads', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file);
  })

// kazemo nasem appu da koristi api endpointove definirane u routes, a u routes pozivamo funkcije iz kontrollera
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.listen(8800, () => {
    console.log("Port listening!")
})