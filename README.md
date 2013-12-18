drarosamora
===========

sitio en wordpress de la dra rosa mora, con plugin calendario y formulario

Mi virtual host 
===============
<VirtualHost *:80>
    DocumentRoot "/Users/angie/Sites/consultorio/public/wordpress"
    ServerName drarosamora.com
	ServerAlias www.drarosamora.com
    ErrorLog "/Users/angie/Sites/consultorio/logs/error_log"
	<Directory "/Users/angie/Sites/consultorio/public/wordpress">
	        AllowOverride All
	    </Directory>
</VirtualHost>