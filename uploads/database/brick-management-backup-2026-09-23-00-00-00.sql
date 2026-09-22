--
-- PostgreSQL database dump
--

\restrict JSVFWkaWdJ2lVDYSzqMm04tIiElBtRifpQCD3gUNBCjD6QynZ5f8peFD5nBG7iu

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
    'SUPER_ADMIN'
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
    "vataId" text NOT NULL
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
    "updatedAt" timestamp(3) without time zone NOT NULL
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
    "isDeleted" boolean DEFAULT false NOT NULL
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
    "startDate" text
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
    "updatedAt" timestamp(3) without time zone NOT NULL
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
    serial integer NOT NULL
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
    "vataId" text NOT NULL
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
    "updatedAt" timestamp(3) without time zone NOT NULL
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
    "vataId" text NOT NULL
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
    "seasonId" text NOT NULL
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
    "deliveryDate" timestamp(3) without time zone NOT NULL,
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
    "deliveryDate" timestamp(3) without time zone NOT NULL,
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
    "carRent" double precision
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
    "vataId" text NOT NULL
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
    "vataId" text NOT NULL
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
    "driverId" text
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
    "updatedAt" timestamp(3) without time zone NOT NULL
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
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    "vataId" text
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
-- Data for Name: BrickStockSummary; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BrickStockSummary" (id, "vataId", "rawBrick", "fieldBrick", "stockBrick", "chulliBrick", "createdAt", "updatedAt") FROM stdin;
52719b69-26b7-4074-8171-cd1f905230c1	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2000	1000	0	2000	2026-09-13 03:25:57.698	2026-09-14 18:45:39.837
\.


--
-- Data for Name: CarIncomeDelivery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CarIncomeDelivery" (id, amount, "driverId", "deliveryId", "carId", "createdAt", "updatedAt") FROM stdin;
b1e8add2-c662-46aa-a47c-74d6b30d5dba	500	f575a0fa-6f73-4478-bfb3-6c76c16159e2	c99a2b14-26cc-4788-b4cd-7da61e21bc97	cb1bd3ea-c34f-4327-b413-7f52bc62855b	2026-09-14 18:46:03.247	2026-09-14 18:46:03.247
557071e7-684e-4b0f-a962-8a9327686cd4	500	f575a0fa-6f73-4478-bfb3-6c76c16159e2	76cca55f-b0a9-4eb9-a961-38c3e5412458	cb1bd3ea-c34f-4327-b413-7f52bc62855b	2026-09-14 18:47:51.493	2026-09-14 18:47:51.493
8db1a236-e23c-4503-9f3b-6f5d9c957f18	500	f575a0fa-6f73-4478-bfb3-6c76c16159e2	45cd10ee-adee-4a8f-9427-de8d7a089093	cb1bd3ea-c34f-4327-b413-7f52bc62855b	2026-09-14 22:55:49.754	2026-09-14 22:55:49.754
e5761a91-7a3d-445c-be52-9cefea3fd2ab	500	f575a0fa-6f73-4478-bfb3-6c76c16159e2	0143f79d-1f76-4a7e-af53-d486706ab343	cb1bd3ea-c34f-4327-b413-7f52bc62855b	2026-09-14 22:57:10.64	2026-09-14 22:57:10.64
4b864126-5f6a-4009-815f-15b38f8ef429	200	f575a0fa-6f73-4478-bfb3-6c76c16159e2	ff88339c-5527-4823-8ef6-08f8a5348d7a	cb1bd3ea-c34f-4327-b413-7f52bc62855b	2026-09-14 22:57:55.127	2026-09-14 22:57:55.127
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Contact" (id, name, address, occupation, phone, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: DatabaseBackup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DatabaseBackup" (id, "createdAt", "fileName", "filePath", "fileSize", "tableCount", "tableRowCounts", "totalRowCount", type) FROM stdin;
740a2e32-05cd-4c64-8542-9b9af7661b48	2026-09-13 05:38:13.465	brick-management-backup-2026-09-13-11-38-13.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-13-11-38-13.sql	110820	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 3, "Driver": 0, "Ledger": 0, "Season": 50, "SmsLog": 0, "Unload": 0, "AboutUs": 1, "Contact": 0, "Payment": 0, "VataCar": 1, "Weather": 0, "chllans": 3, "Document": 1, "HelpLine": 1, "LoadInfo": 1, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 2, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 0, "UnloadItem": 0, "deliveries": 0, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 3, "customerdues": 3, "classAndRates": 1, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 0, "login_histories": 27, "vatainformation": 2, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 0, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 30, "SubscriptionPayment": 2, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 0}	147	MANUAL
a986a596-7f50-4672-833e-55a66dec0953	2026-09-13 05:46:26.255	brick-management-backup-2026-09-13-11-46-25.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-13-11-46-25.sql	109655	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 3, "Driver": 0, "Ledger": 0, "Season": 50, "SmsLog": 0, "Unload": 0, "AboutUs": 1, "Contact": 0, "Payment": 0, "VataCar": 1, "Weather": 0, "chllans": 3, "Document": 1, "HelpLine": 1, "LoadInfo": 1, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 2, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 0, "UnloadItem": 0, "deliveries": 0, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 3, "customerdues": 3, "classAndRates": 1, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 0, "login_histories": 27, "vatainformation": 2, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 0, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 30, "SubscriptionPayment": 2, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 0}	147	MANUAL
5b3734bb-c28c-46de-8d15-b476864fa809	2026-09-13 05:46:27.75	brick-management-backup-2026-09-13-11-46-27.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-13-11-46-27.sql	110820	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 3, "Driver": 0, "Ledger": 0, "Season": 50, "SmsLog": 0, "Unload": 0, "AboutUs": 1, "Contact": 0, "Payment": 0, "VataCar": 1, "Weather": 0, "chllans": 3, "Document": 1, "HelpLine": 1, "LoadInfo": 1, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 2, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 0, "UnloadItem": 0, "deliveries": 0, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 3, "customerdues": 3, "classAndRates": 1, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 0, "login_histories": 27, "vatainformation": 2, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 0, "ReceivablePayable": 0, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 30, "SubscriptionPayment": 2, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 0}	147	MANUAL
da7d8e53-1691-4037-938a-08a0c7efe5bd	2026-09-21 18:00:02.045	brick-management-backup-2026-09-22-00-00-00.sql	E:\\It Vata\\Brick_kiln_Management_Software_Server\\uploads\\database\\brick-management-backup-2026-09-22-00-00-00.sql	128802	51	{"Faq": 2, "Note": 0, "cash": 0, "Round": 1, "users": 4, "Driver": 2, "Ledger": 5, "Season": 75, "SmsLog": 0, "Unload": 1, "AboutUs": 1, "Contact": 0, "Payment": 4, "VataCar": 2, "Weather": 0, "chllans": 4, "Document": 2, "HelpLine": 1, "LoadInfo": 5, "carrents": 0, "products": 0, "GoodsLoss": 0, "SmsWallet": 0, "StockBook": 0, "customers": 3, "GoodsIssue": 0, "GoodsStock": 0, "SmsSetting": 1, "UnloadItem": 1, "deliveries": 5, "TaskManager": 0, "YoutubeLink": 2, "Notification": 6, "challanItems": 4, "customerdues": 4, "classAndRates": 2, "GoodHistoryLog": 0, "duecollections": 0, "VataSmsSettings": 1, "login_histories": 47, "vatainformation": 3, "SubscriptionPlan": 1, "BrickStockSummary": 1, "CarIncomeDelivery": 5, "ReceivablePayable": 2, "GoodsStockCategory": 2, "SmsRechargeHistory": 0, "_prisma_migrations": 32, "SubscriptionPayment": 3, "DatabaseBackupPermission": 1, "ReceivablePayableTransaction": 1}	236	AUTO
\.


