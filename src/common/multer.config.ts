import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
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
    };
  }
}
