import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tpc-h-snowflake-medallion",
    title: "International Business Data Analysis System — TPC-H",
    category: "Cloud Data Warehouse / Analytics Engineering",
    status: "Completed",
    role: "Data Engineer — design, build, and analytics",
    context: "Personal Project",
    github: "https://github.com/Hai2310/International-Business-Data-Analysis-System-TPC-H-",
    featured: true,
    order: 1,
    shortDescription:
      "An enterprise-style analytical data platform built on Snowflake using TPC-H data and the Bronze, Silver, and Gold Medallion Architecture.",
    businessProblem:
      "Build a scalable and governed analytical platform that supports OLAP workloads, business metrics, incremental processing, security, and advanced customer analytics.",
    architecture: [
      "Data Files",
      "Snowflake Stage",
      "Bronze Raw Tables",
      "Streams for CDC",
      "Tasks & Stored Procedures",
      "Silver Clean Layer",
      "Gold Business Metrics",
      "Reports & Analytics",
    ],
    architectureNote:
      "Medallion flow: raw ingestion into Bronze, CDC-driven transformation into Silver, and business-ready metrics in Gold.",
    diagram: "medallion",
    stack: [
      "Snowflake",
      "Snowpark Python",
      "SQL",
      "Streams",
      "Tasks",
      "Stored Procedures",
      "UDFs",
      "RBAC",
      "Data Masking",
      "TPC-H",
    ],
    concepts: [
      "Medallion Architecture",
      "Change Data Capture",
      "Incremental Processing",
      "Star Schema",
      "RBAC",
      "Data Masking",
      "Secure Views",
      "Query Optimization",
      "RFM Segmentation",
    ],
    contributions: [
      "Built a Snowflake data warehouse using Bronze, Silver, and Gold layers.",
      "Processed the TPC-H SF1 benchmark dataset, approximately 1 GB across eight core tables.",
      "Designed ingestion, transformation, enrichment, and serving workflows.",
      "Implemented incremental processing with Snowflake Streams and Tasks.",
      "Avoided unnecessary full reloads by using CDC patterns.",
      "Built Gold-layer metrics including daily sales, revenue, average order value, customer lifetime value, and customer segmentation.",
      "Implemented null checks, duplicate detection, referential integrity checks, and validation logic.",
      "Applied role-based access control and role-dependent data masking.",
      "Used secure views and controlled data-sharing concepts.",
      "Analyzed query profiles and considered clustering and warehouse sizing.",
      "Used Snowpark Python for RFM segmentation and trend analysis.",
      "Built SQL and Python UDFs for validation and classification.",
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "This project implements an enterprise-style analytical data platform on Snowflake using the TPC-H benchmark dataset. The goal was to practice the full warehouse engineering lifecycle: staged ingestion, layered modeling, incremental processing, governance, and business-facing analytics — the same patterns used in production cloud data platforms.",
        ],
      },
      {
        id: "business-problem",
        heading: "Business Problem",
        paragraphs: [
          "An international trading business needs a governed analytical platform that can answer questions about sales, revenue, customers, and suppliers without reprocessing the entire dataset every day.",
        ],
        bullets: [
          "Support OLAP workloads across orders, line items, customers, suppliers, parts, and nations.",
          "Deliver business metrics such as daily sales, revenue, average order value, and customer lifetime value.",
          "Process only new and changed records instead of full reloads.",
          "Protect sensitive customer attributes with role-dependent access.",
        ],
      },
      {
        id: "data-model",
        heading: "Data Model",
        paragraphs: [
          "The source is the TPC-H SF1 benchmark — approximately 1 GB across eight core tables (REGION, NATION, SUPPLIER, PART, PARTSUPP, CUSTOMER, ORDERS, LINEITEM). The Gold layer exposes business-friendly fact and dimension structures derived from these normalized sources.",
        ],
      },
      {
        id: "medallion-layers",
        heading: "Bronze, Silver, and Gold Layers",
        bullets: [
          "Bronze: raw tables loaded from staged files with source metadata preserved and no business logic applied.",
          "Silver: cleaned and enriched entities with standardized types, trimmed keys, validated references, and deduplicated records.",
          "Gold: business metrics — daily sales, revenue, average order value, customer lifetime value, and customer segmentation tables.",
        ],
      },
      {
        id: "incremental-processing",
        heading: "Incremental Processing",
        paragraphs: [
          "Snowflake Streams capture inserts and updates on Bronze tables. Scheduled Tasks call stored procedures that merge only the changed records into Silver, and downstream Gold refreshes consume Silver changes. This CDC pattern avoids unnecessary full reloads and keeps the pipeline idempotent.",
        ],
      },
      {
        id: "data-quality",
        heading: "Data Quality",
        bullets: [
          "Null checks on mandatory business keys and measures.",
          "Duplicate detection on natural keys before Silver merges.",
          "Referential integrity checks between orders, line items, customers, and suppliers.",
          "Validation UDFs (SQL and Python) for reusable classification and rule checks.",
        ],
      },
      {
        id: "governance",
        heading: "Governance and Security",
        bullets: [
          "Role-based access control separating ingestion, transformation, and analytics roles.",
          "Role-dependent dynamic data masking on sensitive customer attributes.",
          "Secure views exposing curated Gold datasets without revealing underlying tables.",
          "Controlled data-sharing concepts for downstream consumers.",
        ],
      },
      {
        id: "performance",
        heading: "Performance Optimization",
        paragraphs: [
          "Query profiles were analyzed to understand pruning, join strategies, and spill behavior. Clustering keys and warehouse sizing were considered for the largest tables, and transformation work was pushed into set-based SQL rather than row-by-row logic.",
        ],
      },
      {
        id: "analytics",
        heading: "Analytics Outputs",
        bullets: [
          "Daily and monthly revenue and sales trend tables.",
          "Average order value and customer lifetime value metrics.",
          "RFM-based customer segmentation built with Snowpark Python.",
          "Customer and product trend analysis ready for BI consumption.",
        ],
      },
    ],
    challenges: [
      "Designing Streams and Tasks so that re-runs stay idempotent and do not double-apply changes.",
      "Balancing Silver-layer normalization against Gold-layer query convenience.",
      "Modeling masking policies that protect data without breaking analyst workflows.",
    ],
    lessons: [
      "CDC with Streams and Tasks is a practical default for incremental warehouse pipelines.",
      "Governance features (RBAC, masking, secure views) must be designed alongside the data model, not after it.",
      "Query profile analysis reveals data-skew and join problems that schema design alone cannot.",
    ],
    future: [
      "Add automated data-quality gates that block Gold refreshes on failed checks.",
      "Introduce dbt-style modular modeling for transformation documentation and lineage.",
      "Publish Gold metrics through a semantic layer for consistent BI consumption.",
    ],
  },
  {
    slug: "aws-book-data-pipeline",
    title: "End-to-End Book Data Pipeline on AWS",
    category: "AWS Cloud Data Engineering",
    status: "Completed",
    role: "Data Engineer — architecture, ingestion, ETL, serving",
    context: "Personal Project",
    github: "https://github.com/Hai2310/End-to-End-Data-Pipeline-for-Book-Data-using-AWS",
    featured: true,
    order: 2,
    shortDescription:
      "An end-to-end AWS pipeline that collects Open Library data, builds an S3 data lake and Redshift warehouse, and serves analytics through Power BI and a REST API.",
    businessProblem:
      "Collect, process, model, and expose a large book dataset through a scalable cloud data platform.",
    architecture: [
      "Open Library API",
      "Python Crawler on EC2",
      "JSON Normalization",
      "Parquet + Snappy",
      "S3 Raw Zone",
      "Glue Crawler & Catalog",
      "Athena Validation",
      "Glue PySpark ETL",
      "S3 Warehouse Zone",
      "Amazon Redshift",
      "Power BI & FastAPI",
    ],
    architectureNote:
      "Lakehouse-style flow: API ingestion to an S3 raw zone, cataloged and validated, transformed with PySpark, then served from Redshift.",
    diagram: "cloud",
    stack: [
      "Python",
      "Open Library REST API",
      "Amazon EC2",
      "Amazon S3",
      "Parquet",
      "Snappy",
      "AWS Glue",
      "AWS Glue Crawler",
      "AWS Glue Data Catalog",
      "PySpark",
      "Amazon Athena",
      "Amazon Redshift",
      "FastAPI",
      "Amazon Lightsail",
      "Power BI",
      "AWS Step Functions",
      "Amazon EventBridge",
      "IAM",
      "CloudWatch",
    ],
    concepts: [
      "Data Lake Zones",
      "Schema-on-Read",
      "Columnar Storage",
      "Star Schema",
      "Staging & MERGE",
      "Serverless Cataloging",
      "API Serving",
    ],
    contributions: [
      "Built a multi-stage data pipeline for collecting and processing approximately 20 GB of book data.",
      "Collected works, editions, and author data from the Open Library API.",
      "Deployed a background crawler on Amazon EC2.",
      "Converted nested JSON data into compressed Parquet files.",
      "Designed an Amazon S3 data lake with Raw and Cleaned/Warehouse zones.",
      "Used Glue Crawler and Glue Data Catalog for schema discovery and metadata management.",
      "Developed PySpark jobs for cleaning, normalization, deduplication, exploding nested structures, joining, and analytical modeling.",
      "Used Athena for validation, debugging, and querying pipeline outputs.",
      "Designed fact, dimension, and bridge tables.",
      "Loaded curated data into Amazon Redshift.",
      "Used staging and MERGE patterns for incremental warehouse synchronization.",
      "Exposed processed data using FastAPI deployed on Amazon Lightsail.",
      "Connected Redshift to Power BI for analytical reporting.",
      "Designed orchestration concepts using Step Functions and scheduled execution through EventBridge.",
      "Used IAM for service-level access control and CloudWatch for monitoring.",
    ],
    implementationStatus: [
      { label: "Crawler, S3 lake, Glue catalog, PySpark ETL, Redshift load", state: "implemented" },
      { label: "Athena validation queries, FastAPI serving, Power BI reporting", state: "implemented" },
      { label: "Step Functions / EventBridge orchestration", state: "designed" },
      { label: "Full production hardening (CI/CD, alerting, cost controls)", state: "planned" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "This project builds an end-to-end cloud data platform on AWS around the Open Library dataset. It demonstrates the full engineering path from external API ingestion to a governed data lake, a curated warehouse, and two serving channels — BI dashboards and a programmatic REST API.",
        ],
      },
      {
        id: "business-problem",
        heading: "Business Problem",
        paragraphs: [
          "Book metadata is large, nested, and messy. A platform is needed that can continuously collect works, editions, and authors, standardize them, and expose trustworthy datasets for both analysts and applications.",
        ],
      },
      {
        id: "ingestion",
        heading: "Ingestion and the Data Lake",
        bullets: [
          "A multithreaded Python crawler on Amazon EC2 collects works, editions, and authors from the Open Library REST API.",
          "Nested JSON responses are normalized and written as Parquet with Snappy compression to the S3 raw zone.",
          "Glue Crawlers infer schemas and register partitions in the Glue Data Catalog.",
          "Athena provides serverless SQL validation of raw and transformed outputs.",
        ],
      },
      {
        id: "etl",
        heading: "ETL with Glue and PySpark",
        paragraphs: [
          "AWS Glue jobs written in PySpark clean, normalize, deduplicate, explode nested structures, and join source entities into an analytical model. Curated outputs are written to the S3 warehouse zone in partitioned Parquet, keeping the lake queryable independently of Redshift.",
        ],
      },
      {
        id: "warehouse",
        heading: "Warehouse Model and Redshift",
        paragraphs: [
          "The serving model uses fact, dimension, and bridge tables for books, authors, subjects, and publication data. Loads into Redshift follow a staging-plus-MERGE pattern so re-runs update changed records instead of duplicating them, enabling incremental synchronization from the lake.",
        ],
      },
      {
        id: "serving",
        heading: "Serving Layer",
        bullets: [
          "FastAPI service on Amazon Lightsail exposes processed book data as a REST API.",
          "Power BI connects to Redshift for analytical dashboards and trend reporting.",
        ],
      },
      {
        id: "operations",
        heading: "Orchestration, Security, and Monitoring",
        bullets: [
          "Orchestration is designed around Step Functions with EventBridge scheduling (see implementation status above).",
          "IAM policies scope each service to the minimum required resources.",
          "CloudWatch collects logs and operational metrics for pipeline components.",
        ],
      },
    ],
    challenges: [
      "Normalizing deeply nested Open Library JSON into flat, queryable Parquet without losing edition-level detail.",
      "Designing MERGE-based Redshift loads that remain correct when pipeline stages re-run.",
      "Keeping the lake and warehouse consistent while both evolve independently.",
    ],
    lessons: [
      "Columnar formats plus partitioning dramatically reduce validation and serving query costs.",
      "A Glue Data Catalog pays off early — schema discovery and Athena debugging become nearly free.",
      "Staging tables with MERGE are the simplest reliable pattern for incremental warehouse sync.",
    ],
    future: [
      "Fully deploy the Step Functions state machine and EventBridge schedules.",
      "Add Great Expectations-style data-quality gates between lake zones.",
      "Introduce CI/CD for Glue jobs and infrastructure via Terraform.",
    ],
  },
  {
    slug: "realtime-imdb-sentiment",
    title: "Real-Time IMDb Data Pipeline and Sentiment Analysis",
    category: "Big Data / Streaming / NLP",
    status: "Portfolio implementation",
    role: "Data Engineer Intern — pipeline build-out (portfolio implementation)",
    context: "Internship",
    period: "October 2025 – January 2026",
    github: "https://github.com/Hai2310/Realtime-IMDB-Sentiment-Analysis",
    featured: true,
    order: 3,
    shortDescription:
      "A near-real-time data platform that ingests IMDb data, processes streaming events, performs sentiment analysis, and exposes operational and analytical dashboards.",
    businessProblem:
      "Create an end-to-end streaming architecture for analyzing movie information, user reviews, business metrics, and review sentiment.",
    architecture: [
      "IMDb Website",
      "Selenium Crawler",
      "Kafka / JSON",
      "Apache NiFi",
      "Hadoop HDFS",
      "Spark Streaming",
      "NLP Transforms",
      "PostgreSQL",
      "Power BI, Flask & Grafana",
    ],
    architectureNote:
      "Airflow orchestrates the pipeline workflows; Prometheus collects operational metrics across components.",
    diagram: "streaming",
    stack: [
      "Python",
      "Selenium",
      "Apache Kafka",
      "Apache NiFi",
      "MongoDB",
      "JSON",
      "Hadoop HDFS",
      "Apache Spark Structured Streaming",
      "Spark ML",
      "PostgreSQL",
      "Apache Airflow",
      "Prometheus",
      "Grafana",
      "Power BI",
      "Flask",
    ],
    concepts: [
      "Event Streaming",
      "Micro-batches",
      "Watermarks",
      "Checkpointing",
      "Fault-Tolerant Stream Delivery",
      "Stream Processing",
      "Sentiment Classification",
    ],
    contributions: [
      "Developed automated IMDb data ingestion using Python and Selenium.",
      "Supported Kafka producers and JSON-based ingestion.",
      "Used NiFi to route data from Kafka, MongoDB, and JSON sources.",
      "Stored source data in Hadoop HDFS.",
      "Processed streaming data using Spark Structured Streaming.",
      "Used timestamps, watermarks, micro-batches, checkpoints, joins, and aggregations.",
      "Wrote analytical results to PostgreSQL through JDBC.",
      "Built sentiment classification using text processing and logistic regression.",
      "Classified reviews into Positive, Neutral, and Negative groups.",
      "Used Airflow DAGs to orchestrate pipeline jobs.",
      "Configured Prometheus and Grafana concepts for operational monitoring.",
      "Built business reporting using Power BI.",
      "Built a Flask interface for review sentiment prediction.",
    ],
    implementationStatus: [
      {
        label: "Pipeline components and repository implementation",
        state: "implemented",
        detail:
          "The repository demonstrates ingestion, Kafka/NiFi routing, HDFS storage, Spark Structured Streaming, PostgreSQL serving, Airflow orchestration, monitoring, dashboards, and NLP components.",
      },
      {
        label: "Complete multi-service runtime environment",
        state: "demonstrated",
        detail:
          "A full run requires local or cloud infrastructure, service credentials, network configuration, and source availability; it is not presented as an always-on commercial deployment.",
      },
      {
        label: "Strict end-to-end exactly-once guarantee",
        state: "planned",
        detail:
          "Exactly-once delivery is a future hardening goal, not a verified guarantee of the current portfolio implementation.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "Built during a Data Engineer internship at VCCorp, this enterprise-style system demonstrates a complete near-real-time architecture: web ingestion, event streaming, distributed storage, stream processing, NLP classification, and multiple serving channels. It is a portfolio-scale implementation of production streaming patterns — not a high-scale commercial platform.",
        ],
      },
      {
        id: "business-problem",
        heading: "Business Problem",
        paragraphs: [
          "Movie businesses want timely insight into how audiences receive titles. The system continuously collects IMDb movie and review data, measures review sentiment, and makes both operational and analytical views available to stakeholders.",
        ],
      },
      {
        id: "ingestion",
        heading: "Ingestion and Routing",
        bullets: [
          "A Python and Selenium crawler collects IMDb movie metadata and user reviews.",
          "Crawled events are published to Apache Kafka; JSON sources are also supported.",
          "Apache NiFi manages flows from Kafka, MongoDB, and JSON inputs with back-pressure and routing.",
          "Raw events land in Hadoop HDFS for durable, replayable storage.",
        ],
      },
      {
        id: "streaming",
        heading: "Stream Processing",
        paragraphs: [
          "Spark Structured Streaming consumes events in micro-batches with checkpointing for fault tolerance. Event-time timestamps and watermarks bound late data, while joins and aggregations compute per-movie review statistics and rolling metrics before results are written to PostgreSQL through JDBC sinks.",
        ],
      },
      {
        id: "nlp",
        heading: "Sentiment Analysis",
        paragraphs: [
          "Reviews are processed through text-cleaning and feature-extraction stages and classified with a logistic regression model into Positive, Neutral, and Negative groups. The same model powers both the batch-scored analytical tables and an interactive Flask prediction interface.",
        ],
      },
      {
        id: "orchestration-monitoring",
        heading: "Orchestration and Monitoring",
        bullets: [
          "Airflow DAGs schedule and coordinate pipeline jobs and dependencies.",
          "Prometheus collects operational metrics from pipeline components.",
          "Grafana dashboards visualize system health and processing activity.",
        ],
      },
      {
        id: "serving",
        heading: "Serving Layer",
        bullets: [
          "PostgreSQL stores analytical results for OLAP-style queries.",
          "Power BI delivers business reporting on movies, reviews, and sentiment trends.",
          "A Flask application exposes review sentiment prediction interactively.",
        ],
      },
    ],
    challenges: [
      "Coordinating Kafka, NiFi, HDFS, and Spark so events flow without loss or duplication.",
      "Choosing watermark and checkpoint settings that balance latency against correctness.",
      "Integrating an NLP model into a streaming pipeline without blocking micro-batches.",
    ],
    lessons: [
      "Checkpointing and idempotent sinks are what make streaming re-runs safe.",
      "NiFi is valuable as a visual routing layer between heterogeneous sources.",
      "Separating operational monitoring (Prometheus/Grafana) from business reporting (Power BI) keeps both audiences well served.",
    ],
    future: [
      "Introduce a schema registry for typed Kafka event contracts.",
      "Evaluate exactly-once Kafka-to-Spark configurations for stricter guarantees.",
      "Containerize all components for reproducible local deployment.",
    ],
  },
  {
    slug: "mb-bank-regulatory-etl",
    title: "Regulatory Reporting ETL System for MB Bank POC",
    category: "Enterprise ETL / Banking Data",
    status: "Internship POC — sanitized public case study",
    role: "Data Engineer Intern — ETL development and testing",
    context: "Internship",
    period: "February 2026 – May 2026",
    github: "https://github.com/Hai2310/Regulatory-Reporting-ETL-System-for-MB-Bank",
    featured: true,
    order: 4,
    shortDescription:
      "An Oracle-based ETL system for preparing, validating, and reporting regulatory data according to State Bank of Vietnam reporting requirements.",
    businessProblem:
      "Transform data from staging and operational data stores into trusted Data Mart outputs for regulatory reports, validation, reconciliation, and business review.",
    architecture: [
      "Source Systems",
      "Staging ODS",
      "Source-Readiness Checks",
      "PL/SQL Transformations",
      "ODI Workflows",
      "Data Mart",
      "BI Publisher Reports",
      "Excel Reconciliation",
    ],
    architectureNote:
      "Abstracted architecture — no customer records, credentials, internal mappings, or proprietary rules are shown.",
    diagram: "enterprise-etl",
    stack: [
      "Oracle Database",
      "SQL",
      "PL/SQL",
      "Oracle Data Integrator",
      "Staging ODS",
      "Data Mart",
      "BI Publisher",
      "Excel",
      "Logging",
      "Data Validation",
      "Unit Testing",
      "SIT Testing",
    ],
    concepts: [
      "ODS to Data Mart",
      "Regulatory Reporting",
      "ETL Logging",
      "Source-Readiness Checks",
      "Record Reconciliation",
      "SIT",
      "Handover Documentation",
    ],
    contributions: [
      "Analyzed business requirements, SRS documents, rule mappings, and report templates.",
      "Designed data-processing rules for regulatory reporting.",
      "Built PL/SQL transformation and aggregation procedures.",
      "Developed ODI workflows for source checking, processing, logging, and result updates.",
      "Implemented source-readiness and execution-status logging.",
      "Performed record-count reconciliation, duplicate checks, and detailed validation.",
      "Supported unit tests and system integration testing.",
      "Built BI Publisher reports and Excel exports.",
      "Prepared technical design, testing, operation, and handover documentation.",
    ],
    implementationStatus: [
      {
        label: "Internship POC implementation",
        state: "implemented",
        detail:
          "The ETL workflows, PL/SQL logic, testing, reporting, and handover work were completed in the private internship POC environment.",
      },
      {
        label: "Sanitized public case study",
        state: "demonstrated",
        detail:
          "The linked GitHub repository documents the architecture and responsibilities. Proprietary source code, customer data, credentials, internal screenshots, and confidential rule mappings are intentionally excluded.",
      },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "Developed during a Data Engineer internship at Insight Data, this proof of concept implements a regulatory reporting ETL system aligned with State Bank of Vietnam reporting requirements. All diagrams and examples in this case study are abstracted and sanitized — no customer records, account information, credentials, internal screenshots, source mappings, or proprietary business rules are disclosed.",
        ],
      },
      {
        id: "requirements",
        heading: "Requirements Analysis",
        paragraphs: [
          "Work began from BRD and SRS documents, rule-mapping sheets, and official reporting templates. Each reporting line was traced back to source attributes and transformation rules, producing explicit processing logic that reviewers could verify against the templates.",
        ],
      },
      {
        id: "processing",
        heading: "Transformation Layer",
        bullets: [
          "PL/SQL procedures transform and aggregate records from Staging ODS structures into Data Mart tables.",
          "Processing rules implement the regulatory mapping logic with parameterized, reusable procedures.",
          "Intermediate result tables support audit and reconciliation during testing.",
        ],
      },
      {
        id: "odi-workflows",
        heading: "ODI Workflows and Logging",
        bullets: [
          "Oracle Data Integrator packages orchestrate source checking, processing, logging, and result updates.",
          "Source-readiness checks verify that expected inputs arrived before transformation starts.",
          "SOURCES_LOG and ETL_SYS_LOG concepts record execution status, timing, and row counts for each run.",
        ],
      },
      {
        id: "testing",
        heading: "Testing and Validation",
        bullets: [
          "Unit tests for individual procedures and mappings.",
          "System integration testing across the full ODS-to-Data-Mart flow.",
          "Record-count reconciliation between source, staging, and mart layers.",
          "Duplicate checks and detailed field-level data validation.",
        ],
      },
      {
        id: "reporting",
        heading: "Reporting and Handover",
        bullets: [
          "BI Publisher reports generated from regulatory templates.",
          "Excel exports supporting business reconciliation and review.",
          "Technical design documents, test reports, operating guides, and handover packages prepared for the receiving team.",
        ],
      },
    ],
    challenges: [
      "Translating regulatory templates into unambiguous, testable transformation rules.",
      "Designing logging that lets operators pinpoint exactly where a run failed and why.",
      "Keeping validation strict enough for regulatory use while staying debuggable.",
    ],
    lessons: [
      "Source-readiness gates prevent the most expensive class of ETL failures: processing incomplete inputs.",
      "Row-count reconciliation is simple, fast, and catches a surprising share of mapping defects.",
      "Documentation is a deliverable — operating guides and handover packages determine whether a POC survives contact with a real team.",
    ],
    future: [
      "Automate regression reconciliation between reporting cycles.",
      "Add data-lineage documentation from report line back to source attribute.",
      "Parameterize template versions to simplify regulatory change management.",
    ],
  },
  {
    slug: "tiki-book-etl",
    title: "Tiki Book Data Pipeline and Analysis",
    category: "ETL / Web Data Integration",
    status: "Completed",
    role: "Data Engineer — ingestion, cleaning, SQL analysis",
    context: "Personal Project",
    github: "https://github.com/Hai2310/Tiki-Book-Data-Pipeline-Analysis",
    featured: false,
    order: 5,
    shortDescription:
      "An ETL pipeline that collects book product data, cleans and standardizes the dataset, loads it into PostgreSQL, and supports optimized SQL analysis.",
    businessProblem:
      "Turn raw marketplace product pages into a clean, queryable dataset that supports pricing, catalog, and search analysis.",
    architecture: [
      "Tiki Website",
      "Python Crawling",
      "Raw CSV",
      "Pandas & BeautifulSoup Cleaning",
      "Clean CSV",
      "PostgreSQL",
      "SQL Analysis & Optimization",
    ],
    diagram: "etl",
    stack: ["Python", "Pandas", "BeautifulSoup", "PostgreSQL", "SQL", "CSV", "Indexing", "pg_trgm"],
    concepts: ["Web Crawling", "Data Cleaning", "Normalization", "Full-Text Search", "Indexing", "Query Optimization"],
    contributions: [
      "Collected product and product-ID data.",
      "Cleaned and normalized product fields.",
      "Loaded curated data into PostgreSQL.",
      "Designed analytical SQL queries.",
      "Used database indexing and pg_trgm concepts for improved search and query performance.",
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "A focused ETL exercise on real marketplace data: crawl book product pages from Tiki, clean the raw extract into a standardized dataset, load it into PostgreSQL, and answer analytical questions with optimized SQL.",
        ],
      },
      {
        id: "pipeline",
        heading: "Pipeline Stages",
        bullets: [
          "Python crawling collects product listings and product-ID mappings into raw CSV files.",
          "Pandas and BeautifulSoup clean HTML artifacts, standardize prices, normalize categories, and parse ratings.",
          "Clean CSV output is loaded into typed PostgreSQL tables.",
        ],
      },
      {
        id: "analysis",
        heading: "SQL Analysis and Optimization",
        paragraphs: [
          "Analytical queries explore pricing distributions, category composition, and rating patterns. B-tree indexes support filtering and joins, while pg_trgm trigram indexes accelerate fuzzy product-name search. Query plans were compared before and after indexing to verify the improvements.",
        ],
      },
    ],
    challenges: [
      "Handling inconsistent HTML structures and missing fields in real marketplace pages.",
      "Choosing index types that help search workloads without over-indexing the table.",
    ],
    lessons: [
      "Cleaning rules should be explicit, versioned code — not one-off manual fixes.",
      "pg_trgm is a pragmatic way to add fuzzy search before adopting a dedicated search engine.",
    ],
    future: [
      "Schedule incremental crawls with change detection.",
      "Move raw extracts to object storage for a proper landing zone.",
    ],
  },
  {
    slug: "supermarket-data-warehouse",
    title: "Supermarket Management Data Warehouse",
    category: "Data Modeling / Business Intelligence",
    status: "Completed",
    role: "Data Engineer — requirements, modeling, BI design",
    context: "Academic Project",
    github: "https://github.com/Hai2310/Supermarket-Management-Design-Data-Warehouse-Project",
    featured: false,
    order: 6,
    shortDescription:
      "A complete business-to-data case study that translates supermarket reporting requirements into an analytical Star Schema.",
    businessProblem:
      "Convert supermarket management reporting needs into a dimensional model that supports revenue, product, employee, customer, and branch analytics.",
    architecture: [
      "Requirement Definition",
      "Requirement Specification",
      "Enterprise & Data Design",
      "Data Warehouse",
      "BI & Analytics",
    ],
    diagram: "star-schema",
    stack: ["Star Schema", "Dimensional Modeling", "SQL", "Data Warehouse Design", "BI", "Power BI"],
    concepts: ["Star Schema", "Fact & Dimension Design", "Grain Declaration", "Business Requirements", "KPI Design"],
    contributions: [
      "Translated supermarket reporting requirements into an analytical Star Schema.",
      "Designed Fact_Sales with Sales Amount, Quantity, Discount, and Profit measures.",
      "Modeled Dim_Time, Dim_Product, Dim_Category, Dim_Customer, Dim_Employee, and Dim_Store dimensions.",
      "Defined analytical use cases spanning revenue, products, employees, customers, and branches.",
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "A business-to-data case study covering the full path from requirement definition to BI-ready dimensional design for a supermarket chain.",
        ],
      },
      {
        id: "process",
        heading: "Process",
        bullets: [
          "Requirement Definition: identify decision-makers, questions, and reporting cadence.",
          "Requirement Specification: formalize metrics, grain, and source mappings.",
          "Enterprise and Data Design: bus matrix and dimensional modeling.",
          "Data Warehouse: star schema implementation.",
          "BI and Analytics: dashboard and KPI design.",
        ],
      },
      {
        id: "model",
        heading: "Warehouse Model",
        paragraphs: [
          "Fact_Sales captures Sales Amount, Quantity, Discount, and Profit at the transaction-line grain, surrounded by Dim_Time, Dim_Product, Dim_Category, Dim_Customer, Dim_Employee, and Dim_Store.",
        ],
      },
      {
        id: "use-cases",
        heading: "Analytical Use Cases",
        bullets: [
          "Revenue by day, month, quarter, and year.",
          "Best-selling products.",
          "Revenue by category.",
          "Employee performance.",
          "High-value customers.",
          "Branch comparison.",
          "Customer purchasing behavior.",
        ],
      },
    ],
    challenges: [
      "Fixing the fact-table grain early enough that every requirement could be answered without model changes.",
      "Deciding which attributes belong in dimensions versus degenerate fact fields.",
    ],
    lessons: [
      "A clear grain declaration is the single most important modeling decision.",
      "Dimensional models communicate well with business stakeholders because they mirror how people ask questions.",
    ],
    future: [
      "Add slowly changing dimension handling for customer and employee history.",
      "Prototype the model with real sample data and Power BI measures.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : undefined,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : undefined,
  };
}
