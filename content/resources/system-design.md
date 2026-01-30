
System design is the art of defining the architecture, interfaces, and data for a system to satisfy specified requirements.

## Essential Books
1. **Designing Data-Intensive Applications** by Martin Kleppmann (The Bible)
2. **System Design Interview** by Alex Xu

## Key Concepts

### Scalability
- **Vertical:** Adding more power (CPU, RAM) to your servers.
- **Horizontal:** Adding more servers into your pool of resources.

### Load Balancing
Distributing incoming network traffic across a group of backend servers (server farm).
- Nginx
- HAProxy

### Caching
- **CDN:** Cloudflare, AWS CloudFront
- **Redis:** In-memory data structure store

### Databases
- **SQL (ACID):** PostgreSQL, MySQL
- **NoSQL (BASE):** MongoDB, Cassandra, DynamoDB

## Resources
- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- [High Scalability Blog](http://highscalability.com/)
