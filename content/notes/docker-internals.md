# Docker Internals: Namespaces & Cgroups

> "Containers are just processes with an ego problem."

Understanding Docker requires looking beneath the API surface to the Linux kernel primitives that make isolation possible.

## 1. Namespaces (Isolation)
Namespaces partition kernel resources so that one set of processes sees one set of resources while another set sees a different set.

*   `PID`: Process isolation (PID 1 inside container).
*   `NET`: Network stacks (IPs, ports).
*   `MNT`: Mount points (Filesystem).
*   `UTS`: Hostname.
*   `IPC`: Inter-Process Communication.
*   `USER`: User ID mapping.

## 2. Cgroups (Resource Control)
Control Groups (cgroups) limit and account for resource usage (CPU, Memory, Disk I/O). Without cgroups, a single container could exhaust the host's memory (OOM).

## 3. Union Filesystems (Layering)
Docker images are built from read-only layers (OverlayFS). When a container starts, a thin read-write layer is added on top. This Copy-on-Write (CoW) strategy makes containers lightweight and fast to start.

## Summary

Docker didn't invent containers; it democratized access to existing Linux kernel features (LXC) through a developer-friendly API.
