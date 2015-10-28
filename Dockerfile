FROM node
# Bundle app source
COPY . /src
WORKDIR /src
# Install app dependencies
RUN npm install
EXPOSE  8080
CMD ["node", "/src/index.js"]