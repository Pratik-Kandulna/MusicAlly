import multer from "multer";


// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
  const cleanName = file.originalname.replace(/\s+/g, "_");
  cb(null, Date.now() + "_" + cleanName);
},
});

const upload = multer({ storage 
   
});

export default upload;


//limits: { fileSize: 200 * 1024 * 1024 } // 200MB