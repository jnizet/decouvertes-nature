export interface Municipality {
  readonly name: string;
  readonly postalCode: string;
  readonly intercommunality: string;
  center: [lat: number, lng: number];
}

export const ALL_MUNICIPALITIES: ReadonlyArray<Municipality> = [
  {
    name: 'Saint-Étienne',
    postalCode: '42000 - 42100 - 42230',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4241, 4.3665]
  },
  {
    name: 'Aboën',
    postalCode: '42380',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4097, 4.127]
  },
  {
    name: 'Ailleux',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7981, 3.9363]
  },
  {
    name: 'Ambierle',
    postalCode: '42820',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1068, 3.8953]
  },
  {
    name: 'Andrézieux-Bouthéon',
    postalCode: '42160',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5353, 4.2773]
  },
  {
    name: 'Apinac',
    postalCode: '42550',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.3935, 3.9939]
  },
  {
    name: 'Arcinges',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1351, 4.2877]
  },
  {
    name: 'Arcon',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0091, 3.8669]
  },
  {
    name: 'Arthun',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7653, 4.0369]
  },
  {
    name: 'Aveizieux',
    postalCode: '42330',
    intercommunality: 'CC de Forez-Est',
    center: [45.5708, 4.3762]
  },
  {
    name: 'Balbigny',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est',
    center: [45.8299, 4.1813]
  },
  {
    name: 'Bard',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5903, 3.989]
  },
  {
    name: 'Bellegarde-en-Forez',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est',
    center: [45.6409, 4.3089]
  },
  {
    name: 'Belleroche',
    postalCode: '42670',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1591, 4.4103]
  },
  {
    name: 'Belmont-de-la-Loire',
    postalCode: '42670',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1612, 4.3493]
  },
  {
    name: 'Bessey',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3899, 4.7046]
  },
  {
    name: 'Boën-sur-Lignon',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7496, 4.0074]
  },
  {
    name: 'Boisset-Saint-Priest',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5124, 4.1192]
  },
  {
    name: 'Boisset-lès-Montrond',
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6271, 4.2043]
  },
  {
    name: 'Bonson',
    postalCode: '42160',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5226, 4.2245]
  },
  {
    name: 'Bourg-Argental',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3038, 4.5622]
  },
  {
    name: 'Boyer',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.0979, 4.2154]
  },
  {
    name: 'Briennon',
    postalCode: '42720',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.151, 4.0779]
  },
  {
    name: 'Bully',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.9297, 3.9955]
  },
  {
    name: 'Burdignes',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.2651, 4.5432]
  },
  {
    name: 'Bussières',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est',
    center: [45.8397, 4.2636]
  },
  {
    name: 'Bussy-Albieux',
    postalCode: '42260',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7955, 4.0341]
  },
  {
    name: 'Caloire',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4139, 4.2347]
  },
  {
    name: 'Cellieu',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5218, 4.5307]
  },
  {
    name: 'Cervières',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.8498, 3.7518]
  },
  {
    name: 'Cezay',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.8048, 3.9667]
  },
  {
    name: 'Chagnon',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5337, 4.5525]
  },
  {
    name: "Chalain-d'Uzore",
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6734, 4.0599]
  },
  {
    name: 'Chalain-le-Comtal',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.64, 4.1747]
  },
  {
    name: 'Chalmazel-Jeansagnière',
    postalCode: '42920',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7032, 3.8337]
  },
  {
    name: 'Chambéon',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.6992, 4.1682]
  },
  {
    name: 'Chambles',
    postalCode: '42170',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4528, 4.2229]
  },
  {
    name: 'Chambœuf',
    postalCode: '42330',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5737, 4.3126]
  },
  {
    name: 'Champdieu',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6394, 4.0484]
  },
  {
    name: 'Champoly',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.8536, 3.8433]
  },
  {
    name: 'Chandon',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1484, 4.1998]
  },
  {
    name: 'Changy',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.148, 3.9036]
  },
  {
    name: 'Charlieu',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1648, 4.1718]
  },
  {
    name: 'Châteauneuf',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5185, 4.635]
  },
  {
    name: 'Châtelneuf',
    postalCode: '42940',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6387, 3.9777]
  },
  {
    name: 'Châtelus',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.5888, 4.4629]
  },
  {
    name: 'Chausseterre',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.8998, 3.7692]
  },
  {
    name: 'Chavanay',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.4161, 4.7266]
  },
  {
    name: 'Chazelles-sur-Lavieu',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5405, 3.9988]
  },
  {
    name: 'Chazelles-sur-Lyon',
    postalCode: '42140',
    intercommunality: 'CC de Forez-Est',
    center: [45.6293, 4.3717]
  },
  {
    name: 'Chenereilles',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4857, 4.09]
  },
  {
    name: 'Cherier',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.9686, 3.8858]
  },
  {
    name: 'Chevrières',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.5911, 4.4087]
  },
  {
    name: 'Chirassimont',
    postalCode: '42114',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9155, 4.2864]
  },
  {
    name: 'Chuyer',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.4531, 4.7017]
  },
  {
    name: 'Civens',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7682, 4.2333]
  },
  {
    name: 'Cleppé',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7546, 4.1765]
  },
  {
    name: 'Colombier',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.353, 4.5965]
  },
  {
    name: 'Combre',
    postalCode: '42840',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0182, 4.2609]
  },
  {
    name: 'Commelle-Vernay',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.996, 4.0569]
  },
  {
    name: 'Cordelle',
    postalCode: '42123',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9404, 4.059]
  },
  {
    name: 'Cottance',
    postalCode: '42360',
    intercommunality: 'CC de Forez-Est',
    center: [45.7998, 4.2927]
  },
  {
    name: 'Coutouvre',
    postalCode: '42460',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0736, 4.2049]
  },
  {
    name: 'Craintilleux',
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.576, 4.2306]
  },
  {
    name: 'Cremeaux',
    postalCode: '42260',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.9144, 3.9234]
  },
  {
    name: 'Croizet-sur-Gand',
    postalCode: '42540',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9104, 4.2188]
  },
  {
    name: 'Cuinzier',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.124, 4.2649]
  },
  {
    name: 'Cuzieu',
    postalCode: '42330',
    intercommunality: 'CC de Forez-Est',
    center: [45.605, 4.2599]
  },
  {
    name: 'Dargoire',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5627, 4.6735]
  },
  {
    name: "Débats-Rivière-d'Orpra",
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7576, 3.9413]
  },
  {
    name: 'Doizieux',
    postalCode: '42740',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4148, 4.5853]
  },
  {
    name: 'Écoche',
    postalCode: '42670',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1524, 4.3077]
  },
  {
    name: "Écotay-l'Olme",
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5878, 4.0452]
  },
  {
    name: 'Épercieux-Saint-Paul',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7929, 4.2015]
  },
  {
    name: 'Essertines-en-Châtelneuf',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6205, 3.9969]
  },
  {
    name: 'Essertines-en-Donzy',
    postalCode: '42360',
    intercommunality: 'CC de Forez-Est',
    center: [45.7577, 4.3374]
  },
  {
    name: 'Estivareilles',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4345, 4.0068]
  },
  {
    name: 'Farnay',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.484, 4.6004]
  },
  {
    name: 'Feurs',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.732, 4.2313]
  },
  {
    name: 'Firminy',
    postalCode: '42700',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.3827, 4.2895]
  },
  {
    name: 'Fontanès',
    postalCode: '42140',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5435, 4.4316]
  },
  {
    name: 'Fourneaux',
    postalCode: '42470',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9438, 4.2698]
  },
  {
    name: 'Fraisses',
    postalCode: '42490',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.3837, 4.2598]
  },
  {
    name: 'Genilac',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5395, 4.575]
  },
  {
    name: 'Graix',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3606, 4.5544]
  },
  {
    name: 'Grammond',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.573, 4.4438]
  },
  {
    name: 'Grézieux-le-Fromental',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6144, 4.1517]
  },
  {
    name: 'Grézolles',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8632, 3.9477]
  },
  {
    name: 'Gumières',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5294, 3.9831]
  },
  {
    name: 'Jarnosse',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.0984, 4.2418]
  },
  {
    name: 'Jas',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7448, 4.3193]
  },
  {
    name: 'Jonzieux',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3193, 4.3591]
  },
  {
    name: 'Juré',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.8912, 3.8988]
  },
  {
    name: "L'Étrat",
    postalCode: '42580',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4942, 4.3716]
  },
  {
    name: "L'Hôpital-le-Grand",
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5875, 4.1957]
  },
  {
    name: "L'Hôpital-sous-Rochefort",
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7722, 3.9363]
  },
  {
    name: "L'Horme",
    postalCode: '42152',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4935, 4.5433]
  },
  {
    name: 'La Bénisson-Dieu',
    postalCode: '42720',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1577, 4.0469]
  },
  {
    name: 'La Chamba',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7545, 3.7568]
  },
  {
    name: 'La Chambonie',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7442, 3.7587]
  },
  {
    name: 'La Chapelle-Villars',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.4804, 4.7118]
  },
  {
    name: 'La Chapelle-en-Lafaye',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4609, 3.9859]
  },
  {
    name: 'La Côte-en-Couzan',
    postalCode: '42111',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7681, 3.831]
  },
  {
    name: 'La Fouillouse',
    postalCode: '42480',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4995, 4.3198]
  },
  {
    name: 'La Gimond',
    postalCode: '42140',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5551, 4.4144]
  },
  {
    name: 'La Grand-Croix',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5042, 4.5569]
  },
  {
    name: 'La Gresle',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.0752, 4.2727]
  },
  {
    name: 'La Pacaudière',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1828, 3.8776]
  },
  {
    name: 'La Ricamarie',
    postalCode: '42150',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4045, 4.3723]
  },
  {
    name: 'La Talaudière',
    postalCode: '42350',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4775, 4.4257]
  },
  {
    name: 'La Terrasse-sur-Dorlay',
    postalCode: '42740',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4479, 4.5896]
  },
  {
    name: 'La Tour-en-Jarez',
    postalCode: '42580',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4899, 4.3973]
  },
  {
    name: 'La Tourette',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4225, 4.0846]
  },
  {
    name: 'La Tuilière',
    postalCode: '42830',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.9589, 3.8129]
  },
  {
    name: 'La Valla-en-Gier',
    postalCode: '42131',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4062, 4.5256]
  },
  {
    name: 'La Valla-sur-Rochefort',
    postalCode: '42111',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7575, 3.8447]
  },
  {
    name: 'La Versanne',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3202, 4.5084]
  },
  {
    name: 'Lavieu',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5396, 4.0413]
  },
  {
    name: 'Lay',
    postalCode: '42470',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9669, 4.2432]
  },
  {
    name: 'Le Bessat',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3723, 4.5159]
  },
  {
    name: 'Le Cergne',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.12, 4.3015]
  },
  {
    name: 'Le Chambon-Feugerolles',
    postalCode: '42500',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.391, 4.3375]
  },
  {
    name: 'Le Coteau',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0217, 4.0925]
  },
  {
    name: 'Le Crozet',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1737, 3.8381]
  },
  {
    name: 'Leigneux',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7444, 3.9868]
  },
  {
    name: 'Lentigny',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.993, 3.9756]
  },
  {
    name: 'Lérigneux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5947, 3.9458]
  },
  {
    name: 'Les Noës',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0304, 3.8368]
  },
  {
    name: 'Les Salles',
    postalCode: '42440',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.853, 3.774]
  },
  {
    name: 'Lézigneux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5601, 4.0555]
  },
  {
    name: 'Lorette',
    postalCode: '42420',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5088, 4.5819]
  },
  {
    name: 'Lupé',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3721, 4.7019]
  },
  {
    name: 'Luré',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8846, 3.9314]
  },
  {
    name: 'Luriecq',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4546, 4.0724]
  },
  {
    name: 'Mably',
    postalCode: '42300',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0916, 4.0657]
  },
  {
    name: 'Machézal',
    postalCode: '42114',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9285, 4.3147]
  },
  {
    name: 'Maclas',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.363, 4.6973]
  },
  {
    name: 'Magneux-Haute-Rive',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6691, 4.1723]
  },
  {
    name: 'Maizilly',
    postalCode: '42750',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.177, 4.2428]
  },
  {
    name: 'Malleval',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3842, 4.7264]
  },
  {
    name: 'Marcenod',
    postalCode: '42140',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5729, 4.4802]
  },
  {
    name: 'Marcilly-le-Châtel',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6888, 4.0269]
  },
  {
    name: 'Marclopt',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est',
    center: [45.6632, 4.2227]
  },
  {
    name: 'Marcoux',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7037, 3.9959]
  },
  {
    name: 'Margerie-Chantagret',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5265, 4.0488]
  },
  {
    name: 'Maringes',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.6611, 4.3564]
  },
  {
    name: 'Marlhes',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.2915, 4.3936]
  },
  {
    name: 'Marols',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4726, 4.0372]
  },
  {
    name: 'Mars',
    postalCode: '42750',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1498, 4.2526]
  },
  {
    name: 'Merle-Leignec',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.3678, 4.028]
  },
  {
    name: 'Mizérieux',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7905, 4.1646]
  },
  {
    name: 'Montagny',
    postalCode: '42840',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0292, 4.2227]
  },
  {
    name: 'Montarcher',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4593, 3.9901]
  },
  {
    name: 'Montbrison',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6016, 4.0719]
  },
  {
    name: 'Montchal',
    postalCode: '42360',
    intercommunality: 'CC de Forez-Est',
    center: [45.8263, 4.3328]
  },
  {
    name: 'Montrond-les-Bains',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est',
    center: [45.638, 4.2429]
  },
  {
    name: 'Montverdun',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7088, 4.0785]
  },
  {
    name: 'Mornand-en-Forez',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6732, 4.1191]
  },
  {
    name: 'Nandax',
    postalCode: '42720',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.0996, 4.1732]
  },
  {
    name: 'Neaux',
    postalCode: '42470',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9583, 4.1636]
  },
  {
    name: 'Néronde',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est',
    center: [45.8392, 4.233]
  },
  {
    name: 'Nervieux',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est',
    center: [45.8121, 4.1475]
  },
  {
    name: 'Neulise',
    postalCode: '42590',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9037, 4.1681]
  },
  {
    name: 'Noailly',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1382, 4.0052]
  },
  {
    name: 'Noirétable',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.8073, 3.7384]
  },
  {
    name: 'Nollieux',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8187, 3.9899]
  },
  {
    name: 'Notre-Dame-de-Boisset',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.9896, 4.1325]
  },
  {
    name: 'Ouches',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.011, 3.9921]
  },
  {
    name: 'Palogneux',
    postalCode: '42990',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7442, 3.9257]
  },
  {
    name: 'Panissières',
    postalCode: '42360',
    intercommunality: 'CC de Forez-Est',
    center: [45.7926, 4.3428]
  },
  {
    name: 'Parigny',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.9892, 4.093]
  },
  {
    name: 'Pavezin',
    postalCode: '42410',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.467, 4.6605]
  },
  {
    name: 'Pélussin',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.4236, 4.6611]
  },
  {
    name: 'Périgneux',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4496, 4.1489]
  },
  {
    name: 'Perreux',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0397, 4.1427]
  },
  {
    name: 'Pinay',
    postalCode: '42590',
    intercommunality: 'CC de Forez-Est',
    center: [45.8707, 4.1307]
  },
  {
    name: 'Planfoy',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3848, 4.4265]
  },
  {
    name: 'Pommiers-en-Forez',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8327, 4.0785]
  },
  {
    name: 'Poncins',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7297, 4.1551]
  },
  {
    name: 'Pouilly-lès-Feurs',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7981, 4.2328]
  },
  {
    name: 'Pouilly-les-Nonains',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0435, 3.9794]
  },
  {
    name: 'Pouilly-sous-Charlieu',
    postalCode: '42720',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1344, 4.1315]
  },
  {
    name: 'Pradines',
    postalCode: '42630',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9976, 4.1736]
  },
  {
    name: 'Pralong',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.661, 4.0169]
  },
  {
    name: 'Précieux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.589, 4.1503]
  },
  {
    name: 'Régny',
    postalCode: '42630',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9998, 4.216]
  },
  {
    name: 'Renaison',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0454, 3.911]
  },
  {
    name: 'Riorges',
    postalCode: '42153',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0421, 4.0377]
  },
  {
    name: 'Rivas',
    postalCode: '42340',
    intercommunality: 'CC de Forez-Est',
    center: [45.5871, 4.2505]
  },
  {
    name: 'Rive-de-Gier',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5211, 4.6175]
  },
  {
    name: 'Roanne',
    postalCode: '42300',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0443, 4.0797]
  },
  {
    name: 'Roche',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6176, 3.9205]
  },
  {
    name: 'Roche-la-Molière',
    postalCode: '42230',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4271, 4.3282]
  },
  {
    name: 'Roisey',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3914, 4.6526]
  },
  {
    name: "Rozier-Côtes-d'Aurec",
    postalCode: '42380',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.3761, 4.1164]
  },
  {
    name: 'Rozier-en-Donzy',
    postalCode: '42810',
    intercommunality: 'CC de Forez-Est',
    center: [45.8086, 4.2706]
  },
  {
    name: 'Sail-les-Bains',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.2376, 3.8414]
  },
  {
    name: 'Sail-sous-Couzan',
    postalCode: '42890',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7367, 3.9601]
  },
  {
    name: 'Saint-Alban-les-Eaux',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0056, 3.9309]
  },
  {
    name: "Saint-André-d'Apchon",
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0275, 3.9325]
  },
  {
    name: 'Saint-André-le-Puy',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est',
    center: [45.6448, 4.2607]
  },
  {
    name: 'Saint-Appolinard',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3435, 4.649]
  },
  {
    name: 'Saint-Barthélemy-Lestra',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7193, 4.3316]
  },
  {
    name: 'Saint-Bonnet-des-Quarts',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1272, 3.8304]
  },
  {
    name: 'Saint-Bonnet-le-Château',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4252, 4.0646]
  },
  {
    name: 'Saint-Bonnet-le-Courreau',
    postalCode: '42940',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6542, 3.9131]
  },
  {
    name: 'Saint-Bonnet-les-Oules',
    postalCode: '42330',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5393, 4.3341]
  },
  {
    name: 'Saint-Chamond',
    postalCode: '42400',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4687, 4.5082]
  },
  {
    name: 'Saint-Christo-en-Jarez',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5345, 4.4697]
  },
  {
    name: 'Saint-Cyprien',
    postalCode: '42160',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5414, 4.2327]
  },
  {
    name: 'Saint-Cyr-de-Favières',
    postalCode: '42123',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.959, 4.1018]
  },
  {
    name: 'Saint-Cyr-de-Valorges',
    postalCode: '42114',
    intercommunality: 'CC de Forez-Est',
    center: [45.8901, 4.3134]
  },
  {
    name: 'Saint-Cyr-les-Vignes',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est',
    center: [45.678, 4.2909]
  },
  {
    name: 'Saint-Denis-de-Cabanne',
    postalCode: '42750',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1773, 4.2047]
  },
  {
    name: 'Saint-Denis-sur-Coise',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.6111, 4.4303]
  },
  {
    name: 'Saint-Didier-sur-Rochefort',
    postalCode: '42111',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7902, 3.8589]
  },
  {
    name: 'Saint-Étienne-le-Molard',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.743, 4.0997]
  },
  {
    name: 'Saint-Forgeux-Lespinasse',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1419, 3.9427]
  },
  {
    name: 'Saint-Galmier',
    postalCode: '42330',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.6038, 4.314]
  },
  {
    name: 'Saint-Genest-Lerpt',
    postalCode: '42530',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4529, 4.3307]
  },
  {
    name: 'Saint-Genest-Malifaux',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3523, 4.4351]
  },
  {
    name: 'Saint-Georges-Haute-Ville',
    postalCode: '42610',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5426, 4.093]
  },
  {
    name: 'Saint-Georges-de-Baroille',
    postalCode: '42510',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8513, 4.1027]
  },
  {
    name: 'Saint-Georges-en-Couzan',
    postalCode: '42990',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7083, 3.929]
  },
  {
    name: 'Saint-Germain-Laval',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.833, 4.0089]
  },
  {
    name: 'Saint-Germain-Lespinasse',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1112, 3.9636]
  },
  {
    name: 'Saint-Germain-la-Montagne',
    postalCode: '42670',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1965, 4.3925]
  },
  {
    name: 'Saint-Haon-le-Châtel',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0662, 3.9172]
  },
  {
    name: 'Saint-Haon-le-Vieux',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0733, 3.9019]
  },
  {
    name: 'Saint-Héand',
    postalCode: '42570',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5317, 4.3841]
  },
  {
    name: 'Saint-Hilaire-Cusson-la-Valmitte',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.3684, 4.0628]
  },
  {
    name: 'Saint-Hilaire-sous-Charlieu',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1205, 4.1829]
  },
  {
    name: 'Saint-Jean-Bonnefonds',
    postalCode: '42650',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4585, 4.4467]
  },
  {
    name: 'Saint-Jean-Saint-Maurice-sur-Loire',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.9591, 3.9801]
  },
  {
    name: 'Saint-Jean-Soleymieux',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5061, 4.0098]
  },
  {
    name: 'Saint-Jean-la-Vêtre',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7758, 3.7899]
  },
  {
    name: 'Saint-Jodard',
    postalCode: '42590',
    intercommunality: 'CC de Forez-Est',
    center: [45.8887, 4.1294]
  },
  {
    name: 'Saint-Joseph',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5555, 4.6208]
  },
  {
    name: 'Saint-Julien-Molin-Molette',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3177, 4.6189]
  },
  {
    name: "Saint-Julien-d'Oddes",
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.851, 3.9922]
  },
  {
    name: 'Saint-Just-Saint-Rambert',
    postalCode: '42170',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4919, 4.2464]
  },
  {
    name: 'Saint-Just-en-Bas',
    postalCode: '42990',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.729, 3.8743]
  },
  {
    name: 'Saint-Just-en-Chevalet',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.9255, 3.834]
  },
  {
    name: 'Saint-Just-la-Pendue',
    postalCode: '42540',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.8827, 4.2449]
  },
  {
    name: 'Saint-Laurent-Rochefort',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7775, 3.9074]
  },
  {
    name: 'Saint-Laurent-la-Conche',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est',
    center: [45.6924, 4.2376]
  },
  {
    name: 'Saint-Léger-sur-Roanne',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0429, 4.003]
  },
  {
    name: "Saint-Marcel-d'Urfé",
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.8713, 3.8813]
  },
  {
    name: 'Saint-Marcel-de-Félines',
    postalCode: '42122',
    intercommunality: 'CC de Forez-Est',
    center: [45.8635, 4.1824]
  },
  {
    name: 'Saint-Marcellin-en-Forez',
    postalCode: '42680',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.4883, 4.1672]
  },
  {
    name: 'Saint-Martin-Lestra',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7268, 4.3714]
  },
  {
    name: "Saint-Martin-d'Estréaux",
    postalCode: '42620',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.2029, 3.829]
  },
  {
    name: 'Saint-Martin-la-Plaine',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5518, 4.5925]
  },
  {
    name: 'Saint-Martin-la-Sauveté',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8352, 3.918]
  },
  {
    name: 'Saint-Maurice-en-Gourgois',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4114, 4.1736]
  },
  {
    name: 'Saint-Médard-en-Forez',
    postalCode: '42330',
    intercommunality: 'CC de Forez-Est',
    center: [45.593, 4.3605]
  },
  {
    name: 'Saint-Michel-sur-Rhône',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.4436, 4.7339]
  },
  {
    name: 'Saint-Nizier-de-Fornas',
    postalCode: '42380',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4066, 4.081]
  },
  {
    name: 'Saint-Nizier-sous-Charlieu',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1624, 4.1262]
  },
  {
    name: "Saint-Paul-d'Uzore",
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6747, 4.0924]
  },
  {
    name: 'Saint-Paul-en-Cornillon',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.3967, 4.239]
  },
  {
    name: 'Saint-Paul-en-Jarez',
    postalCode: '42740',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4716, 4.588]
  },
  {
    name: 'Saint-Pierre-de-Bœuf',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3797, 4.742]
  },
  {
    name: 'Saint-Pierre-la-Noaille',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1828, 4.1079]
  },
  {
    name: 'Saint-Polgues',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.9081, 3.9804]
  },
  {
    name: 'Saint-Priest-en-Jarez',
    postalCode: '42270',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.474, 4.3708]
  },
  {
    name: 'Saint-Priest-la-Prugne',
    postalCode: '42830',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.9494, 3.7505]
  },
  {
    name: 'Saint-Priest-la-Roche',
    postalCode: '42590',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9204, 4.1085]
  },
  {
    name: 'Saint-Priest-la-Vêtre',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.8008, 3.8086]
  },
  {
    name: 'Saint-Régis-du-Coin',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.2869, 4.4528]
  },
  {
    name: 'Saint-Rirand',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0737, 3.8372]
  },
  {
    name: "Saint-Romain-d'Urfé",
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé",
    center: [45.8859, 3.8157]
  },
  {
    name: 'Saint-Romain-en-Jarez',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5612, 4.5417]
  },
  {
    name: 'Saint-Romain-la-Motte',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0836, 3.9907]
  },
  {
    name: 'Saint-Romain-le-Puy',
    postalCode: '42610',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5564, 4.1317]
  },
  {
    name: 'Saint-Romain-les-Atheux',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3639, 4.3688]
  },
  {
    name: 'Saint-Sauveur-en-Rue',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.2744, 4.5025]
  },
  {
    name: 'Saint-Sixte',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7728, 3.9695]
  },
  {
    name: 'Saint-Symphorien-de-Lay',
    postalCode: '42470',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9474, 4.223]
  },
  {
    name: 'Saint-Thomas-la-Garde',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5728, 4.0847]
  },
  {
    name: 'Saint-Victor-sur-Rhins',
    postalCode: '42630',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [46.005, 4.277]
  },
  {
    name: 'Saint-Vincent-de-Boisset',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.0101, 4.1161]
  },
  {
    name: 'Sainte-Agathe-en-Donzy',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est',
    center: [45.8358, 4.3061]
  },
  {
    name: 'Sainte-Agathe-la-Bouteresse',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7456, 4.0478]
  },
  {
    name: 'Sainte-Colombe-sur-Gand',
    postalCode: '42540',
    intercommunality: 'CC de Forez-Est',
    center: [45.8667, 4.2774]
  },
  {
    name: 'Sainte-Croix-en-Jarez',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4736, 4.6375]
  },
  {
    name: 'Sainte-Foy-Saint-Sulpice',
    postalCode: '42110',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7759, 4.1086]
  },
  {
    name: 'Salt-en-Donzy',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.7351, 4.2848]
  },
  {
    name: 'Salvizinet',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.76, 4.2776]
  },
  {
    name: 'Sauvain',
    postalCode: '42990',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6642, 3.8604]
  },
  {
    name: 'Savigneux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.622, 4.1013]
  },
  {
    name: 'Sevelinges',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.0979, 4.2839]
  },
  {
    name: 'Soleymieux',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5052, 4.0609]
  },
  {
    name: 'Sorbiers',
    postalCode: '42290',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4995, 4.4357]
  },
  {
    name: 'Souternon',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8831, 3.9887]
  },
  {
    name: 'Sury-le-Comtal',
    postalCode: '42450',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5426, 4.1784]
  },
  {
    name: 'Tarentaise',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3615, 4.4917]
  },
  {
    name: 'Tartaras',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5536, 4.6658]
  },
  {
    name: 'Thélis-la-Combe',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat',
    center: [45.3369, 4.5496]
  },
  {
    name: 'Trelins',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.7243, 4.004]
  },
  {
    name: 'Unias',
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.6057, 4.2273]
  },
  {
    name: 'Unieux',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4054, 4.2691]
  },
  {
    name: 'Urbise',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.2454, 3.88]
  },
  {
    name: 'Usson-en-Forez',
    postalCode: '42550',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.3847, 3.937]
  },
  {
    name: 'Valeille',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est',
    center: [45.708, 4.2809]
  },
  {
    name: 'Valfleury',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.5376, 4.5158]
  },
  {
    name: 'Veauche',
    postalCode: '42340',
    intercommunality: 'CC de Forez-Est',
    center: [45.5616, 4.29]
  },
  {
    name: 'Veauchette',
    postalCode: '42340',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5633, 4.2536]
  },
  {
    name: 'Vendranges',
    postalCode: '42590',
    intercommunality: 'CC du Pays Entre Loire et Rhône',
    center: [45.9344, 4.1329]
  },
  {
    name: 'Véranne',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.3724, 4.634]
  },
  {
    name: 'Vérin',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien',
    center: [45.46, 4.743]
  },
  {
    name: 'Verrières-en-Forez',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.5672, 3.9903]
  },
  {
    name: 'Vêtre-sur-Anzon',
    postalCode: '42111 - 42440',
    intercommunality: 'CA Loire Forez Agglomération',
    center: [45.8187, 3.8448]
  },
  {
    name: 'Vézelin-sur-Loire',
    postalCode: '42260 - 42590',
    intercommunality: "CC des Vals d'Aix et Isable",
    center: [45.8858, 4.0578]
  },
  {
    name: 'Villars',
    postalCode: '42390',
    intercommunality: 'Saint-Étienne Métropole',
    center: [45.4679, 4.3517]
  },
  {
    name: 'Villemontais',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.9812, 3.932]
  },
  {
    name: 'Villerest',
    postalCode: '42300',
    intercommunality: 'CA Roannais Agglomération',
    center: [45.9981, 4.0264]
  },
  {
    name: 'Villers',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.1247, 4.2254]
  },
  {
    name: 'Violay',
    postalCode: '42780',
    intercommunality: 'CC de Forez-Est',
    center: [45.8517, 4.3458]
  },
  {
    name: 'Viricelles',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.6545, 4.3828]
  },
  {
    name: 'Virigneux',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais',
    center: [45.6873, 4.3463]
  },
  {
    name: 'Vivans',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération',
    center: [46.1814, 3.9385]
  },
  {
    name: 'Vougy',
    postalCode: '42720',
    intercommunality: 'CC Charlieu-Belmont',
    center: [46.0966, 4.1265]
  }
];

export const ALL_INTERCOMMUNALITIES = [
  ...new Set<string>(ALL_MUNICIPALITIES.map(m => m.intercommunality))
].sort();
