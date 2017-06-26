#!/bin/sh

version=`php -r "\\$v = explode('.',file_get_contents('version.txt')); echo \\$v[0].'.'.\\$v[1].'.'.(\\$v[2]+1);"`
echo "Deploying version $version\n"

echo "$version" > version.txt
echo "$version" > www/templates/version.html
sed -i' ' "s/id=\"com.9oficioBH\" version=\".*\" /id=\"com.9oficioBH\" version=\"$version\" /" config.xml

rm -f "config.xml "

ionic build ios
#ionic build android
ionic upload --note "$version"
