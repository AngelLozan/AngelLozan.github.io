---
lang: en
page_id: self_host_pds
permalink: /posts/self_host_pds
title: Self Hosting a Personal Data Server (PDS) for BlueSky
date: 2025-03-13
categories: [Docker, Digital Ocean, BlueSky, PDS]
tags: [Tutorial, Self-Hosting, Docker, MacOS]
author: Angel
description: Self Host a Personal Data Server (PDS) for your BlueSky Account
image: /assets/img/pds.jpeg
---



# Self-Hosting a Bluesky PDS

Self-hosting a Bluesky Personal Data Server (PDS) allows you to run your own instance that federates with the wider ATProto network. This guide covers setting up a PDS on a Digital Ocean droplet, configuring DNS, and maintaining your server.

## Table of Contents
- [Preparation for Self-Hosting PDS](#preparation-for-self-hosting-pds)
- [Opening Cloud Firewall for HTTP and HTTPS](#opening-cloud-firewall-for-http-and-https)
- [Configuring DNS on Name.com](#configuring-dns-on-namecom)
- [Verifying DNS](#verifying-dns)
- [Installing PDS on Ubuntu/Debian](#installing-pds-on-ubuntudebian)
- [Checking PDS Status](#checking-pds-status)
- [Creating an Account](#creating-an-account)
- [Using the Bluesky App](#using-the-bluesky-app)
- [Updating PDS](#updating-pds)
- [Setting Up a Cron Job for Updates](#setting-up-a-cron-job-for-updates)
- [Getting Help](#getting-help)

## Preparation for Self-Hosting PDS
Launch a server on a cloud provider such as Digital Ocean or Vultr. Ensure SSH access and root privileges.

### Server Requirements
- **Public IPv4 address**
- **Public DNS name**
- **Inbound access on ports 80/tcp and 443/tcp**

### Recommended Specs
| Operating System | Ubuntu 22.04 |
|-----------------|-------------|
| RAM            | 1 GB       |
| CPU Cores      | 1         |
| Storage        | 20 GB SSD  |

Restrict SSH (port 22) to your IP using `ifconfig.me` to find it.

## Opening Cloud Firewall for HTTP and HTTPS
Ensure the following ports are open:
- **80/tcp** (Used for TLS verification)
- **443/tcp** (Used for app requests)

## Configuring DNS on Name.com
1. Log into your [Name.com](https://www.name.com/) account.
2. Navigate to **DNS Records**.
3. Add these records, replacing `example.com` and `12.34.56.78` with your domain and IP:
   
   | Name           | Type | Value        | TTL  |
   |--------------|------|-------------|------|
   | example.com  | A    | 12.34.56.78 | 600  |
   | *.example.com | A    | 12.34.56.78 | 600  |

## Verifying DNS
Use [DNS Checker](https://www.whatsmydns.net/) to confirm propagation. Run:
```sh
dig A example.com
```
Expected output: your server's IP.

## Installing PDS on Ubuntu/Debian
SSH into your server and run:
```sh
wget https://raw.githubusercontent.com/bluesky-social/pds/main/installer.sh
sudo bash installer.sh
```

## Checking PDS Status
Verify your PDS is online:
```sh
curl https://example.com/xrpc/_health
```
Expected response:
```json
{"version":"0.2.2-beta.2"}
```
Test WebSocket connectivity:
```sh
wsdump "wss://example.com/xrpc/com.atproto.sync.subscribeRepos?cursor=0"
```

## Creating an Account
### Using `pdsadmin`
```sh
sudo pdsadmin account create
```

### Using an Invite Code
```sh
sudo pdsadmin create-invite-code
```
Use this code when registering via the Bluesky app.

## Using the Bluesky App
1. Download the app for [Web](https://bsky.app), [iPhone](https://apps.apple.com), or [Android](https://play.google.com/store).
2. Enter your PDS URL (e.g., `https://example.com/`).

## Updating PDS
Keep your PDS up to date:
```sh
sudo pdsadmin update
```

## Setting Up a Cron Job for Updates
To automate updates, edit the cron jobs:
```sh
crontab -e
```
Add the following line to run updates at **1:30 AM on the 1st and 15th of each month**:
```sh
30 1 1,15 * * psadmin update
```

## Getting Help
For troubleshooting:
```sh
docker logs caddy --tail=50 --follow
```
Check if the service is running:
```sh
curl https://example.com/xrpc/_health
```
If issues persist, restart the service:
```sh
systemctl restart pds.service
```

This guide ensures a reliable, self-hosted Bluesky PDS. Happy hosting!

