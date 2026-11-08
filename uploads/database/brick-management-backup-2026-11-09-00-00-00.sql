--
-- PostgreSQL database dump
--

\restrict YBcbiiUEGeMOuV5ScBVtYO5MBqndvMXMTvAYANfLvcxWczZVrquQ1ndGp2KDcOC

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ActivityAction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ActivityAction" AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE'
);


--
-- Name: ApprovalAction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ApprovalAction" AS ENUM (
    'UPDATE',
    'DELETE'
);


--
-- Name: ApprovalStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ApprovalStatus" AS ENUM (
    'DEFAULT',
    'PENDING',
    'APPROVED',
    'CANCELLED'
);


--
-- Name: BillingCycle; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."BillingCycle" AS ENUM (
    'MONTHLY',
    'YEARLY'
);


--
-- Name: CashType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."CashType" AS ENUM (
    'INCOME',
    'EXPENSE'
);


--
-- Name: DatabaseBackupType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DatabaseBackupType" AS ENUM (
    'MANUAL',
    'AUTO'
);


--
-- Name: DeliveryStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DeliveryStatus" AS ENUM (
    'PENDING',
    'PROCESSING',
    'CANCEL',
    'DELIVERED'
);


--
-- Name: DocumentType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."DocumentType" AS ENUM (
    'FILE',
    'FOLDER'
);


--
-- Name: GoodHistoryType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GoodHistoryType" AS ENUM (
    'ISSUE',
    'RETURN',
    'LOST',
    'DEMAGE'
);


--
-- Name: GoodLossType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."GoodLossType" AS ENUM (
    'DAMAGED',
    'LOST'
);


--
-- Name: LoadType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."LoadType" AS ENUM (
    'RAWENTRY',
    'FIELD_TO_CHULLI',
    'STOCK_TO_CHULLI',
    'CHULLI_TO_FINISHED',
    'FIELD_TO_STOCK',
    'RAW_TO_FIELD'
);


--
-- Name: ModuleType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ModuleType" AS ENUM (
    'USER',
    'LOGIN_HISTORY',
    'CLASS_RATE',
    'CHALLAN',
    'CHALLAN_ITEM',
    'CUSTOMER',
    'CUSTOMER_DUE',
    'DELIVERY',
    'DELIVERY_STATUS_TIME',
    'DUE',
    'LEDGER',
    'PAYMENT',
    'CASH',
    'ROUND',
    'LOAD_INFO',
    'UNLOAD',
    'UNLOAD_ITEM',
    'BRICK_STOCK_SUMMARY',
    'STOCK',
    'GOODS_STOCK_CATEGORY',
    'GOODS_STOCK',
    'GOODS_ISSUE',
    'GOOD_HISTORY_LOG',
    'GOODS_LOSS',
    'DOCUMENT',
    'CAR_RENT',
    'PRODUCT',
    'TASK',
    'RECEIVABLE_PAYABLE',
    'RECEIVABLE_PAYABLE_TRANSACTION',
    'CONTACT',
    'WEATHER',
    'VATA',
    'SUBSCRIPTION_PLAN',
    'SUBSCRIPTION_PAYMENT',
    'SEASON',
    'DRIVER',
    'VATA_CAR',
    'CAR_INCOME_DELIVERY',
    'SMS_SETTING',
    'SMS_WALLET',
    'SMS_RECHARGE_HISTORY',
    'VATA_SMS_SETTINGS',
    'SMS_LOG',
    'NOTE',
    'NOTIFICATION',
    'FAQ',
    'ABOUT_US',
    'HELP_LINE',
    'YOUTUBE_LINK',
    'DATABASE_BACKUP_PERMISSION',
    'DATABASE_BACKUP',
    'APPROVAL_REQUEST',
    'ACTIVITY_LOG'
);


--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationType" AS ENUM (
    'DUE',
    'DELIVERY'
);


--
-- Name: SmsPaymentType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SmsPaymentType" AS ENUM (
    'MANUAL',
    'BKASH'
);


--
-- Name: SmsRechargeStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SmsRechargeStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'CANCELLED'
);


--
-- Name: SmsStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SmsStatus" AS ENUM (
    'SENT',
    'FAILED'
);


--
-- Name: SubscriptionPaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SubscriptionPaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'EXPIRED',
    'CANCELLED'
);


--
-- Name: SubscriptionPlanType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SubscriptionPlanType" AS ENUM (
    'FREE',
    'BASIC',
    'PROFESSIONAL',
    'ENTERPRISE'
);


--
-- Name: TaskStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TaskStatus" AS ENUM (
    'COMPLETE',
    'PENDING'
);


--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TransactionType" AS ENUM (
    'GIVEN',
    'TAKEN',
    'PAYMENT'
);


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserRole" AS ENUM (
    'OWNER',
    'ADMIN',
    'MANAGER',
    'SYSTEM_ADMIN',
    'SUPER_ADMIN',
    'OPERATOR'
);


--
-- Name: VataStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."VataStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AboutUs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AboutUs" (
    id text NOT NULL,
    description text NOT NULL
);


--
-- Name: ActivityLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ActivityLog" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "userId" text,
    module public."ModuleType" NOT NULL,
    action public."ActivityAction" NOT NULL,
    "targetId" text,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


--
-- Name: ApprovalRequest; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ApprovalRequest" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "requestedById" text NOT NULL,
    action public."ApprovalAction" NOT NULL,
    module public."ModuleType" NOT NULL,
    "targetId" text NOT NULL,
    "oldData" jsonb,
    "newData" jsonb,
    status public."ApprovalStatus" DEFAULT 'PENDING'::public."ApprovalStatus" NOT NULL,
    "reviewedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


--
-- Name: BrickStockSummary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BrickStockSummary" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "rawBrick" integer DEFAULT 0 NOT NULL,
    "fieldBrick" integer DEFAULT 0 NOT NULL,
    "stockBrick" integer DEFAULT 0 NOT NULL,
    "chulliBrick" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: CarIncomeDelivery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CarIncomeDelivery" (
    id text NOT NULL,
    amount double precision NOT NULL,
    "driverId" text NOT NULL,
    "deliveryId" text NOT NULL,
    "carId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Contact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Contact" (
    id text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    occupation text NOT NULL,
    phone text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: DatabaseBackup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DatabaseBackup" (
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "fileName" text NOT NULL,
    "filePath" text NOT NULL,
    "fileSize" bigint NOT NULL,
    "tableCount" integer DEFAULT 0 NOT NULL,
    "tableRowCounts" jsonb,
    "totalRowCount" bigint DEFAULT 0 NOT NULL,
    type public."DatabaseBackupType" NOT NULL
);


--
-- Name: DatabaseBackupPermission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DatabaseBackupPermission" (
    id text NOT NULL,
    type public."DatabaseBackupType" NOT NULL
);


--
-- Name: DeliveryStatusActionTime; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DeliveryStatusActionTime" (
    id text NOT NULL,
    "deliveryId" text NOT NULL,
    "pendingTime" timestamp(3) without time zone,
    "processingTime" timestamp(3) without time zone,
    "deliveredTime" timestamp(3) without time zone,
    "cancelTime" timestamp(3) without time zone
);


--
-- Name: Document; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Document" (
    id text NOT NULL,
    name text NOT NULL,
    type public."DocumentType" NOT NULL,
    "parentId" text,
    "fileUrl" text,
    "fileKey" text,
    "mimeType" text,
    size bigint,
    extension text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: Driver; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Driver" (
    id text NOT NULL,
    name text NOT NULL,
    "PhoneNumber" text NOT NULL,
    salary numeric(12,2) NOT NULL,
    "vataId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


--
-- Name: Faq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Faq" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GoodHistoryLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GoodHistoryLog" (
    id text NOT NULL,
    type public."GoodHistoryType" NOT NULL,
    "receiveBy" text,
    quantity integer NOT NULL,
    "returnBy" text,
    "goodId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    damage integer,
    lost integer,
    okay integer,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text
);


--
-- Name: GoodsIssue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GoodsIssue" (
    id text NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    quantity double precision NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    image text,
    "goodId" text NOT NULL,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GoodsLoss; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GoodsLoss" (
    id text NOT NULL,
    "goodId" text NOT NULL,
    quantity double precision NOT NULL,
    type public."GoodLossType" NOT NULL,
    "lossAmount" double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GoodsStock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GoodsStock" (
    id text NOT NULL,
    name text NOT NULL,
    shop text NOT NULL,
    quantity double precision NOT NULL,
    price double precision NOT NULL,
    warranty timestamp(3) without time zone,
    image text,
    "categoryId" text NOT NULL,
    "vataId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: GoodsStockCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."GoodsStockCategory" (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: HelpLine; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."HelpLine" (
    id text NOT NULL,
    "phoneNumber" text NOT NULL,
    website text NOT NULL,
    email text NOT NULL
);


--
-- Name: Ledger; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Ledger" (
    id text NOT NULL,
    name text NOT NULL,
    serial integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "parentId" text,
    rate double precision DEFAULT 0,
    quantity double precision DEFAULT 0,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "vataId" text NOT NULL,
    "seasonId" text NOT NULL,
    "phoneNumber" text,
    "startDate" text,
    "openingBalance" double precision DEFAULT 0,
    "openingBalanceType" text,
    salary double precision DEFAULT 0,
    "weeklyFood" double precision DEFAULT 0,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: LoadInfo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."LoadInfo" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "roundId" text NOT NULL,
    quantity integer NOT NULL,
    "loadType" public."LoadType" NOT NULL,
    "classId" text,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: LoginLimit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."LoginLimit" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "blockTime" timestamp(3) without time zone,
    "totalTry" integer NOT NULL,
    status boolean DEFAULT false NOT NULL
);


--
-- Name: Note; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Note" (
    id text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    message text NOT NULL,
    path text NOT NULL,
    type public."NotificationType" NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL,
    title text NOT NULL,
    "seasonId" text NOT NULL
);


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    quantity double precision DEFAULT 0 NOT NULL,
    cutting double precision DEFAULT 0 NOT NULL,
    payment double precision NOT NULL,
    "ledgerId" text NOT NULL,
    "vataId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    document text,
    "paymentDetails" text,
    "paymentDifference" double precision DEFAULT 0 NOT NULL,
    "paymentType" text NOT NULL,
    rate double precision DEFAULT 0 NOT NULL,
    "totalBill" double precision NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "paymentDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address text,
    serial integer NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: Payment_serial_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Payment_serial_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Payment_serial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Payment_serial_seq" OWNED BY public."Payment".serial;


--
-- Name: ReceivablePayable; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ReceivablePayable" (
    id text NOT NULL,
    "transactionType" public."TransactionType" NOT NULL,
    amount numeric(12,2) NOT NULL,
    "currentAmount" numeric(12,2) NOT NULL,
    name text NOT NULL,
    phone text,
    address text,
    "transactionDate" timestamp(3) without time zone NOT NULL,
    "paymentDate" timestamp(3) without time zone,
    "witnessOne" text,
    "witnessTwo" text,
    description text,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: ReceivablePayableTransaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ReceivablePayableTransaction" (
    id text NOT NULL,
    "receivablePayableId" text NOT NULL,
    type public."TransactionType" NOT NULL,
    amount double precision NOT NULL,
    "transactionDate" timestamp(3) without time zone NOT NULL,
    remaining double precision NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: Round; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Round" (
    id text NOT NULL,
    name text NOT NULL,
    "vataId" text NOT NULL,
    "seasonId" text NOT NULL
);


--
-- Name: Season; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Season" (
    id text NOT NULL,
    name text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: SmsLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SmsLog" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "phoneNumber" text NOT NULL,
    message text NOT NULL,
    status public."SmsStatus" NOT NULL,
    "sendBy" text NOT NULL,
    cost double precision NOT NULL,
    "sentAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: SmsRechargeHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SmsRechargeHistory" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "smsQuantity" integer NOT NULL,
    "ratePerSms" numeric(10,4) NOT NULL,
    "totalAmount" numeric(12,2) NOT NULL,
    "paymentMethod" text,
    "transactionId" text,
    status public."SmsRechargeStatus" DEFAULT 'PENDING'::public."SmsRechargeStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "phoneNumber" text,
    type public."SmsPaymentType" NOT NULL
);


--
-- Name: SmsSetting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SmsSetting" (
    id text NOT NULL,
    "ratePerSms" numeric(10,4) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    bkash text,
    nogod text,
    rocket text
);


--
-- Name: SmsWallet; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SmsWallet" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    balance double precision DEFAULT 0 NOT NULL,
    "totalPurchased" integer DEFAULT 0 NOT NULL,
    "totalUsed" integer DEFAULT 0 NOT NULL,
    "currentRate" double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: StockBook; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."StockBook" (
    id text NOT NULL,
    class text NOT NULL,
    "stockIn" integer DEFAULT 0 NOT NULL,
    "stockOut" integer DEFAULT 0 NOT NULL,
    description text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdById" text NOT NULL,
    "seasonId" text NOT NULL,
    "vataId" text NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: SubscriptionPayment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SubscriptionPayment" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "subscriptionPlanId" text NOT NULL,
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    amount numeric(12,2) NOT NULL,
    status public."SubscriptionPaymentStatus" DEFAULT 'PENDING'::public."SubscriptionPaymentStatus" NOT NULL,
    "paidAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "paymentMethod" text NOT NULL,
    "transactionId" text NOT NULL,
    "phoneNumber" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: SubscriptionPlan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SubscriptionPlan" (
    id text NOT NULL,
    name text NOT NULL,
    type public."SubscriptionPlanType" NOT NULL,
    description text,
    price numeric(12,2) NOT NULL,
    "billingCycle" public."BillingCycle" NOT NULL,
    features text[],
    "maxUsers" integer,
    "maxStorage" integer,
    "maxTasks" integer,
    "maxInvoices" integer,
    "maxSms" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: TaskManager; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."TaskManager" (
    id text NOT NULL,
    description text NOT NULL,
    "userId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    repeat text NOT NULL,
    status public."TaskStatus" DEFAULT 'PENDING'::public."TaskStatus" NOT NULL,
    "vataId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: Unload; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Unload" (
    id text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "roundId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UnloadItem; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UnloadItem" (
    id text NOT NULL,
    "unloadId" text NOT NULL,
    "classId" text,
    quantity integer DEFAULT 0 NOT NULL,
    damaged integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: VataCar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VataCar" (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "carNo" text NOT NULL
);


--
-- Name: VataSmsSettings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VataSmsSettings" (
    id text NOT NULL,
    "newInvoice" boolean DEFAULT false NOT NULL,
    "updateInvoice" boolean DEFAULT false NOT NULL,
    "deleteInvoice" boolean DEFAULT false NOT NULL,
    "newDelivery" boolean DEFAULT false NOT NULL,
    "newDueCollection" boolean DEFAULT false NOT NULL,
    "deuCollectionUpdate" boolean DEFAULT false NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: Weather; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Weather" (
    id text NOT NULL,
    "linkOne" text,
    "linkTwo" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: YoutubeLink; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."YoutubeLink" (
    id text NOT NULL,
    link text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: carrents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carrents (
    id text NOT NULL,
    address text NOT NULL,
    area text NOT NULL,
    rent double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: cash; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cash (
    id text NOT NULL,
    type public."CashType" NOT NULL,
    source text NOT NULL,
    description text NOT NULL,
    amount numeric(12,2) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL,
    "seasonId" text NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: challanItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."challanItems" (
    id text NOT NULL,
    class text NOT NULL,
    rate double precision NOT NULL,
    quantity integer NOT NULL,
    delivered integer DEFAULT 0 NOT NULL,
    price double precision NOT NULL,
    "challanId" text NOT NULL,
    "deliveryDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL
);


--
-- Name: chllans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chllans (
    id text NOT NULL,
    serial integer NOT NULL,
    "chalanType" text NOT NULL,
    "deliveryDate" timestamp(3) without time zone,
    "challanDate" timestamp(3) without time zone NOT NULL,
    "duePaymentDate" timestamp(3) without time zone,
    "deliverySeason" text,
    note text,
    "productPrice" double precision NOT NULL,
    discount double precision,
    "totalPrice" double precision NOT NULL,
    cash double precision,
    due double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "customerId" text NOT NULL,
    "vataId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdById" text NOT NULL,
    "seasonId" text NOT NULL,
    "carRent" double precision,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: classAndRates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."classAndRates" (
    id text NOT NULL,
    "classType" text NOT NULL,
    "className" text NOT NULL,
    rate double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "vataId" text NOT NULL,
    "advanceRate" double precision DEFAULT 0 NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: customerdues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customerdues (
    id text NOT NULL,
    "customerId" text NOT NULL,
    "seasonId" text NOT NULL,
    "challanId" text NOT NULL,
    "totalAmount" numeric(12,2) NOT NULL,
    "paidAmount" numeric(12,2) NOT NULL,
    "dueAmount" numeric(12,2) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id text NOT NULL,
    "customerCode" text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    "phoneNumber" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "nextPaymentDate" timestamp(3) without time zone,
    note text,
    "vataId" text NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: deliveries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.deliveries (
    id text NOT NULL,
    "deliveryDate" timestamp(3) without time zone NOT NULL,
    "deliveryNo" integer NOT NULL,
    "nextDeliveryDate" timestamp(3) without time zone,
    quantity integer NOT NULL,
    "deliveryReceived" integer NOT NULL,
    class text NOT NULL,
    "deliveryRemaining" integer NOT NULL,
    "carNo" text,
    "lastDelivered" integer,
    "carRent" double precision,
    "invoiceId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    season text,
    "deliveryById" text NOT NULL,
    "driverId" text,
    status public."DeliveryStatus" DEFAULT 'PROCESSING'::public."DeliveryStatus" NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: duecollections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.duecollections (
    id text NOT NULL,
    due double precision NOT NULL,
    collect double precision NOT NULL,
    "newDue" double precision NOT NULL,
    "nextDate" timestamp(3) without time zone,
    "customerId" text NOT NULL,
    "seasonId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL
);


--
-- Name: login_histories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login_histories (
    id text NOT NULL,
    type text NOT NULL,
    device text NOT NULL,
    browser text NOT NULL,
    "ipAddress" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status boolean DEFAULT true NOT NULL
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    "productName" text NOT NULL,
    category text NOT NULL,
    shop text NOT NULL,
    quantity integer NOT NULL,
    price numeric(12,2) NOT NULL,
    "productImage" text,
    warranty timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text NOT NULL
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text DEFAULT 'Admin'::text NOT NULL,
    username text NOT NULL,
    role public."UserRole" DEFAULT 'ADMIN'::public."UserRole" NOT NULL,
    password text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "vataId" text,
    "deleteStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "updateStatus" public."ApprovalStatus" DEFAULT 'DEFAULT'::public."ApprovalStatus" NOT NULL,
    "expiryTime" timestamp(3) without time zone,
    "recoveryCode" text,
    email text
);


--
-- Name: vata_backups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vata_backups (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "backupData" jsonb NOT NULL,
    "jsonFileName" text,
    "jsonFilePath" text,
    "jsonFileSize" bigint,
    "sqlFileName" text,
    "sqlFilePath" text,
    "sqlFileSize" bigint,
    "tableCount" integer DEFAULT 0 NOT NULL,
    "totalRowCount" bigint DEFAULT 0 NOT NULL,
    "tableRowCounts" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: vatainformation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vatainformation (
    id text NOT NULL,
    "vataId" text NOT NULL,
    "nameEnglish" text NOT NULL,
    "nameBangla" text NOT NULL,
    address text NOT NULL,
    "ownerName" text NOT NULL,
    "ownerPhoneNumber" text NOT NULL,
    "nextPaymentDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    subdomain text NOT NULL,
    status public."VataStatus" DEFAULT 'ACTIVE'::public."VataStatus" NOT NULL,
    "subscriptionPlanId" text,
    "subscriptionStart" timestamp(3) without time zone,
    "subscriptionEnd" timestamp(3) without time zone,
    "additionalAddress" text,
    "shortDescription" text,
    "challanManagerPhoneNumber" text,
    "challanPersonOneName" text,
    "challanPersonOnePhoneNumber" text,
    "challanPersonTwoName" text,
    "challanPersonTwoPhoneNumber" text,
    "shortForm" text
);


--
-- Name: Payment serial; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN serial SET DEFAULT nextval('public."Payment_serial_seq"'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: AboutUs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AboutUs" (id, description) FROM stdin;
d3283581-8025-423e-bc3a-f629fa3a7071	<h2 style="text-align: center;"><span style="font-size: 18px;"><strong>আমাদের সম্পর্কে</strong></span></h2><p><strong>Brick Management</strong> একটি আধুনিক ও সহজ ব্যবহারযোগ্য <strong>Brick Kiln Management Software</strong>, যা ইট ভাটার দৈনন্দিন কার্যক্রমকে আরও সহজ, দ্রুত এবং সুশৃঙ্খলভাবে পরিচালনা করার জন্য তৈরি করা হয়েছে।</p><p>ইট ভাটার ব্যবসায় সাধারণত কাঁচামাল, উৎপাদন, স্টক, বিক্রয়, ডেলিভারি, গ্রাহকের হিসাব, পাওনা-দেনা, খতিয়ান, নগদ লেনদেন এবং বিভিন্ন রিপোর্ট পরিচালনা করতে অনেক সময় ও পরিশ্রমের প্রয়োজন হয়। এই কাজগুলোকে একটি কেন্দ্রীয় প্ল্যাটফর্মের মাধ্যমে সহজ ও নির্ভুলভাবে পরিচালনা করাই আমাদের মূল লক্ষ্য।</p><p><strong>Brick Management</strong>-এর মাধ্যমে ভাটার গুরুত্বপূর্ণ তথ্য এক জায়গায় সংরক্ষণ ও পরিচালনা করা যায়। এর ফলে ব্যবসার হিসাব আরও স্বচ্ছ থাকে, কাজের সময় কমে এবং গুরুত্বপূর্ণ তথ্য দ্রুত খুঁজে পাওয়া সম্ভব হয়।</p><p>আমরা বিশ্বাস করি, প্রযুক্তির সঠিক ব্যবহারের মাধ্যমে একটি ইট ভাটার দৈনন্দিন ব্যবস্থাপনা আরও সহজ, নির্ভরযোগ্য এবং কার্যকর করা সম্ভব। তাই ভাটা মালিক ও ব্যবস্থাপকদের জন্য একটি আধুনিক, ব্যবহারবান্ধব এবং কার্যকর সমাধান তৈরি করাই আমাদের উদ্দেশ্য।</p><p><strong>Brick Management — আপনার ইট ভাটার ব্যবস্থাপনা, এখন আরও সহজ ও স্মার্ট।</strong></p>
\.


--
-- Data for Name: ActivityLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ActivityLog" (id, "vataId", "userId", module, action, "targetId", description, "createdAt", "isDeleted") FROM stdin;
cmulotpjm0000x8ulrcovgwp8	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "8000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:16:06.802	f
cmum3m4of0003vsuljjbguuou	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	DELETE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ #Mursalin Vao এর 8000 টাকা ক্যাশ ইন মুছে ফেলা হয়েছে।	2026-09-29 03:10:07.407	f
cmum960aa0000dkul45kp2dm0	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	c57535df-9cb2-4333-863b-ff9fdcfe85d0	লোড তথ্য এর লোডের পরিমাণ 200 থেকে 2000 পরিবর্তন করা হয়েছে।	2026-09-29 05:45:32.914	f
cmum96idl0001dkul9q07d5qc	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	লোড তথ্য এর লোডের পরিমাণ 200 থেকে 2000 পরিবর্তন করা হয়েছে।	2026-09-29 05:45:56.361	f
cmum97dla0003dkulr7oc90tv	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	লোড তথ্য এর লোডের পরিমাণ 2000 থেকে 1500 পরিবর্তন করা হয়েছে।	2026-09-29 05:46:36.814	f
cmumgqbtn000014ulbk5r3990	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	GOODS_STOCK_CATEGORY	UPDATE	fb147b3c-b96e-488d-b625-bb84647886a0	পণ্য স্টক ক্যাটাগরি এর ক্যাটাগরির নাম Mursalin থেকে Mursalinn পরিবর্তন করা হয়েছে।	2026-09-29 09:17:18.299	f
cmumgqlts000114ull91kr7xw	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	GOODS_STOCK_CATEGORY	DELETE	fb147b3c-b96e-488d-b625-bb84647886a0	পণ্য স্টক ক্যাটাগরি মুছে ফেলা হয়েছে।	2026-09-29 09:17:31.264	f
cmumgs0gn0000f4ulseh6b5oh	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	GOODS_STOCK_CATEGORY	DELETE	9fa5234f-59a6-40be-b0e2-a43529c3c49c	পণ্য স্টক ক্যাটাগরি #Tanvir মুছে ফেলা হয়েছে।	2026-09-29 09:18:36.887	f
cmumgw8d800018wul3elo0zu1	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	GOODS_STOCK_CATEGORY	UPDATE	534d9437-ad31-4640-a2e2-3217b4412d6f	পণ্য স্টক ক্যাটাগরি এর ক্যাটাগরির নাম Mursalin থেকে Mursalinn পরিবর্তন করা হয়েছে।	2026-09-29 09:21:53.756	f
cmumgxyf400038wulmxsmywnz	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	GOODS_STOCK_CATEGORY	DELETE	05d84354-ea44-4657-8acd-c0a4c31622e4	পণ্য স্টক ক্যাটাগরি #Mursalins মুছে ফেলা হয়েছে।	2026-09-29 09:23:14.176	f
cmunwgukq0000mkul6inblfan	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CONTACT	UPDATE	593ebac1-0e4c-4826-bc7f-0c5504e5b6a4	যোগাযোগ #Shakib Hasan এর কন্টাক্টের ঠিকানা Barisal থেকে Barisall পরিবর্তন করা হয়েছে।	2026-09-30 09:25:36.074	f
cmunwuv6b0002mkul3xgwqgx4	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CONTACT	UPDATE	593ebac1-0e4c-4826-bc7f-0c5504e5b6a4	যোগাযোগ #Shakib Hasan এর মোবাইল নম্বর 01760564065 থেকে 01760564060 পরিবর্তন করা হয়েছে।	2026-09-30 09:36:30.035	f
cmunwvdej0003mkulqgpz2f3l	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	UPDATE	f575a0fa-6f73-4478-bfb3-6c76c16159e2	ড্রাইভার #Shakib Hasan এর ড্রাইভারের বেতন "0" থেকে 1500 পরিবর্তন করা হয়েছে।	2026-09-30 09:36:53.659	f
cmunww7240004mkulrqrdww5u	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	UPDATE	f575a0fa-6f73-4478-bfb3-6c76c16159e2	ড্রাইভার #Shakib Hasan এর ড্রাইভারের বেতন "1500" থেকে 10000 পরিবর্তন করা হয়েছে।	2026-09-30 09:37:32.092	f
cmunwwr510006mkulphml8jpa	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	UPDATE	f575a0fa-6f73-4478-bfb3-6c76c16159e2	ড্রাইভার #Shakib Hasan এর ড্রাইভারের বেতন "10000" থেকে 12000 পরিবর্তন করা হয়েছে।	2026-09-30 09:37:58.117	f
cmunwx6c80007mkuldkbs8ixk	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	DELETE	f575a0fa-6f73-4478-bfb3-6c76c16159e2	ড্রাইভার #Shakib Hasan মুছে ফেলা হয়েছে।	2026-09-30 09:38:17.816	f
cmunwzvpx0008mkulb9p2vwox	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	DELETE	5370e75b-b086-498d-8503-76d50eb6fed8	ড্রাইভার #অন্তু ম্যানেজার মুছে ফেলা হয়েছে।	2026-09-30 09:40:24.021	f
cmunx19aq0009mkulxgd2a36q	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	DELETE	feb4406a-7895-44d3-b481-2264cc185f7a	ড্রাইভার #Ahosun মুছে ফেলা হয়েছে।	2026-09-30 09:41:28.274	f
cmunx7uxt000220ul9y1y7r9e	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DRIVER	DELETE	307c2dae-887f-4767-86e6-1883df74dbbd	ড্রাইভার #Tanvir মুছে ফেলা হয়েছে।	2026-09-30 09:46:36.257	f
cmunxpc2v0000hgulxahhrfg3	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CONTACT	DELETE	5bc0f659-b449-4a7c-895a-a07155d1624a	যোগাযোগ মুছে ফেলা হয়েছে।	2026-09-30 10:00:11.623	f
cmunxq8os0001hgul5lcq7jv2	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CAR_RENT	UPDATE	a37945c0-72ba-4d27-994b-43849884f3a7	গাড়ি ভাড়া #0 এর এলাকা Mirpur 2 থেকে Mirpur 22 পরিবর্তন করা হয়েছে।	2026-09-30 10:00:53.884	f
cmunxqbo00002hgulobwx41hx	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CAR_RENT	DELETE	a37945c0-72ba-4d27-994b-43849884f3a7	গাড়ি ভাড়া #0 মুছে ফেলা হয়েছে।	2026-09-30 10:00:57.744	f
cmunxsunn00001culjlz1vp07	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CAR_RENT	DELETE	d6a65583-38ff-4ff9-babe-3542594c0104	গাড়ি ভাড়া #0 মুছে ফেলা হয়েছে।	2026-09-30 10:02:55.668	f
cmunxv4vm00021culrgyxaqfl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CAR_RENT	UPDATE	628b2dc8-3223-4468-b3ca-fa321744d2bb	গাড়ি ভাড়া #900 এর এলাকা Mirpur 2 থেকে Mirpur 22 পরিবর্তন করা হয়েছে।	2026-09-30 10:04:42.226	f
cmukvm8i40000nwul54kohcy9	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DELIVERY	DELETE	6bcc772e-0473-44ef-b498-449315e3333b	ডেলিভারি #1 মুছে ফেলা হয়েছে।	2026-09-28 06:38:29.26	f
cmukw839c0000doulbel2xqxu	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DELIVERY	DELETE	81b0ce8d-a50b-4f39-a7f7-15f3c9cec34d	ডেলিভারি #2 মুছে ফেলা হয়েছে।	2026-09-28 06:55:28.896	f
cmukwwgha0000pcul6g2i0iya	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DELIVERY	DELETE	6ba0a2fe-85bb-4bb9-85f0-425f40367f1c	ডেলিভারি #3 মুছে ফেলা হয়েছে।	2026-09-28 07:14:25.774	f
cmukxqnr90000x4ul4p1f7hkc	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DELIVERY	DELETE	a70c5c14-7e38-4c35-b1c9-e647a0eb097b	ডেলিভারি #5 মুছে ফেলা হয়েছে।	2026-09-28 07:37:54.885	f
cmuky2evf0001loulr4awn2po	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DELIVERY	DELETE	655fa2b0-1b97-4ae5-aeb3-a789009bdaa1	ডেলিভারি #7 মুছে ফেলা হয়েছে।	2026-09-28 07:47:03.243	f
cmul5db1200017oul0l6erfsy	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	UPDATE	7eb30ccf-aea3-4820-85fe-d25d0c9c8bb1	বাকি আদায় #কাস্টমার আইডি 001 এর আদায়ের পরিমাণ 500 থেকে 1000, নতুন বাকি 2000 থেকে 1500 পরিবর্তন করা হয়েছে।	2026-09-28 11:11:28.79	f
cmul9445o0000s0uljpkcf09z	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	DELETE	7eb30ccf-aea3-4820-85fe-d25d0c9c8bb1	বাকি আদায় #001 মুছে ফেলা হয়েছে।	2026-09-28 12:56:18.444	f
cmul98g1e000098ul4h1jsez1	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	DELETE	0d33fd03-ccd2-46f5-81a2-f2135b95374b	বাকি আদায় #কাস্টমার আইডি 002 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।	2026-09-28 12:59:40.466	f
cmul9swob0000z4ullnk67rmk	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	DELETE	8d6f727e-bc58-40bc-a025-18ca32d0f801	বাকি আদায় #কাস্টমার আইডি 003 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।	2026-09-28 13:15:35.147	f
cmulab9hu0000eoulz6zvib87	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	DELETE	836dd4ce-7c27-4f0d-8a88-5c91dd7b98c8	বাকি আদায় #কাস্টমার আইডি 002 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।	2026-09-28 13:29:51.57	f
cmulajad10000cgulzur4ymum	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	DELETE	ed6907b2-9448-42b2-b9aa-68a633dcb15e	বাকি আদায় #কাস্টমার আইডি 001 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।	2026-09-28 13:36:05.941	f
cmulas9nu0000l8ulj4dnv7rn	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	DUE	DELETE	68c7ff3d-f6ce-48fe-94cf-d93c50bcb8af	বাকি আদায় #কাস্টমার আইডি 001 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।	2026-09-28 13:43:04.938	f
cmulkfx3y00004oul7sqpmdz3	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	7c4ef35f-57da-4bd5-a776-d25d383302d3	ক্যাশ এর ক্যাশের পরিমাণ "12000" থেকে 10000 পরিবর্তন করা হয়েছে।	2026-09-28 18:13:24.958	f
cmulnb96z00004gulha9xl85f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	DELETE	7c4ef35f-57da-4bd5-a776-d25d383302d3	ক্যাশ #Mursalin Vao মুছে ফেলা হয়েছে।	2026-09-28 19:33:46.187	f
cmulobtes00001sulxn6nx9bw	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	DELETE	99b9e83b-6c12-4b7b-8296-732ff328754d	ক্যাশ #Fakhar মুছে ফেলা হয়েছে।	2026-09-28 20:02:12.004	f
cmulol3w50000zsul1llehfen	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	DELETE	f4fbf8ca-e95c-4b53-96c2-2b3b2dfd3aec	ক্যাশ #Tanvir এর 700 টাকা ক্যাশ ইন মুছে ফেলা হয়েছে।	2026-09-28 20:09:25.493	f
cmuloqtyt0000houl3btjqlvg	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	DELETE	99edea6b-e91d-43cf-a5bd-0496412b569e	ক্যাশ #sabbir এর 1200 টাকা ক্যাশ ইন মুছে ফেলা হয়েছে।	2026-09-28 20:13:52.566	f
cmulorlck0001houlcvbyqzov	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "8000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:14:28.052	f
cmulos8hs0002houl0kxwwtjt	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "8000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:14:58.049	f
cmulov8870000a4ul1omrwjhk	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "8000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:17:17.671	f
cmulowr85000074ulzklcohd5	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "8000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:18:28.95	f
cmuloxduf0000o8ulqh0jhr5o	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "8000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:18:58.263	f
cmulp3ktj00001gulod2h2hhv	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের বিবরণ . থেকে hoio, ক্যাশের পরিমাণ "9000" থেকে 9000 পরিবর্তন করা হয়েছে।	2026-09-28 20:23:47.239	f
cmum3klmd0001vsulhgnb2lc7	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CASH	UPDATE	90045992-549e-4958-8fb2-20bc6b4a662b	ক্যাশ এর ক্যাশের পরিমাণ "9000" থেকে 8000 পরিবর্তন করা হয়েছে।	2026-09-29 03:08:56.053	f
cmum8c1070000igulbpa4ucx0	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	28da05b1-b71d-4eca-8acb-101803f1c7af	লোড তথ্য মুছে ফেলা হয়েছে।	2026-09-29 05:22:14.167	f
cmum97xy80005dkul7f6ajzvs	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	লোড তথ্য এর লোডের ধরন কাঁচা ইট এন্ট্রি থেকে কাঁচা ইট মাঠে পরিবর্তন করা হয়েছে।	2026-09-29 05:47:03.2	f
cmum9d48t0008dkulh7dfzfs8	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	06232db8-5e0c-42c4-a69c-09bc224da9e5	লোড তথ্য এর লোডের পরিমাণ 100 থেকে 1000 পরিবর্তন করা হয়েছে।	2026-09-29 05:51:04.637	f
cmum9gq3t0000dsula9vqzewz	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	06232db8-5e0c-42c4-a69c-09bc224da9e5	লোড তথ্য এর লোডের ধরন কাঁচা ইট এন্ট্রি থেকে কাঁচা ইট মাঠে, লোডের পরিমাণ 1000 থেকে 1200 পরিবর্তন করা হয়েছে।	2026-09-29 05:53:52.937	f
cmum9jmsn00003oul2yuuk76e	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	06232db8-5e0c-42c4-a69c-09bc224da9e5	লোড তথ্য এর লোডের পরিমাণ 1200 থেকে 1100 পরিবর্তন করা হয়েছে।	2026-09-29 05:56:08.615	f
cmum9l3hi0000fsulc9ivj5bm	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	06232db8-5e0c-42c4-a69c-09bc224da9e5	লোড তথ্য #কাঁচা ইট মাঠে এর লোডের পরিমাণ 1100 থেকে 0 পরিবর্তন করা হয়েছে।	2026-09-29 05:57:16.902	f
cmum9l8da0001fsulnfscgwhp	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	06232db8-5e0c-42c4-a69c-09bc224da9e5	লোড তথ্য #কাঁচা ইট মাঠে এর লোডের পরিমাণ 0 থেকে 900 পরিবর্তন করা হয়েছে।	2026-09-29 05:57:23.23	f
cmum9mc780002fsulm83824dj	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	06232db8-5e0c-42c4-a69c-09bc224da9e5	লোড তথ্য #কাঁচা ইট মাঠে 900 মুছে ফেলা হয়েছে।	2026-09-29 05:58:14.852	f
cmum9mnls0003fsulgn0yc7al	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	লোড তথ্য #কাঁচা ইট মাঠে 1500 মুছে ফেলা হয়েছে।	2026-09-29 05:58:29.632	f
cmum9mq580004fsuleg778vv1	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	c57535df-9cb2-4333-863b-ff9fdcfe85d0	লোড তথ্য #কাঁচা ইট এন্ট্রি 2000 মুছে ফেলা হয়েছে।	2026-09-29 05:58:32.924	f
cmum9mt3l0005fsul0qduna5f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	15716b3b-c8b4-4418-866e-63ecd00d0876	লোড তথ্য #কাঁচা ইট এন্ট্রি 2000 মুছে ফেলা হয়েছে।	2026-09-29 05:58:36.753	f
cmuma1lg70001igulfmgxz37v	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	f3dde422-92b4-4d7e-86a3-9803b09e9389	লোড তথ্য #কাঁচা ইট এন্ট্রি 500 মুছে ফেলা হয়েছে।	2026-09-29 06:10:06.68	f
cmuma336u0002iguly45wwapg	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	f3dde422-92b4-4d7e-86a3-9803b09e9389	লোড তথ্য #কাঁচা ইট এন্ট্রি 500 মুছে ফেলা হয়েছে।	2026-09-29 06:11:16.326	f
cmumaa0p10004iguliwe0bs3d	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	9f4318ab-e3c3-4f21-b41a-83877d40cc75	লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 500 থেকে 5000 পরিবর্তন করা হয়েছে।	2026-09-29 06:16:39.685	f
cmumaeqne0005igulksc40aub	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	9f4318ab-e3c3-4f21-b41a-83877d40cc75	লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 5000 থেকে 4000 পরিবর্তন করা হয়েছে।	2026-09-29 06:20:19.947	f
cmumah0kf0006igulmaow5byg	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	9f4318ab-e3c3-4f21-b41a-83877d40cc75	লোড তথ্য #কাঁচা ইট এন্ট্রি 4000 মুছে ফেলা হয়েছে।	2026-09-29 06:22:06.111	f
cmumamjdc000198ulnxy97gs8	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c	লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 500 থেকে 600 পরিবর্তন করা হয়েছে।	2026-09-29 06:26:23.76	f
cmumane9o000298ulacla8ocm	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c	লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 600 থেকে 800 পরিবর্তন করা হয়েছে।	2026-09-29 06:27:03.804	f
cmumap3lw000398ulur79ctxq	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c	লোড তথ্য #কাঁচা ইট এন্ট্রি 800 মুছে ফেলা হয়েছে।	2026-09-29 06:28:23.3	f
cmumass8n000180ul0eph3ld5	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	53dc21af-9227-476a-b8d4-45a311fe09e4	লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 100 থেকে 200 পরিবর্তন করা হয়েছে।	2026-09-29 06:31:15.191	f
cmumaufdw000380ulk8dxdy5n	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	53dc21af-9227-476a-b8d4-45a311fe09e4	লোড তথ্য #কাঁচা ইট এন্ট্রি 200 মুছে ফেলা হয়েছে।	2026-09-29 06:32:31.844	f
cmumb08le000580ul7iecqplj	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	UPDATE	419addd1-d8b2-4417-a1bb-2c6dcb041313	লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 100 থেকে 200 পরিবর্তন করা হয়েছে।	2026-09-29 06:37:02.978	f
cmumb1iib000780ulq7056kcl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	419addd1-d8b2-4417-a1bb-2c6dcb041313	লোড তথ্য #কাঁচা ইট এন্ট্রি 200 মুছে ফেলা হয়েছে।	2026-09-29 06:38:02.483	f
cmumfxehh000880ul8uhsadg6	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LOAD_INFO	DELETE	3ad60744-a358-4664-ab6c-321065757416	লোড তথ্য #কাঁচা ইট মাঠে 200 মুছে ফেলা হয়েছে।	2026-09-29 08:54:48.725	f
cmunxwch400051culvzrgnhuf	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CAR_RENT	DELETE	628b2dc8-3223-4468-b3ca-fa321744d2bb	গাড়ি ভাড়া #900 মুছে ফেলা হয়েছে।	2026-09-30 10:05:38.728	f
cmuny18a40001vsuln4mf1nve	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CAR_RENT	DELETE	70f00eff-b827-41d8-8501-ca491ce52266	গাড়ি ভাড়া #509 মুছে ফেলা হয়েছে।	2026-09-30 10:09:26.572	f
cmup0s79z00003wul7u1skqgb	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	STOCK	DELETE	d1d3d5d7-211d-4973-9ecf-1d1e645e9a65	স্টক #পিকেট মুছে ফেলা হয়েছে।	2026-10-01 04:14:10.391	f
cmup2op2v0002wculcxududxx	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	STOCK	DELETE	9fb05ae3-312c-494c-b0ce-9e7fcff1c346	স্টক #পিকেট | ইন: 700 | আউট: 0 মুছে ফেলা হয়েছে।	2026-10-01 05:07:26.071	f
cmup46iid00006ouly2wgrysg	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CUSTOMER	UPDATE	004	কাস্টমার "Mredull" এর কাস্টমারের নাম Mredul থেকে Mredull পরিবর্তন করা হয়েছে।	2026-10-01 05:49:16.981	f
cmup4og760001bsulr1j4b3zu	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CUSTOMER	UPDATE	004	কাস্টমার "Mredull" আপডেট করা হয়েছে।	2026-10-01 06:03:13.794	f
cmup4p5h40002bsul3vrdgtdi	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CUSTOMER	UPDATE	003	কাস্টমার "ইমরান হোসেনn" এর কাস্টমারের নাম ইমরান হোসেন থেকে ইমরান হোসেনn পরিবর্তন করা হয়েছে।	2026-10-01 06:03:46.552	f
cmup4pl970004bsul99xqovtl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CUSTOMER	UPDATE	003	কাস্টমার "ইমরান হোসেন" এর কাস্টমারের নাম ইমরান হোসেনn থেকে ইমরান হোসেন পরিবর্তন করা হয়েছে।	2026-10-01 06:04:07.004	f
cmup4w4ws0001q8ulmn70n0ir	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CUSTOMER	UPDATE	003	কাস্টমার "ইমরান হোসেন" এর কাস্টমারের ঠিকানা চরবাটা থেকে চরবাটা5 পরিবর্তন করা হয়েছে।	2026-10-01 06:09:12.412	f
cmup4xjpg0005q8ul79wle558	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	CUSTOMER	UPDATE	003	কাস্টমার "ইমরান হোসেন" এর কাস্টমারের ঠিকানা চরবাটা5 থেকে চরবাটা পরিবর্তন করা হয়েছে।	2026-10-01 06:10:18.244	f
cmupbyvqy0000a4ultlv7uly6	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	a4a9e555-07d1-477e-82ad-ee9f42f3385b	ইউজার এর ইউজারের নাম  আব্দুর রহমান থেকে  আব্দুর রহমানt পরিবর্তন করা হয়েছে।	2026-10-01 09:27:17.819	f
cmupc0dek000080ulpxywfh7u	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	a4a9e555-07d1-477e-82ad-ee9f42f3385b	ইউজার # আব্দুর রহমানt এর ইউজারের নাম  আব্দুর রহমানt থেকে  আব্দুর রহমান পরিবর্তন করা হয়েছে।	2026-10-01 09:28:27.356	f
cmupc258t000380ul1gbeqgi2	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইউজারের নাম Suvash Babu থেকে Suvash Babu 5\\ পরিবর্তন করা হয়েছে।	2026-10-01 09:29:50.093	f
cmupc2gc7000580ul9ny97cpx	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu 5\\ এর ইউজারের নাম Suvash Babu 5\\ থেকে Suvash Babu পরিবর্তন করা হয়েছে।	2026-10-01 09:30:04.471	f
cmupcecw0000880ulhtpk4ha3	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	DELETE	d7b86b05-c570-43ba-a83c-bdfbd1a80328	ইউজার #Sabbir মুছে ফেলা হয়েছে।	2026-10-01 09:39:19.872	f
cmv9wtn4f0000k0uld3hbywpn	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর email - থেকে Suvash Babu পরিবর্তন করা হয়েছে।	2026-10-15 19:06:28.815	f
cmv9x4n87000038ulcqt8bub0	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu আপডেট করা হয়েছে।	2026-10-15 19:15:02.167	f
cmv9x74im0000tgul5ypzhhu8	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu আপডেট করা হয়েছে।	2026-10-15 19:16:57.886	f
cmv9x98ne0000kkulyjpfvym6	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu আপডেট করা হয়েছে।	2026-10-15 19:18:36.554	f
cmv9xa5850001kkulrj95ek6b	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।	2026-10-15 19:19:18.773	f
cmv9xarr30002kkul3z8y3fu3	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।	2026-10-15 19:19:47.967	f
cmv9xchzq0000zgul3xtr67zy	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।	2026-10-15 19:21:08.63	f
cmvadu20q00004cul41h7pbp7	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	ইউজার #montu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।	2026-10-16 03:02:41.594	f
cmvaeixr20000pgulx9ghham4	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল - থেকে mhsabbir220@gmail.com পরিবর্তন করা হয়েছে।	2026-10-16 03:22:02.463	f
cmvaemvr70000houllc2v1j0h	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল - থেকে mhsabbir220@gmail.com পরিবর্তন করা হয়েছে।	2026-10-16 03:25:06.499	f
cmvaet10t00002culz21ifbju	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল mhsabbir220@gmail.com থেকে mhsabbir220@gmil.com পরিবর্তন করা হয়েছে।	2026-10-16 03:29:53.261	f
cmvaet5q400012culrsrxq899	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	USER	UPDATE	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	ইউজার #Suvash Babu এর ইমেইল mhsabbir220@gmil.com থেকে mhsabbir220@gmail.com পরিবর্তন করা হয়েছে।	2026-10-16 03:29:59.356	f
cmw80r3be0000g0ul48ewxdfe	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	PAYMENT	UPDATE	e03589a7-c698-491e-bc78-27ba77ea1830	পেমেন্ট #অন্তু ম্যানেজার এর ডকুমেন্ট - থেকে dua-1794153638203-172320643.png পরিবর্তন করা হয়েছে।	2026-11-08 16:00:38.282	f
cmw81feoz0001g0ulo5z0mm9w	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	LEDGER	DELETE	e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda	খতিয়ান #106 মুছে ফেলা হয়েছে।	2026-11-08 16:19:32.771	f
\.


--
-- Data for Name: ApprovalRequest; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ApprovalRequest" (id, "vataId", "requestedById", action, module, "targetId", "oldData", "newData", status, "reviewedAt", "createdAt", "updatedAt", "isDeleted") FROM stdin;
cmukxinx50000y0ulwes01yaz	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	DELIVERY	a70c5c14-7e38-4c35-b1c9-e647a0eb097b	{"class": "২ নং (ক)", "quantity": 1000, "deliveryNo": 5, "deliveryDate": "2026-09-28T07:29:29.155Z", "deliveryReceived": 500, "nextDeliveryDate": "2026-09-28T18:00:00.000Z", "deliveryRemaining": 500}	\N	APPROVED	2026-09-28 07:37:54.922	2026-09-28 07:31:41.849	2026-09-28 07:37:54.923	f
cmuky1mm90000loulgoekgg3e	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	DELIVERY	655fa2b0-1b97-4ae5-aeb3-a789009bdaa1	{"class": "২ নং (ক)", "quantity": 1000, "deliveryNo": 7, "deliveryDate": "2026-09-28T07:41:46.818Z", "lastDelivered": 500, "deliveryReceived": 100, "nextDeliveryDate": "2026-09-29T18:00:00.000Z", "deliveryRemaining": 400}	\N	APPROVED	2026-09-28 07:47:03.397	2026-09-28 07:46:26.625	2026-09-28 07:47:03.398	f
cmul5cogu00007oulvmgrznxw	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	DUE	7eb30ccf-aea3-4820-85fe-d25d0c9c8bb1	{"due": 2500, "newDue": 2000, "collect": 500, "nextDate": "2026-09-28T18:00:00.000Z"}	{"due": 2500, "newDue": 1500, "collect": 1000, "nextDate": "2026-09-28T18:00:00.000Z"}	APPROVED	2026-09-28 11:11:28.796	2026-09-28 11:10:59.55	2026-09-28 11:11:28.797	f
cmulooiwt0001zsul1hohmrz7	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CASH	99edea6b-e91d-43cf-a5bd-0496412b569e	{"type": "INCOME", "amount": "1200", "source": "sabbir", "description": "ttt"}	\N	APPROVED	2026-09-28 20:13:52.57	2026-09-28 20:12:04.925	2026-09-28 20:13:52.576	f
cmum3jf7s0000vsulall0l5bt	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CASH	90045992-549e-4958-8fb2-20bc6b4a662b	{"type": "INCOME", "amount": "9000", "source": "Mursalin Vao", "description": "hoio"}	{"type": "INCOME", "amount": 8000, "source": "Mursalin Vao", "description": "hoio"}	APPROVED	2026-09-29 03:08:56.072	2026-09-29 03:08:01.096	2026-09-29 03:08:56.076	f
cmum3lu2y0002vsulqk5qa9sm	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CASH	90045992-549e-4958-8fb2-20bc6b4a662b	{"type": "INCOME", "amount": "8000", "source": "Mursalin Vao", "description": "hoio"}	\N	APPROVED	2026-09-29 03:10:07.415	2026-09-29 03:09:53.674	2026-09-29 03:10:07.416	f
cmum8mt5100004culwu1xsbfc	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	15716b3b-c8b4-4418-866e-63ecd00d0876	{"date": "2026-09-29T05:27:03.890Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}	{"date": "2026-09-29T05:27:03.890Z", "class": "১ নং", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট মাঠে", "quantity": 2000}	PENDING	\N	2026-09-29 05:30:37.189	2026-09-29 05:30:37.189	f
cmum8rwzh00014culzq4g7ijz	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	c57535df-9cb2-4333-863b-ff9fdcfe85d0	{"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	{"date": "2026-09-29T05:34:12.490Z", "class": "১ নং", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}	PENDING	\N	2026-09-29 05:34:35.453	2026-09-29 05:34:35.453	f
cmum8sywu0000isuln9b2zm4b	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	c57535df-9cb2-4333-863b-ff9fdcfe85d0	{"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	{"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}	PENDING	\N	2026-09-29 05:35:24.606	2026-09-29 05:35:24.606	f
cmum8vayo00001kuleaaps9po	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	c57535df-9cb2-4333-863b-ff9fdcfe85d0	{"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	{"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 600}	PENDING	\N	2026-09-29 05:37:13.536	2026-09-29 05:37:13.536	f
cmum94gb00000f8ul0oj1a9fe	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	{"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	{"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}	PENDING	\N	2026-09-29 05:44:20.364	2026-09-29 05:44:20.364	f
cmum9750g0002dkulrn8qx0e3	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	{"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}	{"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 1500}	APPROVED	2026-09-29 05:46:36.842	2026-09-29 05:46:25.696	2026-09-29 05:46:36.843	f
cmum97ow70004dkulvkr2u511	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	e2ce27f2-5ab9-4026-a8af-913c6b344f5f	{"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 1500}	{"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট মাঠে", "quantity": 1500}	APPROVED	2026-09-29 05:47:03.218	2026-09-29 05:46:51.463	2026-09-29 05:47:03.218	f
cmum98olx0006dkulkokitz7m	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	06232db8-5e0c-42c4-a69c-09bc224da9e5	{"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}	{"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 300}	PENDING	\N	2026-09-29 05:47:37.749	2026-09-29 05:47:37.749	f
cmum9a2bv0007dkul9gck8g4y	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	06232db8-5e0c-42c4-a69c-09bc224da9e5	{"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}	{"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 1000}	APPROVED	2026-09-29 05:51:04.672	2026-09-29 05:48:42.188	2026-09-29 05:51:04.672	f
cmum9s4130000igulz6xn1j4m	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	LOAD_INFO	f3dde422-92b4-4d7e-86a3-9803b09e9389	{"date": "2026-09-29T06:01:01.139Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}	\N	APPROVED	2026-09-29 06:11:16.384	2026-09-29 06:02:44.199	2026-09-29 06:11:16.387	f
cmuma87gg0003igulmboaxa49	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	9f4318ab-e3c3-4f21-b41a-83877d40cc75	{"date": "2026-09-29T06:14:58.591Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}	{"date": "2026-09-29T06:14:58.591Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 5000}	APPROVED	2026-09-29 06:16:39.696	2026-09-29 06:15:15.137	2026-09-29 06:16:39.697	f
cmumam13f000098ule3zwhntn	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c	{"date": "2026-09-29T06:25:37.024Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}	{"date": "2026-09-29T06:25:37.024Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 600}	APPROVED	2026-09-29 06:26:23.77	2026-09-29 06:26:00.075	2026-09-29 06:26:23.772	f
cmumasejn000080uldu3eblw9	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	53dc21af-9227-476a-b8d4-45a311fe09e4	{"date": "2026-09-29T06:28:37.884Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}	{"date": "2026-09-29T06:28:37.884Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	APPROVED	2026-09-29 06:31:15.207	2026-09-29 06:30:57.443	2026-09-29 06:31:15.208	f
cmumatjvd000280ulfwtctggu	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	LOAD_INFO	53dc21af-9227-476a-b8d4-45a311fe09e4	{"date": "2026-09-29T06:28:37.884Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	\N	APPROVED	2026-09-29 06:32:32.004	2026-09-29 06:31:51.001	2026-09-29 06:32:32.004	f
cmumazt6k000480ul5io0j9qw	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	419addd1-d8b2-4417-a1bb-2c6dcb041313	{"date": "2026-09-29T06:36:19.358Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}	{"date": "2026-09-29T06:36:19.358Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	APPROVED	2026-09-29 06:37:03.028	2026-09-29 06:36:43.004	2026-09-29 06:37:03.028	f
cmumb10nz000680ulpg33h8c7	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	LOAD_INFO	419addd1-d8b2-4417-a1bb-2c6dcb041313	{"date": "2026-09-29T06:36:19.358Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	\N	APPROVED	2026-09-29 06:38:02.492	2026-09-29 06:37:39.359	2026-09-29 06:38:02.492	f
cmumgt83m0001f4ulgkejzp8e	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	GOOD_HISTORY_LOG	e99260c7-90d4-4f78-a2e5-49d51e2ec96f	{"name": "Motorchycle"}	{"name": "Motorchyclee"}	PENDING	\N	2026-09-29 09:19:33.442	2026-09-29 09:19:33.442	f
cmumgvwgz00008wult93ojvtf	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	GOODS_STOCK_CATEGORY	534d9437-ad31-4640-a2e2-3217b4412d6f	{"name": "Mursalin"}	{"name": "Mursalinn"}	APPROVED	2026-09-29 09:21:53.783	2026-09-29 09:21:38.339	2026-09-29 09:21:53.787	f
cmumgwn4r00028wul1m91uhcy	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	GOODS_STOCK_CATEGORY	05d84354-ea44-4657-8acd-c0a4c31622e4	{"name": "Mursalins"}	\N	APPROVED	2026-09-29 09:23:14.186	2026-09-29 09:22:12.891	2026-09-29 09:23:14.186	f
cmumlp3e300008kulvm1y1h7p	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	LOAD_INFO	2ad8ee4e-105a-4316-bc83-3781af672439	{"date": "2026-09-29T11:36:03.333Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}	{"date": "2026-09-29T11:36:03.333Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}	CANCELLED	2026-09-29 11:36:32.211	2026-09-29 11:36:18.795	2026-09-29 11:36:32.214	f
cmunwnxne0001mkul10tmh42e	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CONTACT	593ebac1-0e4c-4826-bc7f-0c5504e5b6a4	{"name": "Shakib Hasan", "phone": "01760564065", "address": "Barisall", "occupation": "Student"}	{"name": "Shakib Hasan", "phone": "01760564060", "address": "Barisall", "occupation": "Student"}	APPROVED	2026-09-30 09:36:30.05	2026-09-30 09:31:06.65	2026-09-30 09:36:30.055	f
cmunwwiv90005mkul0opnbf6o	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	DRIVER	f575a0fa-6f73-4478-bfb3-6c76c16159e2	{"name": "Shakib Hasan", "salary": "10000", "PhoneNumber": "01407128177"}	{"name": "Shakib Hasan", "salary": 12000, "PhoneNumber": "01407128177"}	APPROVED	2026-09-30 09:37:58.13	2026-09-30 09:37:47.397	2026-09-30 09:37:58.131	f
cmunx60nm000020ulte52gvmh	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	DRIVER	307c2dae-887f-4767-86e6-1883df74dbbd	{"name": "Tanvir", "salary": "0", "PhoneNumber": "01407128177"}	{"name": "Tanvir", "salary": 0, "PhoneNumber": "014071281777"}	CANCELLED	2026-09-30 09:45:32.839	2026-09-30 09:45:10.354	2026-09-30 09:45:32.84	f
cmunx6qfm000120uli8dkqvdl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	DRIVER	307c2dae-887f-4767-86e6-1883df74dbbd	{"name": "Tanvir", "salary": "0", "PhoneNumber": "01407128177"}	\N	APPROVED	2026-09-30 09:46:36.27	2026-09-30 09:45:43.762	2026-09-30 09:46:36.272	f
cmunxj1tg000320ul75829yad	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CONTACT	593ebac1-0e4c-4826-bc7f-0c5504e5b6a4	{"name": "Shakib Hasan", "phone": "01760564060", "address": "Barisall", "occupation": "Student"}	\N	PENDING	\N	2026-09-30 09:55:18.388	2026-09-30 09:55:18.388	f
cmunxkoyt000420ul89yp3qbl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CONTACT	5bc0f659-b449-4a7c-895a-a07155d1624a	{"name": "uidwe", "phone": "01760564065", "address": "Barisal", "occupation": "dwdoew"}	\N	APPROVED	2026-09-30 10:00:11.815	2026-09-30 09:56:35.045	2026-09-30 10:00:11.822	f
cmunxupn100011culupnnrgdv	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CAR_RENT	628b2dc8-3223-4468-b3ca-fa321744d2bb	{"area": "Mirpur 2", "rent": 900, "address": "Dhaka Mirpur"}	{"area": "Mirpur 22", "rent": 900, "address": "Dhaka Mirpur"}	APPROVED	2026-09-30 10:04:42.235	2026-09-30 10:04:22.477	2026-09-30 10:04:42.236	f
cmunxvhjz00031culhfu3qadl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CAR_RENT	628b2dc8-3223-4468-b3ca-fa321744d2bb	{"area": "Mirpur 22", "rent": 900, "address": "Dhaka Mirpur"}	{"area": "Mirpur 2", "rent": 900, "address": "Dhaka Mirpur"}	CANCELLED	2026-09-30 10:05:10.964	2026-09-30 10:04:58.655	2026-09-30 10:05:10.965	f
cmunxw4hn00041culp3ixrsjl	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	628b2dc8-3223-4468-b3ca-fa321744d2bb	{"area": "Mirpur 22", "rent": 900, "address": "Dhaka Mirpur"}	\N	APPROVED	2026-09-30 10:05:38.75	2026-09-30 10:05:28.379	2026-09-30 10:05:38.75	f
cmunxwynw00061culjc52fjn8	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	7c32b3ff-17df-455c-aea1-db9ed7165351	{"area": "Mirpur 22", "rent": 700, "address": "গঙ্গাপুর, বোরহানউদ্দিন"}	\N	CANCELLED	2026-09-30 10:06:15.939	2026-09-30 10:06:07.484	2026-09-30 10:06:15.939	f
cmunxzi8r0000ewulal4ftwym	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	46d3a8e8-d9b1-4bf0-b14f-f1cbb672a58a	{"area": "Alomdanga", "rent": 100, "address": "Dhaka Mirpur"}	\N	CANCELLED	2026-09-30 10:08:32.021	2026-09-30 10:08:06.171	2026-09-30 10:08:32.024	f
cmuny0xqm0000vsulouslgm67	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	70f00eff-b827-41d8-8501-ca491ce52266	{"area": "Alomdanga", "rent": 509, "address": "Dhaka Mirpur"}	\N	APPROVED	2026-09-30 10:09:26.613	2026-09-30 10:09:12.91	2026-09-30 10:09:26.616	f
cmuny1t9i0002vsul1cksm8vg	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	38f37f7d-cc70-48fa-8cc8-839befe51e23	{"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}	\N	CANCELLED	2026-09-30 10:10:03.617	2026-09-30 10:09:53.766	2026-09-30 10:10:03.619	f
cmuny29th0003vsull8j9w59s	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CAR_RENT	38f37f7d-cc70-48fa-8cc8-839befe51e23	{"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}	{"area": "Baofol", "rent": 100, "address": "Dhaka Mirpur"}	CANCELLED	2026-09-30 10:10:26.38	2026-09-30 10:10:15.221	2026-09-30 10:10:26.38	f
cmuny6k3h00005gulkqmhn49b	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CONTACT	28b8de1b-9065-4513-afdd-a7fddc6b827e	{"name": "Mahbubul Hasan", "phone": "01760564065", "address": "Barisal", "occupation": "w"}	\N	CANCELLED	2026-09-30 10:13:45.895	2026-09-30 10:13:35.165	2026-09-30 10:13:45.899	f
cmuo5e2zq0000g0ultmxbbmwp	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	38f37f7d-cc70-48fa-8cc8-839befe51e23	{"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}	\N	CANCELLED	2026-09-30 13:35:46.426	2026-09-30 13:35:23.558	2026-09-30 13:35:46.427	f
cmuo5g2ti0001g0ulfkgibpyf	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CAR_RENT	38f37f7d-cc70-48fa-8cc8-839befe51e23	{"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}	\N	CANCELLED	2026-09-30 13:37:05.479	2026-09-30 13:36:56.646	2026-09-30 13:37:05.481	f
cmuo5h3ve0002g0ulg7syel78	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	CONTACT	75608cdb-3a50-4c74-81c2-09e1b3200db5	{"name": "tre", "phone": "01760564065", "address": "tert", "occupation": "Studentt"}	\N	CANCELLED	2026-09-30 13:37:52.117	2026-09-30 13:37:44.666	2026-09-30 13:37:52.117	f
cmuo5jk7i0003g0ul25bl779m	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CONTACT	75608cdb-3a50-4c74-81c2-09e1b3200db5	{"name": "tre", "phone": "01760564065", "address": "tert", "occupation": "Studentt"}	{"name": "tre", "phone": "01760564065", "address": "tertg", "occupation": "Studentt"}	PENDING	\N	2026-09-30 13:39:39.15	2026-09-30 13:39:39.15	f
cmup1h4i30000wculbo9zc9mj	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	STOCK	9fb05ae3-312c-494c-b0ce-9e7fcff1c346	{"name": "পিকেট", "stockIn": 700, "stockOut": 0}	\N	CANCELLED	2026-10-01 05:07:06.86	2026-10-01 04:33:33.195	2026-10-01 05:07:06.865	f
cmup2oi3b0001wculsezpi04q	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	STOCK	9fb05ae3-312c-494c-b0ce-9e7fcff1c346	{"name": "পিকেট", "stockIn": 700, "stockOut": 0}	\N	APPROVED	2026-10-01 05:07:26.084	2026-10-01 05:07:17.015	2026-10-01 05:07:26.085	f
cmup48ne400016oulb5a9wb5h	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	004	{"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	{"name": "Mredul", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	CANCELLED	2026-10-01 05:51:17.345	2026-10-01 05:50:56.62	2026-10-01 05:51:17.348	f
cmup4btgl0000e0ulctb2n6ta	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	004	{"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	{"name": "Mredulll", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	PENDING	\N	2026-10-01 05:53:24.453	2026-10-01 05:53:24.453	f
cmup4dmw600009kul3hahkxw0	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	004	{"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	{"name": "Mredul", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	PENDING	\N	2026-10-01 05:54:49.254	2026-10-01 05:54:49.254	f
cmup4gkf100019kultrjzb9f1	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	004	{"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	{"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	APPROVED	2026-10-01 06:03:13.808	2026-10-01 05:57:06.013	2026-10-01 06:03:13.81	f
cmup4oc730000bsulcxhttxhp	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	003	{"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	{"name": "ইমরান হোসেনn", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	APPROVED	2026-10-01 06:03:46.571	2026-10-01 06:03:08.608	2026-10-01 06:03:46.572	f
cmup4pd530003bsul82fkir9g	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	003	{"name": "ইমরান হোসেনn", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	{"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	APPROVED	2026-10-01 06:04:07.017	2026-10-01 06:03:56.487	2026-10-01 06:04:07.018	f
cmup4pzl90005bsulyysgtxv7	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	004	{"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	{"name": "Mredul", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}	CANCELLED	2026-10-01 06:04:34.742	2026-10-01 06:04:25.581	2026-10-01 06:04:34.745	f
cmup4vzob0000q8uljakunxbz	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	003	{"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	{"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}	APPROVED	2026-10-01 06:09:12.422	2026-10-01 06:09:05.628	2026-10-01 06:09:12.424	f
cmup4wef80002q8ulwe2028ez	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	003	{"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}	{"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	CANCELLED	2026-10-01 06:09:30.22	2026-10-01 06:09:24.74	2026-10-01 06:09:30.224	f
cmup4wsnb0003q8ulorojrg38	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	003	{"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}	{"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	CANCELLED	2026-10-01 06:09:50.407	2026-10-01 06:09:43.175	2026-10-01 06:09:50.407	f
cmup4xflq0004q8ulxd5j072l	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	CUSTOMER	003	{"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}	{"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}	APPROVED	2026-10-01 06:10:18.26	2026-10-01 06:10:12.926	2026-10-01 06:10:18.26	f
cmupc1apo000180ulp034knuo	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	USER	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	{"name": "Suvash Babu", "role": "OWNER", "username": "suvash"}	{"name": "Suvash Babu g", "role": "OWNER", "username": "suvash"}	CANCELLED	2026-10-01 09:29:22.158	2026-10-01 09:29:10.524	2026-10-01 09:29:22.161	f
cmupc20jd000280ulqziwkt83	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	USER	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	{"name": "Suvash Babu", "role": "OWNER", "username": "suvash"}	{"name": "Suvash Babu 5\\\\", "role": "OWNER", "username": "suvash"}	APPROVED	2026-10-01 09:29:50.109	2026-10-01 09:29:43.993	2026-10-01 09:29:50.111	f
cmupc2cly000480ulv6qbzjlz	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	UPDATE	USER	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	{"name": "Suvash Babu 5\\\\", "role": "OWNER", "username": "suvash"}	{"name": "Suvash Babu", "role": "OWNER", "username": "suvash"}	APPROVED	2026-10-01 09:30:04.487	2026-10-01 09:29:59.638	2026-10-01 09:30:04.488	f
cmupcd0lq000680ultmwy3ynd	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	USER	d7b86b05-c570-43ba-a83c-bdfbd1a80328	{"name": "Sabbir", "role": "OPERATOR", "username": "kk"}	\N	CANCELLED	2026-10-01 09:39:03.112	2026-10-01 09:38:17.294	2026-10-01 09:39:03.113	f
cmupce6ev000780ulesv7wot6	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	a4a9e555-07d1-477e-82ad-ee9f42f3385b	DELETE	USER	d7b86b05-c570-43ba-a83c-bdfbd1a80328	{"name": "Sabbir", "role": "OPERATOR", "username": "kk"}	\N	APPROVED	2026-10-01 09:39:19.892	2026-10-01 09:39:11.479	2026-10-01 09:39:19.892	f
\.


--
-- Data for Name: BrickStockSummary; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BrickStockSummary" (id, "vataId", "rawBrick", "fieldBrick", "stockBrick", "chulliBrick", "createdAt", "updatedAt") FROM stdin;
52719b69-26b7-4074-8171-cd1f905230c1	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	1100	1000	0	4900	2026-09-13 03:25:57.698	2026-09-29 11:36:08.682
\.


--
-- Data for Name: CarIncomeDelivery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CarIncomeDelivery" (id, amount, "driverId", "deliveryId", "carId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Contact" (id, name, address, occupation, phone, "createdAt", "updatedAt", "vataId", "deleteStatus", "updateStatus") FROM stdin;
593ebac1-0e4c-4826-bc7f-0c5504e5b6a4	Shakib Hasan	Barisall	Student	01760564060	2026-09-30 09:25:30.619	2026-09-30 09:55:18.373	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	PENDING	APPROVED
28b8de1b-9065-4513-afdd-a7fddc6b827e	Mahbubul Hasan	Barisal	w	01760564065	2026-09-30 10:13:28.658	2026-09-30 10:13:45.916	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	PENDING	CANCELLED
75608cdb-3a50-4c74-81c2-09e1b3200db5	tre	tert	Studentt	01760564065	2026-09-30 13:37:41.345	2026-09-30 13:39:39.134	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	CANCELLED	PENDING
\.


--
-- Data for Name: DatabaseBackup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DatabaseBackup" (id, "createdAt", "fileName", "filePath", "fileSize", "tableCount", "tableRowCounts", "totalRowCount", type) FROM stdin;
740a2e32-05cd-4c64-8542-9b9af7661b48	2026-09-13 05:38:13.465	brick-management-backup-2026-09-13-11-38-13.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-13-11-38-13.sql	110820	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 3, "Driver": 0, "Ledger": 0, "Season": 50, "SmsLog": 0, "Unload": 0, "AboutUs": 1, "Contact": 0, "Payment": 0, "VataCar": 1, "Weather": 0, "chllans": 3, "Document": 1, "HelpLine": 1, "LoadInfo": 1, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 2, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 0, "UnloadItem": 0, "deliveries": 0, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 3, "customerdues": 3, "classAndRates": 1, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 0, "login_histories": 27, "vatainformation": 2, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 0, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 30, "SubscriptionPayment": 2, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 0}	147	MANUAL
a986a596-7f50-4672-833e-55a66dec0953	2026-09-13 05:46:26.255	brick-management-backup-2026-09-13-11-46-25.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-13-11-46-25.sql	109655	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 3, "Driver": 0, "Ledger": 0, "Season": 50, "SmsLog": 0, "Unload": 0, "AboutUs": 1, "Contact": 0, "Payment": 0, "VataCar": 1, "Weather": 0, "chllans": 3, "Document": 1, "HelpLine": 1, "LoadInfo": 1, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 2, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 0, "UnloadItem": 0, "deliveries": 0, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 3, "customerdues": 3, "classAndRates": 1, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 0, "login_histories": 27, "vatainformation": 2, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 0, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 30, "SubscriptionPayment": 2, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 0}	147	MANUAL
5b3734bb-c28c-46de-8d15-b476864fa809	2026-09-13 05:46:27.75	brick-management-backup-2026-09-13-11-46-27.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-13-11-46-27.sql	110820	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 3, "Driver": 0, "Ledger": 0, "Season": 50, "SmsLog": 0, "Unload": 0, "AboutUs": 1, "Contact": 0, "Payment": 0, "VataCar": 1, "Weather": 0, "chllans": 3, "Document": 1, "HelpLine": 1, "LoadInfo": 1, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 2, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 0, "UnloadItem": 0, "deliveries": 0, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 3, "customerdues": 3, "classAndRates": 1, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 0, "login_histories": 27, "vatainformation": 2, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 0, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 30, "SubscriptionPayment": 2, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 0}	147	MANUAL
da7d8e53-1691-4037-938a-08a0c7efe5bd	2026-09-21 18:00:02.045	brick-management-backup-2026-09-22-00-00-00.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-22-00-00-00.sql	128802	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 4, "Driver": 2, "Ledger": 5, "Season": 75, "SmsLog": 0, "Unload": 1, "AboutUs": 1, "Contact": 0, "Payment": 4, "VataCar": 2, "Weather": 0, "chllans": 4, "Document": 2, "HelpLine": 1, "LoadInfo": 5, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 3, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 1, "UnloadItem": 1, "deliveries": 5, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 4, "customerdues": 4, "classAndRates": 2, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 1, "login_histories": 47, "vatainformation": 3, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 5, "ReceivablePayable": 2, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 32, "SubscriptionPayment": 3, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 1}	236	AUTO
0ecb008c-0785-43b4-8b8c-645e7b61bad3	2026-09-22 18:00:00.693	brick-management-backup-2026-09-23-00-00-00.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-23-00-00-00.sql	134383	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 4, "Driver": 2, "Ledger": 5, "Season": 75, "SmsLog": 0, "Unload": 1, "AboutUs": 1, "Contact": 0, "Payment": 4, "VataCar": 2, "Weather": 0, "chllans": 7, "Document": 2, "HelpLine": 1, "LoadInfo": 5, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 4, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 1, "UnloadItem": 1, "deliveries": 5, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 8, "customerdues": 7, "classAndRates": 6, "GoodHistoryLog": 0, "duecollections": 1, "VataSmsSettings": 1, "login_histories": 53, "vatainformation": 3, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 5, "ReceivablePayable": 2, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 33, "SubscriptionPayment": 3, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 1}	259	AUTO
f37840fa-c282-4f3d-9cbb-e27a3950cc15	2026-09-24 18:00:00.977	brick-management-backup-2026-09-25-00-00-00.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-25-00-00-00.sql	135856	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 4, "Driver": 2, "Ledger": 5, "Season": 75, "SmsLog": 0, "Unload": 1, "AboutUs": 1, "Contact": 0, "Payment": 5, "VataCar": 2, "Weather": 0, "chllans": 7, "Document": 1, "HelpLine": 1, "LoadInfo": 5, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 4, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 1, "UnloadItem": 1, "deliveries": 5, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 8, "customerdues": 7, "classAndRates": 6, "GoodHistoryLog": 0, "duecollections": 1, "VataSmsSettings": 1, "login_histories": 55, "vatainformation": 3, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 5, "ReceivablePayable": 2, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 33, "SubscriptionPayment": 3, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 1}	261	AUTO
13023939-ad06-42b0-9f0a-9d76253be725	2026-09-28 18:00:01.572	brick-management-backup-2026-09-29-00-00-00.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-29-00-00-00.sql	155191	54	{"Faq": 2, "Note": 0, "cash": 1, "Round": 1, "users": 5, "Driver": 2, "Ledger": 8, "Season": 75, "SmsLog": 0, "Unload": 3, "AboutUs": 1, "Contact": 0, "Payment": 5, "VataCar": 2, "Weather": 0, "chllans": 1, "Document": 1, "HelpLine": 1, "LoadInfo": 10, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 5, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 1, "UnloadItem": 6, "deliveries": 0, "ActivityLog": 12, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 1, "customerdues": 1, "classAndRates": 8, "GoodHistoryLog": 0, "duecollections": 2, "ApprovalRequest": 3, "VataSmsSettings": 1, "login_histories": 81, "vatainformation": 3, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 2, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 46, "SubscriptionPayment": 3, "DatabaseBackupPermission": 1, "DeliveryStatusActionTime": 0, "ReceivablePayableTransaction": 1}	307	AUTO
daeb0251-4ff9-43f8-af8a-6df8311f125f	2026-10-02 18:00:00.747	brick-management-backup-2026-10-03-00-00-00.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-10-03-00-00-00.sql	373284	55	{"Faq": 2, "Note": 0, "cash": 6, "Round": 1, "users": 6, "Driver": 6, "Ledger": 8, "Season": 75, "SmsLog": 0, "Unload": 4, "AboutUs": 1, "Contact": 3, "Payment": 5, "VataCar": 2, "Weather": 0, "chllans": 2, "Document": 1, "HelpLine": 1, "LoadInfo": 28, "carrents": 3, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 1, "customers": 5, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 1, "UnloadItem": 7, "deliveries": 0, "ActivityLog": 87, "TaskManager": 1, "YoutubeLink": 2, "Notification": 6, "challanItems": 2, "customerdues": 2, "vata_backups": 1, "classAndRates": 8, "GoodHistoryLog": 0, "duecollections": 2, "ApprovalRequest": 63, "VataSmsSettings": 1, "login_histories": 114, "vatainformation": 3, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 2, "GoodsStockCategory": 7, "SmsRechargeHistory": 0, "_prisma_migrations": 54, "SubscriptionPayment": 3, "DatabaseBackupPermission": 1, "DeliveryStatusActionTime": 0, "ReceivablePayableTransaction": 1}	530	AUTO
\.


--
-- Data for Name: DatabaseBackupPermission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DatabaseBackupPermission" (id, type) FROM stdin;
47a64748-f851-494f-b248-097663c13912	AUTO
\.


--
-- Data for Name: DeliveryStatusActionTime; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DeliveryStatusActionTime" (id, "deliveryId", "pendingTime", "processingTime", "deliveredTime", "cancelTime") FROM stdin;
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Document" (id, name, type, "parentId", "fileUrl", "fileKey", "mimeType", size, extension, "createdAt", "updatedAt", "vataId") FROM stdin;
cmtyt6rq100005cul7e4hp6vo	chalan-1788949309884-1789243172525-546405515.pdf	FILE	\N			application/pdf	122762	pdf	2026-09-12 19:59:32.569	2026-09-12 19:59:32.569	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Driver" (id, name, "PhoneNumber", salary, "vataId", "createdAt", "updatedAt", "deleteStatus", "updateStatus", "isDeleted") FROM stdin;
86e0d11b-e7ee-499b-b97e-d4ecc0766650	Shakib Hasan	01407128177	0.00	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2026-09-21 17:37:34.251	2026-09-21 17:37:34.251	DEFAULT	DEFAULT	f
f575a0fa-6f73-4478-bfb3-6c76c16159e2	Shakib Hasan	01407128177	12000.00	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-14 18:42:01.557	2026-09-30 09:38:17.813	DEFAULT	APPROVED	t
5370e75b-b086-498d-8503-76d50eb6fed8	অন্তু ম্যানেজার	01407128177	1000.00	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-30 09:38:32.041	2026-09-30 09:40:24.019	DEFAULT	DEFAULT	t
feb4406a-7895-44d3-b481-2264cc185f7a	Ahosun	01407128181	0.00	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-30 09:41:25.383	2026-09-30 09:41:28.271	DEFAULT	DEFAULT	t
307c2dae-887f-4767-86e6-1883df74dbbd	Tanvir	01407128177	0.00	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-30 09:45:06.807	2026-09-30 09:46:36.254	PENDING	CANCELLED	t
042dc8f5-e708-4873-9897-6556c1e85878	Ahosun	01407128177	0.00	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-30 13:45:43.325	2026-09-30 13:45:43.325	DEFAULT	DEFAULT	f
\.


--
-- Data for Name: Faq; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Faq" (id, title, description, "createdAt", "updatedAt") FROM stdin;
7d2394af-46e2-405d-a0b0-a0ef1414358f	ewporopeq	fergferbe trbtrrrrrrr	2026-09-12 02:36:25.574	2026-09-12 02:40:30.174
c903e406-a78d-401e-922a-5e8b81f50999	ttttt	3ter ere	2026-09-12 02:36:34.993	2026-09-12 02:40:49.806
\.


--
-- Data for Name: GoodHistoryLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GoodHistoryLog" (id, type, "receiveBy", quantity, "returnBy", "goodId", date, damage, lost, okay, image, "createdAt", "updatedAt", description) FROM stdin;
\.


--
-- Data for Name: GoodsIssue; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GoodsIssue" (id, name, location, quantity, date, image, "goodId", note, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GoodsLoss; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GoodsLoss" (id, "goodId", quantity, type, "lossAmount", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GoodsStock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GoodsStock" (id, name, shop, quantity, price, warranty, image, "categoryId", "vataId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GoodsStockCategory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."GoodsStockCategory" (id, name, "createdAt", "updatedAt", "vataId", "isDeleted", "deleteStatus", "updateStatus") FROM stdin;
9ceeed09-2676-447e-9ed3-91260aac411b	Electronicss	2026-09-12 19:12:48.095	2026-09-12 19:12:53.253	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	DEFAULT	DEFAULT
8049565d-8420-4c28-a5e0-e08e8bdd7225	Tanvir	2026-09-12 19:30:31.957	2026-09-12 19:30:35.644	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	t	DEFAULT	DEFAULT
fb147b3c-b96e-488d-b625-bb84647886a0	Mursalinn	2026-09-29 09:17:13.388	2026-09-29 09:17:31.257	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	t	APPROVED	APPROVED
9fa5234f-59a6-40be-b0e2-a43529c3c49c	Tanvir	2026-09-29 09:18:30.42	2026-09-29 09:18:36.884	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	t	APPROVED	DEFAULT
e99260c7-90d4-4f78-a2e5-49d51e2ec96f	Motorchycle	2026-09-29 09:19:29.115	2026-09-29 09:19:33.429	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	DEFAULT	PENDING
534d9437-ad31-4640-a2e2-3217b4412d6f	Mursalinn	2026-09-29 09:21:32.181	2026-09-29 09:21:53.75	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	DEFAULT	APPROVED
05d84354-ea44-4657-8acd-c0a4c31622e4	Mursalins	2026-09-29 09:21:28.404	2026-09-29 09:23:14.17	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	t	APPROVED	DEFAULT
\.


--
-- Data for Name: HelpLine; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."HelpLine" (id, "phoneNumber", website, email) FROM stdin;
16b70661-f38f-48e2-b55b-6a94948aa050	014071281777	https://chatgpt.com	mahbubulhasan604@gmail.com
\.


--
-- Data for Name: Ledger; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Ledger" (id, name, serial, "createdAt", "updatedAt", "parentId", rate, quantity, "isDeleted", "vataId", "seasonId", "phoneNumber", "startDate", "openingBalance", "openingBalanceType", salary, "weeklyFood", "deleteStatus", "updateStatus") FROM stdin;
86bc3f84-3c7a-407f-a4a0-c1ea9ae6f5a8	মাঝি	105	2026-09-25 09:19:52.52	2026-09-27 05:42:34.276	\N	0	0	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N	0	\N	0	0	APPROVED	DEFAULT
95f97fe6-3437-47f5-97a9-a2c18cf35482	Shakib Hasan	132	2026-09-27 05:45:10.373	2026-09-27 05:45:34.33	\N	0	0	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N	0	\N	0	0	APPROVED	DEFAULT
7a92bd48-b266-4c55-82f7-badae656de94	অন্তু ম্যানেজার	104	2026-09-25 09:12:34.332	2026-09-27 05:00:56.042	8a935ae3-b0e7-4f4c-a0a4-1b934c1ea626	500	30	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	014071281777	2026-09-24T18:00:00.000Z	100	দেনা	15000	0	DEFAULT	DEFAULT
62a7b9ee-38c4-4039-b186-356101f384ec	Ahosun	142	2026-09-27 05:48:11.652	2026-09-27 05:58:23.251	\N	0	10	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	014071281777	\N	0	\N	0	0	APPROVED	APPROVED
829d91e6-9446-4b61-9b15-110e903c2a06	কেরানি	102	2026-09-25 09:08:00.498	2026-09-27 04:10:44.312	\N	0	0	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N	0	\N	0	0	DEFAULT	DEFAULT
8a935ae3-b0e7-4f4c-a0a4-1b934c1ea626	ম্যানেজার	101	2026-09-25 09:07:20.588	2026-09-27 04:09:21.452	\N	0	0	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N	0	\N	0	0	DEFAULT	DEFAULT
47a7b977-d0ad-4a9b-92d9-fa60e6e7b2f7	Tanvir	144	2026-09-27 06:02:41.671	2026-09-27 06:05:07.033	\N	20	10	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	01407128177	\N	0	\N	500	0	APPROVED	APPROVED
e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda	ইব্রাহিম আগুন মাঝি	106	2026-09-25 09:20:52.137	2026-11-08 16:19:32.752	86bc3f84-3c7a-407f-a4a0-c1ea9ae6f5a8	5	500	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	014071281777	2026-09-24T18:00:00.000Z	100	পাওনা	2500	500	APPROVED	APPROVED
4f9ec4d4-bbe9-4129-81a6-3436b592843f	মাঝি	112	2026-11-08 16:19:45.073	2026-11-08 16:19:45.073	\N	0	0	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N	0	\N	0	0	DEFAULT	DEFAULT
bc44d255-e44c-47c2-b17f-15bdd2b2623a	Ahosun	221	2026-11-08 16:20:19.029	2026-11-08 16:20:19.029	4f9ec4d4-bbe9-4129-81a6-3436b592843f	9	2000	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	014071281777	2026-11-09T18:00:00.000Z	2000	পাওনা	12000	500	DEFAULT	DEFAULT
\.


--
-- Data for Name: LoadInfo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."LoadInfo" (id, date, "roundId", quantity, "loadType", "classId", "isDeleted", "createdAt", "updatedAt", "deleteStatus", "updateStatus") FROM stdin;
3ef54b97-bf24-4a16-a2f1-576ec612dba6	2026-09-13 03:25:46.15	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAWENTRY	\N	f	2026-09-13 03:25:57.703	2026-09-13 03:25:57.703	DEFAULT	DEFAULT
43f8fd5e-f0c9-458a-8e8f-8ecf4b74904e	2026-09-14 18:43:30.305	3f55423d-5264-4ddd-b0b6-1eed321e0efc	5000	RAWENTRY	\N	f	2026-09-14 18:43:36.533	2026-09-14 18:43:36.533	DEFAULT	DEFAULT
e3042834-df70-4fa4-afd3-46ee026a932b	2026-09-14 18:43:38.619	3f55423d-5264-4ddd-b0b6-1eed321e0efc	5000	RAW_TO_FIELD	\N	f	2026-09-14 18:43:44.293	2026-09-14 18:43:44.293	DEFAULT	DEFAULT
866b2ac2-9d24-4111-9931-45e475ed9f7b	2026-09-14 18:43:45.492	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	FIELD_TO_CHULLI	\N	f	2026-09-14 18:44:00.675	2026-09-14 18:44:00.675	DEFAULT	DEFAULT
16211b9b-4fb2-44cf-820d-f970fe1f9108	2026-09-14 18:44:06.116	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	FIELD_TO_CHULLI	\N	f	2026-09-14 18:44:15.866	2026-09-14 18:44:15.866	DEFAULT	DEFAULT
9b4ae506-2737-4583-9204-d18b7f676fc3	2026-09-28 06:09:33.336	3f55423d-5264-4ddd-b0b6-1eed321e0efc	10000	RAWENTRY	\N	f	2026-09-28 06:09:40.473	2026-09-28 06:09:40.473	DEFAULT	DEFAULT
9e1f2af4-2a02-4099-b67e-b222139b8960	2026-09-28 06:09:42.389	3f55423d-5264-4ddd-b0b6-1eed321e0efc	10000	RAW_TO_FIELD	\N	f	2026-09-28 06:09:48.192	2026-09-28 06:09:48.192	DEFAULT	DEFAULT
2384fca8-03fd-4d7c-b2bd-e134c2017212	2026-09-28 06:09:50.152	3f55423d-5264-4ddd-b0b6-1eed321e0efc	1000	FIELD_TO_CHULLI	\N	f	2026-09-28 06:09:55.872	2026-09-28 06:09:55.872	DEFAULT	DEFAULT
dbdfdb76-0688-4949-931b-b8c8e28a6687	2026-09-28 06:10:16.192	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAW_TO_FIELD	\N	f	2026-09-28 06:10:27.848	2026-09-28 06:10:27.848	DEFAULT	DEFAULT
dac74cb2-972f-4b86-bed9-a81498c7cebb	2026-09-28 06:11:06.463	3f55423d-5264-4ddd-b0b6-1eed321e0efc	12000	FIELD_TO_CHULLI	\N	f	2026-09-28 06:11:18.545	2026-09-28 06:11:18.545	DEFAULT	DEFAULT
79314ff8-3ea7-49f1-b77c-bcc6b1e12468	2026-09-29 05:02:46.515	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAWENTRY	\N	t	2026-09-29 05:02:52.898	2026-09-29 05:03:06.381	DEFAULT	DEFAULT
28da05b1-b71d-4eca-8acb-101803f1c7af	2026-09-29 05:22:00.89	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAWENTRY	\N	t	2026-09-29 05:22:06.332	2026-09-29 05:22:14.163	APPROVED	DEFAULT
9f4318ab-e3c3-4f21-b41a-83877d40cc75	2026-09-29 06:14:58.591	3f55423d-5264-4ddd-b0b6-1eed321e0efc	4000	RAWENTRY	\N	t	2026-09-29 06:15:07.014	2026-09-29 06:22:06.107	APPROVED	APPROVED
ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c	2026-09-29 06:25:37.024	3f55423d-5264-4ddd-b0b6-1eed321e0efc	800	RAWENTRY	\N	t	2026-09-29 06:25:44.504	2026-09-29 06:28:23.296	APPROVED	APPROVED
53dc21af-9227-476a-b8d4-45a311fe09e4	2026-09-29 06:28:37.884	3f55423d-5264-4ddd-b0b6-1eed321e0efc	200	RAWENTRY	\N	t	2026-09-29 06:28:45.792	2026-09-29 06:32:31.841	APPROVED	APPROVED
f58ceca0-b1cc-4b62-bf90-f83cf30186b2	2026-09-29 06:36:07.105	3f55423d-5264-4ddd-b0b6-1eed321e0efc	400	RAWENTRY	\N	f	2026-09-29 06:36:15.763	2026-09-29 06:36:15.763	DEFAULT	DEFAULT
06232db8-5e0c-42c4-a69c-09bc224da9e5	2026-09-29 05:47:26.001	3f55423d-5264-4ddd-b0b6-1eed321e0efc	900	RAW_TO_FIELD	\N	t	2026-09-29 05:47:31.173	2026-09-29 05:58:14.849	APPROVED	APPROVED
e2ce27f2-5ab9-4026-a8af-913c6b344f5f	2026-09-29 05:41:25.507	3f55423d-5264-4ddd-b0b6-1eed321e0efc	1500	RAW_TO_FIELD	\N	t	2026-09-29 05:41:30.759	2026-09-29 05:58:29.63	APPROVED	APPROVED
c57535df-9cb2-4333-863b-ff9fdcfe85d0	2026-09-29 05:34:12.49	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAWENTRY	\N	t	2026-09-29 05:34:19.451	2026-09-29 05:58:32.923	APPROVED	APPROVED
15716b3b-c8b4-4418-866e-63ecd00d0876	2026-09-29 05:27:03.89	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAWENTRY	\N	t	2026-09-29 05:27:13.48	2026-09-29 05:58:36.753	APPROVED	PENDING
419addd1-d8b2-4417-a1bb-2c6dcb041313	2026-09-29 06:36:19.358	3f55423d-5264-4ddd-b0b6-1eed321e0efc	200	RAWENTRY	\N	t	2026-09-29 06:36:27.114	2026-09-29 06:38:02.482	APPROVED	APPROVED
0f21b7e4-1b75-4edc-9e1d-b4367e2f73b4	2026-09-29 08:54:10.448	3f55423d-5264-4ddd-b0b6-1eed321e0efc	400	RAWENTRY	\N	f	2026-09-29 08:54:18.611	2026-09-29 08:54:18.611	DEFAULT	DEFAULT
f3dde422-92b4-4d7e-86a3-9803b09e9389	2026-09-29 06:01:01.139	3f55423d-5264-4ddd-b0b6-1eed321e0efc	500	RAWENTRY	\N	t	2026-09-29 06:01:06.826	2026-09-29 06:11:16.324	APPROVED	DEFAULT
3ad60744-a358-4664-ab6c-321065757416	2026-09-29 08:54:22.816	3f55423d-5264-4ddd-b0b6-1eed321e0efc	200	RAW_TO_FIELD	\N	t	2026-09-29 08:54:27.616	2026-09-29 08:54:48.723	APPROVED	DEFAULT
20cf4471-03a0-4123-b4ac-12443ff44862	2026-09-29 08:55:55.647	3f55423d-5264-4ddd-b0b6-1eed321e0efc	6000	RAWENTRY	\N	f	2026-09-29 08:56:06.537	2026-09-29 08:56:06.537	DEFAULT	DEFAULT
2da5f853-442e-4d10-9c30-d256b628531f	2026-09-29 08:56:10.079	3f55423d-5264-4ddd-b0b6-1eed321e0efc	6000	RAW_TO_FIELD	\N	f	2026-09-29 08:56:17.856	2026-09-29 08:56:17.856	DEFAULT	DEFAULT
eb0f1d61-41f1-4d0b-96f2-8725191c4840	2026-09-29 08:56:19.592	3f55423d-5264-4ddd-b0b6-1eed321e0efc	5000	FIELD_TO_CHULLI	\N	f	2026-09-29 08:56:25.674	2026-09-29 08:56:25.674	DEFAULT	DEFAULT
2ad8ee4e-105a-4316-bc83-3781af672439	2026-09-29 11:36:03.333	3f55423d-5264-4ddd-b0b6-1eed321e0efc	500	RAWENTRY	\N	f	2026-09-29 11:36:08.677	2026-09-29 11:36:32.23	DEFAULT	CANCELLED
\.


--
-- Data for Name: LoginLimit; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."LoginLimit" (id, "userId", "blockTime", "totalTry", status) FROM stdin;
a11e7681-9093-46a1-8e7a-1c6fe0eeeca1	68a492ca-0594-4a81-8413-6e9896b71734	\N	0	f
08ed0a92-a6aa-4551-98dc-bd84377cf9fb	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	\N	0	f
560e69de-ecdb-42e4-95a4-d0477c81306a	a4a9e555-07d1-477e-82ad-ee9f42f3385b	\N	0	f
829b9f78-15f3-461d-be1a-e5986b75fa62	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	\N	1	f
\.


--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Note" (id, message, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Notification" (id, message, path, type, "isRead", "createdAt", "updatedAt", "vataId", title, "seasonId") FROM stdin;
e816938e-ed85-4489-a4c7-eb231e8a0612	কাস্টমার: Tanvir। আজ টাকা দেওয়ার তারিখ। বাকি: 3000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	t	2026-09-12 18:05:00.349	2026-11-08 10:50:07.985	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Tanvir-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
34b93980-dd5c-425e-96e0-23f3819e2ab0	কাস্টমার: Ahosun। আজ টাকা দেওয়ার তারিখ। বাকি: 6000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	t	2026-09-12 18:05:00.349	2026-11-08 10:50:11.581	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Ahosun-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
2d0df6fd-ffcb-458e-bdbe-50ac1987eb2d	কাস্টমার: Tanvir। আজ টাকা দেওয়ার তারিখ। বাকি: 3000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	f	2026-09-12 01:48:11.702	2026-09-12 01:48:11.702	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Tanvir-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
f808f306-9142-45ac-bdfd-0b66e1237169	কাস্টমার: Ahosun। আজ টাকা দেওয়ার তারিখ। বাকি: 6000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	f	2026-09-12 01:48:11.702	2026-09-12 01:48:11.702	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Ahosun-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
479ddb37-da46-4e74-9926-0b65b89d22e3	কাস্টমার: Ahosun। ডেলিভারি: ১ নং: 1000 টি। সিজন: 2026-2027।	/dashboard/todays-delivery	DELIVERY	f	2026-09-12 01:48:11.702	2026-09-12 01:48:11.702	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Ahosun-এর আজ ডেলিভারি আছে	11fdc269-699e-4a88-9092-f8f173bc55ac
06177814-8f1d-487e-80d5-4bbfcc5cae23	কাস্টমার: Tanvir। ডেলিভারি: ১ নং: 1000 টি। সিজন: 2026-2027।	/dashboard/todays-delivery	DELIVERY	t	2026-09-12 01:48:11.702	2026-11-08 10:50:17.086	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Tanvir-এর আজ ডেলিভারি আছে	11fdc269-699e-4a88-9092-f8f173bc55ac
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, quantity, cutting, payment, "ledgerId", "vataId", "createdAt", "updatedAt", document, "paymentDetails", "paymentDifference", "paymentType", rate, "totalBill", "isDeleted", "paymentDate", address, serial, "deleteStatus", "updateStatus") FROM stdin;
e1aef544-6b78-4954-be63-e1092b3f8040	500	0	2500	e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-26 11:12:15.077	2026-09-27 09:06:36.112	\N	test	500	অগ্রিম পেমেন্ট	4	2000	f	2026-09-26 11:12:15.077	Chudanga	13	DEFAULT	APPROVED
2812e35d-0f78-4011-aea5-fb5df2143cf1	500	0	20000	e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-26 11:21:56.774	2026-09-27 09:14:55.445	\N	পেমেন্টের বিস্তারিত বর্ণনা লিখুন	0	বাকি পেমেন্ট	40	20000	f	2026-09-26 11:21:56.774	\N	14	DEFAULT	APPROVED
6c8dfd55-1586-48bf-92a5-79670e8af15c	0	0	25000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-25 13:33:34.84	2026-09-26 11:11:44.561	\N	beton	0	অগ্রিম পেমেন্ট	0	0	t	2026-09-25 13:33:34.84	গঙ্গাপুর, বোরহানউদ্দিন	11	DEFAULT	DEFAULT
64d96eb9-6fd8-4e14-adb0-aceddd725c22	30	0	15000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-25 10:38:16.39	2026-09-27 09:04:49.868	\N	বেতন	0	রেগুলার পেমেন্ট	500	15000	t	2026-09-25 10:38:16.39	গঙ্গাপুর, বোরহানউদ্দিন	10	DEFAULT	DEFAULT
d551694f-3a37-4bef-86f2-e65f54554501	30	0	10000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-26 05:47:06.698	2026-09-27 09:45:49.185	\N	পেমেন্টের বিস্তারিত বর্ণনা লিখুন	-5000	রেগুলার পেমেন্ট	500	15000	t	2026-09-26 05:47:06.698	হিলালিপাড়া,কাটাবাড়ি,গোবিন্দগঞ্জ	12	APPROVED	DEFAULT
1d35e32b-9002-4c6a-9736-3a63e70d53f7	30	0	15000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-10-15 05:42:07.28	2026-10-15 05:42:07.28	\N	পেমেন্টের বিস্তারিত বর্ণনা লিখুন	0	রেগুলার পেমেন্ট	500	15000	f	2026-10-15 05:42:07.28	হিলালিপাড়া,কাটাবাড়ি,গোবিন্দগঞ্জ	15	DEFAULT	DEFAULT
185298ee-8290-4d2f-a0b8-eb7485d65c7d	0	NaN	50000	829d91e6-9446-4b61-9b15-110e903c2a06	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 15:31:01.478	2026-11-08 15:31:01.478	\N	Balu dibe	NaN	অগ্রিম পেমেন্ট	0	0	f	2026-11-08 15:30:36.419	121212	16	DEFAULT	DEFAULT
a3bda693-c543-454c-ad00-8171450b01d3	30	NaN	2000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 15:41:17.912	2026-11-08 15:41:17.912	\N	Balu dibe	NaN	অগ্রিম পেমেন্ট	500	15000	f	2026-11-08 15:40:59.212	গঙ্গাপুর, বোরহানউদ্দিন	17	DEFAULT	DEFAULT
d4995fa2-9844-4ebc-b8a5-ee86f629ed94	0	0	2000	829d91e6-9446-4b61-9b15-110e903c2a06	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 15:46:06.971	2026-11-08 15:46:06.971	\N	Balu dibe	0	অগ্রিম পেমেন্ট	0	0	f	2026-11-08 15:45:50.451	গঙ্গাপুর, বোরহানউদ্দিন	18	DEFAULT	DEFAULT
079a106f-3ccb-447b-a2cd-8b7da70f7ce2	30	0	15000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 15:49:14.847	2026-11-08 15:49:14.847	\N	Balu dibe	0	রেগুলার পেমেন্ট	500	15000	f	2026-11-08 15:48:31.082	Dhaka Mirpur	19	DEFAULT	DEFAULT
e03589a7-c698-491e-bc78-27ba77ea1830	30	0	15000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 15:55:50.372	2026-11-08 16:00:38.261	dua-1794153638203-172320643.png	Balu dibe	0	রেগুলার পেমেন্ট	500	15000	f	2026-11-08 15:55:36.138	Dhaka Mirpur	20	DEFAULT	APPROVED
ae526209-2455-45f4-8efd-4b154f37c3e4	0	0	18000	bc44d255-e44c-47c2-b17f-15bdd2b2623a	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 16:20:39.959	2026-11-08 16:20:39.959	\N	Balu dibe	0	অগ্রিম পেমেন্ট	0	0	f	2026-11-08 16:20:26.663	গঙ্গাপুর, বোরহানউদ্দিন	21	DEFAULT	DEFAULT
282b0735-64dd-45bd-9fce-6e5ba273bd8d	30	0	15000	7a92bd48-b266-4c55-82f7-badae656de94	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-11-08 16:54:03.641	2026-11-08 16:54:03.641	\N	Balu dibe	0	বাকি পেমেন্ট	500	15000	f	2026-11-08 16:53:47.384	Dhaka Mirpur	22	DEFAULT	DEFAULT
\.


--
-- Data for Name: ReceivablePayable; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ReceivablePayable" (id, "transactionType", amount, "currentAmount", name, phone, address, "transactionDate", "paymentDate", "witnessOne", "witnessTwo", description, "isDeleted", "createdAt", "updatedAt", "vataId") FROM stdin;
f808695f-f7f4-4329-a176-24834b6eec59	GIVEN	2500.00	2500.00	Shakib Hasan	01760564065	Barisal	2026-09-14 18:00:00	2026-09-29 18:00:00	atel	matel	md4dftgyhujio	f	2026-09-15 01:08:56.219	2026-09-15 01:09:16.644	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
732f500d-c0b4-4403-a4f0-c0bdda77138b	TAKEN	10000.00	10000.00	Mahbubul Hasan	01760564065	Barisal	2026-09-14 18:00:00	2026-09-29 18:00:00	two	one	ee	f	2026-09-15 02:15:45.19	2026-09-15 02:15:45.19	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: ReceivablePayableTransaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ReceivablePayableTransaction" (id, "receivablePayableId", type, amount, "transactionDate", remaining, description, "createdAt", "updatedAt", "vataId") FROM stdin;
f0fdb21c-fb8e-4a0d-9e3f-2060bc9beb86	f808695f-f7f4-4329-a176-24834b6eec59	GIVEN	500	2026-09-29 18:00:00	2500	89	2026-09-15 01:09:16.636	2026-09-15 01:09:16.636	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: Round; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Round" (id, name, "vataId", "seasonId") FROM stdin;
3f55423d-5264-4ddd-b0b6-1eed321e0efc	1 রাউন্ড	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac
\.


--
-- Data for Name: Season; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Season" (id, name, "startDate", "endDate", "isActive", "createdAt", "updatedAt", "vataId") FROM stdin;
7cc76e3d-736a-4fe0-99de-f7b3a127da69	2025-2026	2025-10-01 00:00:00	2026-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
7ab12477-1de7-412e-aad2-8477b7723826	2026-2027	2026-10-01 00:00:00	2027-09-30 23:59:59.999	t	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
ee40637e-5933-4d8b-bb18-4b5175514b27	2027-2028	2027-10-01 00:00:00	2028-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
72b9b532-a692-4e82-8380-3ac51351c6a5	2028-2029	2028-10-01 00:00:00	2029-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
15b85808-0b8a-479f-b5dc-1669ac5c92b7	2029-2030	2029-10-01 00:00:00	2030-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
adebea82-7791-4176-aa22-b840923beeb8	2030-2031	2030-10-01 00:00:00	2031-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
80be3244-8dff-4ac2-8a5a-e00940151f64	2031-2032	2031-10-01 00:00:00	2032-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
2146a3cb-0a5a-4ea9-99de-7db4fe5b1721	2032-2033	2032-10-01 00:00:00	2033-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
032cf6e4-642e-4fdb-b9cf-cc7f8204e4b7	2033-2034	2033-10-01 00:00:00	2034-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
4d49e5ab-4498-4ccd-8527-4bd7b06fdf17	2034-2035	2034-10-01 00:00:00	2035-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
66435844-0851-4c5c-984f-06ab8d49dd72	2035-2036	2035-10-01 00:00:00	2036-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
35651204-9470-44a2-b120-3cb54565ddd9	2036-2037	2036-10-01 00:00:00	2037-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
89ea4d19-95c3-4b7c-9a6f-8ca0fdf9fa15	2037-2038	2037-10-01 00:00:00	2038-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
ee1500b5-e787-4cde-a0c2-39017bf2722a	2038-2039	2038-10-01 00:00:00	2039-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
e8c08df1-77de-47be-ab7a-70ef257ff141	2039-2040	2039-10-01 00:00:00	2040-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
57c2cc42-33d4-4ee4-978a-a438ddd1f46c	2040-2041	2040-10-01 00:00:00	2041-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
7915428e-2fa6-4c3d-b2c4-d9011440de1a	2041-2042	2041-10-01 00:00:00	2042-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
d3ad596a-e1d4-44e2-825c-a0b1b1b23231	2042-2043	2042-10-01 00:00:00	2043-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
60681fe0-1406-4572-8087-498c2fb0845a	2043-2044	2043-10-01 00:00:00	2044-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
0311d0b0-4b33-4238-93f2-13e7cd12ab30	2044-2045	2044-10-01 00:00:00	2045-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
39337939-7a88-482e-ae16-75e95cffe18e	2045-2046	2045-10-01 00:00:00	2046-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
15be7d7e-c6c0-4d59-9b53-7f72543a5fda	2025-2026	2025-10-01 00:00:00	2026-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
f60db984-206d-4b37-921d-f9812bd69fba	2046-2047	2046-10-01 00:00:00	2047-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
ad961317-bd6b-4d03-8c24-68d94f91f9db	2047-2048	2047-10-01 00:00:00	2048-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
dbf8f9e4-be2c-4851-a7f4-ee5c0f43f161	2048-2049	2048-10-01 00:00:00	2049-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
c163345e-891d-44db-a77f-1e8ffb3947f3	2027-2028	2027-10-01 00:00:00	2028-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
4cdfa224-5f21-443e-99e8-772612f580d1	2029-2030	2029-10-01 00:00:00	2030-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
708be09d-ae75-4483-a135-d0b38885d756	2030-2031	2030-10-01 00:00:00	2031-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
8cddee02-0ecd-4aa1-b018-0cd612f0de2c	2032-2033	2032-10-01 00:00:00	2033-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
6933f02b-eb01-4e7f-8e22-25f324abb3de	2033-2034	2033-10-01 00:00:00	2034-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
ece4dfad-974b-454f-9cac-2d5bfb059e58	2034-2035	2034-10-01 00:00:00	2035-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
56d032b3-5d21-4ada-80cc-6ac3a31f6d25	2049-2050	2049-10-01 00:00:00	2050-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
ec7c3a35-a9a7-4cd6-b77c-bd6197ca3757	2035-2036	2035-10-01 00:00:00	2036-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
8b4bcd56-b4b4-4cfc-8ec3-b385b46b224b	2025-2026	2025-10-01 00:00:00	2026-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
5a9ad465-c6b0-4d46-ac9d-50c7293c917c	2026-2027	2026-10-01 00:00:00	2027-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
7f07dfc0-3e80-4bef-8fe4-d46e29844650	2027-2028	2027-10-01 00:00:00	2028-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
eb056407-feac-4d53-b307-a1f85949a3b1	2028-2029	2028-10-01 00:00:00	2029-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
b33f93b7-f244-4023-a4c2-bab49db4791e	2029-2030	2029-10-01 00:00:00	2030-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
3745e25a-8391-44e8-be3d-637a6c46a626	2030-2031	2030-10-01 00:00:00	2031-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
c821fb6e-65c3-4b23-9353-4c600238e3ed	2031-2032	2031-10-01 00:00:00	2032-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
0980d370-9a9c-44f1-ba12-809467ec4c0a	2032-2033	2032-10-01 00:00:00	2033-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
3e9fe089-f52d-4069-891a-9fe529760e68	2033-2034	2033-10-01 00:00:00	2034-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
54e519a8-1550-434e-9060-5e8ee2742d0c	2034-2035	2034-10-01 00:00:00	2035-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
30a1bc51-ca29-47c5-9169-7f8783ae1700	2035-2036	2035-10-01 00:00:00	2036-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
26722fca-65ad-48f9-b430-00d3b78a871a	2036-2037	2036-10-01 00:00:00	2037-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
d51d267a-e94d-4107-8d2c-7ebab4e50e71	2037-2038	2037-10-01 00:00:00	2038-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
b648a16d-a9d9-4f78-8ea1-05646c01ec17	2038-2039	2038-10-01 00:00:00	2039-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
8257b398-4913-4884-8465-9e206428ffeb	2039-2040	2039-10-01 00:00:00	2040-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
ab7dfd5e-eb4d-4cf7-8e8a-57dfaf019589	2040-2041	2040-10-01 00:00:00	2041-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
8667ab7b-0d58-4a01-bca9-6964df04ad0a	2041-2042	2041-10-01 00:00:00	2042-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
0a96fda2-e013-4025-8a03-530b13e22f0f	2042-2043	2042-10-01 00:00:00	2043-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
5c5fd036-a9e1-4dc6-b489-8be2bd9876f6	2043-2044	2043-10-01 00:00:00	2044-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
5b974303-a829-484c-8ef9-a67e710b4b57	2044-2045	2044-10-01 00:00:00	2045-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
0c939b75-3448-494f-873f-ec2f5895a1fe	2045-2046	2045-10-01 00:00:00	2046-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
69158508-afb5-4203-b7fa-52caa361895c	2046-2047	2046-10-01 00:00:00	2047-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
c29900ad-5fab-4efb-a32d-a353ebd9c3c9	2048-2049	2048-10-01 00:00:00	2049-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
f86b7f80-b749-4f67-8786-797110f53705	2049-2050	2049-10-01 00:00:00	2050-09-30 23:59:59.999	f	2026-09-11 20:26:36.129	2026-09-11 20:29:45.002	991cab71-e941-4f38-add3-c1d2f4b0e449
935be4fd-0180-43df-a4d3-9c59101ab3d2	2047-2048	2047-10-01 00:00:00	2048-09-30 23:59:59.999	t	2026-09-11 20:26:36.129	2026-09-11 20:29:45.003	991cab71-e941-4f38-add3-c1d2f4b0e449
11fdc269-699e-4a88-9092-f8f173bc55ac	2026-2027	2026-10-01 00:00:00	2027-09-30 23:59:59.999	t	2026-09-11 20:26:18.956	2026-11-06 04:30:53.481	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
9f09a9f4-d737-4154-bbd4-92b3914e358a	2036-2037	2036-10-01 00:00:00	2037-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
001d9e9d-046e-4c19-ba47-54046a4c13a0	2037-2038	2037-10-01 00:00:00	2038-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
3e777a99-d5e3-424c-a5d3-12a3ef5167c4	2038-2039	2038-10-01 00:00:00	2039-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
e3296c76-c34a-45df-9331-2387055bf22b	2039-2040	2039-10-01 00:00:00	2040-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
b8b129dd-d5f5-473d-8781-ca1ef3d5ae52	2031-2032	2031-10-01 00:00:00	2032-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
ddd1e14a-49d6-4cc2-8b54-14f29d0c5e1c	2042-2043	2042-10-01 00:00:00	2043-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
cadbe032-768a-49f1-9826-626a3f909edd	2048-2049	2048-10-01 00:00:00	2049-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
91cccbbc-3978-4537-8679-5b588f1e4a21	2049-2050	2049-10-01 00:00:00	2050-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
a0c94486-dfbc-4e06-aed6-9e8ad23a3603	2028-2029	2028-10-01 00:00:00	2029-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
0fd94ce9-0b79-4af9-a0e9-c0a60c2cabfe	2040-2041	2040-10-01 00:00:00	2041-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
1569746d-66ba-4914-8433-3a78586969b0	2041-2042	2041-10-01 00:00:00	2042-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
5f67edee-4363-4b7d-8e4c-94758acd9cd4	2043-2044	2043-10-01 00:00:00	2044-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
31081036-9f35-4af5-8fd2-e48177878a50	2044-2045	2044-10-01 00:00:00	2045-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
15ecc883-1074-49ee-a517-ec520d30b71f	2045-2046	2045-10-01 00:00:00	2046-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
99070c7e-7dca-4143-8328-22209031440c	2046-2047	2046-10-01 00:00:00	2047-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
d55e7197-69b0-407b-8bcb-e3a009b18f6b	2047-2048	2047-10-01 00:00:00	2048-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-11-06 04:30:53.47	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: SmsLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsLog" (id, "vataId", "phoneNumber", message, status, "sendBy", cost, "sentAt") FROM stdin;
\.


--
-- Data for Name: SmsRechargeHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsRechargeHistory" (id, "vataId", "smsQuantity", "ratePerSms", "totalAmount", "paymentMethod", "transactionId", status, "createdAt", "updatedAt", "phoneNumber", type) FROM stdin;
\.


--
-- Data for Name: SmsSetting; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsSetting" (id, "ratePerSms", "isActive", "createdAt", "updatedAt", bkash, nogod, rocket) FROM stdin;
c08e54a7-feb3-4aa1-8cec-a2d663496eb5	1.5000	t	2026-09-21 17:35:20.289	2026-09-21 17:35:20.289			
\.


--
-- Data for Name: SmsWallet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsWallet" (id, "vataId", balance, "totalPurchased", "totalUsed", "currentRate", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: StockBook; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."StockBook" (id, class, "stockIn", "stockOut", description, "isDeleted", "createdAt", "updatedAt", "createdById", "seasonId", "vataId", "deleteStatus", "updateStatus") FROM stdin;
6a115e53-9d6e-429e-929d-396da522d80f	রাবিস	500	0	ছোট ভাটার জন্য প্রাথমিক ফিচারসহ ফ্রি প্ল্যান	f	2026-10-01 04:14:03.567	2026-10-01 04:14:03.567	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	DEFAULT
\.


--
-- Data for Name: SubscriptionPayment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SubscriptionPayment" (id, "vataId", "subscriptionPlanId", "startDate", "endDate", amount, status, "paidAt", "paymentMethod", "transactionId", "phoneNumber", "createdAt", "updatedAt") FROM stdin;
68205d9c-ba4d-4e80-83dd-4e89d955bbd0	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:08:59.289	2026-10-09 18:00:00	1000.00	PAID	2026-09-11 20:08:59.289	1st	1st	1st	2026-09-11 20:08:59.294	2026-09-11 20:08:59.294
53c17abd-a461-49b1-b3cd-98082b41cd6e	991cab71-e941-4f38-add3-c1d2f4b0e449	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:17:07.488	2026-09-11 18:00:00	1000.00	PAID	2026-09-11 20:17:07.488	1st	1st	1st	2026-09-11 20:17:07.491	2026-09-11 20:17:07.491
7cbd395d-dc51-4dad-a0e1-5f6afe136b7d	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2a303882-9075-4173-9684-9e948fb48490	2026-09-21 17:33:15.518	2026-09-25 18:00:00	1000.00	PAID	2026-09-21 17:33:15.518	1st	1st	1st	2026-09-21 17:33:15.52	2026-09-21 17:33:15.52
99e6072d-b83c-4778-a0f4-8f49f86b778d	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2a303882-9075-4173-9684-9e948fb48490	2026-10-15 05:38:46.867	2026-11-15 05:38:46.867	1000.00	PAID	2026-10-15 05:38:46.867	bkash	8888	01407128177	2026-10-15 05:37:47.79	2026-10-15 05:38:46.871
\.


--
-- Data for Name: SubscriptionPlan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SubscriptionPlan" (id, name, type, description, price, "billingCycle", features, "maxUsers", "maxStorage", "maxTasks", "maxInvoices", "maxSms", "isActive", "createdAt", "updatedAt") FROM stdin;
2a303882-9075-4173-9684-9e948fb48490	Basic Plan	BASIC	ছোট ভাটার জন্য প্রাথমিক ফিচারসহ ফ্রি প্ল্যান	1000.00	MONTHLY	{DASHBOARD,INVOICE,PAYMENT,DELIVERY,DUE,CASH,LOAD,UNLOAD,CUSTOMER,STOCK,SELL_REPORT,TASK_MANAGER,CAR_RENTAL,SMS,WEATHER,DRIVER,ASSETS,LEDGER,DOCUMENTS,VEHICLE,LOAN,CONTACT}	1	1	10	100	0	t	2026-09-11 20:07:36.603	2026-09-11 20:07:36.603
\.


--
-- Data for Name: TaskManager; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TaskManager" (id, description, "userId", date, repeat, status, "vataId", "isDeleted", "createdAt", "updatedAt", "deleteStatus", "updateStatus") FROM stdin;
c524f593-abbe-4c21-b818-9bbf6b18af35	u65u56 	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-28 18:00:00	none	PENDING	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	2026-09-29 04:48:02.375	2026-09-29 04:48:02.375	DEFAULT	DEFAULT
\.


--
-- Data for Name: Unload; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Unload" (id, date, "roundId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
c5919f6c-3187-4d82-9cec-59b5877e4304	2026-09-14 18:45:19.585	3f55423d-5264-4ddd-b0b6-1eed321e0efc	f	2026-09-14 18:45:39.787	2026-09-14 18:45:39.787
4b458839-d57c-4a71-8a7d-161b0e84fffb	2026-09-25 19:23:50.126	3f55423d-5264-4ddd-b0b6-1eed321e0efc	f	2026-09-25 19:23:56.406	2026-09-25 19:23:56.406
1131892e-04e0-406d-940f-c10a51aaa7c8	2026-09-28 06:11:40.614	3f55423d-5264-4ddd-b0b6-1eed321e0efc	f	2026-09-28 06:11:48.696	2026-09-28 06:11:48.696
e07e02b9-b11d-4ff2-ad31-639d969a8ad0	2026-09-29 08:56:29.574	3f55423d-5264-4ddd-b0b6-1eed321e0efc	f	2026-09-29 08:56:39.704	2026-09-29 08:56:39.704
\.


--
-- Data for Name: UnloadItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UnloadItem" (id, "unloadId", "classId", quantity, damaged, "createdAt", "updatedAt") FROM stdin;
0a731701-6cca-4878-9286-3f54573f2374	c5919f6c-3187-4d82-9cec-59b5877e4304	9db43bd9-3b8a-488a-ba03-a5865ecd89cd	2000	0	2026-09-14 18:45:39.827	2026-09-14 18:45:39.827
dde74378-9676-4735-b178-22d56d2496af	4b458839-d57c-4a71-8a7d-161b0e84fffb	9db43bd9-3b8a-488a-ba03-a5865ecd89cd	1000	0	2026-09-25 19:23:56.42	2026-09-25 19:23:56.42
9542a7d2-3353-4638-a189-f0168620da03	1131892e-04e0-406d-940f-c10a51aaa7c8	2f5a4ddf-115b-4512-806e-feef2e9288d4	2000	0	2026-09-28 06:11:48.713	2026-09-28 06:11:48.713
debc36e0-2919-456d-a04b-ebe215d614ca	1131892e-04e0-406d-940f-c10a51aaa7c8	8d61abf5-2887-4491-bec0-2661e692bead	2000	0	2026-09-28 06:15:23.244	2026-09-28 06:15:23.244
1b86aa93-8a50-4f57-ad49-bdfb405051ea	1131892e-04e0-406d-940f-c10a51aaa7c8	b79bc63f-0a08-4ed8-84c9-811575c68b61	2000	0	2026-09-28 06:15:39.966	2026-09-28 06:15:39.966
edb6b152-37fa-4f83-9c12-0d953d1b6965	1131892e-04e0-406d-940f-c10a51aaa7c8	d5aeaa43-0197-4247-834d-4919cddb6b28	1000	0	2026-09-28 06:15:47.927	2026-09-28 06:15:47.927
e51ca7fe-9459-42d4-aa06-acfb5bce29fd	e07e02b9-b11d-4ff2-ad31-639d969a8ad0	2f5a4ddf-115b-4512-806e-feef2e9288d4	100	0	2026-09-29 08:56:39.727	2026-09-29 08:57:28.438
\.


--
-- Data for Name: VataCar; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VataCar" (id, "vataId", "createdAt", "updatedAt", "carNo") FROM stdin;
cb1bd3ea-c34f-4327-b413-7f52bc62855b	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-13 03:41:18.813	2026-09-13 03:41:18.813	1
ceaa785d-7ecd-4b90-b79e-5a8be025cfd6	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2026-09-21 17:37:41.711	2026-09-21 17:37:41.711	1
\.


--
-- Data for Name: VataSmsSettings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VataSmsSettings" (id, "newInvoice", "updateInvoice", "deleteInvoice", "newDelivery", "newDueCollection", "deuCollectionUpdate", "vataId") FROM stdin;
39e57256-203c-4949-9e39-f95bc3875a24	t	f	f	f	f	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: Weather; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Weather" (id, "linkOne", "linkTwo", "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: YoutubeLink; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."YoutubeLink" (id, link) FROM stdin;
91ce8d02-f7cc-4d2a-9005-c2790d4a789a	https://www.youtube.com/watch?v=SBfPs-PMGTA&list=RDMMSBfPs-PMGTA&start_radio=1
df7394e3-bc85-4af3-8819-101e2c548899	https://www.youtube.com/watch?v=Cwkej79U3ek&list=RDCwkej79U3ek&start_radio=1
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ab971b25-b59e-47d4-8332-b891ecd888e1	6fec9cad6a161006e14449074e448011e5f868c049d4f9770d6b4310fda0ffcc	2026-09-12 01:39:57.099097+06	20260907133918_update	\N	\N	2026-09-12 01:39:57.097605+06	1
8500c1b6-9148-4c1c-b79b-561bb35a811a	e5523c27a80e10f8fe1958bcc3df68c863cbc2e054856bb87301f0be76c95562	2026-09-12 01:39:57.037246+06	20260905120957_update_load_unload	\N	\N	2026-09-12 01:39:56.809892+06	1
a6436201-84ce-4286-8fa1-74ec2761e92c	4f378f533460d34fdb294b3d368bfdf779eb9c48041fcec10552186d874bc4d2	2026-09-12 01:39:57.041838+06	20260905191037_add_brick_summary	\N	\N	2026-09-12 01:39:57.037479+06	1
d30e6232-1537-4769-984f-00f49e70435a	317aaf98ca549ce7b5cebf826aee64eaf6f30f928ce77e5cc2ff1c0d1b1edbea	2026-09-12 01:39:57.131516+06	20260911183232_add_noti	\N	\N	2026-09-12 01:39:57.127174+06	1
35c0b8ea-376c-41cd-ae31-010d01bc5b36	6a799365619636a841fb2a3f62b5ba34ec1dcd4eaf4defad0b2c59a8c64f34e5	2026-09-12 01:39:57.04406+06	20260905193747_vataid	\N	\N	2026-09-12 01:39:57.042064+06	1
bc7bb0c0-9859-4cab-95c7-4b5bd90e8032	ed949c46a40540abf8309226eaa18c86245997bb9694a8fcae7b58549e39eb89	2026-09-12 01:39:57.11022+06	20260907142923_sms_log	\N	\N	2026-09-12 01:39:57.099333+06	1
32083c00-0604-402d-8947-675e976c93d4	14c57ca89ff9960cc89eabe139b73bbc1682abd826ec5f97302d05c7bbae21cc	2026-09-12 01:39:57.045371+06	20260906033432_add_lotype	\N	\N	2026-09-12 01:39:57.044409+06	1
eaaefb1c-62ff-49b5-8c35-549ee03f47d7	09f46e0dcddde35c2952ef4b3eddbe86f8c2c70b2b275f86f8d6783391a064f4	2026-09-12 01:39:57.048237+06	20260906053937_update_class	\N	\N	2026-09-12 01:39:57.04564+06	1
cd0b64c9-1787-4800-8563-3efdbb098783	451fc1f833e1c4f6b87e1cd015d299950febb940f15a39dd1c035d968cb7fbe2	2026-09-12 01:39:57.05924+06	20260906094226_car_add	\N	\N	2026-09-12 01:39:57.048579+06	1
266a1508-8073-4d49-8912-b93821a5c3b1	2da4a44e72037c59e8d6ae5cae658f7190e083c8542267ba46ed528db85ca198	2026-09-12 01:39:57.111669+06	20260908063233_histrylog_update	\N	\N	2026-09-12 01:39:57.110439+06	1
f837e49e-059b-4c23-bf04-673920b1cd7d	0295802ca8b445241b139a488ee1835716c197a477b0960495135b9cf405f83c	2026-09-12 01:39:57.060423+06	20260906104419_car_no_add	\N	\N	2026-09-12 01:39:57.059458+06	1
81b5e170-9398-4c52-bf2a-6f7ef210b503	43c9bd097451e46952bb7d8afe1bb369279c0bed178334200a34129223304f83	2026-09-12 01:39:57.072416+06	20260907050416_sms_table	\N	\N	2026-09-12 01:39:57.060706+06	1
69b57f5e-1462-4ce6-9d4e-ab3786bde5a3	5c005c8ccef2c36d134d1d083ec01fb3a0c0806e9113c99ece5a4a9a9d954c92	2026-09-13 10:04:19.195239+06	20260913040419_db_backup	\N	\N	2026-09-13 10:04:19.122095+06	1
b564fe95-7764-4d0b-8adc-f0355438975b	bf8ff61449f629d2329c6576717e54451202a11f0779161e5bdc10bcb1a357ce	2026-09-12 01:39:57.075083+06	20260907062612_add_banking	\N	\N	2026-09-12 01:39:57.072835+06	1
6d89926b-75ac-4681-ae7f-8a1a70dcb15a	9ab45a04780f7222e36a81f19848abb30b8e4e7575a733a0e9ff1afa32c4e3b8	2026-09-12 01:39:57.112779+06	20260908063350_more_update	\N	\N	2026-09-12 01:39:57.111929+06	1
af9bb6cc-bbab-4381-8b59-03d2f0046986	b1e53c13ac46e21ff46a5bec397c3845eca6b49fc49c1b359aca674cef6e8ce6	2026-09-12 01:39:57.080221+06	20260907063709_type_change	\N	\N	2026-09-12 01:39:57.075372+06	1
eb402b58-c641-4364-929b-af6b54845917	ccd963a25e6fa0a099898876ddd0178fd64ecb2a21d073c3403108846e6fcb0b	2026-09-12 01:39:57.081961+06	20260907081444_add_tyoe	\N	\N	2026-09-12 01:39:57.080562+06	1
9a04923d-8b04-47b0-a778-90c6731d7497	9353af085d3b6423fb8673a15118e86df963ea25cb1b83b0e2d6ac28198a214e	2026-09-12 02:15:27.605339+06	20260911201527_season	\N	\N	2026-09-12 02:15:27.490678+06	1
770d13dd-8645-45df-acc0-ef6e53ef8f47	e52d999da28f6d673447563889f0b589db1192d15763a3e1276569e8226d7ce4	2026-09-12 01:39:57.092508+06	20260907093752_change_vid	\N	\N	2026-09-12 01:39:57.0822+06	1
7222f2e3-3d94-4d23-b241-4bfeecf80365	cbaa6ebcad702aaa5e11e505638e28aeb9b563e4ca8f7b40dcc4290d38893470	2026-09-12 01:39:57.113918+06	20260909063049_vata_update	\N	\N	2026-09-12 01:39:57.112977+06	1
6d712ac5-6769-47cc-939f-a562a9746c1e	b89045f4e91d204ba7abc00e86c6f5f8d56f03f7ff4813f81e2166e7c6de960e	2026-09-12 01:39:57.097294+06	20260907133321_add_vatasms	\N	\N	2026-09-12 01:39:57.092874+06	1
4e44dcc0-1762-47d4-818a-9627fc208e7c	5b01183332238b212386278f92fc374cd2bc2f545212807cd7b3c7c9dbb42abe	2026-09-12 01:39:57.115043+06	20260910005502_address_to_payment	\N	\N	2026-09-12 01:39:57.114141+06	1
d38ce50d-1af9-482e-842d-d2163c86b1af	390ab5345d3b857dc834fface2600097967a309632f4eceb981f1087e1d01fe9	2026-09-12 05:52:19.484023+06	20260911235219_y	\N	\N	2026-09-12 05:52:19.44685+06	1
b73454bf-3116-4a32-ad6e-05b17b1cfb10	5d944eabfde629402db7a43ab330317dc03f6ff12b6867a28de0f2e0e995ff32	2026-09-12 01:39:57.116462+06	20260910095022_uodate_vata	\N	\N	2026-09-12 01:39:57.115296+06	1
37488add-7739-41d2-9f32-64c0adb56142	c36079082ea667a02a9dc1c7c94b42b9bebfd4254bd89ecf7b5d222d5500804b	2026-09-12 01:39:57.123641+06	20260910104445_add	\N	\N	2026-09-12 01:39:57.116704+06	1
9a436c7c-57c0-42f3-9427-4b43a87da55c	ba0c2ce5c698af57116f9aa3751a81efdd550390e3a4f79cc472f100300ef3a5	2026-09-25 11:50:49.923639+06	20260925055049_citems_ddate	\N	\N	2026-09-25 11:50:49.906661+06	1
2deffc1f-3d8b-4dc1-b5c8-c2800190ea1b	70b4717db87b63c3ec68123f216dec96e41b14986e4ed55927fbd796061e795a	2026-09-12 01:39:57.126896+06	20260911135815_add_note	\N	\N	2026-09-12 01:39:57.123961+06	1
405325b5-877d-400a-a768-2df193b30936	d8c597fcc876373649300b97ef6c81e03b5e93df4fe671bcb0284209150c49d3	2026-09-13 10:08:41.899437+06	20260913040841_updte	\N	\N	2026-09-13 10:08:41.857306+06	1
c313df71-51d6-40bf-a43e-b1bf7de3cbd2	f277ec8a9d3f8ce5679ad0e0580189b585258a3ae03bb97a4d9bfe731e29202d	2026-09-12 08:02:21.899379+06	20260912020221_faq_about	\N	\N	2026-09-12 08:02:21.815445+06	1
adf45c38-053a-4cf1-9f9a-e51d4107ab8d	f7cff0e6145f1aa0770ecfd08eb42629deb9e3b4689c5a9a7fd39575293289e1	2026-09-12 21:29:17.522179+06	20260912152917_help_yt	\N	\N	2026-09-12 21:29:17.468727+06	1
31fdf7f3-5681-4335-a63f-c70013ec8b22	227a81108d0af0b9f282c0b800f3c16884e966224c74a5a45d7e412bfafc1045	2026-09-22 20:12:15.204088+06	20260922141215_add_rent_invoce	\N	\N	2026-09-22 20:12:15.174798+06	1
7883bbea-9f1c-47fa-93d9-b79a74e65cd1	72247513f87a1d307fd0c52d3733ef9956d400bbc7ce211197a855b585e22d6b	2026-09-13 01:15:23.702671+06	20260912191523_gcatup	\N	\N	2026-09-13 01:15:23.656709+06	1
8618c224-cb22-4280-8368-d24e8742af98	c89a5d6f446dd1dc2ece63fd45aa80235cccabfa26a2fe1c8b00ade3b5367513	2026-09-14 22:15:35.880725+06	20260914161535_ledger_uodate	\N	\N	2026-09-14 22:15:35.849202+06	1
070dc233-c3bb-4a47-b4b7-732b6b9c56e7	ee268a4903b8e09c59e5dab3b33db392b8c8af30fa00de4d6295e0cd37cc6a50	2026-09-25 11:21:05.243855+06	20260925052105_optional_delivery_date	\N	\N	2026-09-25 11:21:05.236308+06	1
46ca2499-d83d-4661-9db0-48e5daab2758	f6bd409d5dc8c75308cc3e81edebec5f0ea8e768d248a56300cb3ad3040fe623	2026-09-15 00:30:55.059107+06	20260914183054_remov_car_rent_from_invoice	\N	\N	2026-09-15 00:30:55.037051+06	1
7e877787-8907-4f32-806a-ac2428a790a7	f8a44cbbba63cfdcb9bc5330a783f04fa8d500f4a3a56e28979d477fda92085c	2026-09-25 10:14:00.449603+06	20260925041400_add_advance_rate	\N	\N	2026-09-25 10:14:00.377675+06	1
47fb6717-a5b2-4f7b-ae56-61c455a1df43	6e6774cdc9587c80dfc08d1e8e8149d82310b9fbde11e2a3fda8a5df700d7019	2026-09-25 14:37:47.412315+06	20260925083747_add_ledger_extra_field	\N	\N	2026-09-25 14:37:47.392802+06	1
5aac3940-ad8e-41e5-bb6d-27f568fef9f9	12d58bec6ec8181e0b8a549749add50c02e3aecc848c928ee0aeb1c4bd230e02	2026-09-26 01:00:32.296796+06	20260925190032_delivery_status	\N	\N	2026-09-26 01:00:32.218335+06	1
f1575771-0f04-472a-a497-9b685b87074b	410c35713e161cdf0083ec8a862017a14e4de04eae3fe94d223adbc762126922	2026-09-26 14:52:24.068456+06	20260926085223_action_tabls	\N	\N	2026-09-26 14:52:23.931129+06	1
dabd8447-9166-4ba4-9870-f47129595427	a391ccadadc18e2c60ef0fe01214ab335b4c12f3c2ab33fc0ac0c9a24322f527	2026-09-26 14:59:21.312225+06	20260926085921_update_module_type	\N	\N	2026-09-26 14:59:21.309271+06	1
f1477044-9fd5-40eb-b0c3-8bef575fc749	45db2c457294d417271e54be8fee39889f568bb83e6de5841dde44f73039b06b	2026-09-26 16:01:38.805793+06	20260926100138_add_field_to_approval	\N	\N	2026-09-26 16:01:38.766034+06	1
339a8080-da42-4730-959c-bfcda2f655d8	d76f19bbc5a0a8fe66ab6667bdb600413bdf0176538fa60ece81250df1799c53	2026-09-26 21:03:13.007639+06	20260926150312_updatemodule_type	\N	\N	2026-09-26 21:03:12.868225+06	1
88d4a390-f4af-4d96-a84b-c28cdd932db7	b5cca7fda043b5daf74d93adb1252dc503ebdd80aa4452e118b414a70243d640	2026-10-13 08:05:48.7737+06	20261013020548_add_limit	\N	\N	2026-10-13 08:05:48.63234+06	1
7d754a9b-c7c9-4500-a3fc-528e3dd68828	3b7f5aa3ea154f5ef5f4388b045663627e4c12b2eeabe7fa51ed448ff42f77d2	2026-09-27 09:19:58.419298+06	20260927031958_ledger	\N	\N	2026-09-27 09:19:58.373071+06	1
4b5bb748-84b0-4ae6-af9e-98deb43970d2	be4e62abab70ce873b8c0631eda2cd6813cc92e274af308a70f71697b48060b4	2026-09-27 12:10:46.373804+06	20260927061046_status_invoice_delivery	\N	\N	2026-09-27 12:10:46.316608+06	1
d6c5d9f6-31f8-48f9-8a40-6dd5d87f58ee	0619241e773fcf0cc78b8ab6ac15fc09efb122f0ed632efa85a201d9b3c95c64	2026-09-27 14:24:23.741419+06	20260927082423_add_status_in_more_model	\N	\N	2026-09-27 14:24:23.701702+06	1
cd2b9fb4-84a0-45fe-8f6c-d97c548afcfe	42d67c9e5b0d90cfbfda1e21dc9fe43502329cc08f23f66da39dd8cfc26219a4	2026-10-15 12:08:54.716753+06	20261015060854_blocktime_optional	\N	\N	2026-10-15 12:08:54.704172+06	1
2cb6d12a-5aa8-435a-9153-a12749df30d0	13fff09d94ebfd9e241cab500d084fa30c69449d4fd8c3caa8298861b0ad8d31	2026-09-28 11:05:21.559929+06	20260928050521_change_relation_delivery_and_car	\N	\N	2026-09-28 11:05:21.465818+06	1
8b96f0b6-49e3-4f56-842a-d8c41612b94c	b4e45e21f9455c1f726f8cefc1771935475bcc6477cd2957427f0c84cd728ab3	2026-09-29 09:46:47.222887+06	20260929034647_add_status	\N	\N	2026-09-29 09:46:47.132545+06	1
92256a62-fc6e-4c2f-ad59-066c0872925b	a523873f0660ee897d6ecea70c3f581c41995101a96547e84b82edb4f2ea9a3d	2026-09-30 15:04:23.765591+06	20260930090423_npx_prisma_generate	\N	\N	2026-09-30 15:04:23.700883+06	1
a87f9013-4dda-4c4b-91da-ad66d9a0e353	ef3eb56d9728b634fe6e77812a61eb3714e847f6145743f885e444e40e0f1e58	2026-10-15 23:33:00.111136+06	20261015173300_add_field	\N	\N	2026-10-15 23:33:00.086403+06	1
6f6a7d95-a8fd-4c1c-aff8-7a100c84a126	857ff75fdbf86d8dc76374299aa9f7839802a9e22e090e4073015e88f2576e1b	2026-09-30 15:15:55.653236+06	20260930091555_remove_is_delete	\N	\N	2026-09-30 15:15:55.627366+06	1
723da3be-d79d-425a-9b05-a6434d8fe47a	a523873f0660ee897d6ecea70c3f581c41995101a96547e84b82edb4f2ea9a3d	2026-09-30 15:16:18.506029+06	20260930091618_add_isdelete_to_driver	\N	\N	2026-09-30 15:16:18.483302+06	1
d9692cfb-9b00-4354-83ce-ea365020b5df	d66edc8a7ae5e6737007825adc893396dfceccb85fc19f280804e9350dd0f374	2026-10-01 09:58:07.805851+06	20261001035807_stock_book_status	\N	\N	2026-10-01 09:58:07.743919+06	1
7681244a-e3ac-442a-a28a-785dd843d3d8	f8137ed3386fbaadf1f9806b988dea4ee796302b6369860ac944bdb282656640	2026-10-16 00:14:14.035845+06	20261015181413_add_email	\N	\N	2026-10-16 00:14:13.961693+06	1
c6e2111a-ec26-4143-a2c1-58a6a6bfb163	9d4bf43a7d630cdbc42d36f2195c4f4d2216161732c22cea33ec112d66d97b04	2026-10-01 11:27:44.057375+06	20261001052743_customer_status	\N	\N	2026-10-01 11:27:44.002041+06	1
bd581c44-faea-4f75-8912-1fc32b832088	243b77383d96255f40f8f75dc2cc72b35677bdb0647322834565d5f751c9a6b3	2026-10-01 14:21:20.652137+06	20261001082120_user_status	\N	\N	2026-10-01 14:21:20.617715+06	1
df2767cd-f3bb-4cc4-ba92-de5fea4e7f02	27febc6ec70a31dca9ce77aefcc5f1aec750dd405ffb08be1ee736584a78e703	2026-10-02 05:30:29.001919+06	20261001233028_vata_backup	\N	\N	2026-10-02 05:30:28.899954+06	1
\.


--
-- Data for Name: carrents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carrents (id, address, area, rent, "createdAt", "updatedAt", "vataId", "deleteStatus", "updateStatus") FROM stdin;
7c32b3ff-17df-455c-aea1-db9ed7165351	গঙ্গাপুর, বোরহানউদ্দিন	Mirpur 22	700	2026-09-30 10:06:01.28	2026-09-30 10:06:15.943	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	PENDING	CANCELLED
46d3a8e8-d9b1-4bf0-b14f-f1cbb672a58a	Dhaka Mirpur	Alomdanga	100	2026-09-30 10:08:02.192	2026-09-30 10:08:32.03	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	PENDING	CANCELLED
38f37f7d-cc70-48fa-8cc8-839befe51e23	Dhaka Mirpur	Baofol	0	2026-09-30 10:09:49.68	2026-09-30 13:37:05.497	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	CANCELLED	PENDING
\.


--
-- Data for Name: cash; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cash (id, type, source, description, amount, "isDeleted", "createdAt", "updatedAt", "vataId", "seasonId", "deleteStatus", "updateStatus") FROM stdin;
680a0b53-a5c7-42f8-ba85-682508e43afa	EXPENSE	uthso nai	11	2000.00	f	2026-09-26 11:02:22.467	2026-09-26 11:02:22.467	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	DEFAULT	DEFAULT
7c4ef35f-57da-4bd5-a776-d25d383302d3	INCOME	Mursalin Vao	hdfiewf	12000.00	t	2026-09-28 18:10:27.054	2026-09-28 19:33:46.155	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	APPROVED	DEFAULT
99b9e83b-6c12-4b7b-8296-732ff328754d	INCOME	Fakhar	asdef	6000.00	t	2026-09-28 18:12:41.245	2026-09-28 20:02:11.957	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	APPROVED	DEFAULT
f4fbf8ca-e95c-4b53-96c2-2b3b2dfd3aec	INCOME	Tanvir	uiewg	700.00	t	2026-09-28 18:10:42.207	2026-09-28 20:09:25.454	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	APPROVED	DEFAULT
99edea6b-e91d-43cf-a5bd-0496412b569e	INCOME	sabbir	ttt	1200.00	t	2026-09-28 20:11:58.423	2026-09-28 20:13:52.54	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	APPROVED	DEFAULT
90045992-549e-4958-8fb2-20bc6b4a662b	INCOME	Mursalin Vao	hoio	8000.00	t	2026-09-28 20:14:13.784	2026-09-29 03:10:07.402	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac	APPROVED	APPROVED
\.


--
-- Data for Name: challanItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."challanItems" (id, class, rate, quantity, delivered, price, "challanId", "deliveryDate", "createdAt", "updatedAt", "isDeleted") FROM stdin;
fa4bb0e6-afc6-4d40-8110-dca2aeaa69fb	পিকেট	12	1000	0	12000	1372f36c-b803-48cf-b565-99dda2ed63b6	2026-09-27 18:00:00	2026-09-28 13:41:59.604	2026-09-28 13:41:59.604	f
042808c8-d8ed-4a66-804b-32c35abebb71	পিকেট	12	1000	0	12000	f869ac3d-9bed-44b6-afa3-32b877cb07a1	2026-09-30 18:00:00	2026-10-01 09:36:09.966	2026-10-01 09:36:09.966	f
\.


--
-- Data for Name: chllans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chllans (id, serial, "chalanType", "deliveryDate", "challanDate", "duePaymentDate", "deliverySeason", note, "productPrice", discount, "totalPrice", cash, due, "createdAt", "updatedAt", "customerId", "vataId", "isDeleted", "createdById", "seasonId", "carRent", "deleteStatus", "updateStatus") FROM stdin;
1372f36c-b803-48cf-b565-99dda2ed63b6	1	রেগুলার চালান	2026-09-27 18:00:00	2026-09-28 13:41:26.055	2026-09-27 18:00:00	\N		12000	0	12500	5000	7500	2026-09-28 13:41:59.583	2026-09-28 13:41:59.583	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	500	DEFAULT	DEFAULT
f869ac3d-9bed-44b6-afa3-32b877cb07a1	2	রেগুলার চালান	2026-09-30 18:00:00	2026-10-01 09:35:29.363	2026-10-27 18:00:00	\N	No Note	12000	0	12500	12000	500	2026-10-01 09:36:09.934	2026-10-01 09:36:09.934	3c681832-5238-4d39-bafd-3afcb45c6593	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	d7b86b05-c570-43ba-a83c-bdfbd1a80328	11fdc269-699e-4a88-9092-f8f173bc55ac	500	DEFAULT	DEFAULT
\.


--
-- Data for Name: classAndRates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."classAndRates" (id, "classType", "className", rate, "createdAt", "updatedAt", "isDeleted", "vataId", "advanceRate", "deleteStatus", "updateStatus") FROM stdin;
35ef558b-8a4b-4545-946d-4f75d0ab903d	ইট	১ নং	9	2026-09-21 17:36:30.149	2026-09-21 17:36:30.149	f	0a1e8395-aa43-400a-b92b-ab1fd26cd031	0	DEFAULT	DEFAULT
8d61abf5-2887-4491-bec0-2661e692bead	ইট	২ নং (ক)	8.3	2026-09-22 15:06:36.687	2026-09-26 14:01:22.01	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	10	DEFAULT	APPROVED
9db43bd9-3b8a-488a-ba03-a5865ecd89cd	ইট	১ নং	7	2026-09-12 03:48:20.644	2026-09-26 14:23:34.301	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	6	PENDING	DEFAULT
d5aeaa43-0197-4247-834d-4919cddb6b28	আধলা	১ নং আদলা	9	2026-09-25 04:25:03.51	2026-09-27 03:39:05.576	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	5	PENDING	DEFAULT
2f5a4ddf-115b-4512-806e-feef2e9288d4	ইট	পিকেট	12	2026-09-22 15:06:29.509	2026-09-27 09:32:22.972	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	6	PENDING	APPROVED
c76920be-dbe9-4318-88e5-a254b7cddc7d	অন্যান্য	রাবিস	9	2026-09-22 15:07:56.099	2026-09-25 05:14:14.193	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	6	DEFAULT	DEFAULT
a46a9b66-9fd6-4412-bf81-c16b2d94044f	আধলা	2 নং আদলা	9	2026-09-25 04:36:21.524	2026-09-26 09:12:01.884	t	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	4	DEFAULT	DEFAULT
b79bc63f-0a08-4ed8-84c9-811575c68b61	ইট	এলোট	6	2026-09-22 15:06:50.089	2026-09-26 09:17:26.236	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	4	DEFAULT	DEFAULT
\.


--
-- Data for Name: customerdues; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customerdues (id, "customerId", "seasonId", "challanId", "totalAmount", "paidAmount", "dueAmount", "createdAt", "updatedAt") FROM stdin;
5318f3eb-cb12-471d-92c2-bffccaa6dc78	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	11fdc269-699e-4a88-9092-f8f173bc55ac	1372f36c-b803-48cf-b565-99dda2ed63b6	12500.00	5000.00	7500.00	2026-09-28 13:41:59.596	2026-09-28 13:41:59.596
c97a4ccf-402b-4702-ada8-ebd258788d4a	3c681832-5238-4d39-bafd-3afcb45c6593	11fdc269-699e-4a88-9092-f8f173bc55ac	f869ac3d-9bed-44b6-afa3-32b877cb07a1	12500.00	12000.00	500.00	2026-10-01 09:36:09.944	2026-10-01 09:36:09.944
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, "customerCode", name, address, "phoneNumber", "createdAt", "updatedAt", "isDeleted", "nextPaymentDate", note, "vataId", "deleteStatus", "updateStatus") FROM stdin;
f7562f06-a94e-40c0-b446-fb59c4c608c6	001	ইমরান হোসেন	চরবাটা	01407128177	2026-09-21 17:36:57.64	2026-09-21 17:36:57.64	f	\N	\N	0a1e8395-aa43-400a-b92b-ab1fd26cd031	DEFAULT	DEFAULT
3c681832-5238-4d39-bafd-3afcb45c6593	003	ইমরান হোসেন	চরবাটা	01407128100	2026-09-22 17:10:27.882	2026-10-01 09:36:09.926	f	2026-10-27 18:00:00		3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	APPROVED
fb7aa1b7-935a-4635-8c7d-b778e9cdf0a4	002	Ahosun	Chuadanga	01407128179	2026-09-12 01:43:25.977	2026-09-28 13:34:31.902	f	2026-09-27 18:00:00		3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	DEFAULT
eaffa5d9-c173-491f-8edf-3981fe4fa6ce	001	Tanvir	Dhaka Mirpur	01407128177	2026-09-12 03:48:46.369	2026-09-28 17:12:37.339	f	2026-09-30 18:00:00		3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	DEFAULT
2efd6f5d-d726-4608-9196-9ecea6bfb961	004	Mredull	Dhaka Mirpur	01407128155	2026-09-25 16:44:36.154	2026-10-01 06:04:25.568	f	2026-09-25 18:00:00	\N	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	PENDING
\.


--
-- Data for Name: deliveries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveries (id, "deliveryDate", "deliveryNo", "nextDeliveryDate", quantity, "deliveryReceived", class, "deliveryRemaining", "carNo", "lastDelivered", "carRent", "invoiceId", "isDeleted", "createdAt", "updatedAt", season, "deliveryById", "driverId", status, "deleteStatus", "updateStatus") FROM stdin;
\.


--
-- Data for Name: duecollections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.duecollections (id, due, collect, "newDue", "nextDate", "customerId", "seasonId", "isDeleted", "createdAt", "updatedAt", "deleteStatus", "updateStatus") FROM stdin;
68c7ff3d-f6ce-48fe-94cf-d93c50bcb8af	7500	1000	6500	2026-09-28 18:00:00	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	11fdc269-699e-4a88-9092-f8f173bc55ac	t	2026-09-28 13:42:24.341	2026-09-28 13:43:04.895	APPROVED	DEFAULT
fd42b223-157d-4ca9-96da-684ef27586c1	7500	1000	6500	2026-09-29 18:00:00	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	11fdc269-699e-4a88-9092-f8f173bc55ac	f	2026-09-28 16:51:32.318	2026-09-28 16:51:32.318	DEFAULT	DEFAULT
\.


--
-- Data for Name: login_histories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.login_histories (id, type, device, browser, "ipAddress", "userId", "createdAt", status) FROM stdin;
0ebe6437-c676-4dc2-8073-5cdf00faf941	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-11 20:06:51.304	t
89d371c2-073b-484f-a82a-ad0d7b67f6a1	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:09:18.986	t
50d388c7-9910-445b-92bb-ee505d1785ee	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:11:45.466	t
51b95d74-4411-419e-903c-18d43cd25a5b	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:17:18.732	t
47232b86-4d89-4c25-bd23-536defb84978	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-11 20:17:25.985	t
9d1c4b1e-c140-4137-8947-5b338f4ae4b6	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:18:09.089	t
cc0d97e8-9792-4207-b9a1-597db4ed4d88	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-11 20:22:25.547	t
043805b5-eadb-4dc7-b538-d3942f858993	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-11 20:29:42.22	t
02f4395d-1f18-400b-8d95-be9fc03e93ae	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 01:50:08.728	t
b9f9ecb9-be09-479c-8dd5-1296e24a3d41	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 02:17:12.089	t
ebf22466-0373-4d7f-8e78-d0f7e1539c5d	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 02:17:18.912	t
dc33f34c-9e31-428b-9289-b75e6cd1f700	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 03:18:57.472	t
c456e414-1045-4157-81e2-977b0e690cf5	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 03:23:52.785	t
26ed4f65-1151-4df5-b069-b878e6a0078d	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 03:28:41.726	t
c74cee26-d761-41e9-aa4d-c84dc8348872	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 03:28:48.37	t
4bea9d2e-5711-41b3-b06c-e1da69fe3664	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 04:03:17.795	t
feebfcb0-8edf-443a-978b-dc513d85e052	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 14:03:47.417	t
08a66a94-5b81-4595-9c3e-aaf6924c63dd	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 15:19:24.428	t
f40eebc0-e60c-4ff1-abb8-5bfd97f60778	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 16:57:50.164	t
24c6e759-3417-405a-8427-8fba0abfd46e	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 16:58:05.144	t
22492311-90eb-40fd-8259-ff19041a220c	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 17:31:54.695	t
8e976cb8-5255-4f7b-909e-7f7cf1354438	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 17:35:05.888	t
aaac1fb3-2ba4-46c3-a100-39c27139804c	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 17:35:12.554	t
55cff722-c6e4-4f9d-b0ad-38aa1ffd9ced	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 17:52:56.247	t
81fc9a77-7839-46d1-a68d-daf7573ef457	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 03:56:04.108	t
dda4ec61-39aa-41d6-b0b0-a4ea0c49fd4a	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-13 03:56:10.902	t
ff1c19b7-8326-42e0-b26c-98db293aae10	Login	Windows	Edge	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-13 04:51:25.758	t
1a002839-559a-4b4a-98ec-8a5b97ebd96c	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 06:17:41.657	t
de054ca8-9393-4f50-900c-b452c660624b	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 06:19:50.741	t
528d270f-e082-4ea7-bd00-d61f8d094d5b	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-13 08:39:06.628	t
ab45bbbb-65ff-4fee-9440-bd1904233bc1	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 08:39:22.966	t
c10ceba3-a49a-41d4-8694-91b028296d25	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 07:29:52.589	t
6114cc5f-cbde-4ed5-a6ed-2442288cca04	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 16:12:55.084	t
e786d39a-0c7f-40fe-b424-47e6afdf8216	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 16:54:43.774	t
74b65ebe-ed92-4552-bda1-8c701385d9a1	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 16:55:12.579	t
361c23dd-caa2-4e15-a19d-a09e6fae67c5	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 17:15:38.713	t
1f2f30b1-3062-4891-96d2-4f42a3c1cd57	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 22:54:00.291	t
51330a52-8c8c-41ea-8d02-aeea53d626a8	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 22:54:05.304	t
b54eb80c-7438-4ad4-9e34-9df54512a77f	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-15 07:14:39.687	t
7a825031-e03e-46e3-b8b7-54fac8150baa	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-21 17:16:56.635	t
74b0fac4-8659-4170-91eb-9f43e3c8bd6c	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-21 17:31:59.47	t
d01fcd86-4121-4279-9a00-673df2c4bd82	Login	Windows	Chrome	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:33:26.459	t
1305a5be-3ce3-462b-b120-ddc3378478dc	Logout	Unknown	Unknown	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:34:53.687	t
90d2db3c-f810-4bb1-9635-f32302573bdd	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-21 17:34:58.477	t
675a9493-2791-4ab4-bb37-64965f7f41e9	Login	Windows	Chrome	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:35:36.173	t
e6e67a37-7ada-4d12-abdf-f4d7a86afe8a	Logout	Unknown	Unknown	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:40:27.725	t
f2bbf62b-9862-496c-9263-901ca9a2cd0b	Login	Windows	Chrome	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:42:56.659	t
118c443f-612c-4321-a285-b4c314f30a81	Logout	Unknown	Unknown	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 18:17:15.402	t
39fb3a52-5e4f-4e4f-a8e5-bc55e2d911c6	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-21 18:17:27.66	t
2ce6f1c4-8fcd-4e69-a7d9-2292eb442cc3	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-22 13:02:36.357	t
f66c3fbb-f7fb-4276-9cf3-b5405ee74610	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-22 13:02:42.418	t
6ffc0841-44f2-4775-98bc-91d2d135f34d	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-22 14:25:08.439	t
86baaead-4a65-4721-b2f5-4e08cf50febe	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-22 16:58:05.097	t
2127bf1b-4854-421a-b2b0-d033d5edfa7c	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-22 18:09:44.543	t
8e2a6965-bc57-4a0c-b9a3-b6ffb5e49d25	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-22 19:05:28.104	t
9d277302-d4f2-47cf-b1f8-19a3f2f6c077	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-25 03:01:49.079	t
0a557c8c-a7ac-4613-a3ab-78ce20f24e61	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-25 06:30:11.352	t
deaa29a2-cae4-4c85-a359-e8c89c40bd5f	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-25 19:20:25.229	t
8b03f9b5-cbdc-4d42-8686-ec77a9009253	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-25 19:37:55.486	t
8e51cb12-727e-4aa9-b620-e1b669473620	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 04:40:45.194	t
176a35f9-000d-44a3-8537-b929353bda1b	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 09:13:56.197	t
ba139efb-d2c4-46c5-b448-44ac0f1c491a	Login	Windows	Edge	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-26 09:14:02.328	t
2d1ca541-0a06-4c5c-80ac-754f94697d68	Logout	Unknown	Unknown	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-26 09:34:37.699	t
75a94ce8-5e75-404a-8bb7-cbd35b623656	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 09:34:40.119	t
b322c6de-e972-4fd4-b366-96ce27137fc7	Login	Windows	Edge	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-26 09:38:57.059	t
40b8083a-9113-4b37-a11f-b52312c645e9	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 10:59:14.165	t
2eda475a-c10a-4eaf-b3c4-bc12668f8582	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 12:26:06.044	t
bce72c3d-b95f-421a-be7e-d239c745f6aa	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 12:26:12.492	t
35d478d6-4fd3-4d61-a442-ad8904660398	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-26 12:27:55.164	t
592ad46b-ac4d-490c-a6d7-31b381324a3e	Logout	Unknown	Unknown	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-26 12:29:05.946	t
84f9bc74-706a-421a-80de-4e5b5d8c9920	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-26 12:29:15.998	t
3d2c16cc-96fe-4d18-bcf3-0fcccf17cf90	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-26 13:05:57.369	t
5f332adb-7b31-42c0-8288-bf9bb85269b6	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-26 15:43:59.839	t
5b6cbb63-c4e8-4932-9a47-9aa6c6685693	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-27 03:37:20.474	t
83032330-0d15-4967-917e-70fc8a3887bf	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-27 09:07:46.068	t
07936f9b-5917-4160-a93a-7c9886b11cd1	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-27 11:48:15.205	t
0bda0fa9-3259-402a-b679-eb2699cf5565	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-27 11:59:06.558	t
841f4731-975d-491c-92c2-c75aec1372ed	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-27 16:00:00.478	t
f0ffe1cc-ba7b-405c-bc8b-8bb41d372a08	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-28 05:50:44.664	t
3fa33a99-d36c-42eb-8467-e843aa761386	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-28 07:28:10.417	t
65f6a579-0af0-48ab-a533-0eb597748d0c	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-28 11:10:37.105	t
b5e9d121-034f-4c61-b568-f068da137a2a	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-28 20:11:15.528	t
27b4be38-be45-4d1f-878e-8b09d343351a	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-29 03:06:20.864	t
b260c5c3-98b9-4b03-bfd2-8611256d871d	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 03:33:27.038	t
07ba0248-596f-4fe1-b1ce-22be78976e5a	Login	Windows	Chrome	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-29 05:24:28.402	t
16323ff3-35df-49ad-97f5-de3e35067351	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 06:08:20.414	t
fd4a83b1-b867-4a8e-8044-e3ea45b04650	Login	Windows	Edge	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-29 06:14:35.437	t
1149c3d5-4571-4a82-a8ce-e8a491966187	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 08:53:52.487	t
b3196b97-434d-4fa3-aac7-6cf1f493ae65	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 09:00:27.955	t
288ed737-069f-4c1f-9771-d1453b1b533d	Login	Windows	Edge	::1	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-29 09:19:15.709	t
b912dfa0-3a45-4a15-9605-93edf406b6b5	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 11:20:28.042	t
d9233946-43e9-4876-814a-3cf6efa33a84	Login	Windows	Chrome	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 11:21:50.207	t
47da26aa-e749-44ec-94b0-57752b5dba73	Logout	Windows	Edge	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-29 11:31:41.533	t
af65e991-928e-4c06-b81d-e92671525e83	Login	Windows	Edge	103.149.104.14	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-29 11:35:49.283	t
2937a98b-9160-4359-923e-ad0a0ea06ef0	Login	Windows	Chrome	Unknown	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-30 09:30:51.121	t
826c657b-06e3-45e9-b8b7-91d38073f1f9	Login	Windows	Chrome	Unknown	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-30 09:44:14.513	t
f8e0ed73-4bca-4d4c-902d-f42210a99a60	Login	Windows	Chrome	Unknown	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-30 10:03:48.365	t
f351cbd6-ac31-4e5a-ade0-aeb6536895fe	Login	Windows	Chrome	103.149.104.14	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-09-30 13:35:00.514	t
cc5ebea3-cd90-416d-8f04-57735d815c16	Login	Windows	Chrome	103.149.104.14	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-01 04:31:48.89	t
a50637c3-df84-42c0-a4fa-46b1f982c6ed	Login	Windows	Chrome	103.149.104.14	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-01 09:28:58.123	t
748ca3f2-f8a3-450e-9e68-7a3b9eddf8ee	Logout	Windows	Chrome	103.149.104.14	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-01 09:30:43.799	t
f66e3a87-666c-4392-b980-68f67dc89295	Login	Windows	Chrome	103.149.104.14	d7b86b05-c570-43ba-a83c-bdfbd1a80328	2026-10-01 09:30:51.267	t
ad8960ff-8d5b-4f42-8de3-27be626a4da7	Login	Windows	Chrome	103.149.104.14	d7b86b05-c570-43ba-a83c-bdfbd1a80328	2026-10-01 09:31:00.07	t
e9cc11fe-a82e-47a5-b0e1-31b059617901	Login	Windows	Chrome	103.149.104.14	d7b86b05-c570-43ba-a83c-bdfbd1a80328	2026-10-01 09:34:37.85	t
11124144-2db7-4ace-83d0-06f5e8174ad8	Logout	Windows	Chrome	103.149.104.14	d7b86b05-c570-43ba-a83c-bdfbd1a80328	2026-10-01 09:35:04.733	t
efd699fe-fa2f-4268-806c-b213b18db53c	Login	Windows	Chrome	103.149.104.14	d7b86b05-c570-43ba-a83c-bdfbd1a80328	2026-10-01 09:35:25.888	t
9f168578-e441-4556-9eac-993f29c0a7b6	Logout	Windows	Chrome	103.149.104.14	d7b86b05-c570-43ba-a83c-bdfbd1a80328	2026-10-01 09:37:54.196	t
5cf4cc3c-a5c1-43f3-8b3a-42246ddaa8a7	Login	Windows	Chrome	103.149.104.14	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-01 09:38:04.327	t
0e029d61-e4e1-4521-aa03-eb9b1c781fb8	Login	Windows	Edge	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-02 00:18:41.649	t
ee4fb07f-2589-447a-9ddf-3b41f549c084	Login	Android	Chrome	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-02 15:14:18.844	t
1989efc3-2d50-41c2-9583-9d5170f8426c	Login	Android	Chrome	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-02 15:15:53.925	t
bd372c97-c194-4758-a5d2-2f2a9cf801f2	Login	Windows	Chrome	Unknown	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-02 15:17:09.961	t
03f300bb-0632-4398-b562-7de13e2a87fa	Login	Android	Chrome	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-02 15:20:03.076	t
828a0c40-9632-456d-8b62-ed4aacdc0a4d	Login	Windows	Chrome	103.149.104.14	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-02 15:20:29.471	t
aee5fb9d-8e94-48ef-b207-a375bc16d048	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:10:36.1	f
653da3bf-2e91-47de-823e-b3cf207dba94	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:15:57.529	t
4a096979-0775-4ebb-9f1b-6e154c92aacf	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:36:48.714	t
8100225e-3713-47d7-b3bf-774ab686dfe1	Logout	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:38:29.443	t
9f450c00-cd31-46da-9764-dcf4bf58bba9	Login	Windows	Edge	103.149.104.12	45db4b19-9523-45a2-9436-8f52d5279b25	2026-10-15 05:38:36.031	t
17b8adbd-b01a-455d-a490-753f26fbce19	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:39:05.149	t
96568026-de42-43d8-9b6b-dc3723f7d3b3	Logout	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:50:06.779	t
dc488b55-4589-4863-8656-69166e65a72b	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:50:33.451	f
975d4ece-9dec-477b-8698-212b28977131	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 05:50:40.186	t
34a2fcd4-6ca4-4432-8406-91a66bd9323c	Logout	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:10:29.077	t
71c5d892-1e7e-42cf-b8e9-47db92f36bdb	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:10:30.942	t
f3ba0c9d-afb0-4c2d-97eb-3d75e8a348c4	Logout	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:13:51.864	t
8bf5ca81-54d7-40b2-9b62-098f55f30f5a	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:13:56.389	f
d5fad228-780d-4630-997d-e8c1c5d64064	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:14:00.716	t
c781ca33-d2c8-466a-bee8-cfcdad95d3f7	Logout	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:28.477	t
ee4070a6-649d-4254-9b9a-43c059bde0ae	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:32.472	f
e687329e-0846-4a92-af49-f73a657c009b	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:33.658	f
c0decfc9-d3e1-4802-a680-f8fd8efc6707	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:35.861	f
168c6dfa-736f-4100-913b-9ecb69a2f08d	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:37.02	f
f9756415-2bf5-4fda-9663-1bd06ddacc9d	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:38.137	f
d3a80ab1-1dac-470a-ad8b-c39fdffdfbdf	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:39.167	f
7c8086c9-7eac-498f-af08-6fde9bea1edc	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:40.196	f
143e56c3-8ab0-475e-9dba-2d506733d218	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:41.208	f
f75138c4-2f71-47bb-82e2-a36750f1a1f0	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:42.264	f
972042ad-82d9-4d44-aeb9-7c8cd1c9c392	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:15:43.251	f
b6ee1beb-810e-4357-96b4-440d4ec76580	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:16:58.028	t
a42021c1-6925-4b28-9439-014cd81d0c69	Logout	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:41:25.823	t
bcb569d2-b577-415c-9722-4e4b6f05c5aa	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:41:34.33	t
975c70a1-8501-41b5-a952-149f5bd7152a	Logout	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:41:58.639	t
8ff85556-ddbb-4120-a657-f9a3e0c8c153	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:05.482	f
ec480ccc-bb00-4193-b23a-74cc6676fd5d	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:06.812	f
84405de0-7d3d-4e86-83e9-0936ffb51ed9	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:07.751	f
bf8636df-a54c-4717-a921-ad36a60014d3	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:08.65	f
cae20c56-065e-4040-9dcc-679e85236d96	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:09.501	f
99cedcdd-4815-4e20-914c-929c2602ecb3	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:10.377	f
3cc441bf-370a-468a-8e22-75eec57d6104	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:11.249	f
7ebd5a95-3d3e-4bb7-945b-66d7055663f4	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:12.094	f
9fdba2dd-1da4-468a-858d-42a17bc02eae	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:12.885	f
ae698898-9c8a-4166-ad71-e6b5383228a3	Login	Windows	Edge	103.149.104.12	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 06:42:13.868	f
8a7517ed-3ee9-425c-854f-58c82d7ae093	Login	Windows	Edge	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 06:42:21.817	t
10b9491c-41e6-4f91-b698-3bf7f7bd4a7b	Login	Windows	Edge	202.134.9.146	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 11:23:34.913	f
7ea0c0a5-91f8-49c9-b7f9-b50b51c3320d	Login	Windows	Edge	202.134.9.146	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 11:24:27.705	f
b601ed6f-0d5d-4418-98b4-60169b557b65	Login	Windows	Edge	202.134.9.146	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 11:25:03.268	f
29509a96-7f13-4f8a-9a9e-f4ee5aa1f8ad	Login	Windows	Edge	202.134.9.146	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 11:25:10.83	f
be02a1ad-f84b-42c4-b69c-f7e9be767214	Login	Windows	Edge	202.134.9.146	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 11:25:13.267	t
199e98f3-2c6f-408b-9d73-21afa7b5ea8c	Logout	Windows	Edge	202.134.9.146	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 11:26:26.465	t
1485948e-0476-4407-8dd2-0b4dd2cfaf1c	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:26:35.897	f
7ce79bdc-d09b-43c3-a1bf-489f2aabdfc6	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:27:01.689	t
9a2a0c93-69ff-4fa8-8373-0c4883ff533f	Logout	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:28:51.435	t
28ae0cd8-aa9c-4b71-a799-5bdc81fddf32	Login	Windows	Edge	202.134.9.146	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 11:29:23.644	t
7b18b563-5825-422c-94b3-bf523502cafa	Logout	Windows	Edge	202.134.9.146	a4a9e555-07d1-477e-82ad-ee9f42f3385b	2026-10-15 11:29:32.529	t
cb82b41f-7fae-411a-8f59-8dc9ceb8ea99	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:29:41.438	f
322e9d12-84a1-4350-9b9c-275e5a5b5dd3	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:03.495	f
95a805da-f4fe-48e2-ae9b-3341002a99af	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:05.289	f
fcea142b-b843-4bd1-8a74-6346b69d2cdd	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:06.827	f
1c861247-5f4f-4580-94e0-46760314eaba	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:08.276	f
1574231f-7dd9-4247-9ef8-f54d33bd351f	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:09.695	f
026950d2-501d-4f44-8241-72f8a7700054	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:11.131	f
c247cfc6-05f8-4ab2-aea8-12b4be977e71	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:29.608	f
68dd70a6-d2fa-4331-b771-bca8e2ff82e0	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:31.028	f
cd70958c-3d2a-43de-b24b-22abacee9bef	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:32.131	f
caf99e5e-680d-43a0-b5b0-804ceb6e40eb	Login	Windows	Edge	202.134.9.146	d09e0612-0f69-4dde-b38a-c05e5b3e1adf	2026-10-15 11:30:44.641	f
2299759d-97a9-4b48-ae02-842aba16443b	Login	Windows	Edge	202.134.9.146	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 13:04:00.244	t
657a936b-41b9-4756-b373-b09339a1820f	Logout	Windows	Edge	202.134.9.146	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 13:12:14.736	t
a2ce590e-ab25-4bc1-8c34-b25621f2e198	Login	Windows	Chrome	103.149.104.12	45db4b19-9523-45a2-9436-8f52d5279b25	2026-10-15 18:45:51.173	t
94c74bc2-879e-482c-a228-9eb89874067b	Login	Windows	Chrome	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 19:01:32.732	t
a3a636bc-5ff6-4a2e-aa86-8bf776ada4e3	Logout	Windows	Chrome	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 21:46:01.98	t
f03c1f6e-7bdd-4edf-a420-ff1d28cf9513	Login	Windows	Chrome	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 21:46:28.87	t
17b63e81-0ab5-4980-983f-65af50c794dc	Logout	Windows	Chrome	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-10-15 21:46:44.683	t
08309fac-2ded-4ab1-b83b-c24498f90101	Login	Windows	Chrome	103.149.104.12	68a492ca-0594-4a81-8413-6e9896b71734	2026-10-15 22:18:02.551	f
214cfc68-b72b-4565-9739-0b9032d596a2	Login	Windows	Chrome	103.149.104.12	68a492ca-0594-4a81-8413-6e9896b71734	2026-10-15 22:18:11.351	t
a7ce2d09-155d-4231-81a1-ca9deb68c51c	Logout	Windows	Chrome	103.149.104.12	68a492ca-0594-4a81-8413-6e9896b71734	2026-10-16 03:14:38.068	t
d30d10da-9899-4136-b383-2fbb169b98b0	Login	Windows	Chrome	103.149.104.12	68a492ca-0594-4a81-8413-6e9896b71734	2026-10-16 03:14:55.039	f
223d5c59-7f33-485a-a6a8-3064480acd17	Login	Windows	Chrome	103.149.104.12	68a492ca-0594-4a81-8413-6e9896b71734	2026-10-16 03:15:04.376	t
62872b11-4fca-44e9-ae62-c482dd9e98d7	Logout	Windows	Chrome	103.149.104.12	68a492ca-0594-4a81-8413-6e9896b71734	2026-10-16 08:51:09.63	t
3c6e9706-25ce-4339-9fa2-46671016e0b0	Login	Windows	Chrome	103.149.104.12	45db4b19-9523-45a2-9436-8f52d5279b25	2026-10-16 08:51:18.935	t
f9259d60-48a2-4d01-8348-d0eefb48d405	Login	Windows	Chrome	103.149.104.12	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-11-06 04:22:35.244	t
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, "productName", category, shop, quantity, price, "productImage", warranty, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, username, role, password, "isDeleted", "createdAt", "updatedAt", "vataId", "deleteStatus", "updateStatus", "expiryTime", "recoveryCode", email) FROM stdin;
45db4b19-9523-45a2-9436-8f52d5279b25	System Admin	systemadmin	SUPER_ADMIN	$2b$12$awL0b/K8Z./TKixb7YTcNO4aY71ZoXfvPmqs3G1nB3hh5RlwZATOq	f	2026-09-11 20:06:39.343	2026-09-11 20:06:39.343	\N	DEFAULT	DEFAULT	\N	\N	\N
4d09ef06-8e57-4875-aba9-e26e4b59b91d	Suvash Babu	sabbir	OWNER	$2b$12$2G4zr.L3iwlOgPJntTjMx.j8MkrR7ZFboPLeFDCYloZeKrhn72QoO	f	2026-09-11 20:17:07.499	2026-09-11 20:17:07.499	991cab71-e941-4f38-add3-c1d2f4b0e449	DEFAULT	DEFAULT	\N	\N	\N
333d25f8-b213-4366-97a2-9cd24c9d2fee	Atik	atik	OWNER	$2b$12$MEZNG6.Yxx.U/2JTxtVqZ.HSfilOlCegPoKZ6yrmayKGUxWWYrPUC	f	2026-09-21 17:33:15.526	2026-09-21 17:33:15.526	0a1e8395-aa43-400a-b92b-ab1fd26cd031	DEFAULT	DEFAULT	\N	\N	\N
a4a9e555-07d1-477e-82ad-ee9f42f3385b	 আব্দুর রহমান	rahman	MANAGER	$2b$12$PAmrAv.HtcwcKfQrza6GCOdfXsgwhjxza3oU0L.s0HfuUfuydUuve	f	2026-09-26 09:13:47.298	2026-10-01 09:28:27.337	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	APPROVED	\N	\N	\N
6ccfdb9f-6f14-4489-97b1-29163efa0d66	Shakib Hasan	sakib	OWNER	$2b$12$pIRyHynHpWruYbrd8EJ7yOrGrbriolotCOhqXwWMTkU3yDUWKHwUe	f	2026-10-16 03:13:06.504	2026-10-16 03:13:06.504	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	DEFAULT	\N	\N	\N
d7b86b05-c570-43ba-a83c-bdfbd1a80328	Sabbir	kk	OPERATOR	$2b$12$PvT3.88BgmVwYQfgYt/f2uK1d18.4dbsah9DJliIw.h7iFIhN8edi	t	2026-10-01 09:30:38.367	2026-10-01 09:39:19.868	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	APPROVED	DEFAULT	\N	\N	\N
1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	Suvash Babu	suvash	OWNER	$2b$12$LvIlh0hxu3J0fn1CVC6tAuCwBWqcVw05UCPttI8PGTsu.undkN3FW	f	2026-09-11 20:08:59.305	2026-10-16 03:29:59.353	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	APPROVED	\N	\N	mhsabbir220@gmail.com
d09e0612-0f69-4dde-b38a-c05e5b3e1adf	montu	montu	OPERATOR	$2b$12$fbwoGM7O941Y/9o8oZYhq.efoD01EyJg2MQbifCuSYh.OqaYHJgve	f	2026-10-15 11:26:14.179	2026-10-16 03:02:41.572	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	APPROVED	\N	\N	mahbubulhasan604@gmail.com
68a492ca-0594-4a81-8413-6e9896b71734	Mahbubul Hasan	mahbubul	OWNER	$2b$12$3aR/xF/y/TM.Dt6pP0575.SASjBKHmyWw1e/rh5XVCiOptYMsjgTe	f	2026-10-16 03:20:25.484	2026-10-15 22:17:47.068	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	DEFAULT	DEFAULT	\N	\N	mahbubulhasan523@gmail.com
\.


--
-- Data for Name: vata_backups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vata_backups (id, "vataId", "backupData", "jsonFileName", "jsonFilePath", "jsonFileSize", "sqlFileName", "sqlFilePath", "sqlFileSize", "tableCount", "totalRowCount", "tableRowCounts", "createdAt") FROM stdin;
e6f3f548-7252-48c1-b206-31587a612e21	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	{"tables": {"Vata": [{"id": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "status": "ACTIVE", "vataId": "V001", "address": "আমান উল্যাহ,  সুবর্ণচর, নোয়াখালী", "createdAt": "2026-09-11T20:08:59.270Z", "ownerName": "সুভাষ বাবু ", "shortForm": "SBM", "subdomain": "suvasbricks", "updatedAt": "2026-10-15T05:38:46.882Z", "nameBangla": "মেসার্স সুভাষ ব্রিকস ম্যানুফ্যাকচারিং", "nameEnglish": "M/s. Subhash Bricks Manufacturing", "nextPaymentDate": "2026-11-15T05:38:46.867Z", "subscriptionEnd": "2026-11-15T05:38:46.867Z", "ownerPhoneNumber": "01407128177", "shortDescription": "এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়", "additionalAddress": "কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে", "subscriptionStart": "2026-10-15T05:38:46.867Z", "subscriptionPlanId": "2a303882-9075-4173-9684-9e948fb48490", "challanPersonOneName": "বিহার", "challanPersonTwoName": "বাবলু", "challanManagerPhoneNumber": "01407128178", "challanPersonOnePhoneNumber": "01407128179", "challanPersonTwoPhoneNumber": "01407128178"}], "cash": [{"id": "680a0b53-a5c7-42f8-ba85-682508e43afa", "type": "EXPENSE", "amount": "2000", "source": "uthso nai", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-26T11:02:22.467Z", "isDeleted": false, "updatedAt": "2026-09-26T11:02:22.467Z", "description": "11", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "7c4ef35f-57da-4bd5-a776-d25d383302d3", "type": "INCOME", "amount": "12000", "source": "Mursalin Vao", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T18:10:27.054Z", "isDeleted": true, "updatedAt": "2026-09-28T19:33:46.155Z", "description": "hdfiewf", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "f4fbf8ca-e95c-4b53-96c2-2b3b2dfd3aec", "type": "INCOME", "amount": "700", "source": "Tanvir", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T18:10:42.207Z", "isDeleted": true, "updatedAt": "2026-09-28T20:09:25.454Z", "description": "uiewg", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "99b9e83b-6c12-4b7b-8296-732ff328754d", "type": "INCOME", "amount": "6000", "source": "Fakhar", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T18:12:41.245Z", "isDeleted": true, "updatedAt": "2026-09-28T20:02:11.957Z", "description": "asdef", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "99edea6b-e91d-43cf-a5bd-0496412b569e", "type": "INCOME", "amount": "1200", "source": "sabbir", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T20:11:58.423Z", "isDeleted": true, "updatedAt": "2026-09-28T20:13:52.540Z", "description": "ttt", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "90045992-549e-4958-8fb2-20bc6b4a662b", "type": "INCOME", "amount": "8000", "source": "Mursalin Vao", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T20:14:13.784Z", "isDeleted": true, "updatedAt": "2026-09-29T03:10:07.402Z", "description": "hoio", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}], "users": [{"id": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "name": " আব্দুর রহমান", "role": "MANAGER", "email": null, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "password": "$2b$12$PAmrAv.HtcwcKfQrza6GCOdfXsgwhjxza3oU0L.s0HfuUfuydUuve", "username": "rahman", "createdAt": "2026-09-26T09:13:47.298Z", "isDeleted": false, "updatedAt": "2026-10-01T09:28:27.337Z", "expiryTime": null, "deleteStatus": "DEFAULT", "recoveryCode": null, "updateStatus": "APPROVED"}, {"id": "6ccfdb9f-6f14-4489-97b1-29163efa0d66", "name": "Shakib Hasan", "role": "OWNER", "email": null, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "password": "$2b$12$pIRyHynHpWruYbrd8EJ7yOrGrbriolotCOhqXwWMTkU3yDUWKHwUe", "username": "sakib", "createdAt": "2026-10-16T03:13:06.504Z", "isDeleted": false, "updatedAt": "2026-10-16T03:13:06.504Z", "expiryTime": null, "deleteStatus": "DEFAULT", "recoveryCode": null, "updateStatus": "DEFAULT"}, {"id": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "name": "Sabbir", "role": "OPERATOR", "email": null, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "password": "$2b$12$PvT3.88BgmVwYQfgYt/f2uK1d18.4dbsah9DJliIw.h7iFIhN8edi", "username": "kk", "createdAt": "2026-10-01T09:30:38.367Z", "isDeleted": true, "updatedAt": "2026-10-01T09:39:19.868Z", "expiryTime": null, "deleteStatus": "APPROVED", "recoveryCode": null, "updateStatus": "DEFAULT"}, {"id": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "name": "Suvash Babu", "role": "OWNER", "email": "mhsabbir220@gmail.com", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "password": "$2b$12$LvIlh0hxu3J0fn1CVC6tAuCwBWqcVw05UCPttI8PGTsu.undkN3FW", "username": "suvash", "createdAt": "2026-09-11T20:08:59.305Z", "isDeleted": false, "updatedAt": "2026-10-16T03:29:59.353Z", "expiryTime": null, "deleteStatus": "DEFAULT", "recoveryCode": null, "updateStatus": "APPROVED"}, {"id": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "name": "montu", "role": "OPERATOR", "email": "mahbubulhasan604@gmail.com", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "password": "$2b$12$fbwoGM7O941Y/9o8oZYhq.efoD01EyJg2MQbifCuSYh.OqaYHJgve", "username": "montu", "createdAt": "2026-10-15T11:26:14.179Z", "isDeleted": false, "updatedAt": "2026-10-16T03:02:41.572Z", "expiryTime": null, "deleteStatus": "DEFAULT", "recoveryCode": null, "updateStatus": "APPROVED"}, {"id": "68a492ca-0594-4a81-8413-6e9896b71734", "name": "Mahbubul Hasan", "role": "OWNER", "email": "mahbubulhasan523@gmail.com", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "password": "$2b$12$3aR/xF/y/TM.Dt6pP0575.SASjBKHmyWw1e/rh5XVCiOptYMsjgTe", "username": "mahbubul", "createdAt": "2026-10-16T03:20:25.484Z", "isDeleted": false, "updatedAt": "2026-10-15T22:17:47.068Z", "expiryTime": null, "deleteStatus": "DEFAULT", "recoveryCode": null, "updateStatus": "DEFAULT"}], "rounds": [{"id": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "name": "1 রাউন্ড", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac"}], "drivers": [{"id": "f575a0fa-6f73-4478-bfb3-6c76c16159e2", "name": "Shakib Hasan", "salary": "12000", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-14T18:42:01.557Z", "isDeleted": true, "updatedAt": "2026-09-30T09:38:17.813Z", "PhoneNumber": "01407128177", "deleteStatus": "DEFAULT", "updateStatus": "APPROVED"}, {"id": "5370e75b-b086-498d-8503-76d50eb6fed8", "name": "অন্তু ম্যানেজার", "salary": "1000", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-30T09:38:32.041Z", "isDeleted": true, "updatedAt": "2026-09-30T09:40:24.019Z", "PhoneNumber": "01407128177", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "feb4406a-7895-44d3-b481-2264cc185f7a", "name": "Ahosun", "salary": "0", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-30T09:41:25.383Z", "isDeleted": true, "updatedAt": "2026-09-30T09:41:28.271Z", "PhoneNumber": "01407128181", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "307c2dae-887f-4767-86e6-1883df74dbbd", "name": "Tanvir", "salary": "0", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-30T09:45:06.807Z", "isDeleted": true, "updatedAt": "2026-09-30T09:46:36.254Z", "PhoneNumber": "01407128177", "deleteStatus": "PENDING", "updateStatus": "CANCELLED"}, {"id": "042dc8f5-e708-4873-9897-6556c1e85878", "name": "Ahosun", "salary": "0", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-30T13:45:43.325Z", "isDeleted": false, "updatedAt": "2026-09-30T13:45:43.325Z", "PhoneNumber": "01407128177", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}], "ledgers": [{"id": "e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda", "name": "ইব্রাহিম আগুন মাঝি", "rate": 5, "salary": 2500, "serial": 106, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": "86bc3f84-3c7a-407f-a4a0-c1ea9ae6f5a8", "quantity": 500, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-25T09:20:52.137Z", "isDeleted": false, "startDate": "2026-09-24T18:00:00.000Z", "updatedAt": "2026-09-27T05:35:46.414Z", "weeklyFood": 500, "phoneNumber": "014071281777", "deleteStatus": "DEFAULT", "updateStatus": "APPROVED", "openingBalance": 100, "openingBalanceType": "পাওনা"}, {"id": "86bc3f84-3c7a-407f-a4a0-c1ea9ae6f5a8", "name": "মাঝি", "rate": 0, "salary": 0, "serial": 105, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": null, "quantity": 0, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-25T09:19:52.520Z", "isDeleted": true, "startDate": null, "updatedAt": "2026-09-27T05:42:34.276Z", "weeklyFood": 0, "phoneNumber": "", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT", "openingBalance": 0, "openingBalanceType": null}, {"id": "95f97fe6-3437-47f5-97a9-a2c18cf35482", "name": "Shakib Hasan", "rate": 0, "salary": 0, "serial": 132, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": null, "quantity": 0, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-27T05:45:10.373Z", "isDeleted": true, "startDate": null, "updatedAt": "2026-09-27T05:45:34.330Z", "weeklyFood": 0, "phoneNumber": "", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT", "openingBalance": 0, "openingBalanceType": null}, {"id": "7a92bd48-b266-4c55-82f7-badae656de94", "name": "অন্তু ম্যানেজার", "rate": 500, "salary": 15000, "serial": 104, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": "8a935ae3-b0e7-4f4c-a0a4-1b934c1ea626", "quantity": 30, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-25T09:12:34.332Z", "isDeleted": false, "startDate": "2026-09-24T18:00:00.000Z", "updatedAt": "2026-09-27T05:00:56.042Z", "weeklyFood": 0, "phoneNumber": "014071281777", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "openingBalance": 100, "openingBalanceType": "দেনা"}, {"id": "62a7b9ee-38c4-4039-b186-356101f384ec", "name": "Ahosun", "rate": 0, "salary": 0, "serial": 142, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": null, "quantity": 10, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-27T05:48:11.652Z", "isDeleted": true, "startDate": null, "updatedAt": "2026-09-27T05:58:23.251Z", "weeklyFood": 0, "phoneNumber": "014071281777", "deleteStatus": "APPROVED", "updateStatus": "APPROVED", "openingBalance": 0, "openingBalanceType": null}, {"id": "829d91e6-9446-4b61-9b15-110e903c2a06", "name": "কেরানি", "rate": 0, "salary": 0, "serial": 102, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": null, "quantity": 0, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-25T09:08:00.498Z", "isDeleted": false, "startDate": null, "updatedAt": "2026-09-27T04:10:44.312Z", "weeklyFood": 0, "phoneNumber": "", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "openingBalance": 0, "openingBalanceType": null}, {"id": "8a935ae3-b0e7-4f4c-a0a4-1b934c1ea626", "name": "ম্যানেজার", "rate": 0, "salary": 0, "serial": 101, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": null, "quantity": 0, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-25T09:07:20.588Z", "isDeleted": false, "startDate": null, "updatedAt": "2026-09-27T04:09:21.452Z", "weeklyFood": 0, "phoneNumber": "", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "openingBalance": 0, "openingBalanceType": null}, {"id": "47a7b977-d0ad-4a9b-92d9-fa60e6e7b2f7", "name": "Tanvir", "rate": 20, "salary": 500, "serial": 144, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "parentId": null, "quantity": 10, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-27T06:02:41.671Z", "isDeleted": true, "startDate": null, "updatedAt": "2026-09-27T06:05:07.033Z", "weeklyFood": 0, "phoneNumber": "01407128177", "deleteStatus": "APPROVED", "updateStatus": "APPROVED", "openingBalance": 0, "openingBalanceType": null}], "seasons": [{"id": "c163345e-891d-44db-a77f-1e8ffb3947f3", "name": "2027-2028", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2028-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2027-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "4cdfa224-5f21-443e-99e8-772612f580d1", "name": "2029-2030", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2030-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2029-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "708be09d-ae75-4483-a135-d0b38885d756", "name": "2030-2031", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2031-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2030-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "8cddee02-0ecd-4aa1-b018-0cd612f0de2c", "name": "2032-2033", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2033-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2032-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "6933f02b-eb01-4e7f-8e22-25f324abb3de", "name": "2033-2034", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2034-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2033-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "ece4dfad-974b-454f-9cac-2d5bfb059e58", "name": "2034-2035", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2035-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2034-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "ec7c3a35-a9a7-4cd6-b77c-bd6197ca3757", "name": "2035-2036", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2036-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2035-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "a0c94486-dfbc-4e06-aed6-9e8ad23a3603", "name": "2028-2029", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2029-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2028-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "15be7d7e-c6c0-4d59-9b53-7f72543a5fda", "name": "2025-2026", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2026-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2025-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "9f09a9f4-d737-4154-bbd4-92b3914e358a", "name": "2036-2037", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2037-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2036-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "001d9e9d-046e-4c19-ba47-54046a4c13a0", "name": "2037-2038", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2038-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2037-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "3e777a99-d5e3-424c-a5d3-12a3ef5167c4", "name": "2038-2039", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2039-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2038-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "e3296c76-c34a-45df-9331-2387055bf22b", "name": "2039-2040", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2040-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2039-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "b8b129dd-d5f5-473d-8781-ca1ef3d5ae52", "name": "2031-2032", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2032-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2031-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "ddd1e14a-49d6-4cc2-8b54-14f29d0c5e1c", "name": "2042-2043", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2043-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2042-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "11fdc269-699e-4a88-9092-f8f173bc55ac", "name": "2026-2027", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2027-09-30T23:59:59.999Z", "isActive": true, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2026-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.589Z"}, {"id": "0fd94ce9-0b79-4af9-a0e9-c0a60c2cabfe", "name": "2040-2041", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2041-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2040-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "1569746d-66ba-4914-8433-3a78586969b0", "name": "2041-2042", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2042-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2041-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "5f67edee-4363-4b7d-8e4c-94758acd9cd4", "name": "2043-2044", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2044-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2043-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "31081036-9f35-4af5-8fd2-e48177878a50", "name": "2044-2045", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2045-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2044-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "15ecc883-1074-49ee-a517-ec520d30b71f", "name": "2045-2046", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2046-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2045-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "99070c7e-7dca-4143-8328-22209031440c", "name": "2046-2047", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2047-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2046-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "d55e7197-69b0-407b-8bcb-e3a009b18f6b", "name": "2047-2048", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2048-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2047-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "cadbe032-768a-49f1-9826-626a3f909edd", "name": "2048-2049", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2049-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2048-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}, {"id": "91cccbbc-3978-4537-8679-5b588f1e4a21", "name": "2049-2050", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2050-09-30T23:59:59.999Z", "isActive": false, "createdAt": "2026-09-11T20:26:18.956Z", "startDate": "2049-10-01T00:00:00.000Z", "updatedAt": "2026-09-12T00:10:34.587Z"}], "smsLogs": [], "unloads": [{"id": "c5919f6c-3187-4d82-9cec-59b5877e4304", "date": "2026-09-14T18:45:19.585Z", "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "createdAt": "2026-09-14T18:45:39.787Z", "isDeleted": false, "updatedAt": "2026-09-14T18:45:39.787Z"}, {"id": "4b458839-d57c-4a71-8a7d-161b0e84fffb", "date": "2026-09-25T19:23:50.126Z", "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "createdAt": "2026-09-25T19:23:56.406Z", "isDeleted": false, "updatedAt": "2026-09-25T19:23:56.406Z"}, {"id": "1131892e-04e0-406d-940f-c10a51aaa7c8", "date": "2026-09-28T06:11:40.614Z", "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "createdAt": "2026-09-28T06:11:48.696Z", "isDeleted": false, "updatedAt": "2026-09-28T06:11:48.696Z"}, {"id": "e07e02b9-b11d-4ff2-ad31-639d969a8ad0", "date": "2026-09-29T08:56:29.574Z", "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "createdAt": "2026-09-29T08:56:39.704Z", "isDeleted": false, "updatedAt": "2026-09-29T08:56:39.704Z"}], "weather": [], "carRents": [{"id": "7c32b3ff-17df-455c-aea1-db9ed7165351", "area": "Mirpur 22", "rent": 700, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "গঙ্গাপুর, বোরহানউদ্দিন", "createdAt": "2026-09-30T10:06:01.280Z", "updatedAt": "2026-09-30T10:06:15.943Z", "deleteStatus": "PENDING", "updateStatus": "CANCELLED"}, {"id": "46d3a8e8-d9b1-4bf0-b14f-f1cbb672a58a", "area": "Alomdanga", "rent": 100, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Dhaka Mirpur", "createdAt": "2026-09-30T10:08:02.192Z", "updatedAt": "2026-09-30T10:08:32.030Z", "deleteStatus": "PENDING", "updateStatus": "CANCELLED"}, {"id": "38f37f7d-cc70-48fa-8cc8-839befe51e23", "area": "Baofol", "rent": 0, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Dhaka Mirpur", "createdAt": "2026-09-30T10:09:49.680Z", "updatedAt": "2026-09-30T13:37:05.497Z", "deleteStatus": "CANCELLED", "updateStatus": "PENDING"}], "challans": [{"id": "1372f36c-b803-48cf-b565-99dda2ed63b6", "due": 7500, "cash": 5000, "note": "", "serial": 1, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "carRent": 500, "discount": 0, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T13:41:59.583Z", "isDeleted": false, "updatedAt": "2026-09-28T13:41:59.583Z", "chalanType": "রেগুলার চালান", "customerId": "eaffa5d9-c173-491f-8edf-3981fe4fa6ce", "totalPrice": 12500, "challanDate": "2026-09-28T13:41:26.055Z", "createdById": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "deleteStatus": "DEFAULT", "deliveryDate": "2026-09-27T18:00:00.000Z", "productPrice": 12000, "updateStatus": "DEFAULT", "deliverySeason": null, "duePaymentDate": "2026-09-27T18:00:00.000Z"}, {"id": "f869ac3d-9bed-44b6-afa3-32b877cb07a1", "due": 500, "cash": 12000, "note": "No Note", "serial": 2, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "carRent": 500, "discount": 0, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-10-01T09:36:09.934Z", "isDeleted": false, "updatedAt": "2026-10-01T09:36:09.934Z", "chalanType": "রেগুলার চালান", "customerId": "3c681832-5238-4d39-bafd-3afcb45c6593", "totalPrice": 12500, "challanDate": "2026-10-01T09:35:29.363Z", "createdById": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "deleteStatus": "DEFAULT", "deliveryDate": "2026-09-30T18:00:00.000Z", "productPrice": 12000, "updateStatus": "DEFAULT", "deliverySeason": null, "duePaymentDate": "2026-10-27T18:00:00.000Z"}], "contacts": [{"id": "593ebac1-0e4c-4826-bc7f-0c5504e5b6a4", "name": "Shakib Hasan", "phone": "01760564060", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Barisall", "createdAt": "2026-09-30T09:25:30.619Z", "updatedAt": "2026-09-30T09:55:18.373Z", "occupation": "Student", "deleteStatus": "PENDING", "updateStatus": "APPROVED"}, {"id": "28b8de1b-9065-4513-afdd-a7fddc6b827e", "name": "Mahbubul Hasan", "phone": "01760564065", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Barisal", "createdAt": "2026-09-30T10:13:28.658Z", "updatedAt": "2026-09-30T10:13:45.916Z", "occupation": "w", "deleteStatus": "PENDING", "updateStatus": "CANCELLED"}, {"id": "75608cdb-3a50-4c74-81c2-09e1b3200db5", "name": "tre", "phone": "01760564065", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "tert", "createdAt": "2026-09-30T13:37:41.345Z", "updatedAt": "2026-09-30T13:39:39.134Z", "occupation": "Studentt", "deleteStatus": "CANCELLED", "updateStatus": "PENDING"}], "payments": [{"id": "e1aef544-6b78-4954-be63-e1092b3f8040", "rate": 4, "serial": 13, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Chudanga", "cutting": 0, "payment": 2500, "document": null, "ledgerId": "e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda", "quantity": 500, "createdAt": "2026-09-26T11:12:15.077Z", "isDeleted": false, "totalBill": 2000, "updatedAt": "2026-09-27T09:06:36.112Z", "paymentDate": "2026-09-26T11:12:15.077Z", "paymentType": "অগ্রিম পেমেন্ট", "deleteStatus": "DEFAULT", "updateStatus": "APPROVED", "paymentDetails": "test", "paymentDifference": 500}, {"id": "2812e35d-0f78-4011-aea5-fb5df2143cf1", "rate": 40, "serial": 14, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": null, "cutting": 0, "payment": 20000, "document": null, "ledgerId": "e8a4a7dc-eb2a-4955-a5c9-ea243aa77cda", "quantity": 500, "createdAt": "2026-09-26T11:21:56.774Z", "isDeleted": false, "totalBill": 20000, "updatedAt": "2026-09-27T09:14:55.445Z", "paymentDate": "2026-09-26T11:21:56.774Z", "paymentType": "বাকি পেমেন্ট", "deleteStatus": "DEFAULT", "updateStatus": "APPROVED", "paymentDetails": "পেমেন্টের বিস্তারিত বর্ণনা লিখুন", "paymentDifference": 0}, {"id": "6c8dfd55-1586-48bf-92a5-79670e8af15c", "rate": 0, "serial": 11, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "গঙ্গাপুর, বোরহানউদ্দিন", "cutting": 0, "payment": 25000, "document": null, "ledgerId": "7a92bd48-b266-4c55-82f7-badae656de94", "quantity": 0, "createdAt": "2026-09-25T13:33:34.840Z", "isDeleted": true, "totalBill": 0, "updatedAt": "2026-09-26T11:11:44.561Z", "paymentDate": "2026-09-25T13:33:34.840Z", "paymentType": "অগ্রিম পেমেন্ট", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "paymentDetails": "beton", "paymentDifference": 0}, {"id": "64d96eb9-6fd8-4e14-adb0-aceddd725c22", "rate": 500, "serial": 10, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "গঙ্গাপুর, বোরহানউদ্দিন", "cutting": 0, "payment": 15000, "document": null, "ledgerId": "7a92bd48-b266-4c55-82f7-badae656de94", "quantity": 30, "createdAt": "2026-09-25T10:38:16.390Z", "isDeleted": true, "totalBill": 15000, "updatedAt": "2026-09-27T09:04:49.868Z", "paymentDate": "2026-09-25T10:38:16.390Z", "paymentType": "রেগুলার পেমেন্ট", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "paymentDetails": "বেতন", "paymentDifference": 0}, {"id": "d551694f-3a37-4bef-86f2-e65f54554501", "rate": 500, "serial": 12, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "হিলালিপাড়া,কাটাবাড়ি,গোবিন্দগঞ্জ", "cutting": 0, "payment": 10000, "document": null, "ledgerId": "7a92bd48-b266-4c55-82f7-badae656de94", "quantity": 30, "createdAt": "2026-09-26T05:47:06.698Z", "isDeleted": true, "totalBill": 15000, "updatedAt": "2026-09-27T09:45:49.185Z", "paymentDate": "2026-09-26T05:47:06.698Z", "paymentType": "রেগুলার পেমেন্ট", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT", "paymentDetails": "পেমেন্টের বিস্তারিত বর্ণনা লিখুন", "paymentDifference": -5000}, {"id": "1d35e32b-9002-4c6a-9736-3a63e70d53f7", "rate": 500, "serial": 15, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "হিলালিপাড়া,কাটাবাড়ি,গোবিন্দগঞ্জ", "cutting": 0, "payment": 15000, "document": null, "ledgerId": "7a92bd48-b266-4c55-82f7-badae656de94", "quantity": 30, "createdAt": "2026-10-15T05:42:07.280Z", "isDeleted": false, "totalBill": 15000, "updatedAt": "2026-10-15T05:42:07.280Z", "paymentDate": "2026-10-15T05:42:07.280Z", "paymentType": "রেগুলার পেমেন্ট", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "paymentDetails": "পেমেন্টের বিস্তারিত বর্ণনা লিখুন", "paymentDifference": 0}], "products": [], "vataCars": [{"id": "cb1bd3ea-c34f-4327-b413-7f52bc62855b", "carNo": "1", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-13T03:41:18.813Z", "updatedAt": "2026-09-13T03:41:18.813Z"}], "customers": [{"id": "eaffa5d9-c173-491f-8edf-3981fe4fa6ce", "name": "Tanvir", "note": "", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Dhaka Mirpur", "createdAt": "2026-09-12T03:48:46.369Z", "isDeleted": false, "updatedAt": "2026-09-28T17:12:37.339Z", "phoneNumber": "01407128177", "customerCode": "001", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "nextPaymentDate": "2026-09-30T18:00:00.000Z"}, {"id": "fb7aa1b7-935a-4635-8c7d-b778e9cdf0a4", "name": "Ahosun", "note": "", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Chuadanga", "createdAt": "2026-09-12T01:43:25.977Z", "isDeleted": false, "updatedAt": "2026-09-28T13:34:31.902Z", "phoneNumber": "01407128179", "customerCode": "002", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT", "nextPaymentDate": "2026-09-27T18:00:00.000Z"}, {"id": "3c681832-5238-4d39-bafd-3afcb45c6593", "name": "ইমরান হোসেন", "note": "", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "চরবাটা", "createdAt": "2026-09-22T17:10:27.882Z", "isDeleted": false, "updatedAt": "2026-10-01T09:36:09.926Z", "phoneNumber": "01407128100", "customerCode": "003", "deleteStatus": "DEFAULT", "updateStatus": "APPROVED", "nextPaymentDate": "2026-10-27T18:00:00.000Z"}, {"id": "2efd6f5d-d726-4608-9196-9ecea6bfb961", "name": "Mredull", "note": null, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Dhaka Mirpur", "createdAt": "2026-09-25T16:44:36.154Z", "isDeleted": false, "updatedAt": "2026-10-01T06:04:25.568Z", "phoneNumber": "01407128155", "customerCode": "004", "deleteStatus": "DEFAULT", "updateStatus": "PENDING", "nextPaymentDate": "2026-09-25T18:00:00.000Z"}], "documents": [{"id": "cmtyt6rq100005cul7e4hp6vo", "name": "chalan-1788949309884-1789243172525-546405515.pdf", "size": "122762", "type": "FILE", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "fileKey": "", "fileUrl": "", "mimeType": "application/pdf", "parentId": null, "createdAt": "2026-09-12T19:59:32.569Z", "extension": "pdf", "updatedAt": "2026-09-12T19:59:32.569Z"}], "loadInfos": [{"id": "3ef54b97-bf24-4a16-a2f1-576ec612dba6", "date": "2026-09-13T03:25:46.150Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 2000, "createdAt": "2026-09-13T03:25:57.703Z", "isDeleted": false, "updatedAt": "2026-09-13T03:25:57.703Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "43f8fd5e-f0c9-458a-8e8f-8ecf4b74904e", "date": "2026-09-14T18:43:30.305Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 5000, "createdAt": "2026-09-14T18:43:36.533Z", "isDeleted": false, "updatedAt": "2026-09-14T18:43:36.533Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "e3042834-df70-4fa4-afd3-46ee026a932b", "date": "2026-09-14T18:43:38.619Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 5000, "createdAt": "2026-09-14T18:43:44.293Z", "isDeleted": false, "updatedAt": "2026-09-14T18:43:44.293Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "866b2ac2-9d24-4111-9931-45e475ed9f7b", "date": "2026-09-14T18:43:45.492Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "FIELD_TO_CHULLI", "quantity": 2000, "createdAt": "2026-09-14T18:44:00.675Z", "isDeleted": false, "updatedAt": "2026-09-14T18:44:00.675Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "16211b9b-4fb2-44cf-820d-f970fe1f9108", "date": "2026-09-14T18:44:06.116Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "FIELD_TO_CHULLI", "quantity": 2000, "createdAt": "2026-09-14T18:44:15.866Z", "isDeleted": false, "updatedAt": "2026-09-14T18:44:15.866Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "9b4ae506-2737-4583-9204-d18b7f676fc3", "date": "2026-09-28T06:09:33.336Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 10000, "createdAt": "2026-09-28T06:09:40.473Z", "isDeleted": false, "updatedAt": "2026-09-28T06:09:40.473Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "9e1f2af4-2a02-4099-b67e-b222139b8960", "date": "2026-09-28T06:09:42.389Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 10000, "createdAt": "2026-09-28T06:09:48.192Z", "isDeleted": false, "updatedAt": "2026-09-28T06:09:48.192Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "2384fca8-03fd-4d7c-b2bd-e134c2017212", "date": "2026-09-28T06:09:50.152Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "FIELD_TO_CHULLI", "quantity": 1000, "createdAt": "2026-09-28T06:09:55.872Z", "isDeleted": false, "updatedAt": "2026-09-28T06:09:55.872Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "dbdfdb76-0688-4949-931b-b8c8e28a6687", "date": "2026-09-28T06:10:16.192Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 2000, "createdAt": "2026-09-28T06:10:27.848Z", "isDeleted": false, "updatedAt": "2026-09-28T06:10:27.848Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "dac74cb2-972f-4b86-bed9-a81498c7cebb", "date": "2026-09-28T06:11:06.463Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "FIELD_TO_CHULLI", "quantity": 12000, "createdAt": "2026-09-28T06:11:18.545Z", "isDeleted": false, "updatedAt": "2026-09-28T06:11:18.545Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "79314ff8-3ea7-49f1-b77c-bcc6b1e12468", "date": "2026-09-29T05:02:46.515Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 2000, "createdAt": "2026-09-29T05:02:52.898Z", "isDeleted": true, "updatedAt": "2026-09-29T05:03:06.381Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "28da05b1-b71d-4eca-8acb-101803f1c7af", "date": "2026-09-29T05:22:00.890Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 2000, "createdAt": "2026-09-29T05:22:06.332Z", "isDeleted": true, "updatedAt": "2026-09-29T05:22:14.163Z", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "9f4318ab-e3c3-4f21-b41a-83877d40cc75", "date": "2026-09-29T06:14:58.591Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 4000, "createdAt": "2026-09-29T06:15:07.014Z", "isDeleted": true, "updatedAt": "2026-09-29T06:22:06.107Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c", "date": "2026-09-29T06:25:37.024Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 800, "createdAt": "2026-09-29T06:25:44.504Z", "isDeleted": true, "updatedAt": "2026-09-29T06:28:23.296Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "53dc21af-9227-476a-b8d4-45a311fe09e4", "date": "2026-09-29T06:28:37.884Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 200, "createdAt": "2026-09-29T06:28:45.792Z", "isDeleted": true, "updatedAt": "2026-09-29T06:32:31.841Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "f58ceca0-b1cc-4b62-bf90-f83cf30186b2", "date": "2026-09-29T06:36:07.105Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 400, "createdAt": "2026-09-29T06:36:15.763Z", "isDeleted": false, "updatedAt": "2026-09-29T06:36:15.763Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "date": "2026-09-29T05:47:26.001Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 900, "createdAt": "2026-09-29T05:47:31.173Z", "isDeleted": true, "updatedAt": "2026-09-29T05:58:14.849Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "date": "2026-09-29T05:41:25.507Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 1500, "createdAt": "2026-09-29T05:41:30.759Z", "isDeleted": true, "updatedAt": "2026-09-29T05:58:29.630Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "c57535df-9cb2-4333-863b-ff9fdcfe85d0", "date": "2026-09-29T05:34:12.490Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 2000, "createdAt": "2026-09-29T05:34:19.451Z", "isDeleted": true, "updatedAt": "2026-09-29T05:58:32.923Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "15716b3b-c8b4-4418-866e-63ecd00d0876", "date": "2026-09-29T05:27:03.890Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 2000, "createdAt": "2026-09-29T05:27:13.480Z", "isDeleted": true, "updatedAt": "2026-09-29T05:58:36.753Z", "deleteStatus": "APPROVED", "updateStatus": "PENDING"}, {"id": "419addd1-d8b2-4417-a1bb-2c6dcb041313", "date": "2026-09-29T06:36:19.358Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 200, "createdAt": "2026-09-29T06:36:27.114Z", "isDeleted": true, "updatedAt": "2026-09-29T06:38:02.482Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "0f21b7e4-1b75-4edc-9e1d-b4367e2f73b4", "date": "2026-09-29T08:54:10.448Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 400, "createdAt": "2026-09-29T08:54:18.611Z", "isDeleted": false, "updatedAt": "2026-09-29T08:54:18.611Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "f3dde422-92b4-4d7e-86a3-9803b09e9389", "date": "2026-09-29T06:01:01.139Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 500, "createdAt": "2026-09-29T06:01:06.826Z", "isDeleted": true, "updatedAt": "2026-09-29T06:11:16.324Z", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "3ad60744-a358-4664-ab6c-321065757416", "date": "2026-09-29T08:54:22.816Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 200, "createdAt": "2026-09-29T08:54:27.616Z", "isDeleted": true, "updatedAt": "2026-09-29T08:54:48.723Z", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "20cf4471-03a0-4123-b4ac-12443ff44862", "date": "2026-09-29T08:55:55.647Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 6000, "createdAt": "2026-09-29T08:56:06.537Z", "isDeleted": false, "updatedAt": "2026-09-29T08:56:06.537Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "2da5f853-442e-4d10-9c30-d256b628531f", "date": "2026-09-29T08:56:10.079Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAW_TO_FIELD", "quantity": 6000, "createdAt": "2026-09-29T08:56:17.856Z", "isDeleted": false, "updatedAt": "2026-09-29T08:56:17.856Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "eb0f1d61-41f1-4d0b-96f2-8725191c4840", "date": "2026-09-29T08:56:19.592Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "FIELD_TO_CHULLI", "quantity": 5000, "createdAt": "2026-09-29T08:56:25.674Z", "isDeleted": false, "updatedAt": "2026-09-29T08:56:25.674Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "2ad8ee4e-105a-4316-bc83-3781af672439", "date": "2026-09-29T11:36:03.333Z", "classId": null, "roundId": "3f55423d-5264-4ddd-b0b6-1eed321e0efc", "loadType": "RAWENTRY", "quantity": 500, "createdAt": "2026-09-29T11:36:08.677Z", "isDeleted": false, "updatedAt": "2026-09-29T11:36:32.230Z", "deleteStatus": "DEFAULT", "updateStatus": "CANCELLED"}], "smsWallet": [], "deliveries": [], "stockBooks": [{"id": "6a115e53-9d6e-429e-929d-396da522d80f", "class": "রাবিস", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "stockIn": 500, "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "stockOut": 0, "createdAt": "2026-10-01T04:14:03.567Z", "isDeleted": false, "updatedAt": "2026-10-01T04:14:03.567Z", "createdById": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "description": "ছোট ভাটার জন্য প্রাথমিক ফিচারসহ ফ্রি প্ল্যান", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}], "goodsIssues": [], "goodsLosses": [], "goodsStocks": [], "unloadItems": [{"id": "0a731701-6cca-4878-9286-3f54573f2374", "classId": "9db43bd9-3b8a-488a-ba03-a5865ecd89cd", "damaged": 0, "quantity": 2000, "unloadId": "c5919f6c-3187-4d82-9cec-59b5877e4304", "createdAt": "2026-09-14T18:45:39.827Z", "updatedAt": "2026-09-14T18:45:39.827Z"}, {"id": "dde74378-9676-4735-b178-22d56d2496af", "classId": "9db43bd9-3b8a-488a-ba03-a5865ecd89cd", "damaged": 0, "quantity": 1000, "unloadId": "4b458839-d57c-4a71-8a7d-161b0e84fffb", "createdAt": "2026-09-25T19:23:56.420Z", "updatedAt": "2026-09-25T19:23:56.420Z"}, {"id": "9542a7d2-3353-4638-a189-f0168620da03", "classId": "2f5a4ddf-115b-4512-806e-feef2e9288d4", "damaged": 0, "quantity": 2000, "unloadId": "1131892e-04e0-406d-940f-c10a51aaa7c8", "createdAt": "2026-09-28T06:11:48.713Z", "updatedAt": "2026-09-28T06:11:48.713Z"}, {"id": "debc36e0-2919-456d-a04b-ebe215d614ca", "classId": "8d61abf5-2887-4491-bec0-2661e692bead", "damaged": 0, "quantity": 2000, "unloadId": "1131892e-04e0-406d-940f-c10a51aaa7c8", "createdAt": "2026-09-28T06:15:23.244Z", "updatedAt": "2026-09-28T06:15:23.244Z"}, {"id": "1b86aa93-8a50-4f57-ad49-bdfb405051ea", "classId": "b79bc63f-0a08-4ed8-84c9-811575c68b61", "damaged": 0, "quantity": 2000, "unloadId": "1131892e-04e0-406d-940f-c10a51aaa7c8", "createdAt": "2026-09-28T06:15:39.966Z", "updatedAt": "2026-09-28T06:15:39.966Z"}, {"id": "edb6b152-37fa-4f83-9c12-0d953d1b6965", "classId": "d5aeaa43-0197-4247-834d-4919cddb6b28", "damaged": 0, "quantity": 1000, "unloadId": "1131892e-04e0-406d-940f-c10a51aaa7c8", "createdAt": "2026-09-28T06:15:47.927Z", "updatedAt": "2026-09-28T06:15:47.927Z"}, {"id": "e51ca7fe-9459-42d4-aa06-acfb5bce29fd", "classId": "2f5a4ddf-115b-4512-806e-feef2e9288d4", "damaged": 0, "quantity": 100, "unloadId": "e07e02b9-b11d-4ff2-ad31-639d969a8ad0", "createdAt": "2026-09-29T08:56:39.727Z", "updatedAt": "2026-09-29T08:57:28.438Z"}], "activityLogs": [{"id": "cmulotpjm0000x8ulrcovgwp8", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:16:06.802Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"8000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmum3m4of0003vsuljjbguuou", "action": "DELETE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-29T03:10:07.407Z", "isDeleted": false, "description": "ক্যাশ #Mursalin Vao এর 8000 টাকা ক্যাশ ইন মুছে ফেলা হয়েছে।"}, {"id": "cmum960aa0000dkul45kp2dm0", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "c57535df-9cb2-4333-863b-ff9fdcfe85d0", "createdAt": "2026-09-29T05:45:32.914Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের পরিমাণ 200 থেকে 2000 পরিবর্তন করা হয়েছে।"}, {"id": "cmum96idl0001dkul9q07d5qc", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:45:56.361Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের পরিমাণ 200 থেকে 2000 পরিবর্তন করা হয়েছে।"}, {"id": "cmum97dla0003dkulr7oc90tv", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:46:36.814Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের পরিমাণ 2000 থেকে 1500 পরিবর্তন করা হয়েছে।"}, {"id": "cmumgqbtn000014ulbk5r3990", "action": "UPDATE", "module": "GOODS_STOCK_CATEGORY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "fb147b3c-b96e-488d-b625-bb84647886a0", "createdAt": "2026-09-29T09:17:18.299Z", "isDeleted": false, "description": "পণ্য স্টক ক্যাটাগরি এর ক্যাটাগরির নাম Mursalin থেকে Mursalinn পরিবর্তন করা হয়েছে।"}, {"id": "cmumgqlts000114ull91kr7xw", "action": "DELETE", "module": "GOODS_STOCK_CATEGORY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "fb147b3c-b96e-488d-b625-bb84647886a0", "createdAt": "2026-09-29T09:17:31.264Z", "isDeleted": false, "description": "পণ্য স্টক ক্যাটাগরি মুছে ফেলা হয়েছে।"}, {"id": "cmumgs0gn0000f4ulseh6b5oh", "action": "DELETE", "module": "GOODS_STOCK_CATEGORY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "9fa5234f-59a6-40be-b0e2-a43529c3c49c", "createdAt": "2026-09-29T09:18:36.887Z", "isDeleted": false, "description": "পণ্য স্টক ক্যাটাগরি #Tanvir মুছে ফেলা হয়েছে।"}, {"id": "cmumgw8d800018wul3elo0zu1", "action": "UPDATE", "module": "GOODS_STOCK_CATEGORY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "534d9437-ad31-4640-a2e2-3217b4412d6f", "createdAt": "2026-09-29T09:21:53.756Z", "isDeleted": false, "description": "পণ্য স্টক ক্যাটাগরি এর ক্যাটাগরির নাম Mursalin থেকে Mursalinn পরিবর্তন করা হয়েছে।"}, {"id": "cmumgxyf400038wulmxsmywnz", "action": "DELETE", "module": "GOODS_STOCK_CATEGORY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "05d84354-ea44-4657-8acd-c0a4c31622e4", "createdAt": "2026-09-29T09:23:14.176Z", "isDeleted": false, "description": "পণ্য স্টক ক্যাটাগরি #Mursalins মুছে ফেলা হয়েছে।"}, {"id": "cmunwgukq0000mkul6inblfan", "action": "UPDATE", "module": "CONTACT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "593ebac1-0e4c-4826-bc7f-0c5504e5b6a4", "createdAt": "2026-09-30T09:25:36.074Z", "isDeleted": false, "description": "যোগাযোগ #Shakib Hasan এর কন্টাক্টের ঠিকানা Barisal থেকে Barisall পরিবর্তন করা হয়েছে।"}, {"id": "cmunwuv6b0002mkul3xgwqgx4", "action": "UPDATE", "module": "CONTACT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "593ebac1-0e4c-4826-bc7f-0c5504e5b6a4", "createdAt": "2026-09-30T09:36:30.035Z", "isDeleted": false, "description": "যোগাযোগ #Shakib Hasan এর মোবাইল নম্বর 01760564065 থেকে 01760564060 পরিবর্তন করা হয়েছে।"}, {"id": "cmunwvdej0003mkulqgpz2f3l", "action": "UPDATE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f575a0fa-6f73-4478-bfb3-6c76c16159e2", "createdAt": "2026-09-30T09:36:53.659Z", "isDeleted": false, "description": "ড্রাইভার #Shakib Hasan এর ড্রাইভারের বেতন \\"0\\" থেকে 1500 পরিবর্তন করা হয়েছে।"}, {"id": "cmunww7240004mkulrqrdww5u", "action": "UPDATE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f575a0fa-6f73-4478-bfb3-6c76c16159e2", "createdAt": "2026-09-30T09:37:32.092Z", "isDeleted": false, "description": "ড্রাইভার #Shakib Hasan এর ড্রাইভারের বেতন \\"1500\\" থেকে 10000 পরিবর্তন করা হয়েছে।"}, {"id": "cmunwwr510006mkulphml8jpa", "action": "UPDATE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f575a0fa-6f73-4478-bfb3-6c76c16159e2", "createdAt": "2026-09-30T09:37:58.117Z", "isDeleted": false, "description": "ড্রাইভার #Shakib Hasan এর ড্রাইভারের বেতন \\"10000\\" থেকে 12000 পরিবর্তন করা হয়েছে।"}, {"id": "cmunwx6c80007mkuldkbs8ixk", "action": "DELETE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f575a0fa-6f73-4478-bfb3-6c76c16159e2", "createdAt": "2026-09-30T09:38:17.816Z", "isDeleted": false, "description": "ড্রাইভার #Shakib Hasan মুছে ফেলা হয়েছে।"}, {"id": "cmunwzvpx0008mkulb9p2vwox", "action": "DELETE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "5370e75b-b086-498d-8503-76d50eb6fed8", "createdAt": "2026-09-30T09:40:24.021Z", "isDeleted": false, "description": "ড্রাইভার #অন্তু ম্যানেজার মুছে ফেলা হয়েছে।"}, {"id": "cmunx19aq0009mkulxgd2a36q", "action": "DELETE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "feb4406a-7895-44d3-b481-2264cc185f7a", "createdAt": "2026-09-30T09:41:28.274Z", "isDeleted": false, "description": "ড্রাইভার #Ahosun মুছে ফেলা হয়েছে।"}, {"id": "cmunx7uxt000220ul9y1y7r9e", "action": "DELETE", "module": "DRIVER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "307c2dae-887f-4767-86e6-1883df74dbbd", "createdAt": "2026-09-30T09:46:36.257Z", "isDeleted": false, "description": "ড্রাইভার #Tanvir মুছে ফেলা হয়েছে।"}, {"id": "cmunxpc2v0000hgulxahhrfg3", "action": "DELETE", "module": "CONTACT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "5bc0f659-b449-4a7c-895a-a07155d1624a", "createdAt": "2026-09-30T10:00:11.623Z", "isDeleted": false, "description": "যোগাযোগ মুছে ফেলা হয়েছে।"}, {"id": "cmunxq8os0001hgul5lcq7jv2", "action": "UPDATE", "module": "CAR_RENT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "a37945c0-72ba-4d27-994b-43849884f3a7", "createdAt": "2026-09-30T10:00:53.884Z", "isDeleted": false, "description": "গাড়ি ভাড়া #0 এর এলাকা Mirpur 2 থেকে Mirpur 22 পরিবর্তন করা হয়েছে।"}, {"id": "cmunxqbo00002hgulobwx41hx", "action": "DELETE", "module": "CAR_RENT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "a37945c0-72ba-4d27-994b-43849884f3a7", "createdAt": "2026-09-30T10:00:57.744Z", "isDeleted": false, "description": "গাড়ি ভাড়া #0 মুছে ফেলা হয়েছে।"}, {"id": "cmunxsunn00001culjlz1vp07", "action": "DELETE", "module": "CAR_RENT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "d6a65583-38ff-4ff9-babe-3542594c0104", "createdAt": "2026-09-30T10:02:55.668Z", "isDeleted": false, "description": "গাড়ি ভাড়া #0 মুছে ফেলা হয়েছে।"}, {"id": "cmunxv4vm00021culrgyxaqfl", "action": "UPDATE", "module": "CAR_RENT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "628b2dc8-3223-4468-b3ca-fa321744d2bb", "createdAt": "2026-09-30T10:04:42.226Z", "isDeleted": false, "description": "গাড়ি ভাড়া #900 এর এলাকা Mirpur 2 থেকে Mirpur 22 পরিবর্তন করা হয়েছে।"}, {"id": "cmukvm8i40000nwul54kohcy9", "action": "DELETE", "module": "DELIVERY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "6bcc772e-0473-44ef-b498-449315e3333b", "createdAt": "2026-09-28T06:38:29.260Z", "isDeleted": false, "description": "ডেলিভারি #1 মুছে ফেলা হয়েছে।"}, {"id": "cmukw839c0000doulbel2xqxu", "action": "DELETE", "module": "DELIVERY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "81b0ce8d-a50b-4f39-a7f7-15f3c9cec34d", "createdAt": "2026-09-28T06:55:28.896Z", "isDeleted": false, "description": "ডেলিভারি #2 মুছে ফেলা হয়েছে।"}, {"id": "cmukwwgha0000pcul6g2i0iya", "action": "DELETE", "module": "DELIVERY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "6ba0a2fe-85bb-4bb9-85f0-425f40367f1c", "createdAt": "2026-09-28T07:14:25.774Z", "isDeleted": false, "description": "ডেলিভারি #3 মুছে ফেলা হয়েছে।"}, {"id": "cmukxqnr90000x4ul4p1f7hkc", "action": "DELETE", "module": "DELIVERY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "a70c5c14-7e38-4c35-b1c9-e647a0eb097b", "createdAt": "2026-09-28T07:37:54.885Z", "isDeleted": false, "description": "ডেলিভারি #5 মুছে ফেলা হয়েছে।"}, {"id": "cmuky2evf0001loulr4awn2po", "action": "DELETE", "module": "DELIVERY", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "655fa2b0-1b97-4ae5-aeb3-a789009bdaa1", "createdAt": "2026-09-28T07:47:03.243Z", "isDeleted": false, "description": "ডেলিভারি #7 মুছে ফেলা হয়েছে।"}, {"id": "cmul5db1200017oul0l6erfsy", "action": "UPDATE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "7eb30ccf-aea3-4820-85fe-d25d0c9c8bb1", "createdAt": "2026-09-28T11:11:28.790Z", "isDeleted": false, "description": "বাকি আদায় #কাস্টমার আইডি 001 এর আদায়ের পরিমাণ 500 থেকে 1000, নতুন বাকি 2000 থেকে 1500 পরিবর্তন করা হয়েছে।"}, {"id": "cmul9445o0000s0uljpkcf09z", "action": "DELETE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "7eb30ccf-aea3-4820-85fe-d25d0c9c8bb1", "createdAt": "2026-09-28T12:56:18.444Z", "isDeleted": false, "description": "বাকি আদায় #001 মুছে ফেলা হয়েছে।"}, {"id": "cmul98g1e000098ul4h1jsez1", "action": "DELETE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "0d33fd03-ccd2-46f5-81a2-f2135b95374b", "createdAt": "2026-09-28T12:59:40.466Z", "isDeleted": false, "description": "বাকি আদায় #কাস্টমার আইডি 002 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।"}, {"id": "cmul9swob0000z4ullnk67rmk", "action": "DELETE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "8d6f727e-bc58-40bc-a025-18ca32d0f801", "createdAt": "2026-09-28T13:15:35.147Z", "isDeleted": false, "description": "বাকি আদায় #কাস্টমার আইডি 003 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।"}, {"id": "cmulab9hu0000eoulz6zvib87", "action": "DELETE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "836dd4ce-7c27-4f0d-8a88-5c91dd7b98c8", "createdAt": "2026-09-28T13:29:51.570Z", "isDeleted": false, "description": "বাকি আদায় #কাস্টমার আইডি 002 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।"}, {"id": "cmulajad10000cgulzur4ymum", "action": "DELETE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "ed6907b2-9448-42b2-b9aa-68a633dcb15e", "createdAt": "2026-09-28T13:36:05.941Z", "isDeleted": false, "description": "বাকি আদায় #কাস্টমার আইডি 001 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।"}, {"id": "cmulas9nu0000l8ulj4dnv7rn", "action": "DELETE", "module": "DUE", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "68c7ff3d-f6ce-48fe-94cf-d93c50bcb8af", "createdAt": "2026-09-28T13:43:04.938Z", "isDeleted": false, "description": "বাকি আদায় #কাস্টমার আইডি 001 এর  একটি বাকি আদায়  মুছে ফেলা হয়েছে।"}, {"id": "cmulkfx3y00004oul7sqpmdz3", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "7c4ef35f-57da-4bd5-a776-d25d383302d3", "createdAt": "2026-09-28T18:13:24.958Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"12000\\" থেকে 10000 পরিবর্তন করা হয়েছে।"}, {"id": "cmulnb96z00004gulha9xl85f", "action": "DELETE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "7c4ef35f-57da-4bd5-a776-d25d383302d3", "createdAt": "2026-09-28T19:33:46.187Z", "isDeleted": false, "description": "ক্যাশ #Mursalin Vao মুছে ফেলা হয়েছে।"}, {"id": "cmulobtes00001sulxn6nx9bw", "action": "DELETE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "99b9e83b-6c12-4b7b-8296-732ff328754d", "createdAt": "2026-09-28T20:02:12.004Z", "isDeleted": false, "description": "ক্যাশ #Fakhar মুছে ফেলা হয়েছে।"}, {"id": "cmulol3w50000zsul1llehfen", "action": "DELETE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f4fbf8ca-e95c-4b53-96c2-2b3b2dfd3aec", "createdAt": "2026-09-28T20:09:25.493Z", "isDeleted": false, "description": "ক্যাশ #Tanvir এর 700 টাকা ক্যাশ ইন মুছে ফেলা হয়েছে।"}, {"id": "cmuloqtyt0000houl3btjqlvg", "action": "DELETE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "99edea6b-e91d-43cf-a5bd-0496412b569e", "createdAt": "2026-09-28T20:13:52.566Z", "isDeleted": false, "description": "ক্যাশ #sabbir এর 1200 টাকা ক্যাশ ইন মুছে ফেলা হয়েছে।"}, {"id": "cmulorlck0001houlcvbyqzov", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:14:28.052Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"8000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmulos8hs0002houl0kxwwtjt", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:14:58.049Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"8000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmulov8870000a4ul1omrwjhk", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:17:17.671Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"8000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmulowr85000074ulzklcohd5", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:18:28.950Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"8000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmuloxduf0000o8ulqh0jhr5o", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:18:58.263Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"8000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmulp3ktj00001gulod2h2hhv", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-28T20:23:47.239Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের বিবরণ . থেকে hoio, ক্যাশের পরিমাণ \\"9000\\" থেকে 9000 পরিবর্তন করা হয়েছে।"}, {"id": "cmum3klmd0001vsulhgnb2lc7", "action": "UPDATE", "module": "CASH", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-29T03:08:56.053Z", "isDeleted": false, "description": "ক্যাশ এর ক্যাশের পরিমাণ \\"9000\\" থেকে 8000 পরিবর্তন করা হয়েছে।"}, {"id": "cmum8c1070000igulbpa4ucx0", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "28da05b1-b71d-4eca-8acb-101803f1c7af", "createdAt": "2026-09-29T05:22:14.167Z", "isDeleted": false, "description": "লোড তথ্য মুছে ফেলা হয়েছে।"}, {"id": "cmum97xy80005dkul7f6ajzvs", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:47:03.200Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের ধরন কাঁচা ইট এন্ট্রি থেকে কাঁচা ইট মাঠে পরিবর্তন করা হয়েছে।"}, {"id": "cmum9d48t0008dkulh7dfzfs8", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:51:04.637Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের পরিমাণ 100 থেকে 1000 পরিবর্তন করা হয়েছে।"}, {"id": "cmum9gq3t0000dsula9vqzewz", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:53:52.937Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের ধরন কাঁচা ইট এন্ট্রি থেকে কাঁচা ইট মাঠে, লোডের পরিমাণ 1000 থেকে 1200 পরিবর্তন করা হয়েছে।"}, {"id": "cmum9jmsn00003oul2yuuk76e", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:56:08.615Z", "isDeleted": false, "description": "লোড তথ্য এর লোডের পরিমাণ 1200 থেকে 1100 পরিবর্তন করা হয়েছে।"}, {"id": "cmum9l3hi0000fsulc9ivj5bm", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:57:16.902Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট মাঠে এর লোডের পরিমাণ 1100 থেকে 0 পরিবর্তন করা হয়েছে।"}, {"id": "cmum9l8da0001fsulnfscgwhp", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:57:23.230Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট মাঠে এর লোডের পরিমাণ 0 থেকে 900 পরিবর্তন করা হয়েছে।"}, {"id": "cmum9mc780002fsulm83824dj", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:58:14.852Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট মাঠে 900 মুছে ফেলা হয়েছে।"}, {"id": "cmum9mnls0003fsulgn0yc7al", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:58:29.632Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট মাঠে 1500 মুছে ফেলা হয়েছে।"}, {"id": "cmum9mq580004fsuleg778vv1", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "c57535df-9cb2-4333-863b-ff9fdcfe85d0", "createdAt": "2026-09-29T05:58:32.924Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 2000 মুছে ফেলা হয়েছে।"}, {"id": "cmum9mt3l0005fsul0qduna5f", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "15716b3b-c8b4-4418-866e-63ecd00d0876", "createdAt": "2026-09-29T05:58:36.753Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 2000 মুছে ফেলা হয়েছে।"}, {"id": "cmuma1lg70001igulfmgxz37v", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f3dde422-92b4-4d7e-86a3-9803b09e9389", "createdAt": "2026-09-29T06:10:06.680Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 500 মুছে ফেলা হয়েছে।"}, {"id": "cmuma336u0002iguly45wwapg", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "f3dde422-92b4-4d7e-86a3-9803b09e9389", "createdAt": "2026-09-29T06:11:16.326Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 500 মুছে ফেলা হয়েছে।"}, {"id": "cmumaa0p10004iguliwe0bs3d", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "9f4318ab-e3c3-4f21-b41a-83877d40cc75", "createdAt": "2026-09-29T06:16:39.685Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 500 থেকে 5000 পরিবর্তন করা হয়েছে।"}, {"id": "cmumaeqne0005igulksc40aub", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "9f4318ab-e3c3-4f21-b41a-83877d40cc75", "createdAt": "2026-09-29T06:20:19.947Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 5000 থেকে 4000 পরিবর্তন করা হয়েছে।"}, {"id": "cmumah0kf0006igulmaow5byg", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "9f4318ab-e3c3-4f21-b41a-83877d40cc75", "createdAt": "2026-09-29T06:22:06.111Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 4000 মুছে ফেলা হয়েছে।"}, {"id": "cmumamjdc000198ulnxy97gs8", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c", "createdAt": "2026-09-29T06:26:23.760Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 500 থেকে 600 পরিবর্তন করা হয়েছে।"}, {"id": "cmumane9o000298ulacla8ocm", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c", "createdAt": "2026-09-29T06:27:03.804Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 600 থেকে 800 পরিবর্তন করা হয়েছে।"}, {"id": "cmumap3lw000398ulur79ctxq", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c", "createdAt": "2026-09-29T06:28:23.300Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 800 মুছে ফেলা হয়েছে।"}, {"id": "cmumass8n000180ul0eph3ld5", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "53dc21af-9227-476a-b8d4-45a311fe09e4", "createdAt": "2026-09-29T06:31:15.191Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 100 থেকে 200 পরিবর্তন করা হয়েছে।"}, {"id": "cmumaufdw000380ulk8dxdy5n", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "53dc21af-9227-476a-b8d4-45a311fe09e4", "createdAt": "2026-09-29T06:32:31.844Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 200 মুছে ফেলা হয়েছে।"}, {"id": "cmumb08le000580ul7iecqplj", "action": "UPDATE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "419addd1-d8b2-4417-a1bb-2c6dcb041313", "createdAt": "2026-09-29T06:37:02.978Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি এর লোডের পরিমাণ 100 থেকে 200 পরিবর্তন করা হয়েছে।"}, {"id": "cmumb1iib000780ulq7056kcl", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "419addd1-d8b2-4417-a1bb-2c6dcb041313", "createdAt": "2026-09-29T06:38:02.483Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট এন্ট্রি 200 মুছে ফেলা হয়েছে।"}, {"id": "cmumfxehh000880ul8uhsadg6", "action": "DELETE", "module": "LOAD_INFO", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "3ad60744-a358-4664-ab6c-321065757416", "createdAt": "2026-09-29T08:54:48.725Z", "isDeleted": false, "description": "লোড তথ্য #কাঁচা ইট মাঠে 200 মুছে ফেলা হয়েছে।"}, {"id": "cmunxwch400051culvzrgnhuf", "action": "DELETE", "module": "CAR_RENT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "628b2dc8-3223-4468-b3ca-fa321744d2bb", "createdAt": "2026-09-30T10:05:38.728Z", "isDeleted": false, "description": "গাড়ি ভাড়া #900 মুছে ফেলা হয়েছে।"}, {"id": "cmuny18a40001vsuln4mf1nve", "action": "DELETE", "module": "CAR_RENT", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "70f00eff-b827-41d8-8501-ca491ce52266", "createdAt": "2026-09-30T10:09:26.572Z", "isDeleted": false, "description": "গাড়ি ভাড়া #509 মুছে ফেলা হয়েছে।"}, {"id": "cmup0s79z00003wul7u1skqgb", "action": "DELETE", "module": "STOCK", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "d1d3d5d7-211d-4973-9ecf-1d1e645e9a65", "createdAt": "2026-10-01T04:14:10.391Z", "isDeleted": false, "description": "স্টক #পিকেট মুছে ফেলা হয়েছে।"}, {"id": "cmup2op2v0002wculcxududxx", "action": "DELETE", "module": "STOCK", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "9fb05ae3-312c-494c-b0ce-9e7fcff1c346", "createdAt": "2026-10-01T05:07:26.071Z", "isDeleted": false, "description": "স্টক #পিকেট | ইন: 700 | আউট: 0 মুছে ফেলা হয়েছে।"}, {"id": "cmup46iid00006ouly2wgrysg", "action": "UPDATE", "module": "CUSTOMER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "004", "createdAt": "2026-10-01T05:49:16.981Z", "isDeleted": false, "description": "কাস্টমার \\"Mredull\\" এর কাস্টমারের নাম Mredul থেকে Mredull পরিবর্তন করা হয়েছে।"}, {"id": "cmup4og760001bsulr1j4b3zu", "action": "UPDATE", "module": "CUSTOMER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "004", "createdAt": "2026-10-01T06:03:13.794Z", "isDeleted": false, "description": "কাস্টমার \\"Mredull\\" আপডেট করা হয়েছে।"}, {"id": "cmup4p5h40002bsul3vrdgtdi", "action": "UPDATE", "module": "CUSTOMER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "003", "createdAt": "2026-10-01T06:03:46.552Z", "isDeleted": false, "description": "কাস্টমার \\"ইমরান হোসেনn\\" এর কাস্টমারের নাম ইমরান হোসেন থেকে ইমরান হোসেনn পরিবর্তন করা হয়েছে।"}, {"id": "cmup4pl970004bsul99xqovtl", "action": "UPDATE", "module": "CUSTOMER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "003", "createdAt": "2026-10-01T06:04:07.004Z", "isDeleted": false, "description": "কাস্টমার \\"ইমরান হোসেন\\" এর কাস্টমারের নাম ইমরান হোসেনn থেকে ইমরান হোসেন পরিবর্তন করা হয়েছে।"}, {"id": "cmup4w4ws0001q8ulmn70n0ir", "action": "UPDATE", "module": "CUSTOMER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "003", "createdAt": "2026-10-01T06:09:12.412Z", "isDeleted": false, "description": "কাস্টমার \\"ইমরান হোসেন\\" এর কাস্টমারের ঠিকানা চরবাটা থেকে চরবাটা5 পরিবর্তন করা হয়েছে।"}, {"id": "cmup4xjpg0005q8ul79wle558", "action": "UPDATE", "module": "CUSTOMER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "003", "createdAt": "2026-10-01T06:10:18.244Z", "isDeleted": false, "description": "কাস্টমার \\"ইমরান হোসেন\\" এর কাস্টমারের ঠিকানা চরবাটা5 থেকে চরবাটা পরিবর্তন করা হয়েছে।"}, {"id": "cmupbyvqy0000a4ultlv7uly6", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "createdAt": "2026-10-01T09:27:17.819Z", "isDeleted": false, "description": "ইউজার এর ইউজারের নাম  আব্দুর রহমান থেকে  আব্দুর রহমানt পরিবর্তন করা হয়েছে।"}, {"id": "cmupc0dek000080ulpxywfh7u", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "createdAt": "2026-10-01T09:28:27.356Z", "isDeleted": false, "description": "ইউজার # আব্দুর রহমানt এর ইউজারের নাম  আব্দুর রহমানt থেকে  আব্দুর রহমান পরিবর্তন করা হয়েছে।"}, {"id": "cmupc258t000380ul1gbeqgi2", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-01T09:29:50.093Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইউজারের নাম Suvash Babu থেকে Suvash Babu 5\\\\ পরিবর্তন করা হয়েছে।"}, {"id": "cmupc2gc7000580ul9ny97cpx", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-01T09:30:04.471Z", "isDeleted": false, "description": "ইউজার #Suvash Babu 5\\\\ এর ইউজারের নাম Suvash Babu 5\\\\ থেকে Suvash Babu পরিবর্তন করা হয়েছে।"}, {"id": "cmupcecw0000880ulhtpk4ha3", "action": "DELETE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "createdAt": "2026-10-01T09:39:19.872Z", "isDeleted": false, "description": "ইউজার #Sabbir মুছে ফেলা হয়েছে।"}, {"id": "cmv9wtn4f0000k0uld3hbywpn", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:06:28.815Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর email - থেকে Suvash Babu পরিবর্তন করা হয়েছে।"}, {"id": "cmv9x4n87000038ulcqt8bub0", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:15:02.167Z", "isDeleted": false, "description": "ইউজার #Suvash Babu আপডেট করা হয়েছে।"}, {"id": "cmv9x74im0000tgul5ypzhhu8", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:16:57.886Z", "isDeleted": false, "description": "ইউজার #Suvash Babu আপডেট করা হয়েছে।"}, {"id": "cmv9x98ne0000kkulyjpfvym6", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:18:36.554Z", "isDeleted": false, "description": "ইউজার #Suvash Babu আপডেট করা হয়েছে।"}, {"id": "cmv9xa5850001kkulrj95ek6b", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:19:18.773Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।"}, {"id": "cmv9xarr30002kkul3z8y3fu3", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:19:47.967Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।"}, {"id": "cmv9xchzq0000zgul3xtr67zy", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-15T19:21:08.630Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।"}, {"id": "cmvadu20q00004cul41h7pbp7", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "createdAt": "2026-10-16T03:02:41.594Z", "isDeleted": false, "description": "ইউজার #montu এর ইমেইল - থেকে mahbubulhasan604@gmail.com পরিবর্তন করা হয়েছে।"}, {"id": "cmvaeixr20000pgulx9ghham4", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-16T03:22:02.463Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল - থেকে mhsabbir220@gmail.com পরিবর্তন করা হয়েছে।"}, {"id": "cmvaemvr70000houllc2v1j0h", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-16T03:25:06.499Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল - থেকে mhsabbir220@gmail.com পরিবর্তন করা হয়েছে।"}, {"id": "cmvaet10t00002culz21ifbju", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-16T03:29:53.261Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল mhsabbir220@gmail.com থেকে mhsabbir220@gmil.com পরিবর্তন করা হয়েছে।"}, {"id": "cmvaet5q400012culrsrxq899", "action": "UPDATE", "module": "USER", "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-16T03:29:59.356Z", "isDeleted": false, "description": "ইউজার #Suvash Babu এর ইমেইল mhsabbir220@gmil.com থেকে mhsabbir220@gmail.com পরিবর্তন করা হয়েছে।"}], "challanItems": [{"id": "fa4bb0e6-afc6-4d40-8110-dca2aeaa69fb", "rate": 12, "class": "পিকেট", "price": 12000, "quantity": 1000, "challanId": "1372f36c-b803-48cf-b565-99dda2ed63b6", "createdAt": "2026-09-28T13:41:59.604Z", "delivered": 0, "isDeleted": false, "updatedAt": "2026-09-28T13:41:59.604Z", "deliveryDate": "2026-09-27T18:00:00.000Z"}, {"id": "042808c8-d8ed-4a66-804b-32c35abebb71", "rate": 12, "class": "পিকেট", "price": 12000, "quantity": 1000, "challanId": "f869ac3d-9bed-44b6-afa3-32b877cb07a1", "createdAt": "2026-10-01T09:36:09.966Z", "delivered": 0, "isDeleted": false, "updatedAt": "2026-10-01T09:36:09.966Z", "deliveryDate": "2026-09-30T18:00:00.000Z"}], "customerDues": [{"id": "5318f3eb-cb12-471d-92c2-bffccaa6dc78", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "challanId": "1372f36c-b803-48cf-b565-99dda2ed63b6", "createdAt": "2026-09-28T13:41:59.596Z", "dueAmount": "7500", "updatedAt": "2026-09-28T13:41:59.596Z", "customerId": "eaffa5d9-c173-491f-8edf-3981fe4fa6ce", "paidAmount": "5000", "totalAmount": "12500"}, {"id": "c97a4ccf-402b-4702-ada8-ebd258788d4a", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "challanId": "f869ac3d-9bed-44b6-afa3-32b877cb07a1", "createdAt": "2026-10-01T09:36:09.944Z", "dueAmount": "500", "updatedAt": "2026-10-01T09:36:09.944Z", "customerId": "3c681832-5238-4d39-bafd-3afcb45c6593", "paidAmount": "12000", "totalAmount": "12500"}], "taskManagers": [{"id": "c524f593-abbe-4c21-b818-9bbf6b18af35", "date": "2026-09-28T18:00:00.000Z", "repeat": "none", "status": "PENDING", "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-29T04:48:02.375Z", "isDeleted": false, "updatedAt": "2026-09-29T04:48:02.375Z", "description": "u65u56 ", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}], "classAndRates": [{"id": "8d61abf5-2887-4491-bec0-2661e692bead", "rate": 8.3, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "২ নং (ক)", "classType": "ইট", "createdAt": "2026-09-22T15:06:36.687Z", "isDeleted": false, "updatedAt": "2026-09-26T14:01:22.010Z", "advanceRate": 10, "deleteStatus": "DEFAULT", "updateStatus": "APPROVED"}, {"id": "9db43bd9-3b8a-488a-ba03-a5865ecd89cd", "rate": 7, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "১ নং", "classType": "ইট", "createdAt": "2026-09-12T03:48:20.644Z", "isDeleted": true, "updatedAt": "2026-09-26T14:23:34.301Z", "advanceRate": 6, "deleteStatus": "PENDING", "updateStatus": "DEFAULT"}, {"id": "d5aeaa43-0197-4247-834d-4919cddb6b28", "rate": 9, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "১ নং আদলা", "classType": "আধলা", "createdAt": "2026-09-25T04:25:03.510Z", "isDeleted": false, "updatedAt": "2026-09-27T03:39:05.576Z", "advanceRate": 5, "deleteStatus": "PENDING", "updateStatus": "DEFAULT"}, {"id": "2f5a4ddf-115b-4512-806e-feef2e9288d4", "rate": 12, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "পিকেট", "classType": "ইট", "createdAt": "2026-09-22T15:06:29.509Z", "isDeleted": false, "updatedAt": "2026-09-27T09:32:22.972Z", "advanceRate": 6, "deleteStatus": "PENDING", "updateStatus": "APPROVED"}, {"id": "c76920be-dbe9-4318-88e5-a254b7cddc7d", "rate": 9, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "রাবিস", "classType": "অন্যান্য", "createdAt": "2026-09-22T15:07:56.099Z", "isDeleted": false, "updatedAt": "2026-09-25T05:14:14.193Z", "advanceRate": 6, "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "a46a9b66-9fd6-4412-bf81-c16b2d94044f", "rate": 9, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "2 নং আদলা", "classType": "আধলা", "createdAt": "2026-09-25T04:36:21.524Z", "isDeleted": true, "updatedAt": "2026-09-26T09:12:01.884Z", "advanceRate": 4, "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "b79bc63f-0a08-4ed8-84c9-811575c68b61", "rate": 6, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "className": "এলোট", "classType": "ইট", "createdAt": "2026-09-22T15:06:50.089Z", "isDeleted": false, "updatedAt": "2026-09-26T09:17:26.236Z", "advanceRate": 4, "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}], "notifications": [{"id": "06177814-8f1d-487e-80d5-4bbfcc5cae23", "path": "/dashboard/todays-delivery", "type": "DELIVERY", "title": "Tanvir-এর আজ ডেলিভারি আছে", "isRead": false, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "message": "কাস্টমার: Tanvir। ডেলিভারি: ১ নং: 1000 টি। সিজন: 2026-2027।", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-12T01:48:11.702Z", "updatedAt": "2026-09-12T01:50:48.214Z"}, {"id": "e816938e-ed85-4489-a4c7-eb231e8a0612", "path": "/dashboard/due-collection", "type": "DUE", "title": "Tanvir-এর আজ টাকা দেওয়ার তারিখ", "isRead": false, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "message": "কাস্টমার: Tanvir। আজ টাকা দেওয়ার তারিখ। বাকি: 3000 টাকা। সিজন: 2026-2027।", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-12T18:05:00.349Z", "updatedAt": "2026-09-12T18:05:00.349Z"}, {"id": "34b93980-dd5c-425e-96e0-23f3819e2ab0", "path": "/dashboard/due-collection", "type": "DUE", "title": "Ahosun-এর আজ টাকা দেওয়ার তারিখ", "isRead": false, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "message": "কাস্টমার: Ahosun। আজ টাকা দেওয়ার তারিখ। বাকি: 6000 টাকা। সিজন: 2026-2027।", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-12T18:05:00.349Z", "updatedAt": "2026-09-12T18:05:00.349Z"}, {"id": "2d0df6fd-ffcb-458e-bdbe-50ac1987eb2d", "path": "/dashboard/due-collection", "type": "DUE", "title": "Tanvir-এর আজ টাকা দেওয়ার তারিখ", "isRead": false, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "message": "কাস্টমার: Tanvir। আজ টাকা দেওয়ার তারিখ। বাকি: 3000 টাকা। সিজন: 2026-2027।", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-12T01:48:11.702Z", "updatedAt": "2026-09-12T01:48:11.702Z"}, {"id": "f808f306-9142-45ac-bdfd-0b66e1237169", "path": "/dashboard/due-collection", "type": "DUE", "title": "Ahosun-এর আজ টাকা দেওয়ার তারিখ", "isRead": false, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "message": "কাস্টমার: Ahosun। আজ টাকা দেওয়ার তারিখ। বাকি: 6000 টাকা। সিজন: 2026-2027।", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-12T01:48:11.702Z", "updatedAt": "2026-09-12T01:48:11.702Z"}, {"id": "479ddb37-da46-4e74-9926-0b65b89d22e3", "path": "/dashboard/todays-delivery", "type": "DELIVERY", "title": "Ahosun-এর আজ ডেলিভারি আছে", "isRead": false, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "message": "কাস্টমার: Ahosun। ডেলিভারি: ১ নং: 1000 টি। সিজন: 2026-2027।", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-12T01:48:11.702Z", "updatedAt": "2026-09-12T01:48:11.702Z"}], "dueCollections": [{"id": "68c7ff3d-f6ce-48fe-94cf-d93c50bcb8af", "due": 7500, "newDue": 6500, "collect": 1000, "nextDate": "2026-09-28T18:00:00.000Z", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T13:42:24.341Z", "isDeleted": true, "updatedAt": "2026-09-28T13:43:04.895Z", "customerId": "eaffa5d9-c173-491f-8edf-3981fe4fa6ce", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "fd42b223-157d-4ca9-96da-684ef27586c1", "due": 7500, "newDue": 6500, "collect": 1000, "nextDate": "2026-09-29T18:00:00.000Z", "seasonId": "11fdc269-699e-4a88-9092-f8f173bc55ac", "createdAt": "2026-09-28T16:51:32.318Z", "isDeleted": false, "updatedAt": "2026-09-28T16:51:32.318Z", "customerId": "eaffa5d9-c173-491f-8edf-3981fe4fa6ce", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}], "goodHistoryLogs": [], "login_histories": [{"id": "89d371c2-073b-484f-a82a-ad0d7b67f6a1", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-11T20:09:18.986Z", "ipAddress": "::1"}, {"id": "50d388c7-9910-445b-92bb-ee505d1785ee", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-11T20:11:45.466Z", "ipAddress": "::1"}, {"id": "51b95d74-4411-419e-903c-18d43cd25a5b", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-11T20:17:18.732Z", "ipAddress": "::1"}, {"id": "9d1c4b1e-c140-4137-8947-5b338f4ae4b6", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-11T20:18:09.089Z", "ipAddress": "::1"}, {"id": "02f4395d-1f18-400b-8d95-be9fc03e93ae", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T01:50:08.728Z", "ipAddress": "::1"}, {"id": "b9f9ecb9-be09-479c-8dd5-1296e24a3d41", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-12T02:17:12.089Z", "ipAddress": "::1"}, {"id": "dc33f34c-9e31-428b-9289-b75e6cd1f700", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T03:18:57.472Z", "ipAddress": "::1"}, {"id": "c456e414-1045-4157-81e2-977b0e690cf5", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-12T03:23:52.785Z", "ipAddress": "::1"}, {"id": "26ed4f65-1151-4df5-b069-b878e6a0078d", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-12T03:28:41.726Z", "ipAddress": "::1"}, {"id": "4bea9d2e-5711-41b3-b06c-e1da69fe3664", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T04:03:17.795Z", "ipAddress": "::1"}, {"id": "feebfcb0-8edf-443a-978b-dc513d85e052", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T14:03:47.417Z", "ipAddress": "::1"}, {"id": "08a66a94-5b81-4595-9c3e-aaf6924c63dd", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T15:19:24.428Z", "ipAddress": "::1"}, {"id": "f40eebc0-e60c-4ff1-abb8-5bfd97f60778", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-12T16:57:50.164Z", "ipAddress": "::1"}, {"id": "22492311-90eb-40fd-8259-ff19041a220c", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T17:31:54.695Z", "ipAddress": "::1"}, {"id": "8e976cb8-5255-4f7b-909e-7f7cf1354438", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-12T17:35:05.888Z", "ipAddress": "::1"}, {"id": "55cff722-c6e4-4f9d-b0ad-38aa1ffd9ced", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-12T17:52:56.247Z", "ipAddress": "::1"}, {"id": "81fc9a77-7839-46d1-a68d-daf7573ef457", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-13T03:56:04.108Z", "ipAddress": "::1"}, {"id": "1a002839-559a-4b4a-98ec-8a5b97ebd96c", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-13T06:17:41.657Z", "ipAddress": "::1"}, {"id": "de054ca8-9393-4f50-900c-b452c660624b", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-13T06:19:50.741Z", "ipAddress": "::1"}, {"id": "ab45bbbb-65ff-4fee-9440-bd1904233bc1", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-13T08:39:22.966Z", "ipAddress": "::1"}, {"id": "c10ceba3-a49a-41d4-8694-91b028296d25", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-14T07:29:52.589Z", "ipAddress": "::1"}, {"id": "6114cc5f-cbde-4ed5-a6ed-2442288cca04", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-14T16:12:55.084Z", "ipAddress": "::1"}, {"id": "e786d39a-0c7f-40fe-b424-47e6afdf8216", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-14T16:54:43.774Z", "ipAddress": "::1"}, {"id": "74b65ebe-ed92-4552-bda1-8c701385d9a1", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-14T16:55:12.579Z", "ipAddress": "::1"}, {"id": "361c23dd-caa2-4e15-a19d-a09e6fae67c5", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-14T17:15:38.713Z", "ipAddress": "::1"}, {"id": "1f2f30b1-3062-4891-96d2-4f42a3c1cd57", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-14T22:54:00.291Z", "ipAddress": "::1"}, {"id": "51330a52-8c8c-41ea-8d02-aeea53d626a8", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-14T22:54:05.304Z", "ipAddress": "::1"}, {"id": "b54eb80c-7438-4ad4-9e34-9df54512a77f", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-15T07:14:39.687Z", "ipAddress": "::1"}, {"id": "7a825031-e03e-46e3-b8b7-54fac8150baa", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-21T17:16:56.635Z", "ipAddress": "::1"}, {"id": "2ce6f1c4-8fcd-4e69-a7d9-2292eb442cc3", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-22T13:02:36.357Z", "ipAddress": "::1"}, {"id": "6ffc0841-44f2-4775-98bc-91d2d135f34d", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-22T14:25:08.439Z", "ipAddress": "::1"}, {"id": "2127bf1b-4854-421a-b2b0-d033d5edfa7c", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-22T18:09:44.543Z", "ipAddress": "::1"}, {"id": "8e2a6965-bc57-4a0c-b9a3-b6ffb5e49d25", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-22T19:05:28.104Z", "ipAddress": "::1"}, {"id": "9d277302-d4f2-47cf-b1f8-19a3f2f6c077", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-25T03:01:49.079Z", "ipAddress": "::1"}, {"id": "0a557c8c-a7ac-4613-a3ab-78ce20f24e61", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-25T06:30:11.352Z", "ipAddress": "::1"}, {"id": "deaa29a2-cae4-4c85-a359-e8c89c40bd5f", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-25T19:20:25.229Z", "ipAddress": "::1"}, {"id": "8b03f9b5-cbdc-4d42-8686-ec77a9009253", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-25T19:37:55.486Z", "ipAddress": "::1"}, {"id": "8e51cb12-727e-4aa9-b620-e1b669473620", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-26T04:40:45.194Z", "ipAddress": "::1"}, {"id": "176a35f9-000d-44a3-8537-b929353bda1b", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-26T09:13:56.197Z", "ipAddress": "::1"}, {"id": "ba139efb-d2c4-46c5-b448-44ac0f1c491a", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-09-26T09:14:02.328Z", "ipAddress": "::1"}, {"id": "2d1ca541-0a06-4c5c-80ac-754f94697d68", "type": "Logout", "device": "Unknown", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Unknown", "createdAt": "2026-09-26T09:34:37.699Z", "ipAddress": "::1"}, {"id": "75a94ce8-5e75-404a-8bb7-cbd35b623656", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-26T09:34:40.119Z", "ipAddress": "::1"}, {"id": "b322c6de-e972-4fd4-b366-96ce27137fc7", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-09-26T09:38:57.059Z", "ipAddress": "::1"}, {"id": "40b8083a-9113-4b37-a11f-b52312c645e9", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-26T10:59:14.165Z", "ipAddress": "::1"}, {"id": "2eda475a-c10a-4eaf-b3c4-bc12668f8582", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-26T12:26:06.044Z", "ipAddress": "::1"}, {"id": "bce72c3d-b95f-421a-be7e-d239c745f6aa", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-26T12:26:12.492Z", "ipAddress": "::1"}, {"id": "84f9bc74-706a-421a-80de-4e5b5d8c9920", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-26T12:29:15.998Z", "ipAddress": "::1"}, {"id": "3d2c16cc-96fe-4d18-bcf3-0fcccf17cf90", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-26T13:05:57.369Z", "ipAddress": "::1"}, {"id": "5f332adb-7b31-42c0-8288-bf9bb85269b6", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-26T15:43:59.839Z", "ipAddress": "::1"}, {"id": "5b6cbb63-c4e8-4932-9a47-9aa6c6685693", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-27T03:37:20.474Z", "ipAddress": "::1"}, {"id": "83032330-0d15-4967-917e-70fc8a3887bf", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-27T09:07:46.068Z", "ipAddress": "::1"}, {"id": "07936f9b-5917-4160-a93a-7c9886b11cd1", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-27T11:48:15.205Z", "ipAddress": "::1"}, {"id": "0bda0fa9-3259-402a-b679-eb2699cf5565", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-27T11:59:06.558Z", "ipAddress": "::1"}, {"id": "841f4731-975d-491c-92c2-c75aec1372ed", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-27T16:00:00.478Z", "ipAddress": "::1"}, {"id": "f0ffe1cc-ba7b-405c-bc8b-8bb41d372a08", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-28T05:50:44.664Z", "ipAddress": "::1"}, {"id": "3fa33a99-d36c-42eb-8467-e843aa761386", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-28T07:28:10.417Z", "ipAddress": "::1"}, {"id": "65f6a579-0af0-48ab-a533-0eb597748d0c", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-28T11:10:37.105Z", "ipAddress": "::1"}, {"id": "b5e9d121-034f-4c61-b568-f068da137a2a", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-28T20:11:15.528Z", "ipAddress": "::1"}, {"id": "27b4be38-be45-4d1f-878e-8b09d343351a", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-29T03:06:20.864Z", "ipAddress": "::1"}, {"id": "b260c5c3-98b9-4b03-bfd2-8611256d871d", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-29T03:33:27.038Z", "ipAddress": "::1"}, {"id": "07ba0248-596f-4fe1-b1ce-22be78976e5a", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-29T05:24:28.402Z", "ipAddress": "::1"}, {"id": "16323ff3-35df-49ad-97f5-de3e35067351", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-29T06:08:20.414Z", "ipAddress": "::1"}, {"id": "fd4a83b1-b867-4a8e-8044-e3ea45b04650", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-09-29T06:14:35.437Z", "ipAddress": "::1"}, {"id": "1149c3d5-4571-4a82-a8ce-e8a491966187", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-29T08:53:52.487Z", "ipAddress": "::1"}, {"id": "b3196b97-434d-4fa3-aac7-6cf1f493ae65", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-29T09:00:27.955Z", "ipAddress": "::1"}, {"id": "288ed737-069f-4c1f-9771-d1453b1b533d", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-09-29T09:19:15.709Z", "ipAddress": "::1"}, {"id": "b912dfa0-3a45-4a15-9605-93edf406b6b5", "type": "Logout", "device": "Unknown", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Unknown", "createdAt": "2026-09-29T11:20:28.042Z", "ipAddress": "::1"}, {"id": "d9233946-43e9-4876-814a-3cf6efa33a84", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-09-29T11:21:50.207Z", "ipAddress": "103.149.104.14"}, {"id": "47da26aa-e749-44ec-94b0-57752b5dba73", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-09-29T11:31:41.533Z", "ipAddress": "103.149.104.14"}, {"id": "af65e991-928e-4c06-b81d-e92671525e83", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-09-29T11:35:49.283Z", "ipAddress": "103.149.104.14"}, {"id": "2937a98b-9160-4359-923e-ad0a0ea06ef0", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-30T09:30:51.121Z", "ipAddress": "Unknown"}, {"id": "826c657b-06e3-45e9-b8b7-91d38073f1f9", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-30T09:44:14.513Z", "ipAddress": "Unknown"}, {"id": "f8e0ed73-4bca-4d4c-902d-f42210a99a60", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-30T10:03:48.365Z", "ipAddress": "Unknown"}, {"id": "f351cbd6-ac31-4e5a-ade0-aeb6536895fe", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-09-30T13:35:00.514Z", "ipAddress": "103.149.104.14"}, {"id": "cc5ebea3-cd90-416d-8f04-57735d815c16", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-10-01T04:31:48.890Z", "ipAddress": "103.149.104.14"}, {"id": "a50637c3-df84-42c0-a4fa-46b1f982c6ed", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-10-01T09:28:58.123Z", "ipAddress": "103.149.104.14"}, {"id": "748ca3f2-f8a3-450e-9e68-7a3b9eddf8ee", "type": "Logout", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-10-01T09:30:43.799Z", "ipAddress": "103.149.104.14"}, {"id": "f66e3a87-666c-4392-b980-68f67dc89295", "type": "Login", "device": "Windows", "status": true, "userId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "browser": "Chrome", "createdAt": "2026-10-01T09:30:51.267Z", "ipAddress": "103.149.104.14"}, {"id": "ad8960ff-8d5b-4f42-8de3-27be626a4da7", "type": "Login", "device": "Windows", "status": true, "userId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "browser": "Chrome", "createdAt": "2026-10-01T09:31:00.070Z", "ipAddress": "103.149.104.14"}, {"id": "e9cc11fe-a82e-47a5-b0e1-31b059617901", "type": "Login", "device": "Windows", "status": true, "userId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "browser": "Chrome", "createdAt": "2026-10-01T09:34:37.850Z", "ipAddress": "103.149.104.14"}, {"id": "11124144-2db7-4ace-83d0-06f5e8174ad8", "type": "Logout", "device": "Windows", "status": true, "userId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "browser": "Chrome", "createdAt": "2026-10-01T09:35:04.733Z", "ipAddress": "103.149.104.14"}, {"id": "efd699fe-fa2f-4268-806c-b213b18db53c", "type": "Login", "device": "Windows", "status": true, "userId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "browser": "Chrome", "createdAt": "2026-10-01T09:35:25.888Z", "ipAddress": "103.149.104.14"}, {"id": "9f168578-e441-4556-9eac-993f29c0a7b6", "type": "Logout", "device": "Windows", "status": true, "userId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "browser": "Chrome", "createdAt": "2026-10-01T09:37:54.196Z", "ipAddress": "103.149.104.14"}, {"id": "5cf4cc3c-a5c1-43f3-8b3a-42246ddaa8a7", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Chrome", "createdAt": "2026-10-01T09:38:04.327Z", "ipAddress": "103.149.104.14"}, {"id": "0e029d61-e4e1-4521-aa03-eb9b1c781fb8", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-02T00:18:41.649Z", "ipAddress": "103.149.104.14"}, {"id": "ee4fb07f-2589-447a-9ddf-3b41f549c084", "type": "Login", "device": "Android", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-02T15:14:18.844Z", "ipAddress": "103.149.104.14"}, {"id": "1989efc3-2d50-41c2-9583-9d5170f8426c", "type": "Login", "device": "Android", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-02T15:15:53.925Z", "ipAddress": "103.149.104.14"}, {"id": "bd372c97-c194-4758-a5d2-2f2a9cf801f2", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-02T15:17:09.961Z", "ipAddress": "Unknown"}, {"id": "03f300bb-0632-4398-b562-7de13e2a87fa", "type": "Login", "device": "Android", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-02T15:20:03.076Z", "ipAddress": "103.149.104.14"}, {"id": "828a0c40-9632-456d-8b62-ed4aacdc0a4d", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-02T15:20:29.471Z", "ipAddress": "103.149.104.14"}, {"id": "aee5fb9d-8e94-48ef-b207-a375bc16d048", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:10:36.100Z", "ipAddress": "103.149.104.12"}, {"id": "653da3bf-2e91-47de-823e-b3cf207dba94", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:15:57.529Z", "ipAddress": "103.149.104.12"}, {"id": "4a096979-0775-4ebb-9f1b-6e154c92aacf", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:36:48.714Z", "ipAddress": "103.149.104.12"}, {"id": "8100225e-3713-47d7-b3bf-774ab686dfe1", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:38:29.443Z", "ipAddress": "103.149.104.12"}, {"id": "17b8adbd-b01a-455d-a490-753f26fbce19", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:39:05.149Z", "ipAddress": "103.149.104.12"}, {"id": "96568026-de42-43d8-9b6b-dc3723f7d3b3", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:50:06.779Z", "ipAddress": "103.149.104.12"}, {"id": "dc488b55-4589-4863-8656-69166e65a72b", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:50:33.451Z", "ipAddress": "103.149.104.12"}, {"id": "975d4ece-9dec-477b-8698-212b28977131", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T05:50:40.186Z", "ipAddress": "103.149.104.12"}, {"id": "34a2fcd4-6ca4-4432-8406-91a66bd9323c", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:10:29.077Z", "ipAddress": "103.149.104.12"}, {"id": "71c5d892-1e7e-42cf-b8e9-47db92f36bdb", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:10:30.942Z", "ipAddress": "103.149.104.12"}, {"id": "f3ba0c9d-afb0-4c2d-97eb-3d75e8a348c4", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:13:51.864Z", "ipAddress": "103.149.104.12"}, {"id": "8bf5ca81-54d7-40b2-9b62-098f55f30f5a", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:13:56.389Z", "ipAddress": "103.149.104.12"}, {"id": "d5fad228-780d-4630-997d-e8c1c5d64064", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:14:00.716Z", "ipAddress": "103.149.104.12"}, {"id": "c781ca33-d2c8-466a-bee8-cfcdad95d3f7", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:28.477Z", "ipAddress": "103.149.104.12"}, {"id": "ee4070a6-649d-4254-9b9a-43c059bde0ae", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:32.472Z", "ipAddress": "103.149.104.12"}, {"id": "e687329e-0846-4a92-af49-f73a657c009b", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:33.658Z", "ipAddress": "103.149.104.12"}, {"id": "c0decfc9-d3e1-4802-a680-f8fd8efc6707", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:35.861Z", "ipAddress": "103.149.104.12"}, {"id": "168c6dfa-736f-4100-913b-9ecb69a2f08d", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:37.020Z", "ipAddress": "103.149.104.12"}, {"id": "f9756415-2bf5-4fda-9663-1bd06ddacc9d", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:38.137Z", "ipAddress": "103.149.104.12"}, {"id": "d3a80ab1-1dac-470a-ad8b-c39fdffdfbdf", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:39.167Z", "ipAddress": "103.149.104.12"}, {"id": "7c8086c9-7eac-498f-af08-6fde9bea1edc", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:40.196Z", "ipAddress": "103.149.104.12"}, {"id": "143e56c3-8ab0-475e-9dba-2d506733d218", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:41.208Z", "ipAddress": "103.149.104.12"}, {"id": "f75138c4-2f71-47bb-82e2-a36750f1a1f0", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:42.264Z", "ipAddress": "103.149.104.12"}, {"id": "972042ad-82d9-4d44-aeb9-7c8cd1c9c392", "type": "Login", "device": "Windows", "status": false, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:15:43.251Z", "ipAddress": "103.149.104.12"}, {"id": "b6ee1beb-810e-4357-96b4-440d4ec76580", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:16:58.028Z", "ipAddress": "103.149.104.12"}, {"id": "a42021c1-6925-4b28-9439-014cd81d0c69", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:41:25.823Z", "ipAddress": "103.149.104.12"}, {"id": "bcb569d2-b577-415c-9722-4e4b6f05c5aa", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:41:34.330Z", "ipAddress": "103.149.104.12"}, {"id": "975c70a1-8501-41b5-a952-149f5bd7152a", "type": "Logout", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:41:58.639Z", "ipAddress": "103.149.104.12"}, {"id": "8ff85556-ddbb-4120-a657-f9a3e0c8c153", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:05.482Z", "ipAddress": "103.149.104.12"}, {"id": "ec480ccc-bb00-4193-b23a-74cc6676fd5d", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:06.812Z", "ipAddress": "103.149.104.12"}, {"id": "84405de0-7d3d-4e86-83e9-0936ffb51ed9", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:07.751Z", "ipAddress": "103.149.104.12"}, {"id": "bf8636df-a54c-4717-a921-ad36a60014d3", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:08.650Z", "ipAddress": "103.149.104.12"}, {"id": "cae20c56-065e-4040-9dcc-679e85236d96", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:09.501Z", "ipAddress": "103.149.104.12"}, {"id": "99cedcdd-4815-4e20-914c-929c2602ecb3", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:10.377Z", "ipAddress": "103.149.104.12"}, {"id": "3cc441bf-370a-468a-8e22-75eec57d6104", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:11.249Z", "ipAddress": "103.149.104.12"}, {"id": "7ebd5a95-3d3e-4bb7-945b-66d7055663f4", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:12.094Z", "ipAddress": "103.149.104.12"}, {"id": "9fdba2dd-1da4-468a-858d-42a17bc02eae", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:12.885Z", "ipAddress": "103.149.104.12"}, {"id": "ae698898-9c8a-4166-ad71-e6b5383228a3", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T06:42:13.868Z", "ipAddress": "103.149.104.12"}, {"id": "8a7517ed-3ee9-425c-854f-58c82d7ae093", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T06:42:21.817Z", "ipAddress": "103.149.104.12"}, {"id": "10b9491c-41e6-4f91-b698-3bf7f7bd4a7b", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T11:23:34.913Z", "ipAddress": "202.134.9.146"}, {"id": "7ea0c0a5-91f8-49c9-b7f9-b50b51c3320d", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T11:24:27.705Z", "ipAddress": "202.134.9.146"}, {"id": "b601ed6f-0d5d-4418-98b4-60169b557b65", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T11:25:03.268Z", "ipAddress": "202.134.9.146"}, {"id": "29509a96-7f13-4f8a-9a9e-f4ee5aa1f8ad", "type": "Login", "device": "Windows", "status": false, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T11:25:10.830Z", "ipAddress": "202.134.9.146"}, {"id": "be02a1ad-f84b-42c4-b69c-f7e9be767214", "type": "Login", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T11:25:13.267Z", "ipAddress": "202.134.9.146"}, {"id": "199e98f3-2c6f-408b-9d73-21afa7b5ea8c", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T11:26:26.465Z", "ipAddress": "202.134.9.146"}, {"id": "1485948e-0476-4407-8dd2-0b4dd2cfaf1c", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:26:35.897Z", "ipAddress": "202.134.9.146"}, {"id": "7ce79bdc-d09b-43c3-a1bf-489f2aabdfc6", "type": "Login", "device": "Windows", "status": true, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:27:01.689Z", "ipAddress": "202.134.9.146"}, {"id": "9a2a0c93-69ff-4fa8-8373-0c4883ff533f", "type": "Logout", "device": "Windows", "status": true, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:28:51.435Z", "ipAddress": "202.134.9.146"}, {"id": "28ae0cd8-aa9c-4b71-a799-5bdc81fddf32", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T11:29:23.644Z", "ipAddress": "202.134.9.146"}, {"id": "7b18b563-5825-422c-94b3-bf523502cafa", "type": "Logout", "device": "Windows", "status": true, "userId": "a4a9e555-07d1-477e-82ad-ee9f42f3385b", "browser": "Edge", "createdAt": "2026-10-15T11:29:32.529Z", "ipAddress": "202.134.9.146"}, {"id": "cb82b41f-7fae-411a-8f59-8dc9ceb8ea99", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:29:41.438Z", "ipAddress": "202.134.9.146"}, {"id": "322e9d12-84a1-4350-9b9c-275e5a5b5dd3", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:03.495Z", "ipAddress": "202.134.9.146"}, {"id": "95a805da-f4fe-48e2-ae9b-3341002a99af", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:05.289Z", "ipAddress": "202.134.9.146"}, {"id": "fcea142b-b843-4bd1-8a74-6346b69d2cdd", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:06.827Z", "ipAddress": "202.134.9.146"}, {"id": "1c861247-5f4f-4580-94e0-46760314eaba", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:08.276Z", "ipAddress": "202.134.9.146"}, {"id": "1574231f-7dd9-4247-9ef8-f54d33bd351f", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:09.695Z", "ipAddress": "202.134.9.146"}, {"id": "026950d2-501d-4f44-8241-72f8a7700054", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:11.131Z", "ipAddress": "202.134.9.146"}, {"id": "c247cfc6-05f8-4ab2-aea8-12b4be977e71", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:29.608Z", "ipAddress": "202.134.9.146"}, {"id": "68dd70a6-d2fa-4331-b771-bca8e2ff82e0", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:31.028Z", "ipAddress": "202.134.9.146"}, {"id": "cd70958c-3d2a-43de-b24b-22abacee9bef", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:32.131Z", "ipAddress": "202.134.9.146"}, {"id": "caf99e5e-680d-43a0-b5b0-804ceb6e40eb", "type": "Login", "device": "Windows", "status": false, "userId": "d09e0612-0f69-4dde-b38a-c05e5b3e1adf", "browser": "Edge", "createdAt": "2026-10-15T11:30:44.641Z", "ipAddress": "202.134.9.146"}, {"id": "2299759d-97a9-4b48-ae02-842aba16443b", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T13:04:00.244Z", "ipAddress": "202.134.9.146"}, {"id": "657a936b-41b9-4756-b373-b09339a1820f", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Edge", "createdAt": "2026-10-15T13:12:14.736Z", "ipAddress": "202.134.9.146"}, {"id": "94c74bc2-879e-482c-a228-9eb89874067b", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-15T19:01:32.732Z", "ipAddress": "103.149.104.12"}, {"id": "a3a636bc-5ff6-4a2e-aa86-8bf776ada4e3", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-15T21:46:01.980Z", "ipAddress": "103.149.104.12"}, {"id": "f03c1f6e-7bdd-4edf-a420-ff1d28cf9513", "type": "Login", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-15T21:46:28.870Z", "ipAddress": "103.149.104.12"}, {"id": "17b63e81-0ab5-4980-983f-65af50c794dc", "type": "Logout", "device": "Windows", "status": true, "userId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "browser": "Chrome", "createdAt": "2026-10-15T21:46:44.683Z", "ipAddress": "103.149.104.12"}, {"id": "08309fac-2ded-4ab1-b83b-c24498f90101", "type": "Login", "device": "Windows", "status": false, "userId": "68a492ca-0594-4a81-8413-6e9896b71734", "browser": "Chrome", "createdAt": "2026-10-15T22:18:02.551Z", "ipAddress": "103.149.104.12"}, {"id": "214cfc68-b72b-4565-9739-0b9032d596a2", "type": "Login", "device": "Windows", "status": true, "userId": "68a492ca-0594-4a81-8413-6e9896b71734", "browser": "Chrome", "createdAt": "2026-10-15T22:18:11.351Z", "ipAddress": "103.149.104.12"}, {"id": "a7ce2d09-155d-4231-81a1-ca9deb68c51c", "type": "Logout", "device": "Windows", "status": true, "userId": "68a492ca-0594-4a81-8413-6e9896b71734", "browser": "Chrome", "createdAt": "2026-10-16T03:14:38.068Z", "ipAddress": "103.149.104.12"}, {"id": "d30d10da-9899-4136-b383-2fbb169b98b0", "type": "Login", "device": "Windows", "status": false, "userId": "68a492ca-0594-4a81-8413-6e9896b71734", "browser": "Chrome", "createdAt": "2026-10-16T03:14:55.039Z", "ipAddress": "103.149.104.12"}, {"id": "223d5c59-7f33-485a-a6a8-3064480acd17", "type": "Login", "device": "Windows", "status": true, "userId": "68a492ca-0594-4a81-8413-6e9896b71734", "browser": "Chrome", "createdAt": "2026-10-16T03:15:04.376Z", "ipAddress": "103.149.104.12"}], "vataSmsSettings": [{"id": "39e57256-203c-4949-9e39-f95bc3875a24", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newInvoice": true, "newDelivery": false, "deleteInvoice": false, "updateInvoice": false, "newDueCollection": false, "deuCollectionUpdate": false}], "approvalRequests": [{"id": "cmukxinx50000y0ulwes01yaz", "action": "DELETE", "module": "DELIVERY", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"class": "২ নং (ক)", "quantity": 1000, "deliveryNo": 5, "deliveryDate": "2026-09-28T07:29:29.155Z", "deliveryReceived": 500, "nextDeliveryDate": "2026-09-28T18:00:00.000Z", "deliveryRemaining": 500}, "targetId": "a70c5c14-7e38-4c35-b1c9-e647a0eb097b", "createdAt": "2026-09-28T07:31:41.849Z", "isDeleted": false, "updatedAt": "2026-09-28T07:37:54.923Z", "reviewedAt": "2026-09-28T07:37:54.922Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuky1mm90000loulgoekgg3e", "action": "DELETE", "module": "DELIVERY", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"class": "২ নং (ক)", "quantity": 1000, "deliveryNo": 7, "deliveryDate": "2026-09-28T07:41:46.818Z", "lastDelivered": 500, "deliveryReceived": 100, "nextDeliveryDate": "2026-09-29T18:00:00.000Z", "deliveryRemaining": 400}, "targetId": "655fa2b0-1b97-4ae5-aeb3-a789009bdaa1", "createdAt": "2026-09-28T07:46:26.625Z", "isDeleted": false, "updatedAt": "2026-09-28T07:47:03.398Z", "reviewedAt": "2026-09-28T07:47:03.397Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmul5cogu00007oulvmgrznxw", "action": "UPDATE", "module": "DUE", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"due": 2500, "newDue": 1500, "collect": 1000, "nextDate": "2026-09-28T18:00:00.000Z"}, "oldData": {"due": 2500, "newDue": 2000, "collect": 500, "nextDate": "2026-09-28T18:00:00.000Z"}, "targetId": "7eb30ccf-aea3-4820-85fe-d25d0c9c8bb1", "createdAt": "2026-09-28T11:10:59.550Z", "isDeleted": false, "updatedAt": "2026-09-28T11:11:28.797Z", "reviewedAt": "2026-09-28T11:11:28.796Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmulooiwt0001zsul1hohmrz7", "action": "DELETE", "module": "CASH", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"type": "INCOME", "amount": "1200", "source": "sabbir", "description": "ttt"}, "targetId": "99edea6b-e91d-43cf-a5bd-0496412b569e", "createdAt": "2026-09-28T20:12:04.925Z", "isDeleted": false, "updatedAt": "2026-09-28T20:13:52.576Z", "reviewedAt": "2026-09-28T20:13:52.570Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum3jf7s0000vsulall0l5bt", "action": "UPDATE", "module": "CASH", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"type": "INCOME", "amount": 8000, "source": "Mursalin Vao", "description": "hoio"}, "oldData": {"type": "INCOME", "amount": "9000", "source": "Mursalin Vao", "description": "hoio"}, "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-29T03:08:01.096Z", "isDeleted": false, "updatedAt": "2026-09-29T03:08:56.076Z", "reviewedAt": "2026-09-29T03:08:56.072Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum3lu2y0002vsulqk5qa9sm", "action": "DELETE", "module": "CASH", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"type": "INCOME", "amount": "8000", "source": "Mursalin Vao", "description": "hoio"}, "targetId": "90045992-549e-4958-8fb2-20bc6b4a662b", "createdAt": "2026-09-29T03:09:53.674Z", "isDeleted": false, "updatedAt": "2026-09-29T03:10:07.416Z", "reviewedAt": "2026-09-29T03:10:07.415Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum8mt5100004culwu1xsbfc", "action": "UPDATE", "module": "LOAD_INFO", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:27:03.890Z", "class": "১ নং", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট মাঠে", "quantity": 2000}, "oldData": {"date": "2026-09-29T05:27:03.890Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}, "targetId": "15716b3b-c8b4-4418-866e-63ecd00d0876", "createdAt": "2026-09-29T05:30:37.189Z", "isDeleted": false, "updatedAt": "2026-09-29T05:30:37.189Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum8rwzh00014culzq4g7ijz", "action": "UPDATE", "module": "LOAD_INFO", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:34:12.490Z", "class": "১ নং", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}, "oldData": {"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "targetId": "c57535df-9cb2-4333-863b-ff9fdcfe85d0", "createdAt": "2026-09-29T05:34:35.453Z", "isDeleted": false, "updatedAt": "2026-09-29T05:34:35.453Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum8sywu0000isuln9b2zm4b", "action": "UPDATE", "module": "LOAD_INFO", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}, "oldData": {"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "targetId": "c57535df-9cb2-4333-863b-ff9fdcfe85d0", "createdAt": "2026-09-29T05:35:24.606Z", "isDeleted": false, "updatedAt": "2026-09-29T05:35:24.606Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum8vayo00001kuleaaps9po", "action": "UPDATE", "module": "LOAD_INFO", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 600}, "oldData": {"date": "2026-09-29T05:34:12.490Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "targetId": "c57535df-9cb2-4333-863b-ff9fdcfe85d0", "createdAt": "2026-09-29T05:37:13.536Z", "isDeleted": false, "updatedAt": "2026-09-29T05:37:13.536Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum94gb00000f8ul0oj1a9fe", "action": "UPDATE", "module": "LOAD_INFO", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}, "oldData": {"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:44:20.364Z", "isDeleted": false, "updatedAt": "2026-09-29T05:44:20.364Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum9750g0002dkulrn8qx0e3", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 1500}, "oldData": {"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 2000}, "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:46:25.696Z", "isDeleted": false, "updatedAt": "2026-09-29T05:46:36.843Z", "reviewedAt": "2026-09-29T05:46:36.842Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum97ow70004dkulvkr2u511", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট মাঠে", "quantity": 1500}, "oldData": {"date": "2026-09-29T05:41:25.507Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 1500}, "targetId": "e2ce27f2-5ab9-4026-a8af-913c6b344f5f", "createdAt": "2026-09-29T05:46:51.463Z", "isDeleted": false, "updatedAt": "2026-09-29T05:47:03.218Z", "reviewedAt": "2026-09-29T05:47:03.218Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum98olx0006dkulkokitz7m", "action": "UPDATE", "module": "LOAD_INFO", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 300}, "oldData": {"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}, "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:47:37.749Z", "isDeleted": false, "updatedAt": "2026-09-29T05:47:37.749Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum9a2bv0007dkul9gck8g4y", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 1000}, "oldData": {"date": "2026-09-29T05:47:26.001Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}, "targetId": "06232db8-5e0c-42c4-a69c-09bc224da9e5", "createdAt": "2026-09-29T05:48:42.188Z", "isDeleted": false, "updatedAt": "2026-09-29T05:51:04.672Z", "reviewedAt": "2026-09-29T05:51:04.672Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmum9s4130000igulz6xn1j4m", "action": "DELETE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"date": "2026-09-29T06:01:01.139Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}, "targetId": "f3dde422-92b4-4d7e-86a3-9803b09e9389", "createdAt": "2026-09-29T06:02:44.199Z", "isDeleted": false, "updatedAt": "2026-09-29T06:11:16.387Z", "reviewedAt": "2026-09-29T06:11:16.384Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuma87gg0003igulmboaxa49", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T06:14:58.591Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 5000}, "oldData": {"date": "2026-09-29T06:14:58.591Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}, "targetId": "9f4318ab-e3c3-4f21-b41a-83877d40cc75", "createdAt": "2026-09-29T06:15:15.137Z", "isDeleted": false, "updatedAt": "2026-09-29T06:16:39.697Z", "reviewedAt": "2026-09-29T06:16:39.696Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumam13f000098ule3zwhntn", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T06:25:37.024Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 600}, "oldData": {"date": "2026-09-29T06:25:37.024Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}, "targetId": "ac52d0ea-d7b6-49dd-bf70-94c87ed41b4c", "createdAt": "2026-09-29T06:26:00.075Z", "isDeleted": false, "updatedAt": "2026-09-29T06:26:23.772Z", "reviewedAt": "2026-09-29T06:26:23.770Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumasejn000080uldu3eblw9", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T06:28:37.884Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "oldData": {"date": "2026-09-29T06:28:37.884Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}, "targetId": "53dc21af-9227-476a-b8d4-45a311fe09e4", "createdAt": "2026-09-29T06:30:57.443Z", "isDeleted": false, "updatedAt": "2026-09-29T06:31:15.208Z", "reviewedAt": "2026-09-29T06:31:15.207Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumatjvd000280ulfwtctggu", "action": "DELETE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"date": "2026-09-29T06:28:37.884Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "targetId": "53dc21af-9227-476a-b8d4-45a311fe09e4", "createdAt": "2026-09-29T06:31:51.001Z", "isDeleted": false, "updatedAt": "2026-09-29T06:32:32.004Z", "reviewedAt": "2026-09-29T06:32:32.004Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumazt6k000480ul5io0j9qw", "action": "UPDATE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T06:36:19.358Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "oldData": {"date": "2026-09-29T06:36:19.358Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 100}, "targetId": "419addd1-d8b2-4417-a1bb-2c6dcb041313", "createdAt": "2026-09-29T06:36:43.004Z", "isDeleted": false, "updatedAt": "2026-09-29T06:37:03.028Z", "reviewedAt": "2026-09-29T06:37:03.028Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumb10nz000680ulpg33h8c7", "action": "DELETE", "module": "LOAD_INFO", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"date": "2026-09-29T06:36:19.358Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "targetId": "419addd1-d8b2-4417-a1bb-2c6dcb041313", "createdAt": "2026-09-29T06:37:39.359Z", "isDeleted": false, "updatedAt": "2026-09-29T06:38:02.492Z", "reviewedAt": "2026-09-29T06:38:02.492Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumgt83m0001f4ulgkejzp8e", "action": "UPDATE", "module": "GOOD_HISTORY_LOG", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Motorchyclee"}, "oldData": {"name": "Motorchycle"}, "targetId": "e99260c7-90d4-4f78-a2e5-49d51e2ec96f", "createdAt": "2026-09-29T09:19:33.442Z", "isDeleted": false, "updatedAt": "2026-09-29T09:19:33.442Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumgvwgz00008wult93ojvtf", "action": "UPDATE", "module": "GOODS_STOCK_CATEGORY", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Mursalinn"}, "oldData": {"name": "Mursalin"}, "targetId": "534d9437-ad31-4640-a2e2-3217b4412d6f", "createdAt": "2026-09-29T09:21:38.339Z", "isDeleted": false, "updatedAt": "2026-09-29T09:21:53.787Z", "reviewedAt": "2026-09-29T09:21:53.783Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumgwn4r00028wul1m91uhcy", "action": "DELETE", "module": "GOODS_STOCK_CATEGORY", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "Mursalins"}, "targetId": "05d84354-ea44-4657-8acd-c0a4c31622e4", "createdAt": "2026-09-29T09:22:12.891Z", "isDeleted": false, "updatedAt": "2026-09-29T09:23:14.186Z", "reviewedAt": "2026-09-29T09:23:14.186Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmumlp3e300008kulvm1y1h7p", "action": "UPDATE", "module": "LOAD_INFO", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"date": "2026-09-29T11:36:03.333Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 200}, "oldData": {"date": "2026-09-29T11:36:03.333Z", "round": "1 রাউন্ড", "loadType": "কাঁচা ইট এন্ট্রি", "quantity": 500}, "targetId": "2ad8ee4e-105a-4316-bc83-3781af672439", "createdAt": "2026-09-29T11:36:18.795Z", "isDeleted": false, "updatedAt": "2026-09-29T11:36:32.214Z", "reviewedAt": "2026-09-29T11:36:32.211Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunwnxne0001mkul10tmh42e", "action": "UPDATE", "module": "CONTACT", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Shakib Hasan", "phone": "01760564060", "address": "Barisall", "occupation": "Student"}, "oldData": {"name": "Shakib Hasan", "phone": "01760564065", "address": "Barisall", "occupation": "Student"}, "targetId": "593ebac1-0e4c-4826-bc7f-0c5504e5b6a4", "createdAt": "2026-09-30T09:31:06.650Z", "isDeleted": false, "updatedAt": "2026-09-30T09:36:30.055Z", "reviewedAt": "2026-09-30T09:36:30.050Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunwwiv90005mkul0opnbf6o", "action": "UPDATE", "module": "DRIVER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Shakib Hasan", "salary": 12000, "PhoneNumber": "01407128177"}, "oldData": {"name": "Shakib Hasan", "salary": "10000", "PhoneNumber": "01407128177"}, "targetId": "f575a0fa-6f73-4478-bfb3-6c76c16159e2", "createdAt": "2026-09-30T09:37:47.397Z", "isDeleted": false, "updatedAt": "2026-09-30T09:37:58.131Z", "reviewedAt": "2026-09-30T09:37:58.130Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunx60nm000020ulte52gvmh", "action": "UPDATE", "module": "DRIVER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Tanvir", "salary": 0, "PhoneNumber": "014071281777"}, "oldData": {"name": "Tanvir", "salary": "0", "PhoneNumber": "01407128177"}, "targetId": "307c2dae-887f-4767-86e6-1883df74dbbd", "createdAt": "2026-09-30T09:45:10.354Z", "isDeleted": false, "updatedAt": "2026-09-30T09:45:32.840Z", "reviewedAt": "2026-09-30T09:45:32.839Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunx6qfm000120uli8dkqvdl", "action": "DELETE", "module": "DRIVER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "Tanvir", "salary": "0", "PhoneNumber": "01407128177"}, "targetId": "307c2dae-887f-4767-86e6-1883df74dbbd", "createdAt": "2026-09-30T09:45:43.762Z", "isDeleted": false, "updatedAt": "2026-09-30T09:46:36.272Z", "reviewedAt": "2026-09-30T09:46:36.270Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxj1tg000320ul75829yad", "action": "DELETE", "module": "CONTACT", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "Shakib Hasan", "phone": "01760564060", "address": "Barisall", "occupation": "Student"}, "targetId": "593ebac1-0e4c-4826-bc7f-0c5504e5b6a4", "createdAt": "2026-09-30T09:55:18.388Z", "isDeleted": false, "updatedAt": "2026-09-30T09:55:18.388Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxkoyt000420ul89yp3qbl", "action": "DELETE", "module": "CONTACT", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "uidwe", "phone": "01760564065", "address": "Barisal", "occupation": "dwdoew"}, "targetId": "5bc0f659-b449-4a7c-895a-a07155d1624a", "createdAt": "2026-09-30T09:56:35.045Z", "isDeleted": false, "updatedAt": "2026-09-30T10:00:11.822Z", "reviewedAt": "2026-09-30T10:00:11.815Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxupn100011culupnnrgdv", "action": "UPDATE", "module": "CAR_RENT", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"area": "Mirpur 22", "rent": 900, "address": "Dhaka Mirpur"}, "oldData": {"area": "Mirpur 2", "rent": 900, "address": "Dhaka Mirpur"}, "targetId": "628b2dc8-3223-4468-b3ca-fa321744d2bb", "createdAt": "2026-09-30T10:04:22.477Z", "isDeleted": false, "updatedAt": "2026-09-30T10:04:42.236Z", "reviewedAt": "2026-09-30T10:04:42.235Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxvhjz00031culhfu3qadl", "action": "UPDATE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"area": "Mirpur 2", "rent": 900, "address": "Dhaka Mirpur"}, "oldData": {"area": "Mirpur 22", "rent": 900, "address": "Dhaka Mirpur"}, "targetId": "628b2dc8-3223-4468-b3ca-fa321744d2bb", "createdAt": "2026-09-30T10:04:58.655Z", "isDeleted": false, "updatedAt": "2026-09-30T10:05:10.965Z", "reviewedAt": "2026-09-30T10:05:10.964Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxw4hn00041culp3ixrsjl", "action": "DELETE", "module": "CAR_RENT", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Mirpur 22", "rent": 900, "address": "Dhaka Mirpur"}, "targetId": "628b2dc8-3223-4468-b3ca-fa321744d2bb", "createdAt": "2026-09-30T10:05:28.379Z", "isDeleted": false, "updatedAt": "2026-09-30T10:05:38.750Z", "reviewedAt": "2026-09-30T10:05:38.750Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxwynw00061culjc52fjn8", "action": "DELETE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Mirpur 22", "rent": 700, "address": "গঙ্গাপুর, বোরহানউদ্দিন"}, "targetId": "7c32b3ff-17df-455c-aea1-db9ed7165351", "createdAt": "2026-09-30T10:06:07.484Z", "isDeleted": false, "updatedAt": "2026-09-30T10:06:15.939Z", "reviewedAt": "2026-09-30T10:06:15.939Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmunxzi8r0000ewulal4ftwym", "action": "DELETE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Alomdanga", "rent": 100, "address": "Dhaka Mirpur"}, "targetId": "46d3a8e8-d9b1-4bf0-b14f-f1cbb672a58a", "createdAt": "2026-09-30T10:08:06.171Z", "isDeleted": false, "updatedAt": "2026-09-30T10:08:32.024Z", "reviewedAt": "2026-09-30T10:08:32.021Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuny0xqm0000vsulouslgm67", "action": "DELETE", "module": "CAR_RENT", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Alomdanga", "rent": 509, "address": "Dhaka Mirpur"}, "targetId": "70f00eff-b827-41d8-8501-ca491ce52266", "createdAt": "2026-09-30T10:09:12.910Z", "isDeleted": false, "updatedAt": "2026-09-30T10:09:26.616Z", "reviewedAt": "2026-09-30T10:09:26.613Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuny1t9i0002vsul1cksm8vg", "action": "DELETE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}, "targetId": "38f37f7d-cc70-48fa-8cc8-839befe51e23", "createdAt": "2026-09-30T10:09:53.766Z", "isDeleted": false, "updatedAt": "2026-09-30T10:10:03.619Z", "reviewedAt": "2026-09-30T10:10:03.617Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuny29th0003vsull8j9w59s", "action": "UPDATE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"area": "Baofol", "rent": 100, "address": "Dhaka Mirpur"}, "oldData": {"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}, "targetId": "38f37f7d-cc70-48fa-8cc8-839befe51e23", "createdAt": "2026-09-30T10:10:15.221Z", "isDeleted": false, "updatedAt": "2026-09-30T10:10:26.380Z", "reviewedAt": "2026-09-30T10:10:26.380Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuny6k3h00005gulkqmhn49b", "action": "DELETE", "module": "CONTACT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "Mahbubul Hasan", "phone": "01760564065", "address": "Barisal", "occupation": "w"}, "targetId": "28b8de1b-9065-4513-afdd-a7fddc6b827e", "createdAt": "2026-09-30T10:13:35.165Z", "isDeleted": false, "updatedAt": "2026-09-30T10:13:45.899Z", "reviewedAt": "2026-09-30T10:13:45.895Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuo5e2zq0000g0ultmxbbmwp", "action": "DELETE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}, "targetId": "38f37f7d-cc70-48fa-8cc8-839befe51e23", "createdAt": "2026-09-30T13:35:23.558Z", "isDeleted": false, "updatedAt": "2026-09-30T13:35:46.427Z", "reviewedAt": "2026-09-30T13:35:46.426Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuo5g2ti0001g0ulfkgibpyf", "action": "DELETE", "module": "CAR_RENT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"area": "Baofol", "rent": 0, "address": "Dhaka Mirpur"}, "targetId": "38f37f7d-cc70-48fa-8cc8-839befe51e23", "createdAt": "2026-09-30T13:36:56.646Z", "isDeleted": false, "updatedAt": "2026-09-30T13:37:05.481Z", "reviewedAt": "2026-09-30T13:37:05.479Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuo5h3ve0002g0ulg7syel78", "action": "DELETE", "module": "CONTACT", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "tre", "phone": "01760564065", "address": "tert", "occupation": "Studentt"}, "targetId": "75608cdb-3a50-4c74-81c2-09e1b3200db5", "createdAt": "2026-09-30T13:37:44.666Z", "isDeleted": false, "updatedAt": "2026-09-30T13:37:52.117Z", "reviewedAt": "2026-09-30T13:37:52.117Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmuo5jk7i0003g0ul25bl779m", "action": "UPDATE", "module": "CONTACT", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "tre", "phone": "01760564065", "address": "tertg", "occupation": "Studentt"}, "oldData": {"name": "tre", "phone": "01760564065", "address": "tert", "occupation": "Studentt"}, "targetId": "75608cdb-3a50-4c74-81c2-09e1b3200db5", "createdAt": "2026-09-30T13:39:39.150Z", "isDeleted": false, "updatedAt": "2026-09-30T13:39:39.150Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup1h4i30000wculbo9zc9mj", "action": "DELETE", "module": "STOCK", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "পিকেট", "stockIn": 700, "stockOut": 0}, "targetId": "9fb05ae3-312c-494c-b0ce-9e7fcff1c346", "createdAt": "2026-10-01T04:33:33.195Z", "isDeleted": false, "updatedAt": "2026-10-01T05:07:06.865Z", "reviewedAt": "2026-10-01T05:07:06.860Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup2oi3b0001wculsezpi04q", "action": "DELETE", "module": "STOCK", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "পিকেট", "stockIn": 700, "stockOut": 0}, "targetId": "9fb05ae3-312c-494c-b0ce-9e7fcff1c346", "createdAt": "2026-10-01T05:07:17.015Z", "isDeleted": false, "updatedAt": "2026-10-01T05:07:26.085Z", "reviewedAt": "2026-10-01T05:07:26.084Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup48ne400016oulb5a9wb5h", "action": "UPDATE", "module": "CUSTOMER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Mredul", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "oldData": {"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "targetId": "004", "createdAt": "2026-10-01T05:50:56.620Z", "isDeleted": false, "updatedAt": "2026-10-01T05:51:17.348Z", "reviewedAt": "2026-10-01T05:51:17.345Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4btgl0000e0ulctb2n6ta", "action": "UPDATE", "module": "CUSTOMER", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Mredulll", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "oldData": {"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "targetId": "004", "createdAt": "2026-10-01T05:53:24.453Z", "isDeleted": false, "updatedAt": "2026-10-01T05:53:24.453Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4dmw600009kul3hahkxw0", "action": "UPDATE", "module": "CUSTOMER", "status": "PENDING", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Mredul", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "oldData": {"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "targetId": "004", "createdAt": "2026-10-01T05:54:49.254Z", "isDeleted": false, "updatedAt": "2026-10-01T05:54:49.254Z", "reviewedAt": null, "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4gkf100019kultrjzb9f1", "action": "UPDATE", "module": "CUSTOMER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "oldData": {"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "targetId": "004", "createdAt": "2026-10-01T05:57:06.013Z", "isDeleted": false, "updatedAt": "2026-10-01T06:03:13.810Z", "reviewedAt": "2026-10-01T06:03:13.808Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4oc730000bsulcxhttxhp", "action": "UPDATE", "module": "CUSTOMER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "ইমরান হোসেনn", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "oldData": {"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "targetId": "003", "createdAt": "2026-10-01T06:03:08.608Z", "isDeleted": false, "updatedAt": "2026-10-01T06:03:46.572Z", "reviewedAt": "2026-10-01T06:03:46.571Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4pd530003bsul82fkir9g", "action": "UPDATE", "module": "CUSTOMER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "oldData": {"name": "ইমরান হোসেনn", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "targetId": "003", "createdAt": "2026-10-01T06:03:56.487Z", "isDeleted": false, "updatedAt": "2026-10-01T06:04:07.018Z", "reviewedAt": "2026-10-01T06:04:07.017Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4pzl90005bsulyysgtxv7", "action": "UPDATE", "module": "CUSTOMER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Mredul", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "oldData": {"name": "Mredull", "address": "Dhaka Mirpur", "phoneNumber": "01407128155", "customerCode": "004"}, "targetId": "004", "createdAt": "2026-10-01T06:04:25.581Z", "isDeleted": false, "updatedAt": "2026-10-01T06:04:34.745Z", "reviewedAt": "2026-10-01T06:04:34.742Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4vzob0000q8uljakunxbz", "action": "UPDATE", "module": "CUSTOMER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}, "oldData": {"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "targetId": "003", "createdAt": "2026-10-01T06:09:05.628Z", "isDeleted": false, "updatedAt": "2026-10-01T06:09:12.424Z", "reviewedAt": "2026-10-01T06:09:12.422Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4wef80002q8ulwe2028ez", "action": "UPDATE", "module": "CUSTOMER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "oldData": {"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}, "targetId": "003", "createdAt": "2026-10-01T06:09:24.740Z", "isDeleted": false, "updatedAt": "2026-10-01T06:09:30.224Z", "reviewedAt": "2026-10-01T06:09:30.220Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4wsnb0003q8ulorojrg38", "action": "UPDATE", "module": "CUSTOMER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "oldData": {"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}, "targetId": "003", "createdAt": "2026-10-01T06:09:43.175Z", "isDeleted": false, "updatedAt": "2026-10-01T06:09:50.407Z", "reviewedAt": "2026-10-01T06:09:50.407Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmup4xflq0004q8ulxd5j072l", "action": "UPDATE", "module": "CUSTOMER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "ইমরান হোসেন", "address": "চরবাটা", "phoneNumber": "01407128100", "customerCode": "003"}, "oldData": {"name": "ইমরান হোসেন", "address": "চরবাটা5", "phoneNumber": "01407128100", "customerCode": "003"}, "targetId": "003", "createdAt": "2026-10-01T06:10:12.926Z", "isDeleted": false, "updatedAt": "2026-10-01T06:10:18.260Z", "reviewedAt": "2026-10-01T06:10:18.260Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmupc1apo000180ulp034knuo", "action": "UPDATE", "module": "USER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Suvash Babu g", "role": "OWNER", "username": "suvash"}, "oldData": {"name": "Suvash Babu", "role": "OWNER", "username": "suvash"}, "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-01T09:29:10.524Z", "isDeleted": false, "updatedAt": "2026-10-01T09:29:22.161Z", "reviewedAt": "2026-10-01T09:29:22.158Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmupc20jd000280ulqziwkt83", "action": "UPDATE", "module": "USER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Suvash Babu 5\\\\", "role": "OWNER", "username": "suvash"}, "oldData": {"name": "Suvash Babu", "role": "OWNER", "username": "suvash"}, "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-01T09:29:43.993Z", "isDeleted": false, "updatedAt": "2026-10-01T09:29:50.111Z", "reviewedAt": "2026-10-01T09:29:50.109Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmupc2cly000480ulv6qbzjlz", "action": "UPDATE", "module": "USER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": {"name": "Suvash Babu", "role": "OWNER", "username": "suvash"}, "oldData": {"name": "Suvash Babu 5\\\\", "role": "OWNER", "username": "suvash"}, "targetId": "1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae", "createdAt": "2026-10-01T09:29:59.638Z", "isDeleted": false, "updatedAt": "2026-10-01T09:30:04.488Z", "reviewedAt": "2026-10-01T09:30:04.487Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmupcd0lq000680ultmwy3ynd", "action": "DELETE", "module": "USER", "status": "CANCELLED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "Sabbir", "role": "OPERATOR", "username": "kk"}, "targetId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "createdAt": "2026-10-01T09:38:17.294Z", "isDeleted": false, "updatedAt": "2026-10-01T09:39:03.113Z", "reviewedAt": "2026-10-01T09:39:03.112Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}, {"id": "cmupce6ev000780ulesv7wot6", "action": "DELETE", "module": "USER", "status": "APPROVED", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "newData": null, "oldData": {"name": "Sabbir", "role": "OPERATOR", "username": "kk"}, "targetId": "d7b86b05-c570-43ba-a83c-bdfbd1a80328", "createdAt": "2026-10-01T09:39:11.479Z", "isDeleted": false, "updatedAt": "2026-10-01T09:39:19.892Z", "reviewedAt": "2026-10-01T09:39:19.892Z", "requestedById": "a4a9e555-07d1-477e-82ad-ee9f42f3385b"}], "receivablePayables": [{"id": "f808695f-f7f4-4329-a176-24834b6eec59", "name": "Shakib Hasan", "phone": "01760564065", "amount": "2500", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Barisal", "createdAt": "2026-09-15T01:08:56.219Z", "isDeleted": false, "updatedAt": "2026-09-15T01:09:16.644Z", "witnessOne": "atel", "witnessTwo": "matel", "description": "md4dftgyhujio", "paymentDate": "2026-09-29T18:00:00.000Z", "currentAmount": "2500", "transactionDate": "2026-09-14T18:00:00.000Z", "transactionType": "GIVEN"}, {"id": "732f500d-c0b4-4403-a4f0-c0bdda77138b", "name": "Mahbubul Hasan", "phone": "01760564065", "amount": "10000", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "address": "Barisal", "createdAt": "2026-09-15T02:15:45.190Z", "isDeleted": false, "updatedAt": "2026-09-15T02:15:45.190Z", "witnessOne": "two", "witnessTwo": "one", "description": "ee", "paymentDate": "2026-09-29T18:00:00.000Z", "currentAmount": "10000", "transactionDate": "2026-09-14T18:00:00.000Z", "transactionType": "TAKEN"}], "brickStockSummaries": [{"id": "52719b69-26b7-4074-8171-cd1f905230c1", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "rawBrick": 1100, "createdAt": "2026-09-13T03:25:57.698Z", "updatedAt": "2026-09-29T11:36:08.682Z", "fieldBrick": 1000, "stockBrick": 0, "chulliBrick": 4900}], "carIncomeDeliveries": [], "goodsStockCategories": [{"id": "9ceeed09-2676-447e-9ed3-91260aac411b", "name": "Electronicss", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-12T19:12:48.095Z", "isDeleted": false, "updatedAt": "2026-09-12T19:12:53.253Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "8049565d-8420-4c28-a5e0-e08e8bdd7225", "name": "Tanvir", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-12T19:30:31.957Z", "isDeleted": true, "updatedAt": "2026-09-12T19:30:35.644Z", "deleteStatus": "DEFAULT", "updateStatus": "DEFAULT"}, {"id": "fb147b3c-b96e-488d-b625-bb84647886a0", "name": "Mursalinn", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-29T09:17:13.388Z", "isDeleted": true, "updatedAt": "2026-09-29T09:17:31.257Z", "deleteStatus": "APPROVED", "updateStatus": "APPROVED"}, {"id": "9fa5234f-59a6-40be-b0e2-a43529c3c49c", "name": "Tanvir", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-29T09:18:30.420Z", "isDeleted": true, "updatedAt": "2026-09-29T09:18:36.884Z", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}, {"id": "e99260c7-90d4-4f78-a2e5-49d51e2ec96f", "name": "Motorchycle", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-29T09:19:29.115Z", "isDeleted": false, "updatedAt": "2026-09-29T09:19:33.429Z", "deleteStatus": "DEFAULT", "updateStatus": "PENDING"}, {"id": "534d9437-ad31-4640-a2e2-3217b4412d6f", "name": "Mursalinn", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-29T09:21:32.181Z", "isDeleted": false, "updatedAt": "2026-09-29T09:21:53.750Z", "deleteStatus": "DEFAULT", "updateStatus": "APPROVED"}, {"id": "05d84354-ea44-4657-8acd-c0a4c31622e4", "name": "Mursalins", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-29T09:21:28.404Z", "isDeleted": true, "updatedAt": "2026-09-29T09:23:14.170Z", "deleteStatus": "APPROVED", "updateStatus": "DEFAULT"}], "smsRechargeHistories": [], "subscriptionPayments": [{"id": "68205d9c-ba4d-4e80-83dd-4e89d955bbd0", "amount": "1000", "paidAt": "2026-09-11T20:08:59.289Z", "status": "PAID", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2026-10-09T18:00:00.000Z", "createdAt": "2026-09-11T20:08:59.294Z", "startDate": "2026-09-11T20:08:59.289Z", "updatedAt": "2026-09-11T20:08:59.294Z", "phoneNumber": "1st", "paymentMethod": "1st", "transactionId": "1st", "subscriptionPlanId": "2a303882-9075-4173-9684-9e948fb48490"}, {"id": "99e6072d-b83c-4778-a0f4-8f49f86b778d", "amount": "1000", "paidAt": "2026-10-15T05:38:46.867Z", "status": "PAID", "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "endDate": "2026-11-15T05:38:46.867Z", "createdAt": "2026-10-15T05:37:47.790Z", "startDate": "2026-10-15T05:38:46.867Z", "updatedAt": "2026-10-15T05:38:46.871Z", "phoneNumber": "01407128177", "paymentMethod": "bkash", "transactionId": "8888", "subscriptionPlanId": "2a303882-9075-4173-9684-9e948fb48490"}], "deliveryStatusActionTimes": [], "receivablePayableTransactions": [{"id": "f0fdb21c-fb8e-4a0d-9e3f-2060bc9beb86", "type": "GIVEN", "amount": 500, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "createdAt": "2026-09-15T01:09:16.636Z", "remaining": 2500, "updatedAt": "2026-09-15T01:09:16.636Z", "description": "89", "transactionDate": "2026-09-29T18:00:00.000Z", "receivablePayableId": "f808695f-f7f4-4329-a176-24834b6eec59"}]}, "vataId": "3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4", "vataName": "M/s. Subhash Bricks Manufacturing", "createdAt": "2026-10-16T03:17:22.231Z"}	vata_V001_backup.json	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\vata_backupfile\\V001\\vata_V001_backup.json	226194	vata_V001_backup.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\vata_backupfile\\V001\\vata_V001_backup.sql	131528	45	470	{"Vata": 1, "cash": 6, "users": 6, "rounds": 1, "drivers": 5, "ledgers": 8, "seasons": 25, "smsLogs": 0, "unloads": 4, "weather": 0, "carRents": 3, "challans": 2, "contacts": 3, "payments": 6, "products": 0, "vataCars": 1, "customers": 4, "documents": 1, "loadInfos": 28, "smsWallet": 0, "deliveries": 0, "stockBooks": 1, "goodsIssues": 0, "goodsLosses": 0, "goodsStocks": 0, "unloadItems": 7, "activityLogs": 99, "challanItems": 2, "customerDues": 2, "taskManagers": 1, "classAndRates": 7, "notifications": 6, "dueCollections": 2, "goodHistoryLogs": 0, "login_histories": 162, "vataSmsSettings": 1, "approvalRequests": 63, "receivablePayables": 2, "brickStockSummaries": 1, "carIncomeDeliveries": 0, "goodsStockCategories": 7, "smsRechargeHistories": 0, "subscriptionPayments": 2, "deliveryStatusActionTimes": 0, "receivablePayableTransactions": 1}	2026-10-16 03:17:22.231
\.


--
-- Data for Name: vatainformation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vatainformation (id, "vataId", "nameEnglish", "nameBangla", address, "ownerName", "ownerPhoneNumber", "nextPaymentDate", "createdAt", "updatedAt", subdomain, status, "subscriptionPlanId", "subscriptionStart", "subscriptionEnd", "additionalAddress", "shortDescription", "challanManagerPhoneNumber", "challanPersonOneName", "challanPersonOnePhoneNumber", "challanPersonTwoName", "challanPersonTwoPhoneNumber", "shortForm") FROM stdin;
991cab71-e941-4f38-add3-c1d2f4b0e449	V002	test	ws	wse32	সুভাষ বাবু 	01407128177	2026-09-11 18:00:00	2026-09-11 20:17:07.465	2026-10-16 09:07:14.102	suw23	ACTIVE	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:17:07.457	2026-09-11 18:00:00	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু	01407128178	SBM
3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	V001	M/s. Subhash Bricks Manufacturing	মেসার্স সুভাষ ব্রিকস ম্যানুফ্যাকচারিং	আমান উল্যাহ,  সুবর্ণচর, নোয়াখালী	সুভাষ বাবু 	01407128177	2026-11-15 05:38:46.867	2026-09-11 20:08:59.27	2026-10-15 05:38:46.882	suvasbricks	ACTIVE	2a303882-9075-4173-9684-9e948fb48490	2026-10-15 05:38:46.867	2026-11-15 05:38:46.867	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু	01407128178	SBM
0a1e8395-aa43-400a-b92b-ab1fd26cd031	V003	মেসার্স সুভাষ ব্রিকস ম্যানুফ্যাকচারিংw	M/s. Subhash Bricks Manufacturing	আমান উল্যাহ,  সুবর্ণচর, নোয়াখালী	সুভাষ বাবু 	01407128177	2026-09-25 18:00:00	2026-09-21 17:33:15.511	2026-10-16 09:02:27.087	suvasbricksw	ACTIVE	2a303882-9075-4173-9684-9e948fb48490	2026-09-21 17:33:15.507	2026-09-25 18:00:00	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু	01407128178	SBMw
\.


--
-- Name: Payment_serial_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Payment_serial_seq"', 22, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


--
-- Name: AboutUs AboutUs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AboutUs"
    ADD CONSTRAINT "AboutUs_pkey" PRIMARY KEY (id);


--
-- Name: ActivityLog ActivityLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_pkey" PRIMARY KEY (id);


--
-- Name: ApprovalRequest ApprovalRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ApprovalRequest"
    ADD CONSTRAINT "ApprovalRequest_pkey" PRIMARY KEY (id);


--
-- Name: BrickStockSummary BrickStockSummary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BrickStockSummary"
    ADD CONSTRAINT "BrickStockSummary_pkey" PRIMARY KEY (id);


--
-- Name: CarIncomeDelivery CarIncomeDelivery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CarIncomeDelivery"
    ADD CONSTRAINT "CarIncomeDelivery_pkey" PRIMARY KEY (id);


--
-- Name: Contact Contact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);


--
-- Name: DatabaseBackupPermission DatabaseBackupPermission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DatabaseBackupPermission"
    ADD CONSTRAINT "DatabaseBackupPermission_pkey" PRIMARY KEY (id);


--
-- Name: DatabaseBackup DatabaseBackup_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DatabaseBackup"
    ADD CONSTRAINT "DatabaseBackup_pkey" PRIMARY KEY (id);


--
-- Name: DeliveryStatusActionTime DeliveryStatusActionTime_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeliveryStatusActionTime"
    ADD CONSTRAINT "DeliveryStatusActionTime_pkey" PRIMARY KEY (id);


--
-- Name: Document Document_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_pkey" PRIMARY KEY (id);


--
-- Name: Driver Driver_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "Driver_pkey" PRIMARY KEY (id);


--
-- Name: Faq Faq_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Faq"
    ADD CONSTRAINT "Faq_pkey" PRIMARY KEY (id);


--
-- Name: GoodHistoryLog GoodHistoryLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodHistoryLog"
    ADD CONSTRAINT "GoodHistoryLog_pkey" PRIMARY KEY (id);


--
-- Name: GoodsIssue GoodsIssue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsIssue"
    ADD CONSTRAINT "GoodsIssue_pkey" PRIMARY KEY (id);


--
-- Name: GoodsLoss GoodsLoss_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsLoss"
    ADD CONSTRAINT "GoodsLoss_pkey" PRIMARY KEY (id);


--
-- Name: GoodsStockCategory GoodsStockCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsStockCategory"
    ADD CONSTRAINT "GoodsStockCategory_pkey" PRIMARY KEY (id);


--
-- Name: GoodsStock GoodsStock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsStock"
    ADD CONSTRAINT "GoodsStock_pkey" PRIMARY KEY (id);


--
-- Name: HelpLine HelpLine_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HelpLine"
    ADD CONSTRAINT "HelpLine_pkey" PRIMARY KEY (id);


--
-- Name: Ledger Ledger_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ledger"
    ADD CONSTRAINT "Ledger_pkey" PRIMARY KEY (id);


--
-- Name: LoadInfo LoadInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LoadInfo"
    ADD CONSTRAINT "LoadInfo_pkey" PRIMARY KEY (id);


--
-- Name: LoginLimit LoginLimit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LoginLimit"
    ADD CONSTRAINT "LoginLimit_pkey" PRIMARY KEY (id);


--
-- Name: Note Note_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: ReceivablePayableTransaction ReceivablePayableTransaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReceivablePayableTransaction"
    ADD CONSTRAINT "ReceivablePayableTransaction_pkey" PRIMARY KEY (id);


--
-- Name: ReceivablePayable ReceivablePayable_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReceivablePayable"
    ADD CONSTRAINT "ReceivablePayable_pkey" PRIMARY KEY (id);


--
-- Name: Round Round_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Round"
    ADD CONSTRAINT "Round_pkey" PRIMARY KEY (id);


--
-- Name: Season Season_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Season"
    ADD CONSTRAINT "Season_pkey" PRIMARY KEY (id);


--
-- Name: SmsLog SmsLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsLog"
    ADD CONSTRAINT "SmsLog_pkey" PRIMARY KEY (id);


--
-- Name: SmsRechargeHistory SmsRechargeHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsRechargeHistory"
    ADD CONSTRAINT "SmsRechargeHistory_pkey" PRIMARY KEY (id);


--
-- Name: SmsSetting SmsSetting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsSetting"
    ADD CONSTRAINT "SmsSetting_pkey" PRIMARY KEY (id);


--
-- Name: SmsWallet SmsWallet_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsWallet"
    ADD CONSTRAINT "SmsWallet_pkey" PRIMARY KEY (id);


--
-- Name: StockBook StockBook_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StockBook"
    ADD CONSTRAINT "StockBook_pkey" PRIMARY KEY (id);


--
-- Name: SubscriptionPayment SubscriptionPayment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SubscriptionPayment"
    ADD CONSTRAINT "SubscriptionPayment_pkey" PRIMARY KEY (id);


--
-- Name: SubscriptionPlan SubscriptionPlan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SubscriptionPlan"
    ADD CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY (id);


--
-- Name: TaskManager TaskManager_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskManager"
    ADD CONSTRAINT "TaskManager_pkey" PRIMARY KEY (id);


--
-- Name: UnloadItem UnloadItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UnloadItem"
    ADD CONSTRAINT "UnloadItem_pkey" PRIMARY KEY (id);


--
-- Name: Unload Unload_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Unload"
    ADD CONSTRAINT "Unload_pkey" PRIMARY KEY (id);


--
-- Name: VataCar VataCar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VataCar"
    ADD CONSTRAINT "VataCar_pkey" PRIMARY KEY (id);


--
-- Name: VataSmsSettings VataSmsSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VataSmsSettings"
    ADD CONSTRAINT "VataSmsSettings_pkey" PRIMARY KEY (id);


--
-- Name: Weather Weather_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Weather"
    ADD CONSTRAINT "Weather_pkey" PRIMARY KEY (id);


--
-- Name: YoutubeLink YoutubeLink_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."YoutubeLink"
    ADD CONSTRAINT "YoutubeLink_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: carrents carrents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrents
    ADD CONSTRAINT carrents_pkey PRIMARY KEY (id);


--
-- Name: cash cash_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cash
    ADD CONSTRAINT cash_pkey PRIMARY KEY (id);


--
-- Name: challanItems challanItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."challanItems"
    ADD CONSTRAINT "challanItems_pkey" PRIMARY KEY (id);


--
-- Name: chllans chllans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chllans
    ADD CONSTRAINT chllans_pkey PRIMARY KEY (id);


--
-- Name: classAndRates classAndRates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."classAndRates"
    ADD CONSTRAINT "classAndRates_pkey" PRIMARY KEY (id);


--
-- Name: customerdues customerdues_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customerdues
    ADD CONSTRAINT customerdues_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: deliveries deliveries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_pkey PRIMARY KEY (id);


--
-- Name: duecollections duecollections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.duecollections
    ADD CONSTRAINT duecollections_pkey PRIMARY KEY (id);


--
-- Name: login_histories login_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_histories
    ADD CONSTRAINT login_histories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vata_backups vata_backups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vata_backups
    ADD CONSTRAINT vata_backups_pkey PRIMARY KEY (id);


--
-- Name: vatainformation vatainformation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vatainformation
    ADD CONSTRAINT vatainformation_pkey PRIMARY KEY (id);


--
-- Name: ActivityLog_vataId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ActivityLog_vataId_createdAt_idx" ON public."ActivityLog" USING btree ("vataId", "createdAt");


--
-- Name: ActivityLog_vataId_module_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ActivityLog_vataId_module_idx" ON public."ActivityLog" USING btree ("vataId", module);


--
-- Name: ActivityLog_vataId_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ActivityLog_vataId_userId_idx" ON public."ActivityLog" USING btree ("vataId", "userId");


--
-- Name: ApprovalRequest_module_targetId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ApprovalRequest_module_targetId_idx" ON public."ApprovalRequest" USING btree (module, "targetId");


--
-- Name: ApprovalRequest_targetId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ApprovalRequest_targetId_idx" ON public."ApprovalRequest" USING btree ("targetId");


--
-- Name: ApprovalRequest_vataId_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ApprovalRequest_vataId_status_idx" ON public."ApprovalRequest" USING btree ("vataId", status);


--
-- Name: BrickStockSummary_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "BrickStockSummary_vataId_key" ON public."BrickStockSummary" USING btree ("vataId");


--
-- Name: CarIncomeDelivery_deliveryId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "CarIncomeDelivery_deliveryId_key" ON public."CarIncomeDelivery" USING btree ("deliveryId");


--
-- Name: DeliveryStatusActionTime_deliveryId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "DeliveryStatusActionTime_deliveryId_key" ON public."DeliveryStatusActionTime" USING btree ("deliveryId");


--
-- Name: Document_parentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Document_parentId_idx" ON public."Document" USING btree ("parentId");


--
-- Name: Document_parentId_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Document_parentId_name_key" ON public."Document" USING btree ("parentId", name);


--
-- Name: Document_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Document_type_idx" ON public."Document" USING btree (type);


--
-- Name: Ledger_vataId_serial_name_seasonId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Ledger_vataId_serial_name_seasonId_key" ON public."Ledger" USING btree ("vataId", serial, name, "seasonId");


--
-- Name: LoginLimit_userId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "LoginLimit_userId_key" ON public."LoginLimit" USING btree ("userId");


--
-- Name: ReceivablePayableTransaction_receivablePayableId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ReceivablePayableTransaction_receivablePayableId_idx" ON public."ReceivablePayableTransaction" USING btree ("receivablePayableId");


--
-- Name: ReceivablePayableTransaction_transactionDate_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ReceivablePayableTransaction_transactionDate_idx" ON public."ReceivablePayableTransaction" USING btree ("transactionDate");


--
-- Name: ReceivablePayable_isDeleted_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ReceivablePayable_isDeleted_idx" ON public."ReceivablePayable" USING btree ("isDeleted");


--
-- Name: ReceivablePayable_phone_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ReceivablePayable_phone_idx" ON public."ReceivablePayable" USING btree (phone);


--
-- Name: ReceivablePayable_transactionType_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ReceivablePayable_transactionType_idx" ON public."ReceivablePayable" USING btree ("transactionType");


--
-- Name: Round_vataId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Round_vataId_idx" ON public."Round" USING btree ("vataId");


--
-- Name: Round_vataId_name_seasonId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Round_vataId_name_seasonId_key" ON public."Round" USING btree ("vataId", name, "seasonId");


--
-- Name: Season_vataId_isActive_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Season_vataId_isActive_idx" ON public."Season" USING btree ("vataId", "isActive");


--
-- Name: Season_vataId_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Season_vataId_name_key" ON public."Season" USING btree ("vataId", name);


--
-- Name: SmsLog_phoneNumber_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SmsLog_phoneNumber_idx" ON public."SmsLog" USING btree ("phoneNumber");


--
-- Name: SmsLog_sentAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SmsLog_sentAt_idx" ON public."SmsLog" USING btree ("sentAt");


--
-- Name: SmsLog_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SmsLog_status_idx" ON public."SmsLog" USING btree (status);


--
-- Name: SmsLog_vataId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "SmsLog_vataId_idx" ON public."SmsLog" USING btree ("vataId");


--
-- Name: SmsWallet_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SmsWallet_vataId_key" ON public."SmsWallet" USING btree ("vataId");


--
-- Name: SubscriptionPlan_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SubscriptionPlan_name_key" ON public."SubscriptionPlan" USING btree (name);


--
-- Name: SubscriptionPlan_type_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SubscriptionPlan_type_key" ON public."SubscriptionPlan" USING btree (type);


--
-- Name: UnloadItem_classId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UnloadItem_classId_idx" ON public."UnloadItem" USING btree ("classId");


--
-- Name: UnloadItem_unloadId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UnloadItem_unloadId_idx" ON public."UnloadItem" USING btree ("unloadId");


--
-- Name: Unload_roundId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Unload_roundId_idx" ON public."Unload" USING btree ("roundId");


--
-- Name: VataSmsSettings_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VataSmsSettings_vataId_key" ON public."VataSmsSettings" USING btree ("vataId");


--
-- Name: cash_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "cash_createdAt_idx" ON public.cash USING btree ("createdAt");


--
-- Name: cash_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cash_type_idx ON public.cash USING btree (type);


--
-- Name: cash_vataId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "cash_vataId_idx" ON public.cash USING btree ("vataId");


--
-- Name: chllans_vataId_serial_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "chllans_vataId_serial_key" ON public.chllans USING btree ("vataId", serial);


--
-- Name: classAndRates_vataId_classType_className_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "classAndRates_vataId_classType_className_key" ON public."classAndRates" USING btree ("vataId", "classType", "className");


--
-- Name: customerdues_challanId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "customerdues_challanId_key" ON public.customerdues USING btree ("challanId");


--
-- Name: customerdues_customerId_seasonId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "customerdues_customerId_seasonId_idx" ON public.customerdues USING btree ("customerId", "seasonId");


--
-- Name: customers_vataId_customerCode_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "customers_vataId_customerCode_key" ON public.customers USING btree ("vataId", "customerCode");


--
-- Name: deliveries_invoiceId_deliveryNo_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "deliveries_invoiceId_deliveryNo_key" ON public.deliveries USING btree ("invoiceId", "deliveryNo");


--
-- Name: duecollections_customerId_seasonId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "duecollections_customerId_seasonId_idx" ON public.duecollections USING btree ("customerId", "seasonId");


--
-- Name: login_histories_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "login_histories_userId_idx" ON public.login_histories USING btree ("userId");


--
-- Name: products_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_category_idx ON public.products USING btree (category);


--
-- Name: products_shop_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_shop_idx ON public.products USING btree (shop);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: vata_backups_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "vata_backups_vataId_key" ON public.vata_backups USING btree ("vataId");


--
-- Name: vatainformation_subdomain_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX vatainformation_subdomain_key ON public.vatainformation USING btree (subdomain);


--
-- Name: vatainformation_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "vatainformation_vataId_key" ON public.vatainformation USING btree ("vataId");


--
-- Name: ActivityLog ActivityLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ActivityLog ActivityLog_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ApprovalRequest ApprovalRequest_requestedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ApprovalRequest"
    ADD CONSTRAINT "ApprovalRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ApprovalRequest ApprovalRequest_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ApprovalRequest"
    ADD CONSTRAINT "ApprovalRequest_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BrickStockSummary BrickStockSummary_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BrickStockSummary"
    ADD CONSTRAINT "BrickStockSummary_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CarIncomeDelivery CarIncomeDelivery_carId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CarIncomeDelivery"
    ADD CONSTRAINT "CarIncomeDelivery_carId_fkey" FOREIGN KEY ("carId") REFERENCES public."VataCar"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CarIncomeDelivery CarIncomeDelivery_deliveryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CarIncomeDelivery"
    ADD CONSTRAINT "CarIncomeDelivery_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES public.deliveries(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CarIncomeDelivery CarIncomeDelivery_driverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CarIncomeDelivery"
    ADD CONSTRAINT "CarIncomeDelivery_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES public."Driver"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Contact Contact_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DeliveryStatusActionTime DeliveryStatusActionTime_deliveryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DeliveryStatusActionTime"
    ADD CONSTRAINT "DeliveryStatusActionTime_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES public.deliveries(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Document Document_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Document"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Driver Driver_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Driver"
    ADD CONSTRAINT "Driver_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GoodHistoryLog GoodHistoryLog_goodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodHistoryLog"
    ADD CONSTRAINT "GoodHistoryLog_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES public."GoodsStock"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GoodsIssue GoodsIssue_goodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsIssue"
    ADD CONSTRAINT "GoodsIssue_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES public."GoodsStock"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GoodsLoss GoodsLoss_goodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsLoss"
    ADD CONSTRAINT "GoodsLoss_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES public."GoodsStock"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GoodsStockCategory GoodsStockCategory_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsStockCategory"
    ADD CONSTRAINT "GoodsStockCategory_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GoodsStock GoodsStock_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsStock"
    ADD CONSTRAINT "GoodsStock_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."GoodsStockCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GoodsStock GoodsStock_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."GoodsStock"
    ADD CONSTRAINT "GoodsStock_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Ledger Ledger_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ledger"
    ADD CONSTRAINT "Ledger_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Ledger"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Ledger Ledger_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ledger"
    ADD CONSTRAINT "Ledger_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Ledger Ledger_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Ledger"
    ADD CONSTRAINT "Ledger_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LoadInfo LoadInfo_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LoadInfo"
    ADD CONSTRAINT "LoadInfo_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."classAndRates"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: LoadInfo LoadInfo_roundId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LoadInfo"
    ADD CONSTRAINT "LoadInfo_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES public."Round"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LoginLimit LoginLimit_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LoginLimit"
    ADD CONSTRAINT "LoginLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notification Notification_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_ledgerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES public."Ledger"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReceivablePayableTransaction ReceivablePayableTransaction_receivablePayableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReceivablePayableTransaction"
    ADD CONSTRAINT "ReceivablePayableTransaction_receivablePayableId_fkey" FOREIGN KEY ("receivablePayableId") REFERENCES public."ReceivablePayable"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReceivablePayableTransaction ReceivablePayableTransaction_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReceivablePayableTransaction"
    ADD CONSTRAINT "ReceivablePayableTransaction_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReceivablePayable ReceivablePayable_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReceivablePayable"
    ADD CONSTRAINT "ReceivablePayable_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Round Round_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Round"
    ADD CONSTRAINT "Round_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Round Round_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Round"
    ADD CONSTRAINT "Round_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Season Season_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Season"
    ADD CONSTRAINT "Season_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SmsLog SmsLog_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsLog"
    ADD CONSTRAINT "SmsLog_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SmsRechargeHistory SmsRechargeHistory_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsRechargeHistory"
    ADD CONSTRAINT "SmsRechargeHistory_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SmsWallet SmsWallet_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SmsWallet"
    ADD CONSTRAINT "SmsWallet_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StockBook StockBook_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StockBook"
    ADD CONSTRAINT "StockBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StockBook StockBook_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StockBook"
    ADD CONSTRAINT "StockBook_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StockBook StockBook_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StockBook"
    ADD CONSTRAINT "StockBook_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SubscriptionPayment SubscriptionPayment_subscriptionPlanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SubscriptionPayment"
    ADD CONSTRAINT "SubscriptionPayment_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES public."SubscriptionPlan"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SubscriptionPayment SubscriptionPayment_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SubscriptionPayment"
    ADD CONSTRAINT "SubscriptionPayment_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TaskManager TaskManager_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskManager"
    ADD CONSTRAINT "TaskManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaskManager TaskManager_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TaskManager"
    ADD CONSTRAINT "TaskManager_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UnloadItem UnloadItem_classId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UnloadItem"
    ADD CONSTRAINT "UnloadItem_classId_fkey" FOREIGN KEY ("classId") REFERENCES public."classAndRates"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UnloadItem UnloadItem_unloadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UnloadItem"
    ADD CONSTRAINT "UnloadItem_unloadId_fkey" FOREIGN KEY ("unloadId") REFERENCES public."Unload"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Unload Unload_roundId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Unload"
    ADD CONSTRAINT "Unload_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES public."Round"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VataCar VataCar_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VataCar"
    ADD CONSTRAINT "VataCar_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VataSmsSettings VataSmsSettings_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VataSmsSettings"
    ADD CONSTRAINT "VataSmsSettings_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Weather Weather_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Weather"
    ADD CONSTRAINT "Weather_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: carrents carrents_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrents
    ADD CONSTRAINT "carrents_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cash cash_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cash
    ADD CONSTRAINT "cash_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cash cash_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cash
    ADD CONSTRAINT "cash_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: challanItems challanItems_challanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."challanItems"
    ADD CONSTRAINT "challanItems_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES public.chllans(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chllans chllans_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chllans
    ADD CONSTRAINT "chllans_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chllans chllans_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chllans
    ADD CONSTRAINT "chllans_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chllans chllans_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chllans
    ADD CONSTRAINT "chllans_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chllans chllans_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chllans
    ADD CONSTRAINT "chllans_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: classAndRates classAndRates_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."classAndRates"
    ADD CONSTRAINT "classAndRates_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: customerdues customerdues_challanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customerdues
    ADD CONSTRAINT "customerdues_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES public.chllans(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: customerdues customerdues_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customerdues
    ADD CONSTRAINT "customerdues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: customerdues customerdues_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customerdues
    ADD CONSTRAINT "customerdues_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: customers customers_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT "customers_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: deliveries deliveries_deliveryById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT "deliveries_deliveryById_fkey" FOREIGN KEY ("deliveryById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: deliveries deliveries_driverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT "deliveries_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES public."Driver"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: deliveries deliveries_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT "deliveries_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.chllans(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: duecollections duecollections_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.duecollections
    ADD CONSTRAINT "duecollections_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: duecollections duecollections_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.duecollections
    ADD CONSTRAINT "duecollections_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: login_histories login_histories_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login_histories
    ADD CONSTRAINT "login_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vata_backups vata_backups_vataId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vata_backups
    ADD CONSTRAINT "vata_backups_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES public.vatainformation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vatainformation vatainformation_subscriptionPlanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vatainformation
    ADD CONSTRAINT "vatainformation_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES public."SubscriptionPlan"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict YBcbiiUEGeMOuV5ScBVtYO5MBqndvMXMTvAYANfLvcxWczZVrquQ1ndGp2KDcOC