--
-- Data for Name: DatabaseBackupPermission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DatabaseBackupPermission" (id, type) FROM stdin;
47a64748-f851-494f-b248-097663c13912	AUTO
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Document" (id, name, type, "parentId", "fileUrl", "fileKey", "mimeType", size, extension, "createdAt", "updatedAt", "vataId") FROM stdin;
cmtyt6rq100005cul7e4hp6vo	chalan-1788949309884-1789243172525-546405515.pdf	FILE	\N			application/pdf	122762	pdf	2026-09-12 19:59:32.569	2026-09-12 19:59:32.569	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
cmu1jbo9h0000e8ul5u915iyy	WIN_20260814_05_48_13_Pro-1789408003630-643051661.mp4	FILE	\N			video/mp4	17250703	mp4	2026-09-14 17:46:43.733	2026-09-14 17:46:43.733	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Driver" (id, name, "PhoneNumber", salary, "vataId", "createdAt", "updatedAt") FROM stdin;
f575a0fa-6f73-4478-bfb3-6c76c16159e2	Shakib Hasan	01407128177	0.00	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-14 18:42:01.557	2026-09-14 18:42:01.557
86e0d11b-e7ee-499b-b97e-d4ecc0766650	Shakib Hasan	01407128177	0.00	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2026-09-21 17:37:34.251	2026-09-21 17:37:34.251
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

COPY public."GoodsStockCategory" (id, name, "createdAt", "updatedAt", "vataId", "isDeleted") FROM stdin;
9ceeed09-2676-447e-9ed3-91260aac411b	Electronicss	2026-09-12 19:12:48.095	2026-09-12 19:12:53.253	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f
8049565d-8420-4c28-a5e0-e08e8bdd7225	Tanvir	2026-09-12 19:30:31.957	2026-09-12 19:30:35.644	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	t
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

COPY public."Ledger" (id, name, serial, "createdAt", "updatedAt", "parentId", rate, quantity, "isDeleted", "vataId", "seasonId", "phoneNumber", "startDate") FROM stdin;
f91816f5-be5c-4038-85f1-24f3961589ee	ম্যানেজার	1	2026-09-21 17:17:38.435	2026-09-21 17:17:38.435	\N	0	0	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N
997b6baf-7691-45c5-b23a-385e54ee5251	অন্তু ম্যানেজার	2	2026-09-21 17:17:47.01	2026-09-21 17:17:52.039	f91816f5-be5c-4038-85f1-24f3961589ee	0	0	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	11fdc269-699e-4a88-9092-f8f173bc55ac		\N
297751f4-0479-48cf-b46a-3759591bc42b	ম্যানেজার	1	2026-09-21 17:43:18.284	2026-09-21 17:43:18.284	\N	0	0	f	0a1e8395-aa43-400a-b92b-ab1fd26cd031	7ab12477-1de7-412e-aad2-8477b7723826		\N
1d278077-28bb-44f2-8204-ef26da50b8cc	অন্তু ম্যানেজার	2	2026-09-21 17:43:24.769	2026-09-21 17:44:00.719	297751f4-0479-48cf-b46a-3759591bc42b	0	0	t	0a1e8395-aa43-400a-b92b-ab1fd26cd031	7ab12477-1de7-412e-aad2-8477b7723826		\N
cdce478f-3a6d-4e0c-831e-fa926e632104	অন্তু ম্যানেজার	3	2026-09-21 17:46:52.607	2026-09-21 17:46:52.607	297751f4-0479-48cf-b46a-3759591bc42b	0	0	f	0a1e8395-aa43-400a-b92b-ab1fd26cd031	7ab12477-1de7-412e-aad2-8477b7723826		\N
\.


