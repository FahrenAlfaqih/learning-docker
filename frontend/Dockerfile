FROM node:16-alpine

WORKDIR /app

COPY packaage.json yarn.lock ./

RUN yarn install

COPY . . 

ENV REACT_APP_API_URL=http://localhost:8080

EXPOSE 3000

CMD ["yarn", "start", "--host", "0.0.0.0"]