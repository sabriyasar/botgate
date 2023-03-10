const MenuData = [
  {
    id: '1',
    title: 'Monitor',
    path: '/monitor',
    icon: 'screen',
    children: [
      {
        id: '1_1',
        title: 'Yeni Olaylar',
        path: '/',
      },
      {
        id: '1_2',
        title: 'Kişi Bazlı Olaylar',
        path: '#',
      },
      {
        id: '1_3',
        title: 'Takipteki Olaylar',
        path: '#',
      },
      {
        id: '1_4',
        title: 'Son Bilinen Konum',
        path: '#',
      },
      {
        id: '1_5',
        title: 'Başladı - Sonlandı Birleştirilmiş Olaylar',
        path: '#',
      },
      {
        id: '1_6',
        title: 'Sonlanmayan Olaylar',
        path: '#',
      },
    ],
  },
  {
    id: '2',
    title: 'İzleme Kayıtları',
    path: '/tracking/records',
    icon: 'eye',
  },
  {
    id: '3',
    title: 'Query',
    path: '/query',
    icon: 'search',
  },
  {
    id: '4',
    title: 'Reports',
    path: '/reports',
    icon: 'document',
  },
  {
    id: '5',
    title: 'Help',
    path: '/help',
    icon: 'help',
  },
];

export default MenuData;
