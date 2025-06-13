Rem 
Rem Before compress change version number in ./Code/description.xml
Rem and ./Alsearch.update.xml (if necessary).
Rem 
Rem compress with 7zip (must be in the path variable)
Rem -tzip = user compression zip 
Rem  if not has this moddifier, 7z use the native 7zip compression
Rem                 incompatible with extensions oxt


echo ON
cd Code
7z a -tzip AltSearch.oxt .
move Altsearch.oxt ..
