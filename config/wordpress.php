<?php
/** 
 * Configuración básica de WordPress.
 *
 * Este archivo contiene las siguientes configuraciones: ajustes de MySQL, prefijo de tablas,
 * claves secretas, idioma de WordPress y ABSPATH. Para obtener más información,
 * visita la página del Codex{@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} . Los ajustes de MySQL te los proporcionará tu proveedor de alojamiento web.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

/** Mis constantes para direccionar  **/
define('APP_ROOT', dirname(__DIR__));
define('WP_HOME', 'http://drarosamora.com/');
define('WP_SITEURL', WP_HOME);
define('WP_CONTENT_DIR', APP_ROOT . '/public/content');

// ** Ajustes de MySQL. Solicita estos datos a tu proveedor de alojamiento web. ** //
/** El nombre de tu base de datos de WordPress */
define('DB_NAME', 'consultorio');

/** Tu nombre de usuario de MySQL */
define('DB_USER', 'leadmin');

/** Tu contraseña de MySQL */
define('DB_PASSWORD', '|AUnl2FNgw}(r1IE(s4Kn(EnDoSRXp%|WN2jz');

/** Host de MySQL (es muy probable que no necesites cambiarlo) */
define('DB_HOST', 'localhost');

/** Codificación de caracteres para la base de datos. */
define('DB_CHARSET', 'utf8');

/** Cotejamiento de la base de datos. No lo modifiques si tienes dudas. */
define('DB_COLLATE', 'utf8_spanish_ci');

/**#@+
 * Claves únicas de autentificación.
 *
 * Define cada clave secreta con una frase aleatoria distinta.
 * Puedes generarlas usando el {@link https://api.wordpress.org/secret-key/1.1/salt/ servicio de claves secretas de WordPress}
 * Puedes cambiar las claves en cualquier momento para invalidar todas las cookies existentes. Esto forzará a todos los usuarios a volver a hacer login.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '~|Gqw$n+V)8Hd|Pp$AYGxmHCal6E7ONcnSpE_g8G#sydT'); 
define('SECURE_AUTH_KEY', 'QXu7mFKgTo2*8iSeyVKEMdqSar_B1+ee3$lXheH'); 
define('LOGGED_IN_KEY', '$Y3o(jAkx_$*$Y~~sQ(U3IUX)qI(PO5uqF+{-$K'); 
define('NONCE_KEY', 'tlHX@]990LP2*Xu2Ep3YoW$P-[uvZ+b3#NS869[}8'); 
define('AUTH_SALT', '}Mb_=4xXc2wv^YdEAHcv]sG4*ImEVS#kWp9rjd[s~1Y+'); 
define('SECURE_AUTH_SALT', '^Ln4Nwo#krY6XxtHjP#F6xWIMqg#P@bqBRNe+_M^M^-yzR'); 
define('LOGGED_IN_SALT', 'n-gm(2k-7V^Bp(OjGHBj|9MI]J6EvcUu]a[_hvEmpnx(Q'); 
define('NONCE_SALT', '(Kw[Mrq@IkxBqGaO0AJJ^pkfGREn=zI__I*1KyNSRmsz4'); 

/**#@-*/

/**
 * Prefijo de la base de datos de WordPress.
 *
 * Cambia el prefijo si deseas instalar multiples blogs en una sola base de datos.
 * Emplea solo números, letras y guión bajo.
 */
$table_prefix  = 'lewp_';

/**
 * Idioma de WordPress.
 *
 * Cambia lo siguiente para tener WordPress en tu idioma. El correspondiente archivo MO
 * del lenguaje elegido debe encontrarse en wp-content/languages.
 * Por ejemplo, instala ca_ES.mo copiándolo a wp-content/languages y define WPLANG como 'ca_ES'
 * para traducir WordPress al catalán.
 */
define('WPLANG', 'es_ES');

/**
 * Para desarrolladores: modo debug de WordPress.
 *
 * Cambia esto a true para activar la muestra de avisos durante el desarrollo.
 * Se recomienda encarecidamente a los desarrolladores de temas y plugins que usen WP_DEBUG
 * en sus entornos de desarrollo.
 */
define('WP_DEBUG', true);

/* ¡Eso es todo, deja de editar! Feliz blogging */

/** WordPress absolute path to the Wordpress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', APP_ROOT . '/public/wordpress');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

