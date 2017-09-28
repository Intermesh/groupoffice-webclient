#!/bin/bash

read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi



#change to script directory
cd "$(dirname "$0")"
cd ..

gulp build

cd build

tar czf groupoffice-webclient.tar.gz *

scp groupoffice-webclient.tar.gz root@blade2.instructiefilm.nl:
#scp groupoffice-webclient.tar.gz root@amadeiro.group-office.com:
#scp groupoffice-webclient.tar.gz root@houtwerf.group-office.eu:/home/groupoffice7/



