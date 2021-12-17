FROM ruby:2.7-alpine

ENV LANG="C.UTF-8"
RUN apk update && \
    apk add --no-cache --update \
      curl-dev \
      build-base \
      alpine-sdk \
      tzdata \
      sqlite-dev \
      less \
      ruby-dev \
      nodejs \
      yarn

WORKDIR /app

COPY ./ ./

RUN gem install bundler && \
    bundle install -j4 && \
    yarn install

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]