--
-- Data for Name: LoadInfo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."LoadInfo" (id, date, "roundId", quantity, "loadType", "classId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
3ef54b97-bf24-4a16-a2f1-576ec612dba6	2026-09-13 03:25:46.15	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	RAWENTRY	\N	f	2026-09-13 03:25:57.703	2026-09-13 03:25:57.703
43f8fd5e-f0c9-458a-8e8f-8ecf4b74904e	2026-09-14 18:43:30.305	3f55423d-5264-4ddd-b0b6-1eed321e0efc	5000	RAWENTRY	\N	f	2026-09-14 18:43:36.533	2026-09-14 18:43:36.533
e3042834-df70-4fa4-afd3-46ee026a932b	2026-09-14 18:43:38.619	3f55423d-5264-4ddd-b0b6-1eed321e0efc	5000	RAW_TO_FIELD	\N	f	2026-09-14 18:43:44.293	2026-09-14 18:43:44.293
866b2ac2-9d24-4111-9931-45e475ed9f7b	2026-09-14 18:43:45.492	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	FIELD_TO_CHULLI	\N	f	2026-09-14 18:44:00.675	2026-09-14 18:44:00.675
16211b9b-4fb2-44cf-820d-f970fe1f9108	2026-09-14 18:44:06.116	3f55423d-5264-4ddd-b0b6-1eed321e0efc	2000	FIELD_TO_CHULLI	\N	f	2026-09-14 18:44:15.866	2026-09-14 18:44:15.866
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
06177814-8f1d-487e-80d5-4bbfcc5cae23	কাস্টমার: Tanvir। ডেলিভারি: ১ নং: 1000 টি। সিজন: 2026-2027।	/dashboard/todays-delivery	DELIVERY	f	2026-09-12 01:48:11.702	2026-09-12 01:50:48.214	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Tanvir-এর আজ ডেলিভারি আছে	11fdc269-699e-4a88-9092-f8f173bc55ac
e816938e-ed85-4489-a4c7-eb231e8a0612	কাস্টমার: Tanvir। আজ টাকা দেওয়ার তারিখ। বাকি: 3000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	f	2026-09-12 18:05:00.349	2026-09-12 18:05:00.349	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Tanvir-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
34b93980-dd5c-425e-96e0-23f3819e2ab0	কাস্টমার: Ahosun। আজ টাকা দেওয়ার তারিখ। বাকি: 6000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	f	2026-09-12 18:05:00.349	2026-09-12 18:05:00.349	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Ahosun-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
2d0df6fd-ffcb-458e-bdbe-50ac1987eb2d	কাস্টমার: Tanvir। আজ টাকা দেওয়ার তারিখ। বাকি: 3000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	f	2026-09-12 01:48:11.702	2026-09-12 01:48:11.702	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Tanvir-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
f808f306-9142-45ac-bdfd-0b66e1237169	কাস্টমার: Ahosun। আজ টাকা দেওয়ার তারিখ। বাকি: 6000 টাকা। সিজন: 2026-2027।	/dashboard/due-collection	DUE	f	2026-09-12 01:48:11.702	2026-09-12 01:48:11.702	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Ahosun-এর আজ টাকা দেওয়ার তারিখ	11fdc269-699e-4a88-9092-f8f173bc55ac
479ddb37-da46-4e74-9926-0b65b89d22e3	কাস্টমার: Ahosun। ডেলিভারি: ১ নং: 1000 টি। সিজন: 2026-2027।	/dashboard/todays-delivery	DELIVERY	f	2026-09-12 01:48:11.702	2026-09-12 01:48:11.702	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	Ahosun-এর আজ ডেলিভারি আছে	11fdc269-699e-4a88-9092-f8f173bc55ac
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, quantity, cutting, payment, "ledgerId", "vataId", "createdAt", "updatedAt", document, "paymentDetails", "paymentDifference", "paymentType", rate, "totalBill", "isDeleted", "paymentDate", address, serial) FROM stdin;
b0582920-7814-4a56-a609-016a78fe8006	2000	0	2000	1d278077-28bb-44f2-8204-ef26da50b8cc	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2026-09-21 17:43:43.419	2026-09-21 17:44:21.354	\N	Balu dibe	0	রেগুলার পেমেন্ট	1	2000	t	2026-09-21 17:43:43.419	\N	6
facba612-279b-4ac5-8c12-e1643fad1a26	3000	0	3000	1d278077-28bb-44f2-8204-ef26da50b8cc	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2026-09-21 17:47:17.877	2026-09-21 17:47:17.877	\N	Balu dibe	0	রেগুলার পেমেন্ট	1	3000	f	2026-09-21 17:47:17.877	\N	7
65ea9365-54a0-41df-afd0-781ebbf1a5c2	2000	0	2000	997b6baf-7691-45c5-b23a-385e54ee5251	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-21 17:18:15.277	2026-09-21 17:51:00.211	\N	Balu dibe	0	রেগুলার পেমেন্ট	1	2000	t	2026-09-21 17:18:15.277	\N	5
b2bb5bfc-24dd-4a58-9d69-a1de0895cf3f	5000	0	5000	997b6baf-7691-45c5-b23a-385e54ee5251	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2026-09-21 17:51:27.616	2026-09-21 17:51:27.616	\N	Balu dibe	0	রেগুলার পেমেন্ট	1	5000	f	2026-09-21 17:51:27.616	\N	8
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
f60db984-206d-4b37-921d-f9812bd69fba	2046-2047	2046-10-01 00:00:00	2047-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
ad961317-bd6b-4d03-8c24-68d94f91f9db	2047-2048	2047-10-01 00:00:00	2048-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
dbf8f9e4-be2c-4851-a7f4-ee5c0f43f161	2048-2049	2048-10-01 00:00:00	2049-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
56d032b3-5d21-4ada-80cc-6ac3a31f6d25	2049-2050	2049-10-01 00:00:00	2050-09-30 23:59:59.999	f	2026-09-21 17:33:15.558	2026-09-21 17:33:15.558	0a1e8395-aa43-400a-b92b-ab1fd26cd031
c163345e-891d-44db-a77f-1e8ffb3947f3	2027-2028	2027-10-01 00:00:00	2028-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
4cdfa224-5f21-443e-99e8-772612f580d1	2029-2030	2029-10-01 00:00:00	2030-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
708be09d-ae75-4483-a135-d0b38885d756	2030-2031	2030-10-01 00:00:00	2031-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
8cddee02-0ecd-4aa1-b018-0cd612f0de2c	2032-2033	2032-10-01 00:00:00	2033-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
6933f02b-eb01-4e7f-8e22-25f324abb3de	2033-2034	2033-10-01 00:00:00	2034-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
ece4dfad-974b-454f-9cac-2d5bfb059e58	2034-2035	2034-10-01 00:00:00	2035-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
ec7c3a35-a9a7-4cd6-b77c-bd6197ca3757	2035-2036	2035-10-01 00:00:00	2036-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
a0c94486-dfbc-4e06-aed6-9e8ad23a3603	2028-2029	2028-10-01 00:00:00	2029-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
15be7d7e-c6c0-4d59-9b53-7f72543a5fda	2025-2026	2025-10-01 00:00:00	2026-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
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
9f09a9f4-d737-4154-bbd4-92b3914e358a	2036-2037	2036-10-01 00:00:00	2037-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
001d9e9d-046e-4c19-ba47-54046a4c13a0	2037-2038	2037-10-01 00:00:00	2038-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
3e777a99-d5e3-424c-a5d3-12a3ef5167c4	2038-2039	2038-10-01 00:00:00	2039-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
e3296c76-c34a-45df-9331-2387055bf22b	2039-2040	2039-10-01 00:00:00	2040-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
b8b129dd-d5f5-473d-8781-ca1ef3d5ae52	2031-2032	2031-10-01 00:00:00	2032-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
ddd1e14a-49d6-4cc2-8b54-14f29d0c5e1c	2042-2043	2042-10-01 00:00:00	2043-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
11fdc269-699e-4a88-9092-f8f173bc55ac	2026-2027	2026-10-01 00:00:00	2027-09-30 23:59:59.999	t	2026-09-11 20:26:18.956	2026-09-12 00:10:34.589	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
0fd94ce9-0b79-4af9-a0e9-c0a60c2cabfe	2040-2041	2040-10-01 00:00:00	2041-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
1569746d-66ba-4914-8433-3a78586969b0	2041-2042	2041-10-01 00:00:00	2042-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
5f67edee-4363-4b7d-8e4c-94758acd9cd4	2043-2044	2043-10-01 00:00:00	2044-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
31081036-9f35-4af5-8fd2-e48177878a50	2044-2045	2044-10-01 00:00:00	2045-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
15ecc883-1074-49ee-a517-ec520d30b71f	2045-2046	2045-10-01 00:00:00	2046-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
99070c7e-7dca-4143-8328-22209031440c	2046-2047	2046-10-01 00:00:00	2047-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
d55e7197-69b0-407b-8bcb-e3a009b18f6b	2047-2048	2047-10-01 00:00:00	2048-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
cadbe032-768a-49f1-9826-626a3f909edd	2048-2049	2048-10-01 00:00:00	2049-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
91cccbbc-3978-4537-8679-5b588f1e4a21	2049-2050	2049-10-01 00:00:00	2050-09-30 23:59:59.999	f	2026-09-11 20:26:18.956	2026-09-12 00:10:34.587	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
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

