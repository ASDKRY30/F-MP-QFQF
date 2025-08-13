# 💳 Sistema de Auto-Entregas con MercadoPago - 30K-BOT

## 🎯 Descripción General

El bot 30K-BOT ahora incluye un sistema completo de auto-entregas integrado con MercadoPago que permite:

- **Pagos Automatizados**: Procesar pagos a través de MercadoPago
- **Auto-Entregas**: Entregar productos digitales automáticamente tras confirmar el pago
- **Gestión de Productos**: Crear y administrar productos digitales
- **Seguimiento de Ventas**: Historial completo de ventas y pagos
- **Webhooks**: Recibir notificaciones en tiempo real de MercadoPago

---

## 🚀 Configuración Inicial

### 1. Obtener Credenciales de MercadoPago

1. Ve a [developers.mercadopago.com](https://developers.mercadopago.com)
2. Inicia sesión con tu cuenta de MercadoPago
3. Crea una nueva aplicación
4. Obtén las siguientes credenciales:
   - **Access Token** (Token de acceso)
   - **Public Key** (Clave pública)

### 2. Configurar Variables de Entorno

Agrega estas variables de entorno en tu Repl:

```bash
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_aquí
MERCADOPAGO_PUBLIC_KEY=tu_public_key_aquí
```

### 3. Configurar Webhook URL

En tu aplicación de MercadoPago, configura la URL del webhook:
```
https://tu-repl-name.replit.dev/webhook/mercadopago
```

---

## 📋 Comandos Disponibles

### `/mercadopago setup`
Muestra la guía de configuración y estado actual del sistema.

**Uso:**
```
/mercadopago setup
```

### `/mercadopago create-product`
Crear un nuevo producto para venta automática.

**Uso:**
```
/mercadopago create-product name:"Producto Digital" price:100 description:"Descripción del producto"
```

**Parámetros:**
- `name`: Nombre del producto
- `price`: Precio en tu moneda local
- `description`: Descripción detallada del producto

### `/mercadopago products`
Ver todos los productos configurados.

**Uso:**
```
/mercadopago products
```

### `/mercadopago sales`
Ver historial de ventas y estadísticas.

**Uso:**
```
/mercadopago sales
```

### `/mercadopago config`
Configurar canales de entrega y notificaciones.

**Uso:**
```
/mercadopago config
```

---

## 🔧 Sistema de Auto-Entregas

### Cómo Funciona

1. **Creación de Producto**: Usas `/mercadopago create-product` para agregar productos
2. **Generación de Link**: El sistema genera links de pago únicos
3. **Proceso de Pago**: El cliente paga a través de MercadoPago
4. **Webhook Notification**: MercadoPago envía notificación al bot
5. **Auto-Entrega**: El bot entrega automáticamente el producto

### Flujo de Auto-Entrega

```
Cliente Paga → MercadoPago Confirma → Webhook Activado → Bot Entrega Producto → Cliente Recibe
```

---

## 🏪 Configuración para Shops/Tiendas

### 1. Configurar Canales

- **Canal de Entregas**: Donde se envían los productos automáticamente
- **Canal de Notificaciones**: Para alertas de ventas y administración
- **Canal de Soporte**: Para tickets relacionados con compras

### 2. Productos Digitales Recomendados

- Cuentas premium de servicios
- Códigos de activación
- Licencias de software
- Accesos VIP a servidores Discord
- Archivos digitales (guías, ebooks, etc.)

### 3. Categorías de Productos

El sistema soporta múltiples categorías:
- **Digital**: Productos digitales instantáneos
- **Premium**: Servicios premium
- **Licenses**: Licencias y códigos
- **Access**: Accesos y membresías

---

## 📊 Monitoreo y Estadísticas

### Dashboard Web

Accede al dashboard en: `https://tu-repl.replit.dev/`

**Endpoints Disponibles:**
- `/status` - Estado del bot
- `/health` - Health check del sistema
- `/api/payments` - Datos de pagos (JSON)
- `/api/sales` - Datos de ventas (JSON)

### Estadísticas Disponibles

- **Ingresos Totales**: Suma de todos los pagos confirmados
- **Número de Ventas**: Total de transacciones completadas
- **Productos Más Vendidos**: Análisis de productos populares
- **Ventas por Período**: Estadísticas temporales

---

## 🔒 Seguridad y Permisos

### Acceso CEO Only

- Todos los comandos de MercadoPago requieren permisos de CEO
- Solo usuarios autorizados pueden:
  - Configurar el sistema
  - Crear productos
  - Ver estadísticas de ventas
  - Acceder al historial de pagos

### Validación de Pagos

- **Verificación Webhook**: Todos los pagos son verificados mediante webhook
- **Estados de Pago**: Solo pagos "approved" activan auto-entregas
- **Logs Completos**: Registro detallado de todas las transacciones

---

## 🛠️ Integración con Sistema de Tickets

### Tickets de Compra

El sistema se integra automáticamente con el sistema de tickets:
- **Ticket "Buy"**: Para consultas sobre productos y compras
- **Soporte Post-Venta**: Tickets automáticos para problemas con entregas
- **Seguimiento**: Vincular tickets con transacciones específicas

---

## 📝 Archivos de Datos

El sistema almacena datos en:

### `/data/products.json`
```json
[
  {
    "id": "prod_1234567890",
    "name": "Producto Digital",
    "price": 100,
    "description": "Descripción del producto",
    "created": "2025-01-13T01:00:00.000Z",
    "active": true,
    "sales": 5
  }
]
```

### `/data/payments.json`
```json
[
  {
    "id": "payment_id",
    "status": "approved",
    "amount": 100,
    "currency": "ARS",
    "payment_method": "credit_card",
    "payer_email": "cliente@email.com",
    "date_created": "2025-01-13T01:00:00.000Z"
  }
]
```

### `/data/sales.json`
```json
[
  {
    "payment_id": "payment_id",
    "product_name": "Producto Digital",
    "amount": 100,
    "customer_email": "cliente@email.com",
    "date": "2025-01-13T01:00:00.000Z",
    "status": "completed",
    "delivered": true,
    "delivery_date": "2025-01-13T01:01:00.000Z"
  }
]
```

---

## 🚨 Solución de Problemas

### Problemas Comunes

1. **Webhook no funciona**
   - Verifica que la URL esté configurada correctamente
   - Asegúrate de que el Repl esté siempre online
   - Revisa los logs del webhook server

2. **Pagos no se procesan**
   - Verifica las credenciales de MercadoPago
   - Confirma que el Access Token sea válido
   - Revisa el estado del webhook endpoint

3. **Auto-entregas no funcionan**
   - Verifica que el canal de entregas esté configurado
   - Confirma que el bot tenga permisos para enviar mensajes
   - Revisa los datos de productos

### Logs y Debugging

- Los logs se muestran en la consola del bot
- Usa `/debug system` para ver estado del sistema
- Revisa `/api/payments` para validar transacciones

---

## 🎯 Próximas Funcionalidades

- **Códigos de Descuento**: Sistema de cupones y promociones
- **Suscripciones**: Pagos recurrentes para servicios premium
- **Analytics Avanzados**: Dashboard web completo con gráficos
- **Multi-Moneda**: Soporte para múltiples monedas
- **Refund System**: Sistema de reembolsos automático

---

**Desarrollado por: Kry**  
**30K-BOT Sistema Profesional de Discord**