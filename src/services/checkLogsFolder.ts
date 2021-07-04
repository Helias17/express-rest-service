import { LOGS_FOLDER } from '../common/config';
import fs from 'fs';

export const checkLogsFolder = () => {
  if (!fs.existsSync(LOGS_FOLDER!)) {
    fs.mkdirSync(LOGS_FOLDER!);
  }
}
