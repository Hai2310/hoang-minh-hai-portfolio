import type { ProjectOverride } from "@/types";

/**
 * Manual overrides for GitHub repositories shown in the "More Projects" explorer.
 * `match` is compared (case-insensitive) against the repository name.
 * Automatic classification uses names/topics; anything defined here wins.
 */
export const projectOverrides: ProjectOverride[] = [
  {
    match: "International-Business-Data-Analysis-System-TPC-H-",
    displayTitle: "International Business Data Analysis System — TPC-H",
    category: "data-warehouse",
    featured: true,
    description:
      "Enterprise-style Snowflake analytics platform with Bronze/Silver/Gold Medallion Architecture on TPC-H data.",
    techTags: ["Snowflake", "Snowpark", "SQL", "Streams", "Tasks", "RBAC"],
    caseStudySlug: "tpc-h-snowflake-medallion",
    sortOrder: 1,
  },
  {
    match: "End-to-End-Data-Pipeline-for-Book-Data-using-AWS",
    displayTitle: "End-to-End Book Data Pipeline on AWS",
    category: "cloud",
    featured: true,
    description:
      "AWS pipeline: Open Library API → S3 data lake → Glue/PySpark ETL → Redshift → Power BI and FastAPI.",
    techTags: ["AWS", "S3", "Glue", "PySpark", "Redshift", "FastAPI"],
    caseStudySlug: "aws-book-data-pipeline",
    sortOrder: 2,
  },
  {
    match: "Realtime-IMDB-Sentiment-Analysis",
    displayTitle: "Real-Time IMDb Data Pipeline and Sentiment Analysis",
    category: "streaming",
    featured: true,
    description:
      "Near-real-time streaming platform: Kafka, NiFi, HDFS, Spark Structured Streaming, NLP sentiment, dashboards.",
    techTags: ["Kafka", "NiFi", "Spark", "HDFS", "PostgreSQL", "Airflow"],
    caseStudySlug: "realtime-imdb-sentiment",
    sortOrder: 3,
  },
  {
    match: "Regulatory-Reporting-ETL-System-for-MB-Bank",
    displayTitle: "Regulatory Reporting ETL System for MB Bank POC",
    category: "data-engineering",
    featured: true,
    description:
      "Oracle-based regulatory ETL: Staging ODS → PL/SQL transformations → Data Mart, with ODI, logging, and validation.",
    techTags: ["Oracle", "PL/SQL", "ODI", "Data Mart", "BI Publisher"],
    caseStudySlug: "mb-bank-regulatory-etl",
    sortOrder: 4,
  },
  {
    match: "Tiki-Book-Data-Pipeline-Analysis",
    displayTitle: "Tiki Book Data Pipeline and Analysis",
    category: "data-engineering",
    featured: false,
    description: "ETL pipeline: crawl, clean, load into PostgreSQL, and analyze with optimized SQL and pg_trgm.",
    techTags: ["Python", "Pandas", "PostgreSQL", "SQL"],
    caseStudySlug: "tiki-book-etl",
    sortOrder: 5,
  },
  {
    match: "Supermarket-Management-Design-Data-Warehouse-Project",
    displayTitle: "Supermarket Management Data Warehouse",
    category: "data-warehouse",
    featured: false,
    description: "Business-to-data case study translating supermarket reporting needs into a Star Schema.",
    techTags: ["Star Schema", "Dimensional Modeling", "BI"],
    caseStudySlug: "supermarket-data-warehouse",
    sortOrder: 6,
  },
];
