import  express  from "express";
import { uploader , generateFileNameWithTimestamp } from "../utils";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

