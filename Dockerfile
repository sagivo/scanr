FROM node

#-----------install imagemagic-------------
# Ignore APT warnings about not having a TTY
ENV DEBIAN_FRONTEND noninteractive

# Ensure UTF-8 locale
RUN apt-get update
#RUN echo 'deb http://archive.ubuntu.com/ubuntu/ quantal universe' >> /etc/apt/sources.list; echo 'deb http://archive.ubuntu.com/ubuntu/ quantal-updates universe' >> /etc/apt/sources.list; echo 'deb http://security.ubuntu.com/ubuntu/ quantal-security universe' >> /etc/apt/sources.list
RUN apt-get install -y wget imagemagick
RUN apt-get install -y ghostscript
RUN apt-get clean

#-----------install tesseract-------------
RUN apt-get install -y \
  tesseract-ocr \
  tesseract-ocr-eng \
  tesseract-ocr-heb

#-----------install node-------------
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE  8080
CMD ["node", "/src/index.js"]