COPY public."StockBook" (id, class, "stockIn", "stockOut", description, "isDeleted", "createdAt", "updatedAt", "createdById", "seasonId", "vataId") FROM stdin;
\.


--
-- Data for Name: SubscriptionPayment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SubscriptionPayment" (id, "vataId", "subscriptionPlanId", "startDate", "endDate", amount, status, "paidAt", "paymentMethod", "transactionId", "phoneNumber", "createdAt", "updatedAt") FROM stdin;
68205d9c-ba4d-4e80-83dd-4e89d955bbd0	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:08:59.289	2026-10-09 18:00:00	1000.00	PAID	2026-09-11 20:08:59.289	1st	1st	1st	2026-09-11 20:08:59.294	2026-09-11 20:08:59.294
53c17abd-a461-49b1-b3cd-98082b41cd6e	991cab71-e941-4f38-add3-c1d2f4b0e449	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:17:07.488	2026-09-11 18:00:00	1000.00	PAID	2026-09-11 20:17:07.488	1st	1st	1st	2026-09-11 20:17:07.491	2026-09-11 20:17:07.491
7cbd395d-dc51-4dad-a0e1-5f6afe136b7d	0a1e8395-aa43-400a-b92b-ab1fd26cd031	2a303882-9075-4173-9684-9e948fb48490	2026-09-21 17:33:15.518	2026-09-25 18:00:00	1000.00	PAID	2026-09-21 17:33:15.518	1st	1st	1st	2026-09-21 17:33:15.52	2026-09-21 17:33:15.52
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

