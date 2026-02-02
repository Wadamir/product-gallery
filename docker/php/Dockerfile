FROM php:7.4-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set ServerName to suppress warning
RUN echo "ServerName localhost" > /etc/apache2/conf-available/servername.conf \
	&& a2enconf servername

WORKDIR /var/www/html