export const profile = {
  summary:
    "Data Engineer and Computer Science student with hands-on experience building batch and real-time data pipelines, cloud data platforms, data warehouses, regulatory reporting ETL systems, and analytical solutions. I work across the full data lifecycle, from ingestion and transformation to orchestration, monitoring, governance, serving, and business intelligence.",
  careerDirection:
    "My goal is to grow into a professional Data Engineer and, in the long term, a Data Architect capable of designing scalable, reliable, secure, and efficient data platforms.",
  valueProposition:
    "I combine data engineering fundamentals, practical cloud implementation, business requirement analysis, and analytics thinking to build systems that are not only technically correct but also useful to the business.",
  heroIntro:
    "I am Hoang Minh Hai, a Data Engineer based in Hanoi, Vietnam. I design and build batch and real-time pipelines, data warehouses, lakehouse platforms, cloud data workflows, and analytics systems using Python, SQL, Spark, Kafka, Airflow, Snowflake, Oracle, and AWS.",
  animatedRoles: [
    "Data Engineer",
    "ETL & ELT Developer",
    "Cloud Data Engineer",
    "Big Data & Streaming Engineer",
    "Data Warehouse Developer",
    "Future Data Architect",
  ],
  highlights: [
    { title: "End-to-End Data Pipelines", icon: "workflow" },
    { title: "Batch & Real-Time Processing", icon: "zap" },
    { title: "Cloud Data Engineering", icon: "cloud" },
    { title: "Data Warehouse & Lakehouse", icon: "database" },
    { title: "Data Quality & Monitoring", icon: "shield-check" },
    { title: "BI & Business Analytics", icon: "bar-chart" },
  ],
  about: {
    title: "Engineering Data from Source to Business Value",
    paragraphs: [
      "I am a Data Engineer and Computer Science student at Hanoi University of Science and Technology. My work focuses on designing dependable data workflows that collect, transform, store, validate, monitor, and serve data for analytics and operational use cases.",
      "I have worked with batch processing, stream processing, cloud data platforms, data warehouses, data lakes, regulatory reporting systems, REST APIs, business intelligence, and machine learning integrations.",
      "I enjoy solving problems across the entire data lifecycle: understanding business requirements, designing data models, implementing ETL or ELT logic, automating workflows, validating data quality, improving performance, and making data accessible to downstream users.",
      "My long-term objective is to become a Data Architect who can design scalable and secure data platforms that generate measurable business value.",
    ],
    howIWork: [
      {
        title: "Understand the Business",
        body: "Analyze requirements, reporting rules, data sources, consumers, SLAs, and expected outcomes.",
      },
      {
        title: "Design the Data System",
        body: "Define ingestion flows, storage layers, schemas, transformations, orchestration, security, and serving patterns.",
      },
      {
        title: "Build for Reliability",
        body: "Implement validation, idempotency, incremental processing, logging, monitoring, retries, and recovery mechanisms.",
      },
      {
        title: "Deliver Business Value",
        body: "Expose trusted datasets, reports, APIs, dashboards, and actionable metrics for users and decision-makers.",
      },
    ],
  },
  education: {
    institution: "Hanoi University of Science and Technology",
    school: "School of Information and Communication Technology",
    degree: "Computer Science Student",
    major: "Computer Science — IT1",
    period: "2023 – 2027",
    gpa: "3.3 / 4.0",
    english: "TOEIC 550",
    description:
      "Studying Computer Science with a focus on software systems, databases, data engineering, data analytics, distributed processing, and cloud technologies.",
  },
  strengths: [
    {
      title: "Structured problem solving",
      body: "I decompose data problems into source, ingestion, transformation, storage, serving, and monitoring layers.",
    },
    {
      title: "Self-learning and technology exploration",
      body: "I build hands-on projects with new tools — from Snowflake Streams to Spark Structured Streaming — before applying them in real work.",
    },
    {
      title: "Logical thinking",
      body: "I trace data issues through lineage and execution logs instead of guessing at symptoms.",
    },
    {
      title: "Technical documentation",
      body: "I write design documents, test reports, and operating guides that let others run and extend my systems.",
    },
    {
      title: "Business requirement analysis",
      body: "I translate BRDs, rule mappings, and report templates into explicit data-processing logic.",
    },
    {
      title: "Teamwork and communication",
      body: "I align with analysts, testers, and reviewers through SIT cycles, reconciliation sessions, and handover packages.",
    },
    {
      title: "Reading English technical documentation",
      body: "I work directly with vendor documentation for AWS, Snowflake, Spark, and Oracle tooling.",
    },
    {
      title: "Attention to data quality",
      body: "I treat record counts, duplicates, and referential integrity as first-class deliverables, not afterthoughts.",
    },
  ],
  workflow: {
    title: "From Raw Data to Trusted Decisions",
    stages: [
      { name: "Source", body: "APIs, databases, websites, files, and event streams" },
      { name: "Ingest", body: "Batch crawlers, REST integrations, Kafka, NiFi, and cloud services" },
      { name: "Process", body: "Python, SQL, Spark, PySpark, ETL, ELT, validation, and enrichment" },
      { name: "Store", body: "Data Lakes, HDFS, S3, PostgreSQL, Oracle, Redshift, and Snowflake" },
      { name: "Orchestrate", body: "Airflow, Step Functions, EventBridge, schedules, retries, and dependencies" },
      { name: "Observe", body: "Logs, data-quality checks, Prometheus, Grafana, CloudWatch, and alerts" },
      { name: "Serve", body: "Data Marts, BI dashboards, reports, REST APIs, and analytical datasets" },
    ],
  },
  currentFocus: [
    "Advanced Apache Spark optimization",
    "Production-grade orchestration",
    "Cloud data architecture",
    "Data governance",
    "Data observability",
    "Infrastructure as Code",
  ],
} as const;
