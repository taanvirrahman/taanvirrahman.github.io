# Database Sharding Strategies

> "Scale horizontally, not vertically."

As data volume grows beyond the capacity of a single server, sharding becomes inevitable. It involves partitioning data across multiple machines (shards) while maintaining a unified interface for the application.

## Key Partitioning Strategies

### 1. Key-Based (Hash) Sharding
Uses a hash function on a key (e.g., `user_id`) to determine the shard.
*   **Pros**: Uniform distribution.
*   **Cons**: Resharding is expensive (Consistent Hashing helps).

### 2. Range-Based Sharding
Divides data based on ranges of values (e.g., Time series data, Alphabetical).
*   **Pros**: Efficient for range queries.
*   **Cons**: Hotspots if data is not uniformly distributed (e.g., recent data).

### 3. Directory-Based Sharding
A lookup service maintains a map of keys to shards.
*   **Pros**: Flexible mapping.
*   **Cons**: Lookup service becomes a single point of failure.

## Challenges

*   **Joins**: Cross-shard joins are expensive and complex.
*   **Transactions**: Distributed transactions (2PC) add significant latency.

## Conclusion

Sharding is a powerful tool but introduces significant operational complexity. Always maximize optimization and replication before sharding.
