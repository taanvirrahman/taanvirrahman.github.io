# PostgreSQL Internals

> [**Official Documentation: MVCC**](https://www.postgresql.org/docs/current/mvcc.html)

Understanding how your database engine works under the hood is what separates a database user from a database engineer.

## Core Concepts

### MVCC (Multi-Version Concurrency Control)
Postgres manages concurrency by keeping multiple versions of a row. This ensures readers don't block writers and vice versa.

### VACUUM
Because of MVCC, "dead tuples" (old versions of rows) accumulate. The VACUUM process reclaims this storage. Tuning VACUUM is a critical skill for managing high-write Postgres clusters.

### WAL (Write-Ahead Logging)
Ensures data integrity. Changes are written to the log first before being flushed to the disk. This is the foundation of crash recovery and replication.

## Deep Dive
I highly recommend reading Interdb's *The Internals of PostgreSQL* for a diagram-rich explanation of these subsystems.
