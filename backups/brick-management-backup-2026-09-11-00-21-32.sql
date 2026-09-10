--
-- PostgreSQL database dump
--

\restrict bGA1wKO39BGYk9cRJHPJbLozPH1pvaajdAvUld4Cvae8hgLTH3N3z7Km9gWMW05

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
    "vataId" text NOT NULL
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
    "seasonId" text NOT NULL
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
    "updatedAt" timestamp(3) without time zone NOT NULL
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
    "carRent" double precision,
    "totalPrice" double precision NOT NULL,
    cash double precision,
    due double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "customerId" text NOT NULL,
    "vataId" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdById" text NOT NULL,
    "seasonId" text NOT NULL
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
-- Data for Name: BrickStockSummary; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BrickStockSummary" (id, "vataId", "rawBrick", "fieldBrick", "stockBrick", "chulliBrick", "createdAt", "updatedAt") FROM stdin;
ae2049e9-4680-43d3-bde3-6087d23f1674	22b64cbe-4c9c-4d73-bca2-fca72651facc	0	0	0	500	2026-09-10 12:04:29.592	2026-09-10 12:05:12.457
\.


--
-- Data for Name: CarIncomeDelivery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."CarIncomeDelivery" (id, amount, "driverId", "deliveryId", "carId", "createdAt", "updatedAt") FROM stdin;
645e415f-899a-4199-8879-b7915c7c7a4b	500	603204d4-6133-49f2-9211-48d41497e1b3	9c913450-77eb-405e-a20b-084a68c90c8a	eec3d766-298c-4dd7-b9ae-26da3324a0bf	2026-09-10 12:05:37.24	2026-09-10 12:05:37.24
\.


