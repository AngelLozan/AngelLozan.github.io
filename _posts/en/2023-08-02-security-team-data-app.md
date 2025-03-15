---
lang: en
page_id: secops-data
permalink: /posts/secops-data
title: Deploying SecOps Defense with IoC Database Capability
date: 2023-08-02
categories: [Docker, AWS, Rails, Ruby, Secops]
tags: [Secops, AWS, Docker, Rails, Ruby, FullStack]
author: Angel
description: Deploying SecOps Defense with IoC Database Capability. Gather, triage, attack and distribute indicators of compromise to protect users.
image: /assets/img/scamhitlist.png
---




# How to Build and Deploy a Full Stack Scam Reporting App with Rails

This guide will walk you through setting up, running, and deploying a full-stack scam reporting application built with Ruby on Rails. The app allows users to report Indicators of Compromise (IOCs), track progress, attach evidence, and collaborate on cases.

## Features
- Report and track IOCs with multiple API integrations
- More efficient than spreadsheets
- Allows unauthorized users to submit IOCs
- Supports evidence attachment and tracking
- Enables multiple users to work on the same IOC

---

## 1. Importing CSV Data into PostgreSQL
To import CSV data into Postgres, ensure that:
- Empty cells are set as `null`
- Placeholder timestamps for `created_at` and `updated_at` exist if none are provided
- Column order matches the table structure

### Steps:
1. Access PostgreSQL on Heroku:
   ```sh
   heroku pg:psql -a scam-hitlist
   ```
2. Run the following command:
   ```sh
   \copy iocs(id,url,created_at,updated_at,removed_date,status,report_method_one,report_method_two,form,host,follow_up_date,follow_up_count,comments) FROM './lib/data.csv' WITH DELIMITER ',' NULL AS 'null' CSV HEADER;
   ```
3. Success message: `copy 7000` (or similar number)

---

## 2. Setup
1. Install dependencies:
   ```sh
   bundle install
   ```
2. Set up the database:
   ```sh
   rails db:drop db:create db:migrate db:seed
   ```

---

## 3. Running the App
1. Start the server and run JavaScript:
   ```sh
   dev
   ```
2. If front-end features are missing, compile assets:
   ```sh
   rails assets:precompile
   ```

---

## 4. Database Configuration
After seeding the database, manually update the next ID:
```sh
highest_id = Ioc.maximum(:id)
next_available_id = highest_id + 1
ActiveRecord::Base.connection.execute("SELECT setval('iocs_id_seq', #{next_available_id}, false)")
```

To reset the database sequence:
```sh
heroku restart; heroku pg:reset DATABASE --confirm APP-NAME; heroku run rake db:migrate
```

---

## 5. Deploying to Heroku
### Add Required Buildpacks
1. Chrome:
   ```sh
   heroku buildpacks:add heroku/google-chrome --index=1
   ```
2. Node.js:
   ```sh
   heroku buildpacks:add heroku/nodejs --index=2
   ```
3. Puppeteer (optional):
   ```sh
   heroku buildpacks:add jontewks/puppeteer --index=3
   ```
4. Set the environment variable:
   ```sh
   heroku config:set PUPPETEER_SKIP_DOWNLOAD=true [--remote yourappname]
   ```

### Configure Grover in `config/initializers/grover.rb`:
```ruby
Grover.configure do |config|
  config.options = {
    executable_path: "google-chrome"
  }
end
```

---

## 6. Security Features
- File validation: Limits file size to 5MB, only allows PDFs, .eml, JPEG, PNG, and TXT
- Sanitization: Removes XSS attacks from form inputs
- Strong parameters
- CSRF meta tags
- Strong hash algorithm for cookie signatures (SHA-256)
- No `open-uri`, `Marshal`, `html_safe`, or `raw` methods
- Omniauth restricted to two Google Enterprise accounts
- Route limiting
- Automated security checks:
  - `bundler-audit` for dependencies
  - `brakeman` for code review
  - `OSWAP dependency check`

---

## 7. Testing
- Use RSpec for controller tests
- Create model instances before testing
- Use `let` to define variables in tests

---

## 8. Docker Setup
1. Reset the highest IOC ID (see Database Setup section)
2. Run locally:
   ```sh
   docker-compose build && docker-compose up
   ```
3. Build and push to Docker Hub:
   ```sh
   docker build -t yourusername/scam-hitlist:latest .
   docker push yourusername/scam-hitlist:latest
   ```
4. Access the Rails console inside the container:
   ```sh
   docker container ps
   docker exec -it <container ID> bin/rails c
   ```

---

## 9. Deploying to AWS
### Steps:
1. **Deploy to Amazon ECR:**
   - Ensure Docker is running
   - Tag and push to AWS repository:
     ```sh
     docker tag <name> <aws_repo_name>
     docker push <aws_repo_name>
     ```
2. **Create Kubernetes Cluster:**
   ```sh
   eksctl create cluster --region your-region --name root --managed
   ```
3. **Create RDS Database:**
   - Use Free Tier with port `5432`
   - Assign security groups to allow container access
4. **Set Database Credentials in Kubernetes:**
   ```sh
   echo -n "<username>" | base64
   echo -n "<password>" | base64
   ```
   - Store values in a YAML file and create a secret:
     ```sh
     kubectl create -f secrets.yaml
     ```
5. **Deploy the App in Kubernetes:**
   ```sh
   kubectl create -f deployment.yaml
   kubectl get pods
   ```

### Access Console in Kubernetes:
```sh
kubectl exec -it <pod ID> -- /bin/bash
```
For Alpine:
```sh
kubectl exec -it <pod ID> -- /bin/sh
```

### Migrate and Seed the Database:
```sh
bundle exec rake db:migrate
bundle exec rake db:seed
```

---

## Conclusion
By following this guide, you can successfully set up, run, and deploy your scam reporting Rails app on Heroku, Docker, and AWS. This ensures efficient reporting, tracking, and management of IOCs with a scalable and secure infrastructure.

