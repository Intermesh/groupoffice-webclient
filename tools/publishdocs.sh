#!/bin/bash
cd "$(dirname "$0")"
cd ..

rm -Rf build/docs
gulp docs

#scp -r dist/docs mschering@web1.imfoss.nl:/var/www/intermesh.io/html/angular/docs

rsync -av --delete -e ssh build/docs/ mschering@web1.imfoss.nl:/var/www/intermesh.io/html/angular/docs/