import {
  arrowLeftCircle,
  arrowRightCircle,
  bookmarkPlus,
  boxArrowInRight,
  bucket,
  calendar2Event,
  calendar4Event,
  cardList,
  checkCircleFill,
  chevronCompactUp,
  clipboard2,
  clipboard2Fill,
  emojiLaughing,
  envelope,
  exclamationTriangleFill,
  geoAlt,
  geoFill,
  infoCircleFill,
  key,
  lock,
  pencilSquare,
  people,
  peopleFill,
  personCircle,
  personHearts,
  personWheelchair,
  personWorkspace,
  piggyBank,
  pinMap,
  plus as bsPlus,
  plusCircle,
  power,
  save as bsSave,
  save2,
  shieldFill,
  shieldLock,
  subtract,
  tag,
  telephone,
  trash3,
  unlock,
  xCircleFill,
  xOctagonFill,
  xSquare
} from '../bootstrap-icons/bootstrap-icons';

function barredIcon(icon: string, viewBowSize = 16): string {
  return icon.replace(
    '</svg>',
    `<line x1="${viewBowSize}" y1="0" x2="0" y2="${viewBowSize}" stroke="currentColor" stroke-width="1" /></svg>`
  );
}

export const add = plusCircle;
export const date = calendar4Event;
export const location = pinMap;
export const appointmentLocation = geoFill;
export const animator = emojiLaughing;
export const roomToBook = bookmarkPlus;
export const label = tag;
export const associatedOrganization = peopleFill;
export const bookingMandatory = telephone;
export const bookingNotMandatory = barredIcon(telephone);
export const membersOnly = lock;
export const notMembersOnly = unlock;
export const paymentRequired = piggyBank;
export const paymentNotRequired = barredIcon(piggyBank);
export const participants = people;
export const edit = pencilSquare;
export const accessible = personWheelchair;
export const notAccessible = barredIcon(personWheelchair);
export const trash = trash3;
export const duplicate = subtract;
export const equipment = bucket;
export const accessibleToChildren = personHearts;
export const notAccessibleToChildren = barredIcon(personHearts);
export const save = bsSave;
export const cancel = xSquare;
export const saveAsDraft = save2;
export const cancelled = xCircleFill;
export const notCancelled = checkCircleFill;
export const info = infoCircleFill;
export const login = boxArrowInRight;
export const logout = power;
export const activities = cardList;
export const calendar = calendar2Event;
export const collapsed = chevronCompactUp;
export const users = personWorkspace;
export const user = personCircle;
export const changePassword = key;
export const exports = clipboard2;
export const map = geoAlt;
export const warning = exclamationTriangleFill;
export const resetPasswordEmail = envelope;
export const resetPasswordLink = shieldLock;
export const admin = shieldFill;
export const exporter = clipboard2Fill;
export const disabled = xOctagonFill;
export const addUser = plusCircle;
export const left = arrowLeftCircle;
export const right = arrowRightCircle;
export const plus = bsPlus;
