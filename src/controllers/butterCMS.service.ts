import Butter from 'buttercms';
import { GLOBAL_CONFIGS } from '../configs/global-config';

export const butterService = Butter(GLOBAL_CONFIGS.GENERAL_CONFIGS.BUTTER_CMS_API_KEY, false, 10000);