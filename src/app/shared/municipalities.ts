export interface Municipality {
  readonly name: string;
  readonly postalCode: string;
  readonly intercommunality: string;
}

export const ALL_MUNICIPALITIES: ReadonlyArray<Municipality> = [
  {
    name: 'Saint-Étienne',
    postalCode: '42000 - 42100 - 42230',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Aboën', postalCode: '42380', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Ailleux',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Ambierle', postalCode: '42820', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Andrézieux-Bouthéon',
    postalCode: '42160',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Apinac', postalCode: '42550', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Arcinges',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont'
  },
  { name: 'Arcon', postalCode: '42370', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Arthun',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Aveizieux', postalCode: '42330', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Balbigny',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Bard', postalCode: '42600', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Bellegarde-en-Forez',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Belleroche', postalCode: '42670', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Belmont-de-la-Loire',
    postalCode: '42670',
    intercommunality: 'CC Charlieu-Belmont'
  },
  { name: 'Bessey', postalCode: '42520', intercommunality: 'CC du Pilat Rhodanien' },
  {
    name: 'Boën-sur-Lignon',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Boisset-Saint-Priest',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Boisset-lès-Montrond',
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Bonson',
    postalCode: '42160',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Bourg-Argental', postalCode: '42220', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Boyer',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont'
  },
  { name: 'Briennon', postalCode: '42720', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Bully',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  { name: 'Burdignes', postalCode: '42220', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Bussières',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Bussy-Albieux', postalCode: '42260', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Caloire',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Cellieu', postalCode: '42320', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Cervières',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Cezay', postalCode: '42130', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Chagnon',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: "Chalain-d'Uzore",
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Chalain-le-Comtal',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Chalmazel-Jeansagnière',
    postalCode: '42920',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Chambéon',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Chambles', postalCode: '42170', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Chambœuf',
    postalCode: '42330',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Champdieu', postalCode: '42600', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Champoly',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé"
  },
  { name: 'Chandon', postalCode: '42190', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Changy',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Charlieu', postalCode: '42190', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Châteauneuf',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Châtelneuf', postalCode: '42940', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Châtelus',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais'
  },
  { name: 'Chausseterre', postalCode: '42430', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Chavanay',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  {
    name: 'Chazelles-sur-Lavieu',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Chazelles-sur-Lyon', postalCode: '42140', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Chenereilles',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Cherier', postalCode: '42430', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Chevrières',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais'
  },
  {
    name: 'Chirassimont',
    postalCode: '42114',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  {
    name: 'Chuyer',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  { name: 'Civens', postalCode: '42110', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Cleppé',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Colombier', postalCode: '42220', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Combre',
    postalCode: '42840',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Commelle-Vernay', postalCode: '42120', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Cordelle',
    postalCode: '42123',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  { name: 'Cottance', postalCode: '42360', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Coutouvre',
    postalCode: '42460',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Craintilleux', postalCode: '42210', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Cremeaux',
    postalCode: '42260',
    intercommunality: "CC du Pays d'Urfé"
  },
  {
    name: 'Croizet-sur-Gand',
    postalCode: '42540',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  {
    name: 'Cuinzier',
    postalCode: '42460',
    intercommunality: 'CC Charlieu-Belmont'
  },
  { name: 'Cuzieu', postalCode: '42330', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Dargoire',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: "Débats-Rivière-d'Orpra",
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Doizieux',
    postalCode: '42740',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Écoche', postalCode: '42670', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: "Écotay-l'Olme",
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Épercieux-Saint-Paul', postalCode: '42110', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Essertines-en-Châtelneuf',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Essertines-en-Donzy', postalCode: '42360', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Estivareilles',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Farnay', postalCode: '42320', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Feurs',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Firminy', postalCode: '42700', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Fontanès',
    postalCode: '42140',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Fourneaux', postalCode: '42470', intercommunality: 'CC du Pays Entre Loire et Rhône' },
  {
    name: 'Fraisses',
    postalCode: '42490',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Genilac', postalCode: '42800', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Graix',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat'
  },
  { name: 'Grammond', postalCode: '42140', intercommunality: 'CC des Monts du Lyonnais' },
  {
    name: 'Grézieux-le-Fromental',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Grézolles', postalCode: '42260', intercommunality: "CC des Vals d'Aix et Isable" },
  {
    name: 'Gumières',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Jarnosse', postalCode: '42460', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Jas',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Jonzieux', postalCode: '42660', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Juré',
    postalCode: '42430',
    intercommunality: "CC du Pays d'Urfé"
  },
  { name: "L'Étrat", postalCode: '42580', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: "L'Hôpital-le-Grand",
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: "L'Hôpital-sous-Rochefort",
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: "L'Horme",
    postalCode: '42152',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'La Bénisson-Dieu', postalCode: '42720', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'La Chamba',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'La Chambonie', postalCode: '42440', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'La Chapelle-Villars',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  {
    name: 'La Chapelle-en-Lafaye',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'La Côte-en-Couzan',
    postalCode: '42111',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'La Fouillouse',
    postalCode: '42480',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'La Gimond', postalCode: '42140', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'La Grand-Croix',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'La Gresle', postalCode: '42460', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'La Pacaudière',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'La Ricamarie', postalCode: '42150', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'La Talaudière',
    postalCode: '42350',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'La Terrasse-sur-Dorlay',
    postalCode: '42740',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'La Tour-en-Jarez',
    postalCode: '42580',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'La Tourette', postalCode: '42380', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'La Tuilière',
    postalCode: '42830',
    intercommunality: "CC du Pays d'Urfé"
  },
  { name: 'La Valla-en-Gier', postalCode: '42131', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'La Valla-sur-Rochefort',
    postalCode: '42111',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'La Versanne', postalCode: '42220', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Lavieu',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Lay', postalCode: '42470', intercommunality: 'CC du Pays Entre Loire et Rhône' },
  {
    name: 'Le Bessat',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat'
  },
  { name: 'Le Cergne', postalCode: '42460', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Le Chambon-Feugerolles',
    postalCode: '42500',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Le Coteau', postalCode: '42120', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Le Crozet',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Leigneux', postalCode: '42130', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Lentigny',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Lérigneux', postalCode: '42600', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Les Noës',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Les Salles', postalCode: '42440', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Lézigneux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Lorette', postalCode: '42420', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Lupé',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  { name: 'Luré', postalCode: '42260', intercommunality: "CC des Vals d'Aix et Isable" },
  {
    name: 'Luriecq',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Mably', postalCode: '42300', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Machézal',
    postalCode: '42114',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  { name: 'Maclas', postalCode: '42520', intercommunality: 'CC du Pilat Rhodanien' },
  {
    name: 'Magneux-Haute-Rive',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Maizilly', postalCode: '42750', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Malleval',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  { name: 'Marcenod', postalCode: '42140', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Marcilly-le-Châtel',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Marclopt', postalCode: '42210', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Marcoux',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Margerie-Chantagret',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Maringes',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais'
  },
  { name: 'Marlhes', postalCode: '42660', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Marols',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Mars', postalCode: '42750', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Merle-Leignec',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Mizérieux', postalCode: '42110', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Montagny',
    postalCode: '42840',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Montarcher', postalCode: '42380', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Montbrison',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Montchal', postalCode: '42360', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Montrond-les-Bains',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Montverdun', postalCode: '42130', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Mornand-en-Forez',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Nandax', postalCode: '42720', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Neaux',
    postalCode: '42470',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  { name: 'Néronde', postalCode: '42510', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Nervieux',
    postalCode: '42510',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Neulise', postalCode: '42590', intercommunality: 'CC du Pays Entre Loire et Rhône' },
  {
    name: 'Noailly',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Noirétable', postalCode: '42440', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Nollieux',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Notre-Dame-de-Boisset',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Ouches',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Palogneux', postalCode: '42990', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Panissières',
    postalCode: '42360',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Parigny', postalCode: '42120', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Pavezin',
    postalCode: '42410',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Pélussin', postalCode: '42410', intercommunality: 'CC du Pilat Rhodanien' },
  {
    name: 'Périgneux',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Perreux', postalCode: '42120', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Pinay',
    postalCode: '42590',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Planfoy', postalCode: '42660', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Pommiers-en-Forez',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  { name: 'Poncins', postalCode: '42110', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Pouilly-lès-Feurs',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  {
    name: 'Pouilly-les-Nonains',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Pouilly-sous-Charlieu', postalCode: '42720', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Pradines',
    postalCode: '42630',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  { name: 'Pralong', postalCode: '42600', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Précieux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Régny', postalCode: '42630', intercommunality: 'CC du Pays Entre Loire et Rhône' },
  {
    name: 'Renaison',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Riorges', postalCode: '42153', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Rivas',
    postalCode: '42340',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Rive-de-Gier', postalCode: '42800', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Roanne',
    postalCode: '42300',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Roche', postalCode: '42600', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Roche-la-Molière',
    postalCode: '42230',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Roisey', postalCode: '42520', intercommunality: 'CC du Pilat Rhodanien' },
  {
    name: "Rozier-Côtes-d'Aurec",
    postalCode: '42380',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Rozier-en-Donzy', postalCode: '42810', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Sail-les-Bains',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Sail-sous-Couzan',
    postalCode: '42890',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Alban-les-Eaux',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: "Saint-André-d'Apchon",
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-André-le-Puy',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Saint-Appolinard', postalCode: '42520', intercommunality: 'CC du Pilat Rhodanien' },
  {
    name: 'Saint-Barthélemy-Lestra',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  {
    name: 'Saint-Bonnet-des-Quarts',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Bonnet-le-Château',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Bonnet-le-Courreau',
    postalCode: '42940',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Bonnet-les-Oules',
    postalCode: '42330',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Chamond',
    postalCode: '42400',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Christo-en-Jarez',
    postalCode: '42320',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Cyprien',
    postalCode: '42160',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Cyr-de-Favières',
    postalCode: '42123',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  { name: 'Saint-Cyr-de-Valorges', postalCode: '42114', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Saint-Cyr-les-Vignes',
    postalCode: '42210',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Saint-Denis-de-Cabanne', postalCode: '42750', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Saint-Denis-sur-Coise',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais'
  },
  {
    name: 'Saint-Didier-sur-Rochefort',
    postalCode: '42111',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Étienne-le-Molard',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Forgeux-Lespinasse',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Galmier',
    postalCode: '42330',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Saint-Genest-Lerpt', postalCode: '42530', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Saint-Genest-Malifaux',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat'
  },
  {
    name: 'Saint-Georges-Haute-Ville',
    postalCode: '42610',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Georges-de-Baroille',
    postalCode: '42510',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Saint-Georges-en-Couzan',
    postalCode: '42990',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Germain-Laval',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Saint-Germain-Lespinasse',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Germain-la-Montagne',
    postalCode: '42670',
    intercommunality: 'CC Charlieu-Belmont'
  },
  {
    name: 'Saint-Haon-le-Châtel',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Haon-le-Vieux',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Héand',
    postalCode: '42570',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Hilaire-Cusson-la-Valmitte',
    postalCode: '42380',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Hilaire-sous-Charlieu',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont'
  },
  {
    name: 'Saint-Jean-Bonnefonds',
    postalCode: '42650',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Jean-Saint-Maurice-sur-Loire',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Jean-Soleymieux',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Jean-la-Vêtre',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Jodard',
    postalCode: '42590',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Saint-Joseph', postalCode: '42800', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Saint-Julien-Molin-Molette',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat'
  },
  {
    name: "Saint-Julien-d'Oddes",
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Saint-Just-Saint-Rambert',
    postalCode: '42170',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Just-en-Bas',
    postalCode: '42990',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Saint-Just-en-Chevalet', postalCode: '42430', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Saint-Just-la-Pendue',
    postalCode: '42540',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  {
    name: 'Saint-Laurent-Rochefort',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Saint-Laurent-la-Conche', postalCode: '42210', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Saint-Léger-sur-Roanne',
    postalCode: '42155',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: "Saint-Marcel-d'Urfé", postalCode: '42430', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Saint-Marcel-de-Félines',
    postalCode: '42122',
    intercommunality: 'CC de Forez-Est'
  },
  {
    name: 'Saint-Marcellin-en-Forez',
    postalCode: '42680',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Saint-Martin-Lestra', postalCode: '42110', intercommunality: 'CC de Forez-Est' },
  {
    name: "Saint-Martin-d'Estréaux",
    postalCode: '42620',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Martin-la-Plaine',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Martin-la-Sauveté',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Saint-Maurice-en-Gourgois',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Saint-Médard-en-Forez', postalCode: '42330', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Saint-Michel-sur-Rhône',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  {
    name: 'Saint-Nizier-de-Fornas',
    postalCode: '42380',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Nizier-sous-Charlieu',
    postalCode: '42190',
    intercommunality: 'CC Charlieu-Belmont'
  },
  {
    name: "Saint-Paul-d'Uzore",
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Paul-en-Cornillon',
    postalCode: '42240',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Saint-Paul-en-Jarez', postalCode: '42740', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Saint-Pierre-de-Bœuf',
    postalCode: '42520',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  { name: 'Saint-Pierre-la-Noaille', postalCode: '42190', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Saint-Polgues',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Saint-Priest-en-Jarez',
    postalCode: '42270',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Saint-Priest-la-Prugne', postalCode: '42830', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Saint-Priest-la-Roche',
    postalCode: '42590',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  {
    name: 'Saint-Priest-la-Vêtre',
    postalCode: '42440',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Saint-Régis-du-Coin', postalCode: '42660', intercommunality: 'CC des Monts du Pilat' },
  {
    name: 'Saint-Rirand',
    postalCode: '42370',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: "Saint-Romain-d'Urfé", postalCode: '42430', intercommunality: "CC du Pays d'Urfé" },
  {
    name: 'Saint-Romain-en-Jarez',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Saint-Romain-la-Motte',
    postalCode: '42640',
    intercommunality: 'CA Roannais Agglomération'
  },
  {
    name: 'Saint-Romain-le-Puy',
    postalCode: '42610',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Romain-les-Atheux',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat'
  },
  {
    name: 'Saint-Sauveur-en-Rue',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat'
  },
  { name: 'Saint-Sixte', postalCode: '42130', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Saint-Symphorien-de-Lay',
    postalCode: '42470',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  {
    name: 'Saint-Thomas-la-Garde',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Saint-Victor-sur-Rhins',
    postalCode: '42630',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  {
    name: 'Saint-Vincent-de-Boisset',
    postalCode: '42120',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Sainte-Agathe-en-Donzy', postalCode: '42510', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Sainte-Agathe-la-Bouteresse',
    postalCode: '42130',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Sainte-Colombe-sur-Gand', postalCode: '42540', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Sainte-Croix-en-Jarez',
    postalCode: '42800',
    intercommunality: 'Saint-Étienne Métropole'
  },
  {
    name: 'Sainte-Foy-Saint-Sulpice',
    postalCode: '42110',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Salt-en-Donzy', postalCode: '42110', intercommunality: 'CC de Forez-Est' },
  {
    name: 'Salvizinet',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Sauvain', postalCode: '42990', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Savigneux',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Sevelinges', postalCode: '42460', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Soleymieux',
    postalCode: '42560',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Sorbiers', postalCode: '42290', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Souternon',
    postalCode: '42260',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  { name: 'Sury-le-Comtal', postalCode: '42450', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Tarentaise',
    postalCode: '42660',
    intercommunality: 'CC des Monts du Pilat'
  },
  { name: 'Tartaras', postalCode: '42800', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Thélis-la-Combe',
    postalCode: '42220',
    intercommunality: 'CC des Monts du Pilat'
  },
  { name: 'Trelins', postalCode: '42130', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Unias',
    postalCode: '42210',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  { name: 'Unieux', postalCode: '42240', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Urbise',
    postalCode: '42310',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Usson-en-Forez', postalCode: '42550', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Valeille',
    postalCode: '42110',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Valfleury', postalCode: '42320', intercommunality: 'Saint-Étienne Métropole' },
  {
    name: 'Veauche',
    postalCode: '42340',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Veauchette', postalCode: '42340', intercommunality: 'CA Loire Forez Agglomération' },
  {
    name: 'Vendranges',
    postalCode: '42590',
    intercommunality: 'CC du Pays Entre Loire et Rhône'
  },
  { name: 'Véranne', postalCode: '42520', intercommunality: 'CC du Pilat Rhodanien' },
  {
    name: 'Vérin',
    postalCode: '42410',
    intercommunality: 'CC du Pilat Rhodanien'
  },
  {
    name: 'Verrières-en-Forez',
    postalCode: '42600',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Vêtre-sur-Anzon',
    postalCode: '42111 - 42440',
    intercommunality: 'CA Loire Forez Agglomération'
  },
  {
    name: 'Vézelin-sur-Loire',
    postalCode: '42260 - 42590',
    intercommunality: "CC des Vals d'Aix et Isable"
  },
  {
    name: 'Villars',
    postalCode: '42390',
    intercommunality: 'Saint-Étienne Métropole'
  },
  { name: 'Villemontais', postalCode: '42155', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Villerest',
    postalCode: '42300',
    intercommunality: 'CA Roannais Agglomération'
  },
  { name: 'Villers', postalCode: '42460', intercommunality: 'CC Charlieu-Belmont' },
  {
    name: 'Violay',
    postalCode: '42780',
    intercommunality: 'CC de Forez-Est'
  },
  { name: 'Viricelles', postalCode: '42140', intercommunality: 'CC des Monts du Lyonnais' },
  {
    name: 'Virigneux',
    postalCode: '42140',
    intercommunality: 'CC des Monts du Lyonnais'
  },
  { name: 'Vivans', postalCode: '42310', intercommunality: 'CA Roannais Agglomération' },
  {
    name: 'Vougy',
    postalCode: '42720',
    intercommunality: 'CC Charlieu-Belmont'
  }
];
