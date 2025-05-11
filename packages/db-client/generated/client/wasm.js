
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  phone_or_email: 'phone_or_email',
  avatar: 'avatar',
  name: 'name',
  username: 'username',
  date_of_birth: 'date_of_birth',
  role: 'role',
  is_verified: 'is_verified',
  is_agreed_to_terms: 'is_agreed_to_terms',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  service_id: 'service_id',
  date: 'date',
  time_slot: 'time_slot',
  invoice_id: 'invoice_id',
  status: 'status',
  payment_status: 'payment_status',
  payment_intent_id: 'payment_intent_id',
  total_amount: 'total_amount',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  booking_id: 'booking_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TimeSlotScalarFieldEnum = {
  id: 'id',
  availability_id: 'availability_id',
  start_time: 'start_time',
  end_time: 'end_time',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AvailabilityScalarFieldEnum = {
  id: 'id',
  service_id: 'service_id',
  date: 'date',
  is_bookable: 'is_bookable',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  shortDescription: 'shortDescription',
  media: 'media',
  category: 'category',
  tags: 'tags',
  price: 'price',
  currency: 'currency',
  average_rating: 'average_rating',
  total_reviews: 'total_reviews',
  pricingType: 'pricingType',
  discountPrice: 'discountPrice',
  duration: 'duration',
  sessionType: 'sessionType',
  maxParticipants: 'maxParticipants',
  difficultyLevel: 'difficultyLevel',
  prerequisites: 'prerequisites',
  equipmentRequired: 'equipmentRequired',
  benefitsAndOutcomes: 'benefitsAndOutcomes',
  instructorId: 'instructorId',
  instructorName: 'instructorName',
  instructorBio: 'instructorBio',
  cancellationPolicy: 'cancellationPolicy',
  featured: 'featured',
  isActive: 'isActive',
  isOnline: 'isOnline',
  isRecurring: 'isRecurring',
  location: 'location',
  virtualMeetingDetails: 'virtualMeetingDetails',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  comment: 'comment',
  user_id: 'user_id',
  service_id: 'service_id',
  booking_id: 'booking_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  user_id: 'user_id',
  is_revoked: 'is_revoked',
  expires_at: 'expires_at',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  type: 'type',
  title: 'title',
  message: 'message',
  status: 'status',
  data: 'data',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  booking_id: 'booking_id',
  service_id: 'service_id',
  user_id: 'user_id',
  email: 'email',
  order_id: 'order_id',
  payment_id: 'payment_id',
  signature: 'signature',
  date: 'date',
  time_slot: 'time_slot',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
};

exports.TimeSlotStatus = exports.$Enums.TimeSlotStatus = {
  AVAILABLE: 'AVAILABLE',
  BOOKED: 'BOOKED',
  BLOCKED: 'BLOCKED'
};

exports.PricingType = exports.$Enums.PricingType = {
  FIXED: 'FIXED',
  HOURLY: 'HOURLY',
  PACKAGE: 'PACKAGE'
};

exports.SessionType = exports.$Enums.SessionType = {
  GROUP: 'GROUP',
  PRIVATE: 'PRIVATE',
  SELF_GUIDED: 'SELF_GUIDED'
};

exports.DiffcultyType = exports.$Enums.DiffcultyType = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCE: 'ADVANCE',
  ALL_LEVELS: 'ALL_LEVELS'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  BOOKING_CREATED: 'BOOKING_CREATED',
  BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED: 'BOOKING_CANCELLED',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  REVIEW_CREATED: 'REVIEW_CREATED',
  SERVICE_UPDATED: 'SERVICE_UPDATED',
  SERVICE_CREATED: 'SERVICE_CREATED',
  ADMIN_ANNOUNCEMENT: 'ADMIN_ANNOUNCEMENT',
  SYSTEM_NOTIFICATION: 'SYSTEM_NOTIFICATION'
};

exports.NotificationStatus = exports.$Enums.NotificationStatus = {
  UNREAD: 'UNREAD',
  READ: 'READ',
  ARCHIVED: 'ARCHIVED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Booking: 'Booking',
  Invoice: 'Invoice',
  TimeSlot: 'TimeSlot',
  Availability: 'Availability',
  Service: 'Service',
  Review: 'Review',
  RefreshToken: 'RefreshToken',
  Notification: 'Notification',
  Payment: 'Payment'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
