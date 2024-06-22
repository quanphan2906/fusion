import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";

import { generateReactHelpers } from "@uploadthing/react/hooks";
   
import type { OurFileRouter } from "../src/api/uploadthing/core";
   
export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
export const UploadButton = generateUploadButton<OurFileRouter>();