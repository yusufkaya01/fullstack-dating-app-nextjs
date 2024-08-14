# Use the official NGINX image from Docker Hub
FROM nginx:alpine

# Copy the custom NGINX configuration file

COPY ./nginx.conf /etc/nginx/nginx.conf


# Expose port 80 for HTTP traffic
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
