FROM node:10

# Install utilities
RUN apt-get update --fix-missing && apt-get -y upgrade

# Install latest chrome dev package.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /src/*.deb

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# update node user and setup home dir.
RUN usermod --gid node --groups audio,video node && \
    mkdir --parents /home/node/reports && \
    chown --recursive node:node /home/node

USER node

# global node installations
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
# chrome app path
ENV LIGHTHOUSE_CHROMIUM_PATH=/usr/bin/google-chrome

# Install global packages
RUN npm install psi -g
RUN npm install lighthouse -g

# install lighthouse local cli
WORKDIR home/node
COPY --chown=node:node lighthouse-local-cli ./lighthouse-local-cli
RUN cd lighthouse-local-cli \
	&& npm install -g

# install psi local cli
WORKDIR home/node
COPY --chown=node:node psi-local-cli ./psi-local-cli
RUN cd psi-local-cli \
	&& npm install -g