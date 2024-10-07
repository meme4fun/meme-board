#!/bin/bash

SERVERS=(meme4fun_server.py
scheduler_meme4fun.py
)

echo ""
echo "This shell checked service status by system command 'ps -ef'. If service not running,"
echo "you will see a line like *** Attention: server ***.py not start, please check manual !!!"
echo "There is not attention when you check stop shell result, usage: 'bash $0 stop' "

echo ""
echo " --- Service State --- "
echo "UID        PID  PPID  C STIME TTY          TIME CMD"
for server in ${SERVERS[@]}; do
  ps -ef | grep "${server}" | grep -v grep
  rs=$(ps -ef | grep "${server}" | grep -v grep | wc -l)
  if [[ "$rs" -eq 0 && "$1" != "stop" ]]; then
    echo "*** Attention: server ${server} not start, please check manual !!!"
  fi
done
echo ""
