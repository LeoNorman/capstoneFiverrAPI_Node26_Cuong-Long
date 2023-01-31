import {
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export const upload = UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(
          null,
          req.originalUrl === '/users/register'
            ? './statics/avatar'
            : './statics/upload',
        );
      },
      filename: (req, file, callback) => {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${prefix}-${file.originalname}`);
      },
    }),
  }),
);

export const upload1File = UploadedFile(
  new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'jpeg',
    })
    .addMaxSizeValidator({
      maxSize: 100000,
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
);
