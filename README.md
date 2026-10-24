# Los Doggys de la City

Sitio estático responsive para una productora cultural independiente: cultura, shows, comunidad y solidaridad.

## Incluye
- Página principal adaptada a móviles.
- Cartelera desde `data/events.json`; solo se muestran eventos con `status: "published"`.
- Enlaces de tickets y donaciones sujetos a configuración oficial.
- Formulario que prepara un correo mediante `mailto`; no almacena ni envía datos por sí solo.
- Despliegue de GitHub Pages con GitHub Actions.

## Configuración
Editá `config.js` solo con datos confirmados: correo de contacto, redes oficiales, página de tickets y canal de donación. No subas secretos, tokens ni datos financieros.

## Añadir un evento confirmado
Añadí a `data/events.json` un objeto con `title`, `date`, `venue`, `description`, `ticketUrl` y `status: "published"`. No publiques fechas, artistas, recintos ni enlaces sin aprobación del equipo.

## Publicación
1. En GitHub, abrí **Settings → Pages** y elegí **GitHub Actions** como fuente si no queda configurado automáticamente.
2. Abrí **Actions** y comprobá que “Deploy static site to GitHub Pages” finalice correctamente.
3. Probá la URL pública, navegación móvil, formulario y enlaces.

## Transparencia
La web no procesa pagos. Los tickets deben dirigirse a un vendedor aprobado. Las donaciones solo se activarán cuando el beneficiario confirme el nombre, autorización y canal de aportes.