
import { FlashCard, Topic } from './types';

export const TOPICS: Topic[] = [
  { id: 1, title: "Astronomiya asoslari", color: "blue", gradient: "from-blue-600 to-cyan-500", accent: "text-blue-400" },
  { id: 2, title: "Sutkalik harakatlar", color: "purple", gradient: "from-purple-600 to-indigo-500", accent: "text-purple-400" },
  { id: 3, title: "Yer aylanishi va Fuko", color: "emerald", gradient: "from-emerald-600 to-teal-500", accent: "text-emerald-400" },
  { id: 4, title: "Osmon koordinatalari", color: "amber", gradient: "from-amber-500 to-orange-600", accent: "text-amber-400" },
  { id: 5, title: "Ekliptika va Quyosh", color: "rose", gradient: "from-rose-600 to-pink-500", accent: "text-rose-400" },
  { id: 6, title: "Ekvatorial koordinatalar", color: "fuchsia", gradient: "from-fuchsia-600 to-purple-500", accent: "text-fuchsia-400" },
  { id: 7, title: "Yulduzlarning xaritalari", color: "cyan", gradient: "from-cyan-600 to-sky-500", accent: "text-cyan-400" },
  { id: 8, title: "Yulduzlarning ko‘rinma kattaliklari", color: "lime", gradient: "from-lime-500 to-emerald-600", accent: "text-lime-400" }
];

