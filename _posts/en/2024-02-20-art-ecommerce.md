---
lang: en
page_id: ecommerce_app
permalink: /posts/ecommerce_app
title: Self-hosted Ecommerce Platform for Artists
date: 2024-02-20
categories: [Rails, Ecommerce, Digital Ocean, Deployment]
tags: [Tutorial, Self-Hosting, Ruby on Rails, Printify, API, Ruby]
author: Angel
description: A self-hosted ecommerce application built with Ruby on Rails to help artists sell their work without third-party marketplaces.
image: /assets/img/aoj.jpeg
---

# Website and Ecommerce Application

This is a self-hosted ecommerce application designed to showcase an artist’s work and eliminate reliance on third-party platforms for sales.

🔗 **Live App:** [The Art of Jaleh](https://theartofjaleh.com/)


Code found here: [https://github.com/AngelLozan/aoj](https://github.com/AngelLozan/aoj)

---

## 🎨 Features

- **Single Admin User:** Restricted to one user for managing content.
- **Artwork Display & Sales:** Visitors can browse and purchase art directly.
- **Printify Integration:** Automates print-on-demand orders.
- **Secure Payments:** Integrated with PayPal sandbox for testing.
- **Self-Hosting on Digital Ocean:** Full control over hosting and deployment.

---

## 🔑 Account Administration

- This app is designed for a **single admin user**.
- Admin credentials must be created via the **Rails console**.
- The admin can update their email and password within the UI.

---

## ⚙️ Setup & Deployment

### **1️⃣ Deploying to Digital Ocean**

#### **Create a Droplet**
- Choose a **Rails Marketplace App** when setting up your droplet.
- SSH into the droplet:

  ```sh
  ssh root@<droplet-ip>
  ```

- (Optional) Set up a shorthand SSH config:

  ```sh
  Host <app-name>
    User root
    HostName <droplet-ip>
    IdentityFile ~/.ssh/<key-name>
  ```

  Now you can connect using:

  ```sh
  ssh <app-name>
  ```

#### **Update Packages**
```sh
sudo apt-get update
```

#### **Modify Nginx Configuration**
```sh
nano /etc/nginx/sites-available/rails
```
- Change `root /home/rails/rails_app/public;` to:

  ```
  root /home/<app-name>/public;
  ```

- Update server name:

  ```
  server_name <your-domain> www.<your-domain>;
  ```

- Add to `location /` block:
  ```
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  ```

#### **Change Working Directory**
```sh
nano /etc/systemd/system/rails.service
```
- Update:

  ```
  WorkingDirectory=/home/<app-name>
  ExecStart= /bin/bash -lc 'bundle exec puma -e production'
  ```

#### **DNS Configuration (Digital Ocean)**
- Add **A Records** for your domain:
  ```
  ns1.digitalocean.com
  ns2.digitalocean.com
  ns3.digitalocean.com
  ```

#### **Clone & Set Up App**
```sh
git clone <repo-url>
sudo chmod 777 -R <app-name>
cd <app-name>
```

#### **Install Dependencies**
```sh
bundle install
yarn install
```

#### **Set Up ENV Variables**
- Install Figaro:
  ```sh
  bundle exec figaro install
  ```

- Move `.env` values to `config/application.yml`:
  ```yml
  EXAMPLE_ENV_VAR: value
  ```

#### **Database Setup**
```sh
RAILS_ENV=production rails db:create
RAILS_ENV=production rails db:migrate
RAILS_ENV=production rails db:seed
```

#### **Precompile Assets**
```sh
RAILS_ENV=production bundle exec rake assets:precompile
```

#### **Obtain SSL Certificate**
```sh
sudo certbot --nginx -d <your-domain> -d www.<your-domain>
```

#### **Restart Services**
```sh
sudo systemctl daemon-reload
sudo systemctl restart nginx
sudo systemctl restart rails.service
```

---

## 🔄 Updating & Troubleshooting

#### **Pulling Latest Code**
```sh
git fetch
git pull
```

#### **Checking Service Status**
```sh
sudo systemctl status rails.service
sudo systemctl status nginx
```

#### **Viewing Logs**
```sh
journalctl -u rails.service -b
cd <app-name>
tail -f log/production.log
```

---

## 🛍️ Printify API Integration

With a custom API store setup, **Printify does not handle publishing**. Use the API to fetch product data and manually create listings.

- Use [Printify API](https://developers.printify.com/#overview) to:
  - Retrieve product data
  - Set product publish status
  - Unlock stuck products

For support: **apiteam[@]printify.com**

---

## 🛠️ Testing

### **GHA Workflows**
- Currently disabled due to Cloudinary connection issues.
- To enable, move workflows from `./test` to `./github/`.

### **Running Tests**
```sh
rails db:test:purge
rails test
```

### **Testing PayPal Sandbox**
- Use a future date for the expiration, e.g., **10/24**.

---

## 🎨 Artwork

The artwork used in this project consists of original mockups provided by the artist to preview the final site design.

---

## 🚀 Conclusion

This self-hosted ecommerce application provides artists with a **fully controlled online store**, avoiding third-party fees and restrictions. With a **secure, self-hosted setup on Digital Ocean**, this solution ensures a smooth buying experience for customers and full management capabilities for the artist.

🔗 **Live App:** [The Art of Jaleh](https://theartofjaleh.com/)

