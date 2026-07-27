import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    company: "Insight Data",
    role: "Data Engineer Intern",
    period: "February 2026 – May 2026",
    type: "Internship",
    summary:
      "Developed ETL workflows for a regulatory reporting proof of concept supporting State Bank of Vietnam reporting requirements.",
    responsibilities: [
      "Analyzed BRD, SRS, rule-mapping documents, and reporting templates.",
      "Translated business and reporting requirements into data-processing logic.",
      "Built PL/SQL procedures on Oracle Database.",
      "Transformed and aggregated data from Staging ODS to Data Mart layers.",
      "Developed ETL workflows using Oracle Data Integrator.",
      "Implemented source-readiness checks and job-status logging.",
      "Used SOURCES_LOG and ETL_SYS_LOG concepts to monitor ETL execution.",
      "Performed unit testing, SIT testing, record-count checks, duplicate checks, and detailed data validation.",
      "Developed BI Publisher reports based on regulatory templates.",
      "Supported Excel exports for business reconciliation and review.",
      "Prepared technical design documents, test reports, operating guides, and handover packages.",
    ],
    stack: [
      "Oracle",
      "SQL",
      "PL/SQL",
      "Oracle Data Integrator",
      "ODS",
      "Data Mart",
      "ETL",
      "BI Publisher",
      "Data Validation",
      "Unit Testing",
      "SIT",
      "Regulatory Reporting",
    ],
  },
  {
    company: "VCCorp",
    role: "Data Engineer Intern",
    period: "October 2025 – January 2026",
    type: "Internship",
    summary:
      "Built an end-to-end, near-real-time data pipeline for collecting, processing, analyzing, and visualizing IMDb review data for sentiment analysis.",
    responsibilities: [
      "Built a Python and Selenium ingestion system for collecting IMDb movie and review data.",
      "Published crawled data through Apache Kafka.",
      "Used Apache NiFi to manage data flows from Kafka, MongoDB, and JSON sources.",
      "Designed raw data storage using Hadoop HDFS.",
      "Processed data using Apache Spark Structured Streaming.",
      "Stored transformed analytical results in PostgreSQL for OLAP queries and reporting.",
      "Orchestrated workflows using Apache Airflow.",
      "Monitored infrastructure and pipeline components using Prometheus and Grafana.",
      "Supported sentiment analysis and reporting through Power BI and a Flask application.",
    ],
    stack: [
      "Python",
      "Selenium",
      "Kafka",
      "NiFi",
      "Hadoop",
      "HDFS",
      "Spark Structured Streaming",
      "PostgreSQL",
      "Airflow",
      "Prometheus",
      "Grafana",
      "Power BI",
      "Flask",
      "NLP",
    ],
  },
];

export const privacyNote =
  "This portfolio describes technical responsibilities at a high level and does not expose confidential business data, internal credentials, or proprietary customer information.";