export const FLASHCARDS_DATA: FlashCard[] = [
  // Topic 1
  { id: 1, topicId: 1, question: "Astronomiya va fizika fanlari o‘rtasidagi bog‘liqlik nimada?", answer: "Osmon jismlari harakatini fizika qonunlari orqali tushuntiradi." },
  { id: 2, topicId: 1, question: "Geosentrik nazariya nimani tushuntirgan?", answer: "Yer olam markazi deb hisoblangan, lekin xato edi." },
  { id: 3, topicId: 1, question: "Eratosten Yer o‘lchamini qanday aniqlagan?", answer: "Quyosh burchagi va meridian yoyi orqali." },
  { id: 4, topicId: 1, question: "Mirzo Ulug‘bek rasadxonasining ahamiyati?", answer: "Aniq yulduzlar jadvali va yuqori aniqlikdagi kuzatishlar." },
  { id: 5, topicId: 1, question: "Astronomiyaning kimyo va biologiya bilan bog‘liqligi?", answer: "Kimyoviy tarkib va hayotning kelib chiqishini o‘rganadi." },
  // Topic 2
  { id: 6, topicId: 2, question: "Yulduzlarning sharqdan g‘arbga harakati nimaning natijasi?", answer: "Yerning o‘z o‘qi atrofida aylanishi." },
  { id: 7, topicId: 2, question: "Nega yulduzlar turli balandlikda ko‘rinadi?", answer: "Kuzatuvchi joylashuvi va Yer aylanishi sababli." },
  { id: 8, topicId: 2, question: "Qutb yulduzi atrofidagi aylana chiziqlar nimani ko‘rsatadi?", answer: "Osmon sferasining sutkalik aylanishini." },
  { id: 9, topicId: 2, question: "Oy nega yulduzlarga nisbatan joyini o‘zgartiradi?", answer: "Oy Yer atrofida haqiqiy harakat qilgani uchun." },
  { id: 10, topicId: 2, question: "Quyoshning chiqish nuqtasi nega yil davomida o‘zgaradi?", answer: "Yer o‘qining og‘maligi va harakati sababli." },
  // Topic 3
  { id: 11, topicId: 3, question: "Yulduzlarning har soatda 15° siljishi nimani anglatadi?", answer: "Yerning 24 soatda bir marta aylanishini." },
  { id: 12, topicId: 3, question: "Fuko mayatnigi tajribasida nima kuzatiladi?", answer: "Yer aylangani sababli mayatnik izi buriladi." },
  { id: 13, topicId: 3, question: "Jismlarning sharqqa og‘ib tushishi nimani isbotlaydi?", answer: "Yerning o‘z o‘qi atrofida aylanishini." },
  { id: 14, topicId: 3, question: "Sutka nima asosida aniqlanadi?", answer: "Yerning o‘z o‘qi atrofida bir marta aylanishi." },
  { id: 15, topicId: 3, question: "Nega mayatnik tebranish tekisligi o‘zgarmaydi?", answer: "Inersiya qonuni sababli o‘z tekisligini saqlaydi." },
  // Topic 4
  { id: 16, topicId: 4, question: "Osmon sferasi nima?", answer: "Yulduzlar joylashgan deb tasavvur qilinadigan shartli sfera." },
  { id: 17, topicId: 4, question: "Zenit va nadir qanday nuqtalar?", answer: "Zenit — tepada, nadir — unga qarama-qarshi pastda." },
  { id: 18, topicId: 4, question: "Osmon meridiani nima?", answer: "Zenit va olam qutblari orqali o‘tuvchi katta aylana." },
  { id: 19, topicId: 4, question: "Ekvatorial koordinatalar qaysilar?", answer: "To‘g‘ri chiqish (α) va og‘ish (δ)." },
  { id: 20, topicId: 4, question: "Soat burchagi qanday o‘lchanadi?", answer: "Osmon meridianidan yoritgichgacha bo‘lgan yoy." },
  // Topic 5
  { id: 21, topicId: 5, question: "Ekliptika nima?", answer: "Quyoshning yulduzlar orasidagi yillik ko‘rinma yo‘li." },
  { id: 22, topicId: 5, question: "Ekliptika osmon ekvatoriga necha gradus og‘gan?", answer: "23°26′ burchak ostida og‘gan." },
  { id: 23, topicId: 5, question: "Tengkunlik nima?", answer: "Kun va tun davomiyligi teng bo‘ladigan vaqt." },
  { id: 24, topicId: 5, question: "Quyoshning yillik harakati aslida nimaning natijasi?", answer: "Yerning Quyosh atrofida aylanishi natijasi." },
  { id: 25, topicId: 5, question: "Zodiak soha nima?", answer: "Ekliptika bo‘ylab joylashgan yulduz turkumlari." },
  // Topic 6
  { id: 26, topicId: 6, question: "Ekvatorial koordinatalar sistemasida yoritgichning o‘rni qaysi koordinatalar bilan aniqlanadi?", answer: "To‘g‘ri chiqish α (alfa) va og‘ish δ (delta) koordinatalari bilan." },
  { id: 27, topicId: 6, question: "To‘g‘ri chiqish (α) qanday aniqlanadi?", answer: "Bahorgi tengkunlik nuqtasidan yoritgichning og‘ish aylanasining osmon ekvatori bilan kesishgan nuqtasigacha bo‘lgan yoy bilan." },
  { id: 28, topicId: 6, question: "Og‘ish (δ) nima va u qanday o‘lchanadi?", answer: "Yoritgichning osmon ekvatoridan burchak masofasi bo‘lib, −90° dan +90° gacha o‘lchanadi." },
  { id: 29, topicId: 6, question: "Soat burchagi (t) nima?", answer: "Osmon meridianining janubiy qismidan yoritgichning og‘ish aylanasigacha bo‘lgan yoydir." },
  { id: 30, topicId: 6, question: "Yoy o‘lchovi va vaqt o‘lchovi orasidagi bog‘lanish qanday?", answer: "360° = 24 soat, 15° = 1 soat, 1° = 4 minut." },
  // Topic 7
  { id: 31, topicId: 7, question: "Yulduz xaritasi nima?", answer: "Osmondagi yulduzlar joyini ko‘rsatadigan chizma." },
  { id: 32, topicId: 7, question: "Vertikal chiziqlar nimani bildiradi?", answer: "To‘g‘ri chiqish (α) ni bildiradi." },
  { id: 33, topicId: 7, question: "Gorizontal chiziqlar nimani bildiradi?", answer: "Og‘ish (δ) ni bildiradi." },
  { id: 34, topicId: 7, question: "α qanday o‘lchanadi?", answer: "Soat bilan (soat birligida)." },
  { id: 35, topicId: 7, question: "δ qanday o‘lchanadi?", answer: "Daraja (°) bilan." },
  // Topic 8
  { id: 36, topicId: 8, question: "Yulduz kattaligi (m) nima?", answer: "Yulduzning qanchalik yorqin ko‘rinishini bildiradi." },
  { id: 37, topicId: 8, question: "Qaysi yulduz yorqinroq: m=1 yoki m=5?", answer: "m=1 yorqinroq." },
  { id: 38, topicId: 8, question: "5 kattalik farqi nimani bildiradi?", answer: "100 marta yorqinlik farqi." },
  { id: 39, topicId: 8, question: "1 kattalik farqi nechaga teng?", answer: "2,5 marta." },
  { id: 40, topicId: 8, question: "Pogson formulasi nima?", answer: "Yorqinlik bilan kattalik orasidagi bog‘lanish formulasi." }
];