--
-- Data for Name: Contact; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Contact" (id, name, address, occupation, phone, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Document" (id, name, type, "parentId", "fileUrl", "fileKey", "mimeType", size, extension, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Driver" (id, name, "PhoneNumber", salary, "vataId", "createdAt", "updatedAt") FROM stdin;
603204d4-6133-49f2-9211-48d41497e1b3	Tanvir	01407128177	0.00	22b64cbe-4c9c-4d73-bca2-fca72651facc	2026-09-10 11:21:48.768	2026-09-10 11:21:48.768
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

COPY public."GoodsStockCategory" (id, name, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: Ledger; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Ledger" (id, name, serial, "createdAt", "updatedAt", "parentId", rate, quantity, "isDeleted", "vataId", "seasonId") FROM stdin;
54f96287-03c3-40db-8897-3ad2a86a93c5	Tanvir	1	2026-09-10 10:35:41.61	2026-09-10 10:35:41.61	\N	0	0	f	22b64cbe-4c9c-4d73-bca2-fca72651facc	bce2207f-ff59-475c-9617-280c36532390
\.


--
-- Data for Name: LoadInfo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."LoadInfo" (id, date, "roundId", quantity, "loadType", "classId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
d3033e6e-538f-4c53-be16-21c274af61a1	2026-09-10 12:04:18.883	cbb0f245-18a3-4eaa-97a6-ef3f94b4d17a	2000	RAWENTRY	\N	f	2026-09-10 12:04:29.598	2026-09-10 12:04:29.598
8fbf110c-95c4-4fa8-91c8-36bbe38e7d68	2026-09-10 12:04:30.803	cbb0f245-18a3-4eaa-97a6-ef3f94b4d17a	2000	RAW_TO_FIELD	\N	f	2026-09-10 12:04:35.898	2026-09-10 12:04:35.898
45a38193-7e6d-4f13-8148-74b3da884040	2026-09-10 12:04:36.828	cbb0f245-18a3-4eaa-97a6-ef3f94b4d17a	2000	FIELD_TO_CHULLI	\N	f	2026-09-10 12:04:50.245	2026-09-10 12:04:50.245
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Payment" (id, quantity, cutting, payment, "ledgerId", "vataId", "createdAt", "updatedAt", document, "paymentDetails", "paymentDifference", "paymentType", rate, "totalBill", "isDeleted", "paymentDate", address, serial) FROM stdin;
4433f133-bbeb-48ec-a5e7-8b201bba127f	100	0	1000	54f96287-03c3-40db-8897-3ad2a86a93c5	22b64cbe-4c9c-4d73-bca2-fca72651facc	2026-09-10 10:36:10.029	2026-09-10 10:36:10.029	\N	Balu dibe3333	0	রেগুলার পেমেন্ট	10	1000	f	2026-09-10 10:36:10.029	গঙ্গাপুর, বোরহানউদ্দিন	1
\.


--
-- Data for Name: ReceivablePayable; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ReceivablePayable" (id, "transactionType", amount, "currentAmount", name, phone, address, "transactionDate", "paymentDate", "witnessOne", "witnessTwo", description, "isDeleted", "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: ReceivablePayableTransaction; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ReceivablePayableTransaction" (id, "receivablePayableId", type, amount, "transactionDate", remaining, description, "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: Round; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Round" (id, name, "vataId", "seasonId") FROM stdin;
cbb0f245-18a3-4eaa-97a6-ef3f94b4d17a	1 রাউন্ড	22b64cbe-4c9c-4d73-bca2-fca72651facc	bce2207f-ff59-475c-9617-280c36532390
\.


--
-- Data for Name: Season; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Season" (id, name, "startDate", "endDate", "isActive", "createdAt", "updatedAt") FROM stdin;
a43971bf-6c31-46d4-9e2a-cd84ddb52e90	2025-2026	2025-10-01 00:00:00	2026-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
bce2207f-ff59-475c-9617-280c36532390	2026-2027	2026-10-01 00:00:00	2027-09-30 23:59:59.999	t	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
a8e7c354-a7dd-461f-a41f-c2764f6d7065	2027-2028	2027-10-01 00:00:00	2028-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
13e7c660-03ff-4c5c-a276-ea26baec603d	2028-2029	2028-10-01 00:00:00	2029-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
9acd41f0-c9c3-41d1-951b-aee81fb18a47	2029-2030	2029-10-01 00:00:00	2030-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
ee95663f-3f38-46b0-9e3d-0a0230e64651	2030-2031	2030-10-01 00:00:00	2031-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
6301df01-4d5c-46aa-bd31-11bad8b995b1	2031-2032	2031-10-01 00:00:00	2032-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
67da5d61-e611-4252-8cbe-88c13d212518	2032-2033	2032-10-01 00:00:00	2033-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
a5c3d958-07de-476f-9015-d6a6c265cc0a	2033-2034	2033-10-01 00:00:00	2034-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
04566195-2694-49d7-b6dc-50e363a814cb	2034-2035	2034-10-01 00:00:00	2035-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
d36abd19-9ba0-4523-85ce-552c132c4de2	2035-2036	2035-10-01 00:00:00	2036-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
7c682aea-0d00-474d-a1aa-53f000adc75e	2036-2037	2036-10-01 00:00:00	2037-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
aa09576f-4971-4db1-9b25-c168af5e8362	2037-2038	2037-10-01 00:00:00	2038-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
21697983-07ff-4992-9ad8-b7d01d29aae8	2038-2039	2038-10-01 00:00:00	2039-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
47ceecfe-1bfd-44a1-ac96-ea07331fb623	2039-2040	2039-10-01 00:00:00	2040-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
f3c41732-0481-4827-9dfc-8836c65264df	2040-2041	2040-10-01 00:00:00	2041-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
94ed1365-0e18-4246-9c4e-e7e816b88508	2041-2042	2041-10-01 00:00:00	2042-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
bd933168-e66c-41e5-856a-ca8d96a3a705	2042-2043	2042-10-01 00:00:00	2043-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
e40307bd-43f3-4134-89c4-f530a5d853ad	2043-2044	2043-10-01 00:00:00	2044-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
1a970a5d-95ce-45db-84b4-d50eb913b328	2044-2045	2044-10-01 00:00:00	2045-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
12c409c7-5487-4e00-b1f2-fd519233c1d4	2045-2046	2045-10-01 00:00:00	2046-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
52711803-5bdf-450d-8580-66b248540e63	2046-2047	2046-10-01 00:00:00	2047-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
a07ca874-486e-4dd7-90b0-7cefae1cca60	2047-2048	2047-10-01 00:00:00	2048-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
25410409-4f01-430e-9742-65f126737686	2048-2049	2048-10-01 00:00:00	2049-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
998529a2-eb5a-4f87-ac96-095a302d3ca6	2049-2050	2049-10-01 00:00:00	2050-09-30 23:59:59.999	f	2026-09-10 09:57:54.773	2026-09-10 09:57:54.773
\.


--
-- Data for Name: SmsLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsLog" (id, "vataId", "phoneNumber", message, status, "sendBy", cost, "sentAt") FROM stdin;
2906f98b-3702-4716-b195-70379fe5a8e4	22b64cbe-4c9c-4d73-bca2-fca72651facc	01407128177	চালান নং: 5, ১ নং আদলা: 500 টি, ডেলিভারি: ১০ সেপ্টেম্বর, ২০২৬	SENT	suvash	0.45	2026-09-10 17:11:49.342
683f42dc-f8a2-41b2-a8c9-0380c83f1ee6	22b64cbe-4c9c-4d73-bca2-fca72651facc	01407128177	চালান নং: 5, ১ নং আদলা: 500 টি, ডেলিভারি: ১০ সেপ্টেম্বর, ২০২৬	SENT	suvash	0.45	2026-09-10 17:11:49.342
573602e1-527e-4825-b944-a2c4942501d3	22b64cbe-4c9c-4d73-bca2-fca72651facc	01407128177	চালান নং: 6, ১ নং আদলা: 100 টি, ডেলিভারি: ১০ সেপ্টেম্বর, ২০২৬	SENT	suvash	0.45	2026-09-10 17:13:02.632
e90d9d2a-d30c-492c-9941-4929e626fe93	22b64cbe-4c9c-4d73-bca2-fca72651facc	01407128177	চালান নং: 6, ১ নং আদলা: 100 টি, ডেলিভারি: ১০ সেপ্টেম্বর, ২০২৬	SENT	suvash	0.45	2026-09-10 17:13:02.632
f2846fd8-fb3e-400b-8d5b-40ac64a39d83	22b64cbe-4c9c-4d73-bca2-fca72651facc	01407128177	চালান নং: 7, ১ নং আদলা: 10 টি, ডেলিভারি: ১০ সেপ্টেম্বর, ২০২৬	FAILED	suvash	0	2026-09-10 17:19:58.959
0db4d369-c270-49c2-aabc-aa6ee7565ca9	22b64cbe-4c9c-4d73-bca2-fca72651facc	01407128177	চালান নং: 7, ১ নং আদলা: 10 টি, ডেলিভারি: ১০ সেপ্টেম্বর, ২০২৬	FAILED	suvash	0	2026-09-10 17:19:58.959
\.


--
-- Data for Name: SmsRechargeHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsRechargeHistory" (id, "vataId", "smsQuantity", "ratePerSms", "totalAmount", "paymentMethod", "transactionId", status, "createdAt", "updatedAt", "phoneNumber", type) FROM stdin;
1c9f67cd-93db-45f0-b347-e28c35749b91	22b64cbe-4c9c-4d73-bca2-fca72651facc	11	0.4500	5.00	bkash		PENDING	2026-09-10 16:58:23.395	2026-09-10 16:58:23.395	014071281	MANUAL
96cd5076-7c28-4f79-a4cc-e0392147c72f	22b64cbe-4c9c-4d73-bca2-fca72651facc	1111	0.4500	500.00	bkash	44	PENDING	2026-09-10 17:00:41.944	2026-09-10 17:00:41.944	01407128179	MANUAL
29ba7b85-ff1c-485c-8ff0-821ba43f60b6	22b64cbe-4c9c-4d73-bca2-fca72651facc	1453	0.4500	654.00	bkash	323232	PAID	2026-09-10 17:02:16.325	2026-09-10 17:02:35.081	01407128177	MANUAL
\.


--
-- Data for Name: SmsSetting; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsSetting" (id, "ratePerSms", "isActive", "createdAt", "updatedAt", bkash, nogod, rocket) FROM stdin;
9a3aa482-24e9-46fb-882c-79bf7f2865e6	0.4500	t	2026-09-10 16:54:23.299	2026-09-10 16:57:56.293	01407128177		
\.


--
-- Data for Name: SmsWallet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SmsWallet" (id, "vataId", balance, "totalPurchased", "totalUsed", "currentRate", "createdAt", "updatedAt") FROM stdin;
d4a56c56-06a7-41fa-b0fa-761ff0ff0743	22b64cbe-4c9c-4d73-bca2-fca72651facc	652.2	1453	4	0.45	2026-09-10 17:02:35.091	2026-09-10 17:13:02.645
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
3c4416d5-1eac-44be-826e-9bf24cc64ce0	22b64cbe-4c9c-4d73-bca2-fca72651facc	a7e2e1b4-99a4-4611-970a-dcc792d07373	2026-09-10 10:23:00.444	2026-10-09 18:00:00	15000.00	PAID	2026-09-10 10:23:00.444	1st	1st	1st	2026-09-10 10:23:00.451	2026-09-10 10:23:00.451
\.


--
-- Data for Name: SubscriptionPlan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SubscriptionPlan" (id, name, type, description, price, "billingCycle", features, "maxUsers", "maxStorage", "maxTasks", "maxInvoices", "maxSms", "isActive", "createdAt", "updatedAt") FROM stdin;
a7e2e1b4-99a4-4611-970a-dcc792d07373	Basic Plan	BASIC	ছোট ভাটার জন্য প্রাথমিক ফিচারসহ ফ্রি প্ল্যান	15000.00	MONTHLY	{DASHBOARD,INVOICE,PAYMENT,DELIVERY,DUE,CASH,CUSTOMER,LOAD,UNLOAD,STOCK,SELL_REPORT,LEDGER,DOCUMENTS,ASSETS,TASK_MANAGER,CAR_RENTAL,DRIVER,VEHICLE,LOAN,WEATHER,SMS,CONTACT}	1	1	10	100	0	t	2026-09-10 10:22:30.833	2026-09-10 10:22:30.833
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
33fe79c0-cfc9-4eb4-b3a1-2d04023d385c	2026-09-10 12:04:54.689	cbb0f245-18a3-4eaa-97a6-ef3f94b4d17a	f	2026-09-10 12:05:12.446	2026-09-10 12:05:12.446
\.


--
-- Data for Name: UnloadItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UnloadItem" (id, "unloadId", "classId", quantity, damaged, "createdAt", "updatedAt") FROM stdin;
d7c3ddae-d28a-498e-ad4f-9428d93d6285	33fe79c0-cfc9-4eb4-b3a1-2d04023d385c	71683630-cb24-41a9-bdf0-3573206e5985	1500	0	2026-09-10 12:05:12.455	2026-09-10 12:05:12.455
\.


--
-- Data for Name: VataCar; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VataCar" (id, "vataId", "createdAt", "updatedAt", "carNo") FROM stdin;
eec3d766-298c-4dd7-b9ae-26da3324a0bf	22b64cbe-4c9c-4d73-bca2-fca72651facc	2026-09-10 12:03:37.343	2026-09-10 12:03:37.343	1
\.


--
-- Data for Name: VataSmsSettings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VataSmsSettings" (id, "newInvoice", "updateInvoice", "deleteInvoice", "newDelivery", "newDueCollection", "deuCollectionUpdate", "vataId") FROM stdin;
2ea9f7d8-be56-43c1-a7b2-a983953c0fe4	t	f	f	f	f	f	22b64cbe-4c9c-4d73-bca2-fca72651facc
\.


--
-- Data for Name: Weather; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Weather" (id, "linkOne", "linkTwo", "createdAt", "updatedAt", "vataId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
dd46092a-78c0-43a1-a4c9-c8c82b18f2fd	6fec9cad6a161006e14449074e448011e5f868c049d4f9770d6b4310fda0ffcc	2026-09-10 15:57:22.978674+06	20260907133918_update	\N	\N	2026-09-10 15:57:22.975677+06	1
864c0b2d-bedd-44d2-9d68-7ae416ddaa9d	e5523c27a80e10f8fe1958bcc3df68c863cbc2e054856bb87301f0be76c95562	2026-09-10 15:57:22.865991+06	20260905120957_update_load_unload	\N	\N	2026-09-10 15:57:22.484914+06	1
9aaf33c1-9164-4ffe-a645-63d7ef2edc10	4f378f533460d34fdb294b3d368bfdf779eb9c48041fcec10552186d874bc4d2	2026-09-10 15:57:22.874344+06	20260905191037_add_brick_summary	\N	\N	2026-09-10 15:57:22.866725+06	1
28ab2224-0d0b-44a8-8b67-a659c81cba9f	6a799365619636a841fb2a3f62b5ba34ec1dcd4eaf4defad0b2c59a8c64f34e5	2026-09-10 15:57:22.880041+06	20260905193747_vataid	\N	\N	2026-09-10 15:57:22.874946+06	1
591d743f-19dd-4915-b73e-14f9d4f9fe98	ed949c46a40540abf8309226eaa18c86245997bb9694a8fcae7b58549e39eb89	2026-09-10 15:57:23.002164+06	20260907142923_sms_log	\N	\N	2026-09-10 15:57:22.97977+06	1
0ff1ee8c-2bab-46d3-8c22-960d137b9ec1	14c57ca89ff9960cc89eabe139b73bbc1682abd826ec5f97302d05c7bbae21cc	2026-09-10 15:57:22.882901+06	20260906033432_add_lotype	\N	\N	2026-09-10 15:57:22.880665+06	1
f5d2f9e5-4a4d-4fec-bf98-6e4a015d8136	09f46e0dcddde35c2952ef4b3eddbe86f8c2c70b2b275f86f8d6783391a064f4	2026-09-10 15:57:22.892557+06	20260906053937_update_class	\N	\N	2026-09-10 15:57:22.883688+06	1
524b96bf-8db3-4a1a-93b8-c2654106cd9f	451fc1f833e1c4f6b87e1cd015d299950febb940f15a39dd1c035d968cb7fbe2	2026-09-10 15:57:22.909924+06	20260906094226_car_add	\N	\N	2026-09-10 15:57:22.893694+06	1
0d61df4d-b1b9-4c71-ba7b-61fe9b80a437	2da4a44e72037c59e8d6ae5cae658f7190e083c8542267ba46ed528db85ca198	2026-09-10 15:57:23.005442+06	20260908063233_histrylog_update	\N	\N	2026-09-10 15:57:23.002715+06	1
26ef4a6d-518d-4b6f-8241-d55da2a0e996	0295802ca8b445241b139a488ee1835716c197a477b0960495135b9cf405f83c	2026-09-10 15:57:22.914306+06	20260906104419_car_no_add	\N	\N	2026-09-10 15:57:22.910418+06	1
039e4e4d-7902-4b96-a4f4-7edc6e667444	43c9bd097451e46952bb7d8afe1bb369279c0bed178334200a34129223304f83	2026-09-10 15:57:22.943528+06	20260907050416_sms_table	\N	\N	2026-09-10 15:57:22.915911+06	1
a44f0e6d-3345-4128-958a-2a3b895bf651	bf8ff61449f629d2329c6576717e54451202a11f0779161e5bdc10bcb1a357ce	2026-09-10 15:57:22.946499+06	20260907062612_add_banking	\N	\N	2026-09-10 15:57:22.943988+06	1
28a7c6b3-4404-4358-8cae-27f87bb0add5	9ab45a04780f7222e36a81f19848abb30b8e4e7575a733a0e9ff1afa32c4e3b8	2026-09-10 15:57:23.009815+06	20260908063350_more_update	\N	\N	2026-09-10 15:57:23.00601+06	1
13d4917c-8101-4ba6-9d68-527801c8293b	b1e53c13ac46e21ff46a5bec397c3845eca6b49fc49c1b359aca674cef6e8ce6	2026-09-10 15:57:22.95577+06	20260907063709_type_change	\N	\N	2026-09-10 15:57:22.947131+06	1
dde44a64-78b0-48b4-85c5-c5e017aed1fc	ccd963a25e6fa0a099898876ddd0178fd64ecb2a21d073c3403108846e6fcb0b	2026-09-10 15:57:22.959164+06	20260907081444_add_tyoe	\N	\N	2026-09-10 15:57:22.956445+06	1
6a203b17-51f3-47c9-b083-7441c19374c8	e52d999da28f6d673447563889f0b589db1192d15763a3e1276569e8226d7ce4	2026-09-10 15:57:22.964164+06	20260907093752_change_vid	\N	\N	2026-09-10 15:57:22.959572+06	1
c250a74f-704e-41c9-a375-df8a269cbfae	cbaa6ebcad702aaa5e11e505638e28aeb9b563e4ca8f7b40dcc4290d38893470	2026-09-10 15:57:23.013643+06	20260909063049_vata_update	\N	\N	2026-09-10 15:57:23.010315+06	1
73d86782-7f43-4620-92b3-1c7f9fa745f7	b89045f4e91d204ba7abc00e86c6f5f8d56f03f7ff4813f81e2166e7c6de960e	2026-09-10 15:57:22.9752+06	20260907133321_add_vatasms	\N	\N	2026-09-10 15:57:22.96478+06	1
443fbc7a-4a49-42c2-bdab-d37ba665f6b1	5b01183332238b212386278f92fc374cd2bc2f545212807cd7b3c7c9dbb42abe	2026-09-10 15:57:23.016666+06	20260910005502_address_to_payment	\N	\N	2026-09-10 15:57:23.014286+06	1
14e43318-fa66-4a3f-8dce-a098d8cadd11	5d944eabfde629402db7a43ab330317dc03f6ff12b6867a28de0f2e0e995ff32	2026-09-10 15:57:23.019191+06	20260910095022_uodate_vata	\N	\N	2026-09-10 15:57:23.01705+06	1
72e9600e-0577-4e83-987d-d4bf2a73970f	c36079082ea667a02a9dc1c7c94b42b9bebfd4254bd89ecf7b5d222d5500804b	2026-09-10 16:44:45.546144+06	20260910104445_add	\N	\N	2026-09-10 16:44:45.439386+06	1
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
357694b7-1c66-460a-b961-287e03b69944	১ নং আদলা	9	1000	1000	9000	383a237e-795c-4d12-a13b-d9054f96dc4f	2026-09-09 18:00:00	2026-09-10 11:23:03.475	2026-09-10 12:05:37.235	f
88cda50c-ac07-4f59-ba54-1e722e0ba432	১ নং আদলা	9	1000	0	9000	c18dce48-f1cb-45ca-bbdb-f47a6791d984	2026-09-09 18:00:00	2026-09-10 16:47:42.578	2026-09-10 16:47:42.578	f
72b96f9e-f7be-421c-8430-5b7d5dbcf04a	এলোট	10	1000	0	10000	5e66ed12-0d1d-4de4-99f0-6bf06e200beb	2026-09-09 18:00:00	2026-09-10 16:51:30.701	2026-09-10 16:51:30.701	f
aec077dd-f53a-4911-b9b3-6619b3cda115	১ নং আদলা	9	100	0	900	0d937617-9f87-4b3f-bee3-9032f48b28e7	2026-09-09 18:00:00	2026-09-10 16:52:49.804	2026-09-10 16:52:49.804	f
a0fab238-699d-4e34-b147-22dd2f49941b	১ নং আদলা	9	500	0	4500	90e28b2f-5419-47fb-a352-0e6d96a768e6	2026-09-09 18:00:00	2026-09-10 17:11:49.01	2026-09-10 17:11:49.01	f
93893cbb-ac1d-49dc-abc8-efefc7c4efb6	১ নং আদলা	9	100	0	900	624516e8-5cf6-4f7e-acd2-ee13ea69cb68	2026-09-09 18:00:00	2026-09-10 17:13:02.456	2026-09-10 17:13:02.456	f
241e6281-c065-4998-8e99-ae498aec4d26	১ নং আদলা	9	10	0	90	4c5d7a22-86c7-4f62-8592-8ff8c6028957	2026-09-09 18:00:00	2026-09-10 17:19:58.754	2026-09-10 17:19:58.754	f
\.


--
-- Data for Name: chllans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chllans (id, serial, "chalanType", "deliveryDate", "challanDate", "duePaymentDate", "deliverySeason", note, "productPrice", discount, "carRent", "totalPrice", cash, due, "createdAt", "updatedAt", "customerId", "vataId", "isDeleted", "createdById", "seasonId") FROM stdin;
383a237e-795c-4d12-a13b-d9054f96dc4f	1	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 11:21:55.189	\N	\N		9000	0	0	9000	9000	0	2026-09-10 11:23:03.463	2026-09-10 11:23:03.463	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
c18dce48-f1cb-45ca-bbdb-f47a6791d984	2	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 16:46:42.37	\N	\N		9000	0	0	9000	9000	0	2026-09-10 16:47:42.56	2026-09-10 16:47:42.56	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
5e66ed12-0d1d-4de4-99f0-6bf06e200beb	3	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 16:50:50.097	\N	\N		10000	0	0	10000	10000	0	2026-09-10 16:51:30.686	2026-09-10 16:51:30.686	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
0d937617-9f87-4b3f-bee3-9032f48b28e7	4	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 16:50:01.312	\N	\N		900	0	0	900	900	0	2026-09-10 16:52:49.779	2026-09-10 16:52:49.779	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
90e28b2f-5419-47fb-a352-0e6d96a768e6	5	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 17:05:25.034	\N	\N		4500	0	0	4500	4500	0	2026-09-10 17:11:48.997	2026-09-10 17:11:48.997	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
624516e8-5cf6-4f7e-acd2-ee13ea69cb68	6	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 17:12:37.539	\N	\N		900	0	0	900	900	0	2026-09-10 17:13:02.444	2026-09-10 17:13:02.444	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
4c5d7a22-86c7-4f62-8592-8ff8c6028957	7	রেগুলার চালান	2026-09-09 18:00:00	2026-09-10 17:19:40.17	\N	\N		90	0	0	90	90	0	2026-09-10 17:19:58.738	2026-09-10 17:19:58.738	22ee0f05-1732-432f-a4e3-630ca07a46fe	22b64cbe-4c9c-4d73-bca2-fca72651facc	f	f27548f5-c753-44a1-b9c9-3846b351bafd	bce2207f-ff59-475c-9617-280c36532390
\.


--
-- Data for Name: classAndRates; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."classAndRates" (id, "classType", "className", rate, "createdAt", "updatedAt", "isDeleted", "vataId") FROM stdin;
71683630-cb24-41a9-bdf0-3573206e5985	ইট	১ নং আদলা	9	2026-09-10 11:21:31.67	2026-09-10 11:21:31.67	f	22b64cbe-4c9c-4d73-bca2-fca72651facc
309b3dc7-cd9f-44e7-ae2a-b4bbc9bd7d81	ইট	১ নং	9	2026-09-10 11:37:53.684	2026-09-10 11:37:53.684	f	22b64cbe-4c9c-4d73-bca2-fca72651facc
376ca256-67db-4495-be0b-8f2db1a2c7c8	ইট	এলোট	10	2026-09-10 11:38:17.426	2026-09-10 11:38:17.426	f	22b64cbe-4c9c-4d73-bca2-fca72651facc
\.


--
-- Data for Name: customerdues; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customerdues (id, "customerId", "seasonId", "challanId", "totalAmount", "paidAmount", "dueAmount", "createdAt", "updatedAt") FROM stdin;
cd370973-133a-43c5-a21c-ca741a094f94	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	383a237e-795c-4d12-a13b-d9054f96dc4f	9000.00	9000.00	0.00	2026-09-10 11:23:03.466	2026-09-10 11:23:03.466
6acf6f1a-c84e-40ea-b6a8-670a1abbafe2	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	c18dce48-f1cb-45ca-bbdb-f47a6791d984	9000.00	9000.00	0.00	2026-09-10 16:47:42.572	2026-09-10 16:47:42.572
083e43b5-f5c3-43ae-8905-b8285804de31	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	5e66ed12-0d1d-4de4-99f0-6bf06e200beb	10000.00	10000.00	0.00	2026-09-10 16:51:30.693	2026-09-10 16:51:30.693
3a816a03-f3a6-4087-9e7b-1fc8b9f310e8	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	0d937617-9f87-4b3f-bee3-9032f48b28e7	900.00	900.00	0.00	2026-09-10 16:52:49.798	2026-09-10 16:52:49.798
eb674cb3-9f61-4eb1-9f0b-d49932bf2924	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	90e28b2f-5419-47fb-a352-0e6d96a768e6	4500.00	4500.00	0.00	2026-09-10 17:11:49.004	2026-09-10 17:11:49.004
948fcb20-10f8-4cd4-a0e8-3625d389d80c	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	624516e8-5cf6-4f7e-acd2-ee13ea69cb68	900.00	900.00	0.00	2026-09-10 17:13:02.45	2026-09-10 17:13:02.45
0cbf1237-d4a9-41e8-a5f9-530048e117d8	22ee0f05-1732-432f-a4e3-630ca07a46fe	bce2207f-ff59-475c-9617-280c36532390	4c5d7a22-86c7-4f62-8592-8ff8c6028957	90.00	90.00	0.00	2026-09-10 17:19:58.747	2026-09-10 17:19:58.747
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, "customerCode", name, address, "phoneNumber", "createdAt", "updatedAt", "isDeleted", "nextPaymentDate", note, "vataId") FROM stdin;
22ee0f05-1732-432f-a4e3-630ca07a46fe	001	Tanvir	Dhaka Mirpur	01407128177	2026-09-10 11:23:03.456	2026-09-10 11:23:03.456	f	\N	\N	22b64cbe-4c9c-4d73-bca2-fca72651facc
\.


--
-- Data for Name: deliveries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.deliveries (id, "deliveryDate", "deliveryNo", "nextDeliveryDate", quantity, "deliveryReceived", class, "deliveryRemaining", "carNo", "lastDelivered", "carRent", "invoiceId", "isDeleted", "createdAt", "updatedAt", season, "deliveryById", "driverId") FROM stdin;
9c913450-77eb-405e-a20b-084a68c90c8a	2026-09-10 12:05:22.636	1	\N	1000	1000	১ নং আদলা	0	1	0	500	383a237e-795c-4d12-a13b-d9054f96dc4f	f	2026-09-10 12:05:37.229	2026-09-10 12:05:37.229	\N	f27548f5-c753-44a1-b9c9-3846b351bafd	603204d4-6133-49f2-9211-48d41497e1b3
\.


--
-- Data for Name: duecollections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.duecollections (id, due, collect, "newDue", "nextDate", "customerId", "seasonId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: login_histories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.login_histories (id, type, device, browser, "ipAddress", "userId", "createdAt") FROM stdin;
ae072e88-4b63-4588-a355-27b419137a78	Login	Windows	Chrome	::1	a9981cae-47e2-40eb-99b5-0d856308be8a	2026-09-10 09:58:09.693
809c896c-4a10-49f8-b3e4-85bc7f06c4a2	Login	Windows	Chrome	::1	f27548f5-c753-44a1-b9c9-3846b351bafd	2026-09-10 10:23:24.507
b0e1e730-03bf-4266-ad67-af75881f692c	Login	Windows	Chrome	::1	f27548f5-c753-44a1-b9c9-3846b351bafd	2026-09-10 10:47:47.991
a4e44913-0756-4bce-ae13-fb667ea2793d	Login	Windows	Chrome	::1	f27548f5-c753-44a1-b9c9-3846b351bafd	2026-09-10 10:56:55.593
74a27a26-6562-4bcf-aa61-488e7b9e8002	Login	Windows	Chrome	::1	a9981cae-47e2-40eb-99b5-0d856308be8a	2026-09-10 16:53:51.818
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
a9981cae-47e2-40eb-99b5-0d856308be8a	System Admin	systemadmin	SUPER_ADMIN	$2b$12$Qn11.m15ki094zCToPmLZO6SskIK.aqZJElUDZZa4ejisTlYOz.Ci	f	2026-09-10 09:57:47.183	2026-09-10 09:57:47.183	\N
f27548f5-c753-44a1-b9c9-3846b351bafd	Suvash Babu	suvash	OWNER	$2b$12$KwEOMVJAIcJxuYyU0Czdd.aGwuSihfeFBJzS638uNwd44Lq69ozHO	f	2026-09-10 10:23:00.459	2026-09-10 10:23:00.459	22b64cbe-4c9c-4d73-bca2-fca72651facc
\.


--
-- Data for Name: vatainformation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vatainformation (id, "vataId", "nameEnglish", "nameBangla", address, "ownerName", "ownerPhoneNumber", "nextPaymentDate", "createdAt", "updatedAt", subdomain, status, "subscriptionPlanId", "subscriptionStart", "subscriptionEnd", "additionalAddress", "shortDescription", "challanManagerPhoneNumber", "challanPersonOneName", "challanPersonOnePhoneNumber", "challanPersonTwoName", "challanPersonTwoPhoneNumber", "shortForm") FROM stdin;
22b64cbe-4c9c-4d73-bca2-fca72651facc	V001	M/s. Subhash Bricks Manufacturing	মেসার্স সুভাষ ব্রিকস ম্যানুফ্যাকচারিং	আমান উল্যাহ,  সুবর্ণচর, নোয়াখালী	সুভাষ বাবু 	01407128177	2026-10-09 18:00:00	2026-09-10 10:23:00.428	2026-09-10 10:23:00.428	suvasbricks	ACTIVE	a7e2e1b4-99a4-4611-970a-dcc792d07373	2026-09-10 10:23:00.405	2026-10-09 18:00:00	কচ্চব মার্কেট হইতে ৫০০ গজ পূর্বে রাস্তার উত্তর পার্শ্বে	এখানে অটো মন্ডিং মেশিনে উন্নত মানের ঈদ উৎপাদন ও সরবরাহ করা হয়	01407128178	বিহার	01407128179	বাবলু 	01407128178	SBM
\.


--
-- Name: Payment_serial_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Payment_serial_seq"', 1, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 1, false);


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
-- Name: Season_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Season_name_key" ON public."Season" USING btree (name);


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

\unrestrict bGA1wKO39BGYk9cRJHPJbLozPH1pvaajdAvUld4Cvae8hgLTH3N3z7Km9gWMW05

