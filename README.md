# Licencia y acuerdos

Este proyecto y sus componentes se encuentran licenciados bajo la Licencia MIT, lo que significa que cualquier persona puede utilizar, copiar, modificar y distribuir el software con fines personales, académicos o comerciales, siempre que se mantenga el aviso original de derechos de autor. Esta licencia es muy permisiva y favorece la adopción abierta, pero también indica que el software se proporciona "tal cual", sin garantías de ningún tipo, por lo que el autor no se hace responsable de su uso.

# Despliegue del Frontend de Fireploy 🚀

Este documento describe los pasos para desplegar el frontend del proyecto **Fireploy** en una máquina virtual.

## 1. Crear y configurar usuario 👤

```bash
sudo adduser fireploy_frontend
# Ingresar la contraseña: fireploy_frontend

sudo usermod -aG sudo fireploy_frontend
groups fireploy_frontend
```

## 2. Iniciar sesión con el nuevo usuario 🔐

```bash
su fireploy_frontend
```

## 3. Instalar Git 🔧

```bash
sudo apt update
sudo apt install -y git
```

## 4. Instalar Node.js y npm 🟢

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm

# Instalar Node.js versión 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Node.js versión 20 (opcional, para actualizar)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 5. Instalar PM2 y Serve 📦

```bash
sudo npm install -g pm2
npm install -g serve
```

## 6. Clonar el repositorio del frontend 📥

```bash
git clone https://github.com/Malvare22/Fireploy_Frontend.git
cd Fireploy_Frontend
```

## 7. Crear el archivo `.env` 🛠️

> Crear y configurar manualmente el archivo `.env` con las variables necesarias ✍️

## 8. Instalar dependencias y construir la aplicación 📚

```bash
sudo npm i
sudo npm run build
```

## 9. Desplegar usando PM2 🚦

```bash
pm2 start serve --name fireploy-frontend -- -s dist -p 4173
pm2 save
pm2 startup
pm2 list
```

---

Con estos pasos, la aplicación frontend debería estar corriendo y disponible en el puerto **4173** ✅
