
for dir in bin
do
  #Use a ( subshell ) to avoid having to cd back.
  #https://github.com/koalaman/shellcheck/wiki/SC2103
  (
  cd "$dir" || exit
  nohup python3 scheduler_meme4fun.py </dev/null >/dev/null 2>&1 &
  )
done

nohup python3 meme4fun_server.py </dev/null >/dev/null 2>&1  &
sleep 1
bash ./ps_servers.sh
