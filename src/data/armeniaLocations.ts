import type { Settlement } from '@/types';

function s(
  nameEn: string, nameHy: string,
  communityEn: string, communityHy: string,
  regionEn: string, regionHy: string,
  type: Settlement['type'],
  lat: number, lon: number,
): Settlement {
  return {
    id: `${nameEn}__${communityEn}__${regionEn}`,
    nameEn, nameHy, communityEn, communityHy, regionEn, regionHy,
    type, lat, lon,
  };
}

// ============================================================
// Comprehensive Armenian settlements dataset
// Data includes regions (Marzer), communities, and settlements
// with real geographic coordinates (WGS84).
// Sources: Public geodata, GeoNames, OpenStreetMap
// ============================================================

export const armeniaLocations: Settlement[] = [
  // --- Yerevan ---
  s('Yerevan', 'Երևան', 'Yerevan', 'Երևան', 'Yerevan', 'Երևան', 'city', 40.1872, 44.5152),
  s('Nork', 'Նորք', 'Nork-Marash', 'Նորք-Մարաշ', 'Yerevan', 'Երևան', 'community', 40.1969, 44.5653),
  s('Noragavit', 'Նորագավիթ', 'Noragavit', 'Նորագավիթ', 'Yerevan', 'Երևան', 'village', 40.2286, 44.5486),

  // --- Aragatsotn ---
  s('Ashtarak', 'Աշտարակ', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'city', 40.1469, 44.3600),
  s('Aparan', 'Ապարան', 'Aparan', 'Ապարան', 'Aragatsotn', 'Արագածոտն', 'city', 40.6786, 44.3642),
  s('Talin', 'Թալին', 'Talin', 'Թալին', 'Aragatsotn', 'Արագածոտն', 'city', 40.3372, 43.8800),
  s('Oshakan', 'Օշական', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.1622, 44.3031),
  s('Kosh', 'Քոշ', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.1264, 44.2581),
  s('Ushi', 'Ուշի', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.1764, 44.3397),
  s('Saghmosavan', 'Սաղմոսավան', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.1903, 44.2489),
  s('Artashavan', 'Արտաշավան', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.2036, 44.2514),
  s('Byurakan', 'Բյուրական', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.3414, 44.2619),
  s('Agarak', 'Ագարակ', 'Ashtarak', 'Աշտարակ', 'Aragatsotn', 'Արագածոտն', 'village', 40.3239, 44.2267),
  s('Aragats', 'Արագած', 'Aragats', 'Արագած', 'Aragatsotn', 'Արագածոտն', 'village', 40.4722, 44.0419),
  s('Arteni', 'Արտենի', 'Aragats', 'Արագած', 'Aragatsotn', 'Արագածոտն', 'village', 40.4706, 43.7492),
  s('Tlik', 'Թլիկ', 'Aparan', 'Ապարան', 'Aragatsotn', 'Արագածոտն', 'village', 40.7275, 44.3217),
  s('Rya Taza', 'Ռյա Թազա', 'Aparan', 'Ապարան', 'Aragatsotn', 'Արագածոտն', 'village', 40.6500, 44.3500),
  s('Kuchak', 'Կուչակ', 'Aparan', 'Ապարան', 'Aragatsotn', 'Արագածոտն', 'village', 40.6833, 44.4000),
  s('Zovuni', 'Զովունի', 'Aparan', 'Ապարան', 'Aragatsotn', 'Արագածոտն', 'village', 40.6333, 44.4167),
  s('Kakavadzor', 'Կակավաձոր', 'Aparan', 'Ապարան', 'Aragatsotn', 'Արագածոտն', 'village', 40.6531, 44.2628),

  // --- Ararat ---
  s('Artashat', 'Արտաշատ', 'Artashat', 'Արտաշատ', 'Ararat', 'Արարատ', 'city', 39.9614, 44.5442),
  s('Ararat', 'Արարատ', 'Ararat', 'Արարատ', 'Ararat', 'Արարատ', 'city', 39.9589, 44.7036),
  s('Masis', 'Մասիս', 'Masis', 'Մասիս', 'Ararat', 'Արարատ', 'city', 40.0728, 44.4386),
  s('Vedi', 'Վեդի', 'Vedi', 'Վեդի', 'Ararat', 'Արարատ', 'city', 39.9461, 44.7486),
  s('Mrgashat', 'Մրգաշատ', 'Mrgashat', 'Մրգաշատ', 'Armavir', 'Արմավիր', 'village', 40.1358, 44.3514),
  s('Mrgavan', 'Մրգավան', 'Mrgavan', 'Մրգավան', 'Ararat', 'Արարատ', 'village', 39.9464, 44.5628),
  s('Dalar', 'Դալար', 'Artashat', 'Արտաշատ', 'Ararat', 'Արարատ', 'village', 40.0117, 44.5106),
  s('Getazat', 'Գետազատ', 'Artashat', 'Արտաշատ', 'Ararat', 'Արարատ', 'village', 39.9978, 44.5078),
  s('Vostan', 'Ոստան', 'Artashat', 'Արտաշատ', 'Ararat', 'Արարատ', 'village', 39.9761, 44.5597),
  s('Ghukasavan', 'Ղուկասավան', 'Masis', 'Մասիս', 'Ararat', 'Արարատ', 'village', 40.0856, 44.3833),
  s('Sayat-Nova', 'Սայաթ-Նովա', 'Masis', 'Մասիս', 'Ararat', 'Արարատ', 'village', 40.0928, 44.4536),
  s('Nor Kharberd', 'Նոր Խարբերդ', 'Masis', 'Մասիս', 'Ararat', 'Արարատ', 'village', 40.1167, 44.4000),
  s('Surenavan', 'Սուրենավան', 'Ararat', 'Արարատ', 'Ararat', 'Արարատ', 'village', 39.9167, 44.7333),
  s('Aygavan', 'Այգավան', 'Ararat', 'Արարատ', 'Ararat', 'Արարատ', 'village', 39.9286, 44.6900),
  s('Yeghegnavan', 'Եղեգնավան', 'Ararat', 'Արարատ', 'Ararat', 'Արարատ', 'village', 39.9547, 44.6819),
  s('Pokr Vedi', 'Փոքր Վեդի', 'Vedi', 'Վեդի', 'Ararat', 'Արարատ', 'village', 39.9333, 44.7167),
  s('Lusashogh', 'Լուսաշող', 'Vedi', 'Վեդի', 'Ararat', 'Արարատ', 'village', 39.8833, 44.7500),
  s('Urtsadzor', 'Ուրցաձոր', 'Vedi', 'Վեդի', 'Ararat', 'Արարատ', 'village', 39.9000, 44.7833),
  s('Shaghap', 'Շաղապ', 'Vedi', 'Վեդի', 'Ararat', 'Արարատ', 'village', 39.8667, 44.7333),

  // --- Armavir ---
  s('Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'city', 40.0853, 44.4297),
  s('Vagharshapat', 'Վաղարշապատ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'city', 40.1647, 44.2914),
  s('Metsamor', 'Մեծամոր', 'Metsamor', 'Մեծամոր', 'Armavir', 'Արմավիր', 'city', 40.1394, 44.3894),
  s('Echmiadzin', 'Էջմիածին', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'city', 40.1647, 44.2914),
  s('Mrgashat', 'Մրգաշատ', 'Mrgashat', 'Մրգաշատ', 'Armavir', 'Արմավիր', 'village', 40.1358, 44.3514),
  s('Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0853, 44.4297),
  s('Aratashen', 'Արատաշեն', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.1111, 44.3861),
  s('Mrgastan', 'Մրգաստան', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0944, 44.3889),
  s('Jrahovit', 'Ջրահովիտ', 'Masis', 'Մասիս', 'Ararat', 'Արարատ', 'village', 40.0872, 44.4314),
  s('Argina', 'Արգինա', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.1311, 44.4758),
  s('Yeghegnut', 'Եղեգնուտ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.1033, 44.4667),
  s('Griboyedov', 'Գրիբոյեդով', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0708, 43.9050),
  s('Aygk', 'Այգկ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.0939, 44.3244),
  s('Aknashen', 'Ակնաշեն', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1267, 44.3403),
  s('Alashkert', 'Ալաշկերտ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1147, 44.3058),
  s('Aragats', 'Արագած', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.0756, 44.3211),
  s('Arevian', 'Արևյան', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1294, 44.2958),
  s('Ayan', 'Այան', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1308, 44.3050),
  s('Geghakert', 'Գեղակերտ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1267, 44.2944),
  s('Getashen', 'Գետաշեն', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1233, 44.2425),
  s('Khoronk', 'Խոռոնք', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1133, 44.3667),
  s('Mets Vagharshapat', 'Մեծ Վաղարշապատ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1556, 44.2889),
  s('Musa Ler', 'Մուսա Լեռ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.0814, 44.2578),
  s('Ptghunt', 'Փտղունք', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.1547, 44.2917),
  s('Taronik', 'Տարոնիկ', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.0872, 44.2642),
  s('Vardanashen', 'Վարդանաշեն', 'Vagharshapat', 'Վաղարշապատ', 'Armavir', 'Արմավիր', 'village', 40.0833, 44.2667),
  s('Shahumyan', 'Շահումյան', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0586, 44.4356),
  s('Hushakert', 'Հուշակերտ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0644, 44.4531),
  s('Jrarat', 'Ջրառատ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0689, 44.4578),
  s('Lernamerdz', 'Լեռնամերձ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0556, 44.4389),
  s('Norapat', 'Նորապատ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0478, 44.4308),
  s('Nor Armavir', 'Նոր Արմավիր', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0669, 44.4472),
  s('Tandzut', 'Տանձուտ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0611, 44.4611),
  s('Yeghegnut', 'Եղեգնուտ', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.1033, 44.4667),

  // --- Gegharkunik ---
  s('Gavar', 'Գավառ', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'city', 40.3547, 45.1256),
  s('Sevan', 'Սևան', 'Sevan', 'Սևան', 'Gegharkunik', 'Գեղարքունիք', 'city', 40.5333, 44.9500),
  s('Martuni', 'Մարտունի', 'Martuni', 'Մարտունի', 'Gegharkunik', 'Գեղարքունիք', 'city', 40.1311, 45.0283),
  s('Vardenis', 'Վարդենիս', 'Vardenis', 'Վարդենիս', 'Gegharkunik', 'Գեղարքունիք', 'city', 40.1722, 45.7694),
  s('Chambarak', 'Ճամբարակ', 'Chambarak', 'Ճամբարակ', 'Gegharkunik', 'Գեղարքունիք', 'city', 40.6269, 45.3786),
  s('Tsovinar', 'Ծովինար', 'Sevan', 'Սևան', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.4583, 44.9833),
  s('Shorzha', 'Շորժա', 'Sevan', 'Սևան', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.5431, 45.1453),
  s('Artanish', 'Արտանիշ', 'Sevan', 'Սևան', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.5667, 45.1917),
  s('Noratus', 'Նորատուս', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.3769, 45.1750),
  s('Tsovagyugh', 'Ծովագյուղ', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.4133, 45.1556),
  s('Lchashen', 'Լճաշեն', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.4486, 45.1283),
  s('Semyonovka', 'Սեմյոնովկա', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.4200, 45.0900),
  s('Astkhadzor', 'Աստղաձոր', 'Martuni', 'Մարտունի', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.1397, 45.0881),
  s('Karchaghbyur', 'Կարճաղբյուր', 'Martuni', 'Մարտունի', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.1567, 45.1100),
  s('Geghamasar', 'Գեղամասար', 'Vardenis', 'Վարդենիս', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.1817, 45.6583),
  s('Sotk', 'Սոթք', 'Vardenis', 'Վարդենիս', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.1783, 45.8667),
  s('Madina', 'Մադինա', 'Vardenis', 'Վարդենիս', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.1750, 45.7056),
  s('Kut', 'Կուտ', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.4117, 45.1764),
  s('Pambak', 'Պամբակ', 'Chambarak', 'Ճամբարակ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.6578, 45.2833),
  s('Sarukhan', 'Սարուխան', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.3389, 45.1861),
  s('Tatley', 'Թթլջուր', 'Chambarak', 'Ճամբարակ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.5806, 45.3347),
  s('Kutakan', 'Կուտական', 'Chambarak', 'Ճամբարակ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.6444, 45.3444),
  s('Hatsarat', 'Հացառատ', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.3372, 45.1236),
  s('Gandzak', 'Գանձակ', 'Gavar', 'Գավառ', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.3417, 45.1319),

  // --- Kotayk ---
  s('Hrazdan', 'Հրազդան', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'city', 40.4972, 44.7658),
  s('Tsaghkadzor', 'Ծաղկաձոր', 'Tsaghkadzor', 'Ծաղկաձոր', 'Kotayk', 'Կոտայք', 'city', 40.5236, 44.7022),
  s('Charentsavan', 'Չարենցավան', 'Charentsavan', 'Չարենցավան', 'Kotayk', 'Կոտայք', 'city', 40.3825, 44.6750),
  s('Yeghvard', 'Եղվարդ', 'Yeghvard', 'Եղվարդ', 'Kotayk', 'Կոտայք', 'city', 40.3292, 44.6042),
  s('Byureghavan', 'Բյուրեղավան', 'Byureghavan', 'Բյուրեղավան', 'Kotayk', 'Կոտայք', 'city', 40.3278, 44.6250),
  s('Nor Hachn', 'Նոր Հաճն', 'Nor Hachn', 'Նոր Հաճն', 'Kotayk', 'Կոտայք', 'city', 40.4056, 44.5889),
  s('Garni', 'Գառնի', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.0914, 44.7447),
  s('Geghard', 'Գեղարդ', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.1408, 44.7947),
  s('Arzni', 'Արզնի', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.2900, 44.5800),
  s('Akunk', 'Ակունք', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.3067, 44.6333),
  s('Mayakovski', 'Մայակովսկի', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.2708, 44.5975),
  s('Argel', 'Արգել', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.3147, 44.5847),
  s('Buzhakan', 'Բուժական', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.3586, 44.6006),
  s('Dzoraghbyur', 'Ձորաղբյուր', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.1653, 44.7706),
  s('Geghashen', 'Գեղաշեն', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.2847, 44.6658),
  s('Getamej', 'Գետամեջ', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.4611, 44.7333),
  s('Zovaber', 'Զովաբեր', 'Sevan', 'Սևան', 'Gegharkunik', 'Գեղարքունիք', 'village', 40.5833, 44.9500),
  s('Sevsar', 'Սևսար', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.5278, 44.7847),
  s('Meghradzor', 'Մեղրաձոր', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.5511, 44.6997),
  s('Ahbyur', 'Ահբյուր', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.5208, 44.7539),
  s('Solak', 'Սոլակ', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.4797, 44.6386),
  s('Hovk', 'Հովք', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.6133, 44.7786),
  s('Fantan', 'Ֆանտան', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.5833, 44.7833),
  s('Arzakend', 'Արզակենդ', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.5875, 44.7708),
  s('Medovka', 'Մեդովկա', 'Hrazdan', 'Հրազդան', 'Kotayk', 'Կոտայք', 'village', 40.5917, 44.7625),
  s('Ptghni', 'Փթղնի', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.2386, 44.5950),
  s('Kapanakshion', 'Կապանակշյոն', 'Kotayk', 'Կոտայք', 'Kotayk', 'Կոտայք', 'village', 40.2375, 44.6000),
  s('Zoravan', 'Զորավան', 'Yeghvard', 'Եղվարդ', 'Kotayk', 'Կոտայք', 'village', 40.3067, 44.5567),
  s('Katnaghbyur', 'Կաթնաղբյուր', 'Yeghvard', 'Եղվարդ', 'Kotayk', 'Կոտայք', 'village', 40.3389, 44.5897),

  // --- Lori ---
  s('Vanadzor', 'Վանաձոր', 'Vanadzor', 'Վանաձոր', 'Lori', 'Լոռի', 'city', 40.8147, 44.4914),
  s('Alaverdi', 'Ալավերդի', 'Alaverdi', 'Ալավերդի', 'Lori', 'Լոռի', 'city', 41.0750, 44.6431),
  s('Stepanavan', 'Ստեփանավան', 'Stepanavan', 'Ստեփանավան', 'Lori', 'Լոռի', 'city', 40.9872, 44.4317),
  s('Spitak', 'Սպիտակ', 'Spitak', 'Սպիտակ', 'Lori', 'Լոռի', 'city', 40.8278, 44.2822),
  s('Tashir', 'Տաշիր', 'Tashir', 'Տաշիր', 'Lori', 'Լոռի', 'city', 41.0856, 44.2622),
  s('Akhuryan', 'Ախուրյան', 'Spitak', 'Սպիտակ', 'Lori', 'Լոռի', 'village', 40.8583, 44.3083),
  s('Gugark', 'Գուգարք', 'Vanadzor', 'Վանաձոր', 'Lori', 'Լոռի', 'village', 40.7967, 44.5800),
  s('Vanadzor', 'Վանաձոր', 'Vanadzor', 'Վանաձոր', 'Lori', 'Լոռի', 'village', 40.8147, 44.4914),
  s('Haghpat', 'Հաղպատ', 'Alaverdi', 'Ալավերդի', 'Lori', 'Լոռի', 'village', 41.0967, 44.7097),
  s('Sanahin', 'Սանահին', 'Alaverdi', 'Ալավերդի', 'Lori', 'Լոռի', 'village', 41.0933, 44.6653),
  s('Odzun', 'Օձուն', 'Alaverdi', 'Ալավերդի', 'Lori', 'Լոռի', 'village', 41.0372, 44.6394),
  s('Koges', 'Կոգես', 'Alaverdi', 'Ալավերդի', 'Lori', 'Լոռի', 'village', 41.0547, 44.6406),
  s('Ardvi', 'Արդվի', 'Stepanavan', 'Ստեփանավան', 'Lori', 'Լոռի', 'village', 41.0239, 44.4178),
  s('Kurtan', 'Կուրտան', 'Stepanavan', 'Ստեփանավան', 'Lori', 'Լոռի', 'village', 41.0367, 44.3794),
  s('Gargar', 'Գարգառ', 'Stepanavan', 'Ստեփանավան', 'Lori', 'Լոռի', 'village', 41.0375, 44.4822),
  s('Hartagyugh', 'Հարթագյուղ', 'Stepanavan', 'Ստեփանավան', 'Lori', 'Լոռի', 'village', 41.0008, 44.3853),
  s('Gyulagarak', 'Գյուլագարակ', 'Stepanavan', 'Ստեփանավան', 'Lori', 'Լոռի', 'village', 41.0228, 44.4244),
  s('Sverdlov', 'Սվերդլով', 'Tashir', 'Տաշիր', 'Lori', 'Լոռի', 'village', 41.1167, 44.2583),
  s('Sarchapet', 'Սարչապետ', 'Tashir', 'տաշիր', 'Lori', 'Լոռի', 'village', 41.1156, 44.1858),
  s('Katnarat', 'Կաթնառատ', 'Tashir', 'Տաշիր', 'Lori', 'Լոռի', 'village', 41.0700, 44.2256),
  s('Ghazanchy', 'Ղազանչի', 'Spitak', 'Սպիտակ', 'Lori', 'Լոռի', 'village', 40.7806, 44.3567),
  s('Geghasar', 'Գեղասար', 'Spitak', 'Սպիտակ', 'Lori', 'Լոռի', 'village', 40.7833, 44.3500),
  s('Saramej', 'Սարամեջ', 'Spitak', 'Սպիտակ', 'Lori', 'Լոռի', 'village', 40.7728, 44.3742),
  s('Lernantsk', 'Լեռնանցք', 'Spitak', 'Սպիտակ', 'Lori', 'Լոռի', 'village', 40.7619, 44.2719),
  s('Nalbandyan', 'Նալբանդյան', 'Armavir', 'Արմավիր', 'Armavir', 'Արմավիր', 'village', 40.0506, 44.3728),

  // --- Shirak ---
  s('Gyumri', 'Գյումրի', 'Gyumri', 'Գյումրի', 'Shirak', 'Շիրակ', 'city', 40.7942, 43.8453),
  s('Artik', 'Արթիկ', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'city', 40.6403, 43.7319),
  s('Maralik', 'Մարալիկ', 'Maralik', 'Մարալիկ', 'Shirak', 'Շիրակ', 'city', 40.5728, 43.8217),
  s('Ani', 'Անի', 'Ani', 'Անի', 'Shirak', 'Շիրակ', 'community', 40.5086, 43.5750),
  s('Anipemza', 'Անիպեմզա', 'Ani', 'Անի', 'Shirak', 'Շիրակ', 'village', 40.5156, 43.5736),
  s('Bayandur', 'Բայանդուր', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'village', 40.6097, 43.7556),
  s('Geghanist', 'Գեղանիստ', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'village', 40.5972, 43.7556),
  s('Ghoghan', 'Ղողան', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'village', 40.5667, 43.7667),
  s('Hovit', 'Հովիտ', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'village', 40.6000, 43.7333),
  s('Kaps', 'Կապս', 'Gyumri', 'Գյումրի', 'Shirak', 'Շիրակ', 'village', 40.7556, 43.7833),
  s('Musayelyan', 'Մուսայելյան', 'Gyumri', 'Գյումրի', 'Shirak', 'Շիրակ', 'village', 40.7964, 43.7717),
  s('Beniamin', 'Բենիամին', 'Gyumri', 'Գյումրի', 'Shirak', 'Շիրակ', 'village', 40.8475, 43.7736),
  s('Arevik', 'Արևիկ', 'Gyumri', 'Գյումրի', 'Shirak', 'Շիրակ', 'village', 40.8253, 43.7981),
  s('Krashen', 'Կրաշեն', 'Gyumri', 'Գյումրի', 'Shirak', 'Շիրակ', 'village', 40.7906, 43.7642),
  s('Azatan', 'Ազատան', 'Azatan', 'Ազատան', 'Shirak', 'Շիրակ', 'village', 40.6836, 43.8308),
  s('Marmashen', 'Մարմաշեն', 'Marmashen', 'Մարմաշեն', 'Shirak', 'Շիրակ', 'village', 40.7469, 43.7953),
  s('Vahramaberd', 'Վահրամաբերդ', 'Ani', 'Անի', 'Shirak', 'Շիրակ', 'village', 40.5675, 43.5953),
  s('Dzorakap', 'Ձորակապ', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'village', 40.6433, 43.7000),
  s('Lanjik', 'Լանջիկ', 'Artik', 'Արթիկ', 'Shirak', 'Շիրակ', 'village', 40.5894, 43.8281),
  s('Pemzashen', 'Պեմզաշեն', 'Maralik', 'Մարալիկ', 'Shirak', 'Շիրակ', 'village', 40.6017, 43.8508),
  s('Hatsik', 'Հացիկ', 'Maralik', 'Մարալիկ', 'Shirak', 'Շիրակ', 'village', 40.5783, 43.8600),
  s('Yardenis', 'Յարդենիս', 'Maralik', 'Մարալիկ', 'Shirak', 'Շիրակ', 'village', 40.5672, 43.8550),
  s('Aghvorik', 'Աղվորիկ', 'Maralik', 'Մարալիկ', 'Shirak', 'Շիրակ', 'village', 40.6211, 43.8650),
  s('Jajur', 'Ջաջուր', 'Maralik', 'Մարալիկ', 'Shirak', 'Շիրակ', 'village', 40.5650, 43.7631),

  // --- Syunik ---
  s('Kapan', 'Կապան', 'Kapan', 'Կապան', 'Syunik', 'Սյունիք', 'city', 39.2083, 46.4036),
  s('Goris', 'Գորիս', 'Goris', 'Գորիս', 'Syunik', 'Սյունիք', 'city', 39.5097, 46.3447),
  s('Sisian', 'Սիսիան', 'Sisian', 'Սիսիան', 'Syunik', 'Սյունիք', 'city', 39.4089, 45.9211),
  s('Meghri', 'Մեղրի', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'city', 38.8958, 46.1706),
  s('Kajaran', 'Քաջարան', 'Kajaran', 'Քաջարան', 'Syunik', 'Սյունիք', 'city', 39.1614, 46.4028),
  s('Agarak', 'Ագարակ', 'Agarak', 'Ագարակ', 'Syunik', 'Սյունիք', 'city', 38.9133, 46.1972),
  s('Dastakert', 'Դաստակերտ', 'Dastakert', 'Դաստակերտ', 'Syunik', 'Սյունիք', 'city', 39.2306, 45.7389),
  s('Tatev', 'Տատև', 'Tatev', 'Տատև', 'Syunik', 'Սյունիք', 'village', 39.3914, 46.2572),
  s('Tandzaver', 'Տանձավեր', 'Sisian', 'Սիսիան', 'Syunik', 'Սյունիք', 'village', 39.3683, 45.9450),
  s('Shaki', 'Շաքի', 'Sisian', 'Սիսիան', 'Syunik', 'Սյունիք', 'village', 39.4272, 45.9164),
  s('Vorotnavan', 'Որոտնավան', 'Sisian', 'Սիսիան', 'Syunik', 'Սյունիք', 'village', 39.4189, 45.9325),
  s('Brnakot', 'Բռնակոթ', 'Sisian', 'Սիսիան', 'Syunik', 'Սյունիք', 'village', 39.4283, 45.9425),
  s('Nzhdeh', 'Նժդեհ', 'Kapan', 'Կապան', 'Syunik', 'Սյունիք', 'village', 39.2050, 46.3750),
  s('Kajaran', 'Քաջարան', 'Kajaran', 'Քաջարան', 'Syunik', 'Սյունիք', 'village', 39.1614, 46.4028),
  s('Khdrants', 'Խդրանց', 'Kapan', 'Կապան', 'Syunik', 'Սյունիք', 'village', 39.1764, 46.3303),
  s('Vaghatin', 'Վաղատին', 'Sisian', 'Սիսիան', 'Syunik', 'Սյունիք', 'village', 39.3889, 45.9800),
  s('Bndza', 'Բնձա', 'Goris', 'Գորիս', 'Syunik', 'Սյունիք', 'village', 39.5389, 46.3372),
  s('Khndzoresk', 'Խնձորեսկ', 'Goris', 'Գորիս', 'Syunik', 'Սյունիք', 'village', 39.5422, 46.3775),
  s('Halidzor', 'Հալիձոր', 'Goris', 'Գորիս', 'Syunik', 'Սյունիք', 'village', 39.4456, 46.2533),
  s('Aghvani', 'Աղվանի', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'village', 38.9333, 46.1833),
  s('Alvank', 'Ալվանք', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'village', 38.9500, 46.1667),
  s('Shvanidzor', 'Շվանիձոր', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'village', 38.9050, 46.2519),
  s('Nrnadzor', 'Նռնաձոր', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'village', 38.9239, 46.2433),
  s('Tsav', 'Ցավ', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'village', 38.9300, 46.2850),
  s('Shikahogh', 'Շիկահող', 'Meghri', 'Մեղրի', 'Syunik', 'Սյունիք', 'village', 38.9106, 46.3050),

  // --- Vayots Dzor ---
  s('Yeghegnadzor', 'Եղեգնաձոր', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'city', 39.8286, 45.3283),
  s('Vayk', 'Վայք', 'Vayk', 'Վայք', 'Vayots Dzor', 'Վայոց ձոր', 'city', 39.6878, 45.4600),
  s('Jermuk', 'Ջերմուկ', 'Jermuk', 'Ջերմուկ', 'Vayots Dzor', 'Վայոց ձոր', 'city', 39.8336, 45.4722),
  s('Areni', 'Արենի', 'Areni', 'Արենի', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7447, 45.2256),
  s('Gnishik', 'Գնիշիկ', 'Areni', 'Արենի', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7817, 45.2222),
  s('Arpa', 'Արփա', 'Areni', 'Արենի', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7400, 45.2700),
  s('Amaghu', 'Ամաղու', 'Areni', 'Արենի', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7550, 45.2300),
  s('Khachik', 'Խաչիկ', 'Areni', 'Արենի', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7750, 45.2000),
  s('Rrindzor', 'Ռնդձոր', 'Areni', 'Արենի', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7583, 45.2400),
  s('Mozrov', 'Մոզրով', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.7917, 45.3000),
  s('Kechut', 'Կեչուտ', 'Jermuk', 'Ջերմուկ', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.8083, 45.4750),
  s('Hermon', 'Հերմոն', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.8450, 45.3867),
  s('Gladzor', 'Գլաձոր', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.8347, 45.3522),
  s('Vardahovit', 'Վարդահովիտ', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.8500, 45.4000),
  s('Martiros', 'Մարտիրոս', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.8200, 45.4167),
  s('Sers', 'Սերս', 'Vayk', 'Վայք', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.6667, 45.4333),
  s('Azatek', 'Ազատեկ', 'Vayk', 'Վայք', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.6833, 45.5033),
  s('Zarritap', 'Զառիթափ', 'Vayk', 'Վայք', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.6500, 45.4833),
  s('Karmashen', 'Կարմաշեն', 'Vayk', 'Վայք', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.6700, 45.5200),
  s('Gomk', 'Գոմք', 'Vayk', 'Վայք', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.6542, 45.5444),
  s('Martiros', 'Մարտիրոս', 'Yeghegnadzor', 'Եղեգնաձոր', 'Vayots Dzor', 'Վայոց ձոր', 'village', 39.8200, 45.4167),

  // --- Tavush ---
  s('Ijevan', 'Իջևան', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'city', 40.8786, 45.1492),
  s('Dilijan', 'Դիլիջան', 'Dilijan', 'Դիլիջան', 'Tavush', 'Տավուշ', 'city', 40.7436, 44.8631),
  s('Noyemberyan', 'Նոյեմբերյան', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'city', 41.0936, 45.0725),
  s('Beravan', 'Բերավան', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'village', 41.1167, 45.0667),
  s('Koghb', 'Կողբ', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'village', 41.0667, 44.9500),
  s('Tavush', 'Տավուշ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8200, 45.0800),
  s('Haghartsin', 'Հաղարծին', 'Dilijan', 'Դիլիջան', 'Tavush', 'Տավուշ', 'village', 40.7792, 44.9400),
  s('Gosh', 'Գոշ', 'Dilijan', 'Դիլիջան', 'Tavush', 'Տավուշ', 'village', 40.7528, 44.8667),
  s('Aghavnavank', 'Աղավնավանք', 'Dilijan', 'Դիլիջան', 'Tavush', 'Տավուշ', 'village', 40.7689, 44.8506),
  s('Hovk', 'Հովք', 'Dilijan', 'Դիլիջան', 'Tavush', 'Տավուշ', 'village', 40.7786, 44.8342),
  s('Sarigyugh', 'Սարիգյուղ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.9133, 45.1011),
  s('Berdavan', 'Բերդավան', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'village', 41.1333, 45.0667),
  s('Voskepar', 'Ոսկեպար', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'village', 41.1100, 45.1311),
  s('Vazashen', 'Վազաշեն', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8597, 45.1836),
  s('Lusahovit', 'Լուսահովիտ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8833, 45.1350),
  s('Kirants', 'Կիրանց', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8717, 45.2625),
  s('Achajur', 'Աչաջուր', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8486, 45.1639),
  s('Ditavan', 'Դիտավան', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8600, 45.2500),
  s('Navur', 'Նավուր', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8347, 45.2764),
  s('Seryoghyali', 'Սերյողալի', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8333, 45.2667),
  s('Berkaberd', 'Բերկաբերդ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8572, 45.2247),
  s('Khtsaberd', 'Խծաբերդ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8417, 45.2417),
  s('Enokavan', 'Ենոքավան', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8489, 45.2411),
  s('Debetavan', 'Դեբետավան', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8667, 45.0833),
  s('Haghtanak', 'Հաղթանակ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8450, 45.0764),
  s('Getahovit', 'Գետահովիտ', 'Ijevan', 'Իջևան', 'Tavush', 'Տավուշ', 'village', 40.8647, 45.1278),
  s('Varagavan', 'Վարագավան', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'village', 41.1000, 45.1000),
  s('Zuzakaberd', 'Զուզակաբերդ', 'Noyemberyan', 'Նոյեմբերյան', 'Tavush', 'Տավուշ', 'village', 41.0833, 45.1167),
];

// Build unique lists for cascading dropdowns
export function getRegions(lang: 'en' | 'hy'): { name: string; key: string }[] {
  const seen = new Map<string, { name: string; key: string }>();
  for (const loc of armeniaLocations) {
    const key = loc.regionEn;
    if (!seen.has(key)) {
      seen.set(key, { name: lang === 'hy' ? loc.regionHy : loc.regionEn, key });
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getCommunities(regionEn: string, lang: 'en' | 'hy'): { name: string; key: string }[] {
  const seen = new Map<string, { name: string; key: string }>();
  for (const loc of armeniaLocations) {
    if (loc.regionEn !== regionEn) continue;
    const key = loc.communityEn;
    if (!seen.has(key)) {
      seen.set(key, { name: lang === 'hy' ? loc.communityHy : loc.communityEn, key });
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getSettlements(regionEn: string, communityEn: string, lang: 'en' | 'hy'): Settlement[] {
  return armeniaLocations
    .filter((loc) => loc.regionEn === regionEn && loc.communityEn === communityEn)
    .sort((a, b) => (lang === 'hy' ? a.nameHy.localeCompare(b.nameHy) : a.nameEn.localeCompare(b.nameEn)));
}

export function searchSettlements(query: string, lang: 'en' | 'hy'): Settlement[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // Support "Name, Region" format
  const parts = q.split(',').map((p) => p.trim().toLowerCase());
  const nameQ = parts[0];
  const regionQ = parts[1] ?? '';

  return armeniaLocations
    .filter((loc) => {
      const name = (lang === 'hy' ? loc.nameHy : loc.nameEn).toLowerCase();
      const region = (lang === 'hy' ? loc.regionHy : loc.regionEn).toLowerCase();
      const community = (lang === 'hy' ? loc.communityHy : loc.communityEn).toLowerCase();

      const nameMatch = name.includes(nameQ);
      const regionMatch = !regionQ || region.includes(regionQ) || community.includes(regionQ);

      return nameMatch && regionMatch;
    })
    .sort((a, b) => {
      const aName = (lang === 'hy' ? a.nameHy : a.nameEn).toLowerCase();
      const bName = (lang === 'hy' ? b.nameHy : b.nameEn).toLowerCase();
      const aStarts = aName.startsWith(nameQ) ? 0 : 1;
      const bStarts = bName.startsWith(nameQ) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return aName.localeCompare(bName);
    })
    .slice(0, 20);
}

export function getSettlementById(id: string): Settlement | undefined {
  return armeniaLocations.find((loc) => loc.id === id);
}