COPY public."TaskManager" (id, description, "userId", date, repeat, status, "vataId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Unload; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Unload" (id, date, "roundId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
c5919f6c-3187-4d82-9cec-59b5877e4304	2026-09-14 18:45:19.585	3f55423d-5264-4ddd-b0b6-1eed321e0efc	f	2026-09-14 18:45:39.787	2026-09-14 18:45:39.787
\.


--
-- Data for Name: UnloadItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UnloadItem" (id, "unloadId", "classId", quantity, damaged, "createdAt", "updatedAt") FROM stdin;
0a731701-6cca-4878-9286-3f54573f2374	c5919f6c-3187-4d82-9cec-59b5877e4304	9db43bd9-3b8a-488a-ba03-a5865ecd89cd	2000	0	2026-09-14 18:45:39.827	2026-09-14 18:45:39.827
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
2deffc1f-3d8b-4dc1-b5c8-c2800190ea1b	70b4717db87b63c3ec68123f216dec96e41b14986e4ed55927fbd796061e795a	2026-09-12 01:39:57.126896+06	20260911135815_add_note	\N	\N	2026-09-12 01:39:57.123961+06	1
405325b5-877d-400a-a768-2df193b30936	d8c597fcc876373649300b97ef6c81e03b5e93df4fe671bcb0284209150c49d3	2026-09-13 10:08:41.899437+06	20260913040841_updte	\N	\N	2026-09-13 10:08:41.857306+06	1
c313df71-51d6-40bf-a43e-b1bf7de3cbd2	f277ec8a9d3f8ce5679ad0e0580189b585258a3ae03bb97a4d9bfe731e29202d	2026-09-12 08:02:21.899379+06	20260912020221_faq_about	\N	\N	2026-09-12 08:02:21.815445+06	1
adf45c38-053a-4cf1-9f9a-e51d4107ab8d	f7cff0e6145f1aa0770ecfd08eb42629deb9e3b4689c5a9a7fd39575293289e1	2026-09-12 21:29:17.522179+06	20260912152917_help_yt	\N	\N	2026-09-12 21:29:17.468727+06	1
31fdf7f3-5681-4335-a63f-c70013ec8b22	227a81108d0af0b9f282c0b800f3c16884e966224c74a5a45d7e412bfafc1045	2026-09-22 20:12:15.204088+06	20260922141215_add_rent_invoce	\N	\N	2026-09-22 20:12:15.174798+06	1
7883bbea-9f1c-47fa-93d9-b79a74e65cd1	72247513f87a1d307fd0c52d3733ef9956d400bbc7ce211197a855b585e22d6b	2026-09-13 01:15:23.702671+06	20260912191523_gcatup	\N	\N	2026-09-13 01:15:23.656709+06	1
8618c224-cb22-4280-8368-d24e8742af98	c89a5d6f446dd1dc2ece63fd45aa80235cccabfa26a2fe1c8b00ade3b5367513	2026-09-14 22:15:35.880725+06	20260914161535_ledger_uodate	\N	\N	2026-09-14 22:15:35.849202+06	1
46ca2499-d83d-4661-9db0-48e5daab2758	f6bd409d5dc8c75308cc3e81edebec5f0ea8e768d248a56300cb3ad3040fe623	2026-09-15 00:30:55.059107+06	20260914183054_remov_car_rent_from_invoice	\N	\N	2026-09-15 00:30:55.037051+06	1
\.


--
-- Data for Name: carrents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carrents (id, address, area, rent, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: cash; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cash (id, type, source, description, amount, "isDeleted", "createdAt", "updatedAt", "vataId", "seasonId") FROM stdin;
\.


--
-- Data for Name: challanItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."challanItems" (id, class, rate, quantity, delivered, price, "challanId", "deliveryDate", "createdAt", "updatedAt", "isDeleted") FROM stdin;
45de3fd0-1936-4bbd-ad94-161fa8dd4d3b	১ নং	8	1000	1000	8000	abb3be5a-ec7a-41a1-b5cd-05ca9fd324d3	2026-09-11 18:00:00	2026-09-12 01:31:19.967	2026-09-14 18:46:03.23	f
4dae97d7-318a-422b-b280-fa07f16157bf	১ নং	8	1000	0	8000	17f949bd-57ad-4da7-bb1a-43de3b4aca97	2026-09-30 18:00:00	2026-09-12 20:09:18.003	2026-09-14 18:48:33.947	f
2e96e547-8472-418e-aaf5-34c96537cebd	১ নং	8	1000	900	8000	2e8763e3-2fbf-4028-9ede-8629c572b1e2	2026-09-15 18:00:00	2026-09-12 01:43:26.027	2026-09-14 22:57:55.123	f
4b88f2df-532e-471e-b0fd-ea25d9685f35	১ নং	9	1000	0	9000	a3c28648-6363-4b1d-8eb5-00441d7a5b82	2026-09-20 18:00:00	2026-09-21 17:36:57.658	2026-09-21 17:36:57.658	f
a2a624db-cfd1-46f8-9502-15a8cf020432	১ নং	8	1000	0	8000	cd827adf-8fe5-41d6-b26d-5f96ffc44536	2026-09-21 18:00:00	2026-09-22 14:52:45.515	2026-09-22 14:52:45.515	f
9c99b9f1-1747-40a9-8653-d755f8131559	২ নং (ক)	8.3	1000	0	8300	01e5d72c-8da8-4146-9854-7a24ec426eca	2028-09-19 18:00:00	2026-09-22 17:10:27.908	2026-09-22 17:10:27.908	f
d59ee37b-6898-425b-a896-b7a16794751a	১ নং	8	1000	0	8000	270eadbc-7e9e-4570-bd9d-ea8a008dc72a	2035-09-18 18:00:00	2026-09-22 17:16:51.205	2026-09-22 17:16:51.205	f
d066ef96-2ef6-4a27-98e8-69f24ccec2b1	পিকেট	9	1500	0	13500	270eadbc-7e9e-4570-bd9d-ea8a008dc72a	2035-09-18 18:00:00	2026-09-22 17:16:51.205	2026-09-22 17:16:51.205	f
\.


--
-- Data for Name: chllans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chllans (id, serial, "chalanType", "deliveryDate", "challanDate", "duePaymentDate", "deliverySeason", note, "productPrice", discount, "totalPrice", cash, due, "createdAt", "updatedAt", "customerId", "vataId", "isDeleted", "createdById", "seasonId", "carRent") FROM stdin;
abb3be5a-ec7a-41a1-b5cd-05ca9fd324d3	1	রেগুলার চালান	2026-09-11 18:00:00	2026-09-12 01:30:49.239	2026-09-11 18:00:00	\N		8000	0	8000	5000	3000	2026-09-12 01:31:19.922	2026-09-12 01:31:19.922	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	\N
2e8763e3-2fbf-4028-9ede-8629c572b1e2	2	রেগুলার চালান	2026-09-11 18:00:00	2026-09-12 01:42:51.331	2026-09-11 18:00:00	\N		8000	0	8000	2000	6000	2026-09-12 01:43:25.998	2026-09-12 01:43:25.998	fb7aa1b7-935a-4635-8c7d-b778e9cdf0a4	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	\N
17f949bd-57ad-4da7-bb1a-43de3b4aca97	3	রেগুলার চালান	2026-09-12 18:00:00	2026-09-12 20:08:41.624	\N	\N		8000	0	8000	8000	0	2026-09-12 20:09:17.973	2026-09-12 20:09:17.973	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	\N
a3c28648-6363-4b1d-8eb5-00441d7a5b82	1	রেগুলার চালান	2026-09-20 18:00:00	2026-09-21 17:36:33.816	\N	\N		9000	0	9000	9000	0	2026-09-21 17:36:57.641	2026-09-21 17:36:57.641	f7562f06-a94e-40c0-b446-fb59c4c608c6	0a1e8395-aa43-400a-b92b-ab1fd26cd031	f	333d25f8-b213-4366-97a2-9cd24c9d2fee	7ab12477-1de7-412e-aad2-8477b7723826	\N
cd827adf-8fe5-41d6-b26d-5f96ffc44536	4	রেগুলার চালান	2026-09-21 18:00:00	2026-09-22 14:47:41.223	\N	\N		8000	0	8500	8500	0	2026-09-22 14:52:45.499	2026-09-22 14:52:45.499	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	500
01e5d72c-8da8-4146-9854-7a24ec426eca	5	অগ্রীম চালান সিজন	2028-09-19 18:00:00	2026-09-22 17:09:13.451	\N	2028-2029		8300	0	8300	8300	0	2026-09-22 17:10:27.892	2026-09-22 17:10:27.892	3c681832-5238-4d39-bafd-3afcb45c6593	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	0
270eadbc-7e9e-4570-bd9d-ea8a008dc72a	6	অগ্রীম চালান আনসিজন	2035-09-18 18:00:00	2026-09-22 17:16:04.564	\N	\N		21500	0	21500	21500	0	2026-09-22 17:16:51.184	2026-09-22 17:16:51.184	3c681832-5238-4d39-bafd-3afcb45c6593	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	f	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	11fdc269-699e-4a88-9092-f8f173bc55ac	0
\.


--
-- Data for Name: classAndRates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."classAndRates" (id, "classType", "className", rate, "createdAt", "updatedAt", "isDeleted", "vataId") FROM stdin;
9db43bd9-3b8a-488a-ba03-a5865ecd89cd	ইট	১ নং	8	2026-09-12 03:48:20.644	2026-09-12 03:48:20.644	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
35ef558b-8a4b-4545-946d-4f75d0ab903d	ইট	১ নং	9	2026-09-21 17:36:30.149	2026-09-21 17:36:30.149	f	0a1e8395-aa43-400a-b92b-ab1fd26cd031
2f5a4ddf-115b-4512-806e-feef2e9288d4	ইট	পিকেট	9	2026-09-22 15:06:29.509	2026-09-22 15:06:29.509	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
8d61abf5-2887-4491-bec0-2661e692bead	ইট	২ নং (ক)	8.3	2026-09-22 15:06:36.687	2026-09-22 15:06:36.687	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
b79bc63f-0a08-4ed8-84c9-811575c68b61	ইট	এলোট	6	2026-09-22 15:06:50.089	2026-09-22 15:06:50.089	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
c76920be-dbe9-4318-88e5-a254b7cddc7d	অন্যান্য	রাবিস	9	2026-09-22 15:07:56.099	2026-09-22 15:07:56.099	f	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: customerdues; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customerdues (id, "customerId", "seasonId", "challanId", "totalAmount", "paidAmount", "dueAmount", "createdAt", "updatedAt") FROM stdin;
b3b328d1-7251-42e9-9ab5-4b5fa91dabed	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	11fdc269-699e-4a88-9092-f8f173bc55ac	abb3be5a-ec7a-41a1-b5cd-05ca9fd324d3	8000.00	5000.00	3000.00	2026-09-12 01:31:19.949	2026-09-12 01:31:19.949
2939973e-5931-4ba0-8a05-6da30c435801	fb7aa1b7-935a-4635-8c7d-b778e9cdf0a4	11fdc269-699e-4a88-9092-f8f173bc55ac	2e8763e3-2fbf-4028-9ede-8629c572b1e2	8000.00	2000.00	6000.00	2026-09-12 01:43:26.01	2026-09-12 01:43:26.01
0bcd6085-7df8-40db-8173-22fd02d0c40e	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	11fdc269-699e-4a88-9092-f8f173bc55ac	17f949bd-57ad-4da7-bb1a-43de3b4aca97	8000.00	8000.00	0.00	2026-09-12 20:09:17.988	2026-09-12 20:09:17.988
202bfd72-17fe-4a7b-8296-4d320f5fdfbc	f7562f06-a94e-40c0-b446-fb59c4c608c6	7ab12477-1de7-412e-aad2-8477b7723826	a3c28648-6363-4b1d-8eb5-00441d7a5b82	9000.00	9000.00	0.00	2026-09-21 17:36:57.643	2026-09-21 17:36:57.643
9611cb64-23eb-46fc-9b99-95c78c83d39c	eaffa5d9-c173-491f-8edf-3981fe4fa6ce	11fdc269-699e-4a88-9092-f8f173bc55ac	cd827adf-8fe5-41d6-b26d-5f96ffc44536	8500.00	8500.00	0.00	2026-09-22 14:52:45.506	2026-09-22 14:52:45.506
c15861bc-c161-4292-8f99-652b61e9f6a3	3c681832-5238-4d39-bafd-3afcb45c6593	11fdc269-699e-4a88-9092-f8f173bc55ac	01e5d72c-8da8-4146-9854-7a24ec426eca	8300.00	8300.00	0.00	2026-09-22 17:10:27.898	2026-09-22 17:10:27.898
359ddbc0-5946-4f6a-b7be-806b6220eb36	3c681832-5238-4d39-bafd-3afcb45c6593	11fdc269-699e-4a88-9092-f8f173bc55ac	270eadbc-7e9e-4570-bd9d-ea8a008dc72a	21500.00	21500.00	0.00	2026-09-22 17:16:51.195	2026-09-22 17:16:51.195
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, "customerCode", name, address, "phoneNumber", "createdAt", "updatedAt", "isDeleted", "nextPaymentDate", note, "vataId") FROM stdin;
eaffa5d9-c173-491f-8edf-3981fe4fa6ce	001	Tanvir	Dhaka Mirpur	01407128177	2026-09-12 03:48:46.369	2026-09-12 01:31:19.887	f	2026-09-11 18:00:00	\N	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
fb7aa1b7-935a-4635-8c7d-b778e9cdf0a4	002	Ahosun	Chuadanga	01407128179	2026-09-12 01:43:25.977	2026-09-12 01:43:25.977	f	2026-09-11 18:00:00	\N	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
f7562f06-a94e-40c0-b446-fb59c4c608c6	001	ইমরান হোসেন	চরবাটা	01407128177	2026-09-21 17:36:57.64	2026-09-21 17:36:57.64	f	\N	\N	0a1e8395-aa43-400a-b92b-ab1fd26cd031
3c681832-5238-4d39-bafd-3afcb45c6593	003	ইমরান হোসেন	চরবাটা	01407128100	2026-09-22 17:10:27.882	2026-09-22 17:10:27.882	f	\N	\N	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
\.


--
-- Data for Name: deliveries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveries (id, "deliveryDate", "deliveryNo", "nextDeliveryDate", quantity, "deliveryReceived", class, "deliveryRemaining", "carNo", "lastDelivered", "carRent", "invoiceId", "isDeleted", "createdAt", "updatedAt", season, "deliveryById", "driverId") FROM stdin;
c99a2b14-26cc-4788-b4cd-7da61e21bc97	2026-09-14 18:45:45.649	1	\N	1000	1000	১ নং	0	1	0	500	abb3be5a-ec7a-41a1-b5cd-05ca9fd324d3	f	2026-09-14 18:46:03.217	2026-09-14 18:46:03.217	\N	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	f575a0fa-6f73-4478-bfb3-6c76c16159e2
76cca55f-b0a9-4eb9-a961-38c3e5412458	2026-09-14 18:47:34.571	2	2026-09-29 18:00:00	1000	500	১ নং	500	1	0	500	2e8763e3-2fbf-4028-9ede-8629c572b1e2	f	2026-09-14 18:47:51.465	2026-09-14 18:47:51.465	\N	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	f575a0fa-6f73-4478-bfb3-6c76c16159e2
45cd10ee-adee-4a8f-9427-de8d7a089093	2026-09-14 22:55:24.738	3	2026-09-22 18:00:00	1000	200	১ নং	300	1	500	500	2e8763e3-2fbf-4028-9ede-8629c572b1e2	f	2026-09-14 22:55:49.733	2026-09-14 22:55:49.733	\N	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	f575a0fa-6f73-4478-bfb3-6c76c16159e2
0143f79d-1f76-4a7e-af53-d486706ab343	2026-09-14 22:56:55.884	4	2026-09-15 18:00:00	1000	100	১ নং	200	1	700	500	2e8763e3-2fbf-4028-9ede-8629c572b1e2	f	2026-09-14 22:57:10.632	2026-09-14 22:57:10.632	\N	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	f575a0fa-6f73-4478-bfb3-6c76c16159e2
ff88339c-5527-4823-8ef6-08f8a5348d7a	2026-09-14 22:57:32.659	5	2026-09-15 18:00:00	1000	100	১ নং	100	1	800	200	2e8763e3-2fbf-4028-9ede-8629c572b1e2	f	2026-09-14 22:57:55.117	2026-09-14 22:57:55.117	\N	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	f575a0fa-6f73-4478-bfb3-6c76c16159e2
\.


--
-- Data for Name: duecollections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.duecollections (id, due, collect, "newDue", "nextDate", "customerId", "seasonId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
d18e524b-d700-435e-bb4a-a955d1a631f3	6000	6000	0	\N	fb7aa1b7-935a-4635-8c7d-b778e9cdf0a4	11fdc269-699e-4a88-9092-f8f173bc55ac	f	2026-09-22 17:26:31.823	2026-09-22 17:26:31.823
\.


--
-- Data for Name: login_histories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.login_histories (id, type, device, browser, "ipAddress", "userId", "createdAt") FROM stdin;
0ebe6437-c676-4dc2-8073-5cdf00faf941	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-11 20:06:51.304
89d371c2-073b-484f-a82a-ad0d7b67f6a1	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:09:18.986
50d388c7-9910-445b-92bb-ee505d1785ee	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:11:45.466
51b95d74-4411-419e-903c-18d43cd25a5b	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:17:18.732
47232b86-4d89-4c25-bd23-536defb84978	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-11 20:17:25.985
9d1c4b1e-c140-4137-8947-5b338f4ae4b6	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-11 20:18:09.089
cc0d97e8-9792-4207-b9a1-597db4ed4d88	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-11 20:22:25.547
043805b5-eadb-4dc7-b538-d3942f858993	Login	Windows	Chrome	::1	4d09ef06-8e57-4875-aba9-e26e4b59b91d	2026-09-11 20:29:42.22
02f4395d-1f18-400b-8d95-be9fc03e93ae	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 01:50:08.728
b9f9ecb9-be09-479c-8dd5-1296e24a3d41	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 02:17:12.089
ebf22466-0373-4d7f-8e78-d0f7e1539c5d	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 02:17:18.912
dc33f34c-9e31-428b-9289-b75e6cd1f700	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 03:18:57.472
c456e414-1045-4157-81e2-977b0e690cf5	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 03:23:52.785
26ed4f65-1151-4df5-b069-b878e6a0078d	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 03:28:41.726
c74cee26-d761-41e9-aa4d-c84dc8348872	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 03:28:48.37
4bea9d2e-5711-41b3-b06c-e1da69fe3664	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 04:03:17.795
feebfcb0-8edf-443a-978b-dc513d85e052	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 14:03:47.417
08a66a94-5b81-4595-9c3e-aaf6924c63dd	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 15:19:24.428
f40eebc0-e60c-4ff1-abb8-5bfd97f60778	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 16:57:50.164
24c6e759-3417-405a-8427-8fba0abfd46e	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 16:58:05.144
22492311-90eb-40fd-8259-ff19041a220c	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 17:31:54.695
8e976cb8-5255-4f7b-909e-7f7cf1354438	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 17:35:05.888
aaac1fb3-2ba4-46c3-a100-39c27139804c	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-12 17:35:12.554
55cff722-c6e4-4f9d-b0ad-38aa1ffd9ced	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-12 17:52:56.247
81fc9a77-7839-46d1-a68d-daf7573ef457	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 03:56:04.108
dda4ec61-39aa-41d6-b0b0-a4ea0c49fd4a	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-13 03:56:10.902
ff1c19b7-8326-42e0-b26c-98db293aae10	Login	Windows	Edge	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-13 04:51:25.758
1a002839-559a-4b4a-98ec-8a5b97ebd96c	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 06:17:41.657
de054ca8-9393-4f50-900c-b452c660624b	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 06:19:50.741
528d270f-e082-4ea7-bd00-d61f8d094d5b	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-13 08:39:06.628
ab45bbbb-65ff-4fee-9440-bd1904233bc1	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-13 08:39:22.966
c10ceba3-a49a-41d4-8694-91b028296d25	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 07:29:52.589
6114cc5f-cbde-4ed5-a6ed-2442288cca04	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 16:12:55.084
e786d39a-0c7f-40fe-b424-47e6afdf8216	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 16:54:43.774
74b65ebe-ed92-4552-bda1-8c701385d9a1	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 16:55:12.579
361c23dd-caa2-4e15-a19d-a09e6fae67c5	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 17:15:38.713
1f2f30b1-3062-4891-96d2-4f42a3c1cd57	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 22:54:00.291
51330a52-8c8c-41ea-8d02-aeea53d626a8	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-14 22:54:05.304
b54eb80c-7438-4ad4-9e34-9df54512a77f	Login	Windows	Edge	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-15 07:14:39.687
7a825031-e03e-46e3-b8b7-54fac8150baa	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-21 17:16:56.635
74b0fac4-8659-4170-91eb-9f43e3c8bd6c	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-21 17:31:59.47
d01fcd86-4121-4279-9a00-673df2c4bd82	Login	Windows	Chrome	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:33:26.459
1305a5be-3ce3-462b-b120-ddc3378478dc	Logout	Unknown	Unknown	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:34:53.687
90d2db3c-f810-4bb1-9635-f32302573bdd	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-21 17:34:58.477
675a9493-2791-4ab4-bb37-64965f7f41e9	Login	Windows	Chrome	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:35:36.173
e6e67a37-7ada-4d12-abdf-f4d7a86afe8a	Logout	Unknown	Unknown	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:40:27.725
f2bbf62b-9862-496c-9263-901ca9a2cd0b	Login	Windows	Chrome	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 17:42:56.659
118c443f-612c-4321-a285-b4c314f30a81	Logout	Unknown	Unknown	::1	333d25f8-b213-4366-97a2-9cd24c9d2fee	2026-09-21 18:17:15.402
39fb3a52-5e4f-4e4f-a8e5-bc55e2d911c6	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-21 18:17:27.66
2ce6f1c4-8fcd-4e69-a7d9-2292eb442cc3	Logout	Unknown	Unknown	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-22 13:02:36.357
f66c3fbb-f7fb-4276-9cf3-b5405ee74610	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-22 13:02:42.418
6ffc0841-44f2-4775-98bc-91d2d135f34d	Login	Windows	Chrome	::1	1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	2026-09-22 14:25:08.439
86baaead-4a65-4721-b2f5-4e08cf50febe	Login	Windows	Chrome	::1	45db4b19-9523-45a2-9436-8f52d5279b25	2026-09-22 16:58:05.097
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, "productName", category, shop, quantity, price, "productImage", warranty, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, username, role, password, "isDeleted", "createdAt", "updatedAt", "vataId") FROM stdin;
45db4b19-9523-45a2-9436-8f52d5279b25	System Admin	systemadmin	SUPER_ADMIN	$2b$12$awL0b/K8Z./TKixb7YTcNO4aY71ZoXfvPmqs3G1nB3hh5RlwZATOq	f	2026-09-11 20:06:39.343	2026-09-11 20:06:39.343	\N
1a1d7ba5-2e9d-40d1-bf9c-6de9779995ae	Suvash Babu	suvash	OWNER	$2b$12$LvIlh0hxu3J0fn1CVC6tAuCwBWqcVw05UCPttI8PGTsu.undkN3FW	f	2026-09-11 20:08:59.305	2026-09-11 20:08:59.305	3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4
4d09ef06-8e57-4875-aba9-e26e4b59b91d	Suvash Babu	sabbir	OWNER	$2b$12$2G4zr.L3iwlOgPJntTjMx.j8MkrR7ZFboPLeFDCYloZeKrhn72QoO	f	2026-09-11 20:17:07.499	2026-09-11 20:17:07.499	991cab71-e941-4f38-add3-c1d2f4b0e449
333d25f8-b213-4366-97a2-9cd24c9d2fee	Atik	atik	OWNER	$2b$12$MEZNG6.Yxx.U/2JTxtVqZ.HSfilOlCegPoKZ6yrmayKGUxWWYrPUC	f	2026-09-21 17:33:15.526	2026-09-21 17:33:15.526	0a1e8395-aa43-400a-b92b-ab1fd26cd031
\.


--
-- Data for Name: vatainformation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vatainformation (id, "vataId", "nameEnglish", "nameBangla", address, "ownerName", "ownerPhoneNumber", "nextPaymentDate", "createdAt", "updatedAt", subdomain, status, "subscriptionPlanId", "subscriptionStart", "subscriptionEnd", "additionalAddress", "shortDescription", "challanManagerPhoneNumber", "challanPersonOneName", "challanPersonOnePhoneNumber", "challanPersonTwoName", "challanPersonTwoPhoneNumber", "shortForm") FROM stdin;
0a1e8395-aa43-400a-b92b-ab1fd26cd031	V003	মেসার্স সুভাষ ব্রিকস ম্যানুফ্যাকচারিংw	M/s. Subhash Bricks Manufacturing	আমান উল্যাহ,  সুবর্ণচর, নোয়াখালী	সুভাষ বাবু 	01407128177	2026-09-25 18:00:00	2026-09-21 17:33:15.511	2026-09-21 17:33:15.511	suvasbricksw	ACTIVE	2a303882-9075-4173-9684-9e948fb48490	2026-09-21 17:33:15.507	2026-09-25 18:00:00	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু	01407128178	SBMw
991cab71-e941-4f38-add3-c1d2f4b0e449	V002	test	ws	wse32	সুভাষ বাবু 	01407128177	2026-09-11 18:00:00	2026-09-11 20:17:07.465	2026-09-11 20:17:07.465	suw23	ACTIVE	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:17:07.457	2026-09-11 18:00:00	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু	01407128178	SBM
3f2edd8f-b823-40fd-aa9e-6bbcc5f27eb4	V001	M/s. Subhash Bricks Manufacturing	মেসার্স সুভাষ ব্রিকস ম্যানুফ্যাকচারিং	আমান উল্যাহ,  সুবর্ণচর, নোয়াখালী	সুভাষ বাবু 	01407128177	2026-10-09 18:00:00	2026-09-11 20:08:59.27	2026-09-11 20:08:59.27	suvasbricks	ACTIVE	2a303882-9075-4173-9684-9e948fb48490	2026-09-11 20:08:59.261	2026-10-09 18:00:00	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু	01407128178	SBM
\.


--
-- Name: Payment_serial_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Payment_serial_seq"', 8, true);


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
-- Name: vatainformation vatainformation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vatainformation
    ADD CONSTRAINT vatainformation_pkey PRIMARY KEY (id);


--
-- Name: BrickStockSummary_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "BrickStockSummary_vataId_key" ON public."BrickStockSummary" USING btree ("vataId");


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
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: vatainformation_subdomain_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX vatainformation_subdomain_key ON public.vatainformation USING btree (subdomain);


--
-- Name: vatainformation_vataId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "vatainformation_vataId_key" ON public.vatainformation USING btree ("vataId");


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
-- Name: vatainformation vatainformation_subscriptionPlanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vatainformation
    ADD CONSTRAINT "vatainformation_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES public."SubscriptionPlan"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict JSVFWkaWdJ2lVDYSzqMm04tIiElBtRifpQCD3gUNBCjD6QynZ5f8peFD5nBG7iu

