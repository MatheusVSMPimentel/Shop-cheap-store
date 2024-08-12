### Multi Stage Build ###


### 1st - Get Source e and generate build ###
FROM node:alpine AS ng-builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --save --force
RUN npm install -g @angular/cli --force --save
COPY customValidatorNodeConfigured/custom-forms.module.d.ts /app/node_modules/ngx-custom-validators/src/app/custom-forms.module.d.ts
COPY . /app
RUN ng build --configuration production

### 2nd - deploy source to NGINX server with angular app ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-builder app/dist/shop-cheap-store-prd/browser /usr/share/nginx/html

EXPOSE 80
