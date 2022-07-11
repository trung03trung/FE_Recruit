import { NbMenuItem } from '@nebular/theme';
import { link } from 'fs';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/home/dashboard',
    home: true,
  },
  {
    title: 'Tính năng',
    group: true,
  },
  {
    title: 'Người dùng',
    icon: 'person-outline',
    link: '/home/user',
  },
  {
    title: 'Sản phẩm',
    icon: 'globe-2-outline',
    link: '/home/product',
  },
  {
    title:'Tin tuyển dụng',
    icon:'bookmark',
    link:'/home/job'
  },
];
