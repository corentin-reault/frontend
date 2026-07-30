# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /usr/src/frontend

# Copy package files and install deps (if any)
COPY package*.json ./
RUN npm ci 2>/dev/null || true

# Copy source
COPY . .

# Replace {{VERSION}} placeholder in index.html with build arg
# AND inject cache-busting query param on all local asset references
ARG VERSION=dev
RUN sed -i "s/{{VERSION}}/$VERSION/g" index.html && \
    if echo "$VERSION" | grep -q '^build-'; then \
      BUILD_NUM=$(echo "$VERSION" | cut -d'-' -f2); \
      # CSS: link[href] with ./assets/ or ./libs/ (preload + stylesheet) \
      sed -i -E 's#(href=")(\./)?(assets|libs)/([^"?]+)"?#\1\2\3/\4?v='"$BUILD_NUM"'"#g' index.html; \
      # JS: script[src] with ./assets/ or ./libs/ \
      sed -i -E 's#(src=")(\./)?(assets|libs)/([^"?]+)"?#\1\2\3/\4?v='"$BUILD_NUM"'"#g' index.html; \
      # Images: img[src], source[srcset] with ./assets/ or ./libs/ \
      sed -i -E 's#(srcset?=")(\./)?(assets|libs)/([^"?]+)"?#\1\2\3/\4?v='"$BUILD_NUM"'"#g' index.html; \
      # favicon (absolute /assets/) \
      sed -i -E 's#(href=")(/assets/img/favicon\.svg)"?#\1\2?v='"$BUILD_NUM"'"#g' index.html; \
    fi

# ---------- RUNTIME STAGE ----------
FROM nginx:alpine

# Copy custom nginx config (overwrites default)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built site from builder
COPY --from=builder /usr/src/frontend/assets /usr/share/nginx/html/assets
COPY --from=builder /usr/src/frontend/libs /usr/share/nginx/html/libs
COPY --from=builder /usr/src/frontend/index.html /usr/share/nginx/html/
COPY --from=builder /usr/src/frontend/robots.txt /usr/share/nginx/html/
COPY --from=builder /usr/src/frontend/sitemap.xml /usr/share/nginx/html/

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]