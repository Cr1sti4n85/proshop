import path from "path";
import { Router, Response, Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { MulterFile } from "../types/multer.types";

const router = Router();

const storage = multer.diskStorage({
  destination(_req, _file, cb: (error: Error | null, dest: string) => void) {
    cb(null, "uploads/");
  },
  filename(
    _req,
    file: Express.Multer.File,
    cb: (error: Error | null, dest: string) => void
  ) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(
  _req: Request,
  file: MulterFile,
  cb: FileFilterCallback
): void {
  const fileTypes: RegExp = /jpg|jpeg|png/;
  const extname: boolean = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype: boolean = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    const error: Error = {
      name: "format error",
      message: "Images only. Accepted formats: 'jpg/jpeg/png",
    };
    cb(error);
  }
}

const upload = multer({
  storage,
  fileFilter: checkFileType,
});

router.put("/", upload.single("image"), (req: Request, res: Response) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file?.path}`,
  });
});

export default router;
