FROM 'node'

RUN mkdir -p /src/todo-app

COPY . /src/todo-app

WORKDIR /src/todo-app

COPY start.sh /src/todo-app/start.sh
RUN chmod +x /src/todo-app/start.sh

CMD ["sh", "/src/todo-app/start.sh"]
