#!/bin/bash
 
# This script updates the information of version in description.xml
# and  the update information.xml
# and build (compress) the extension

Ext=AltSearch
RootExt=Code

# I use 7zip, but you can use zip:
#ZIP_CMD='zip -ru ' 
ZIP_CMD='7z -tzip a '

SubstVersion() {
	sed -i 's#<version value.*#<version value="'$1'"/>#' $2
}

if [[ ! $1 ]]
then
	cat <<__USAGE
Usage:
$0 version
example: ./build.sh 12.2.3beta4
__USAGE

else
	echo
    echo "### updating $RootExt/description.xml"
    cd $RootExt
	SubstVersion $1 description.xml

    echo "### Compiling " $Ext
    ${ZIP_CMD} ../$Ext.oxt .

     cd ..
 
    echo 
    echo "### updating $Ext.update.xml"

	SubstVersion $1 $Ext.update.xml

#only if oxt is in the release 	sed -i s'/raw.*/raw\/'$1'\/'$Ext'.oxt"\/>/' $Ext.update.xml
    echo "### Done"
fi
