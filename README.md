# Frontend de la prueba técnica para la vacante Desarrollador Semi-Senior en Cymetria

## Cómo usar la api
1. Clona el repositorio en tu máquina local utilizando el siguiente comando:
  ```
  git clone https://github.com/dieramirezma/cymetria-frontend.git
  ```

2. Abre una terminal y navega hasta la carpeta del repositorio clonado.

3. Ejecuta el siguiente comando para instalar las dependencias del proyecto:
  ```
  npm install
  ```

4. Crea un archivo de configuración `.env` en la raíz del proyecto y configura las variables de entorno necesarias, en este caso, la url de la api. El siguiente es un ejemplo:

```
 NEXT_PUBLIC_API_URL=http://localhost:3900/api
```
5. Una vez que hayas configurado todas las variables de entorno necesarias, puedes ejecutar el proyecto utilizando el siguiente comando:
  ```
  npm run dev
  ```

6. El proyecto se ejecutará y podrás acceder a él a través de tu navegador web en la dirección `http://localhost:3000/api` (o la dirección especificada en ejecucion por consola`).

En este punto puedes acceder al login, registro y consulta de estudiantes aprobados.