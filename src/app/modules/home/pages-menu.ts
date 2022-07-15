import { NbMenuItem } from '@nebular/theme';
import { link } from 'fs';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
    title: 'Tin tuyển dụng',
    icon: 'browser-outline',
    link: '/home/job',
  },
  {
    title: 'Hồ sơ tuyển dụng',
    icon: 'briefcase-outline',
    link: '/home/job-register',
  },
  {
    title: 'Danh sách quản trị viên',
    icon: 'people-outline',
    link: '/home/list-je',
  },
  {
    title: 'Thông tin công ty và liên hệ',
    icon: 'info-outline',
    link: '/home',
  },
];
